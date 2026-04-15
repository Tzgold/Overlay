// AI Hub Pro - Background Service Worker

const STORAGE_KEY = 'ai_hub_pro_settings_v3';
const WINDOW_ID_KEY = 'overlay_active_window_id';
/** toolId -> last full URL for that tool (restore same chat when switching back). */
const LAST_URL_KEY = 'overlay_quick_tool_last_url';
/** Last Quick Tool id we loaded in the overlay tab (so Alt+A can focus without navigating = no refresh / new chat). */
const OVERLAY_SYNCED_TOOL_ID_KEY = 'overlay_synced_tool_id';
/** Prefer last URL for this tool (same origin as fallback). */
async function getResolvedUrlForTool(toolId, fallbackUrl) {
    if (!fallbackUrl) return null;
    const data = await chrome.storage.local.get(LAST_URL_KEY);
    const map = data[LAST_URL_KEY] || {};
    const last = toolId ? map[toolId] : null;
    if (!last || typeof last !== 'string') return fallbackUrl;
    try {
        if (new URL(last).origin === new URL(fallbackUrl).origin) {
            return last;
        }
    } catch (e) {
        console.warn('getResolvedUrlForTool:', e);
    }
    return fallbackUrl;
}

async function setLastUrlForTool(toolId, url) {
    if (!toolId || !url) return;
    if (url.startsWith('chrome://') || url.startsWith('chrome-extension://') || url.startsWith('devtools://')) {
        return;
    }
    const data = await chrome.storage.local.get(LAST_URL_KEY);
    const map = data[LAST_URL_KEY] || {};
    if (map[toolId] === url) return;
    map[toolId] = url;
    await chrome.storage.local.set({ [LAST_URL_KEY]: map });
}

async function getSelectedToolIdFromStorage() {
    const result = await chrome.storage.local.get([STORAGE_KEY]);
    return result[STORAGE_KEY]?.selectedToolId || null;
}

async function getActiveWindowId() {
    const result = await chrome.storage.local.get([WINDOW_ID_KEY]);
    return result[WINDOW_ID_KEY];
}

async function setActiveWindowId(id) {
    if (id === null) {
        await chrome.storage.local.remove([WINDOW_ID_KEY]);
    } else {
        await chrome.storage.local.set({ [WINDOW_ID_KEY]: id });
    }
}

async function getFirstTabIdInWindow(windowId) {
    const tabs = await chrome.tabs.query({ windowId });
    return tabs[0]?.id ?? null;
}

async function getOverlaySyncedToolId() {
    const r = await chrome.storage.local.get(OVERLAY_SYNCED_TOOL_ID_KEY);
    return r[OVERLAY_SYNCED_TOOL_ID_KEY] ?? null;
}

async function setOverlaySyncedToolId(toolId) {
    if (toolId) {
        await chrome.storage.local.set({ [OVERLAY_SYNCED_TOOL_ID_KEY]: toolId });
    } else {
        await chrome.storage.local.remove([OVERLAY_SYNCED_TOOL_ID_KEY]);
    }
}

/** Bring overlay forward and activate its tab without changing URL (avoids reload / new chat on Alt+A). */
async function focusOverlayWithoutNavigation(windowId) {
    const tabId = await getFirstTabIdInWindow(windowId);
    if (tabId) {
        await chrome.tabs.update(tabId, { active: true });
    }
    await chrome.windows.update(windowId, { focused: true, state: 'normal' });
}

/**
 * Popup-type windows only reliably support ONE tab. Navigate that tab when switching tools or first open.
 */
async function navigateOverlayTab(windowId, toolId, fallbackUrl) {
    const openUrl = toolId ? await getResolvedUrlForTool(toolId, fallbackUrl) : fallbackUrl;
    if (!openUrl) return;

    const tabId = await getFirstTabIdInWindow(windowId);
    if (!tabId) {
        console.warn('navigateOverlayTab: no tab in overlay window');
        return;
    }
    await chrome.tabs.update(tabId, { url: openUrl, active: true });
    if (toolId) {
        await setOverlaySyncedToolId(toolId);
    }
}

async function createQuickToolWindow(url) {
    const width = 550;
    const height = 700;
    let left = 100;
    let top = 100;

    try {
        const currentWindow = await chrome.windows.getLastFocused();
        if (currentWindow && currentWindow.width && currentWindow.height) {
            const baseLeft = currentWindow.left || 0;
            const baseTop = currentWindow.top || 0;
            left = Math.round(baseLeft + (currentWindow.width - width) / 2);
            top = Math.round(baseTop + (currentWindow.height - height) / 2);
        }
    } catch (e) {
        /* ignore: position fallback */
    }

    return chrome.windows.create({
        url,
        type: 'popup',
        width,
        height,
        left,
        top,
        focused: true
    });
}

/**
 * Single tab in the overlay popup window — all tool switches use tabs.update so nothing opens in the main browser.
 */
async function openOrNavigateQuickToolWindow(url, toolId) {
    let activeWindowId = await getActiveWindowId();
    if (activeWindowId) {
        try {
            await chrome.windows.get(activeWindowId);
        } catch (e) {
            await setActiveWindowId(null);
            activeWindowId = null;
        }
    }

    if (activeWindowId) {
        await navigateOverlayTab(activeWindowId, toolId, url);
        await chrome.windows.update(activeWindowId, { focused: true, state: 'normal' });
        return;
    }

    const openUrl = toolId ? await getResolvedUrlForTool(toolId, url) : url;
    const win = await createQuickToolWindow(openUrl);
    await setActiveWindowId(win.id);
    if (toolId) {
        await setOverlaySyncedToolId(toolId);
    }
}

async function showSystemNotification(message) {
    try {
        await chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: 'Overlay',
            message
        });
    } catch (e) {
        console.warn('Unable to show notification:', e);
    }
}

let isProcessing = false;

chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'toggle-overlay') {
        if (isProcessing) return;
        isProcessing = true;

        try {
            const result = await chrome.storage.local.get([STORAGE_KEY]);
            const settings = result[STORAGE_KEY] || {};

            const isExtensionEnabled = settings.isExtensionEnabled !== false;
            if (!isExtensionEnabled) {
                await showSystemNotification('Overlay is offline. Turn system power on from the popup.');
                return;
            }

            if (!settings.selectedToolUrl) {
                console.warn('No Quick Tool selected. User needs to pick one from the popup.');
                await showSystemNotification('Pick a Quick Tool from the extension popup first.');
                return;
            }

            const activeWindowId = await getActiveWindowId();

            if (activeWindowId) {
                try {
                    const win = await chrome.windows.get(activeWindowId);

                    if (win.focused) {
                        await chrome.windows.update(activeWindowId, { state: 'minimized' });
                    } else {
                        // Do not navigate on Alt+A — that reloads the page and often starts a "new chat".
                        // Only navigate if the user changed Quick Tool in the popup since we last synced this tab.
                        const syncedId = await getOverlaySyncedToolId();
                        if (
                            settings.selectedToolId &&
                            syncedId !== null &&
                            syncedId !== settings.selectedToolId
                        ) {
                            await navigateOverlayTab(
                                activeWindowId,
                                settings.selectedToolId,
                                settings.selectedToolUrl
                            );
                        }
                        await focusOverlayWithoutNavigation(activeWindowId);
                    }
                    return;
                } catch (e) {
                    await setActiveWindowId(null);
                    await setOverlaySyncedToolId(null);
                }
            }

            const openUrl = await getResolvedUrlForTool(
                settings.selectedToolId,
                settings.selectedToolUrl
            );
            const win = await createQuickToolWindow(openUrl);
            await setActiveWindowId(win.id);
            if (settings.selectedToolId) {
                await setOverlaySyncedToolId(settings.selectedToolId);
            }
        } catch (err) {
            console.error('Error in toggle-overlay:', err);
        } finally {
            isProcessing = false;
        }
    }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.action === 'openOrNavigateQuickTool' && typeof message.url === 'string') {
        const toolId = typeof message.toolId === 'string' ? message.toolId : undefined;
        openOrNavigateQuickToolWindow(message.url, toolId)
            .then(() => sendResponse({ ok: true }))
            .catch((err) => {
                console.error('openOrNavigateQuickTool:', err);
                sendResponse({ ok: false, error: String(err) });
            });
        return true;
    }
    return false;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab.url) return;
    if (!changeInfo.url && changeInfo.status !== 'complete') return;

    getActiveWindowId().then(async (overlayWid) => {
        if (!overlayWid) return;
        try {
            const t = await chrome.tabs.get(tabId);
            if (t.windowId !== overlayWid) return;
        } catch (e) {
            return;
        }
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) return;

        const toolId = await getSelectedToolIdFromStorage();
        if (toolId) {
            await setLastUrlForTool(toolId, tab.url);
        }
    });
});

chrome.windows.onRemoved.addListener(async (windowId) => {
    const activeWindowId = await getActiveWindowId();
    if (windowId === activeWindowId) {
        await setActiveWindowId(null);
        await setOverlaySyncedToolId(null);
    }
});
