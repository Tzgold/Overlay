// Overlay Dashboard — Full-Tab Professional Dashboard
// Shares storage with popup.js via chrome.storage.local

// ========== Constants ==========
const AI_TOOLS = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com', description: 'OpenAI Chatbot', category: 'Writing & Search', icon: 'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai', description: 'Anthropic AI', category: 'Writing & Search', icon: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=64' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com', description: 'Google AI', category: 'Writing & Search', icon: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://perplexity.ai', description: 'Search & Answer Engine', category: 'Writing & Search', icon: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=64' },
  { id: 'grok', name: 'Grok', url: 'https://grok.com', description: 'xAI Platform', category: 'Writing & Search', icon: 'https://www.google.com/s2/favicons?domain=grok.com&sz=64' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com', description: 'LLM Platform', category: 'Writing & Search', icon: 'https://www.google.com/s2/favicons?domain=deepseek.com&sz=64' },
  { id: 'midjourney', name: 'Midjourney', url: 'https://www.midjourney.com', description: 'AI Image Generation', category: 'Image Generation', icon: 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=64' },
  { id: 'runway', name: 'Runway', url: 'https://runwayml.com', description: 'AI Video Editing', category: 'Video Editing', icon: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=64' },
  { id: 'notion', name: 'Notion AI', url: 'https://notion.ai', description: 'Smart Workspace', category: 'Productivity', icon: 'https://www.google.com/s2/favicons?domain=notion.ai&sz=64' },
  { id: 'fireflies', name: 'Fireflies', url: 'https://fireflies.ai', description: 'AI Meeting Assistant', category: 'Productivity', icon: 'https://www.google.com/s2/favicons?domain=fireflies.ai&sz=64' },
];

const ACCENT_COLORS = [
  { name: 'Neon Lime', value: '#ccff00' },
  { name: 'Neon Blue', value: '#00d4ff' },
  { name: 'Neon Pink', value: '#ff007a' },
  { name: 'Neon Purple', value: '#bc13fe' },
  { name: 'Cyber Red', value: '#ff3131' },
];

const STORAGE_KEY = 'ai_hub_pro_settings_v3';
const CATEGORIES = ['Writing & Search', 'Image Generation', 'Video Editing', 'Productivity', 'General'];

// ========== SVG Icons ==========
const icons = {
  settings: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  close: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
  drag: `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2zM7 15h2v2H7v-2zm4 0h2v2h-2v-2z"/></svg>`,
  copy: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>`,
  check: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`,
  launch: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`,
  arrow: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/></svg>`,
  power: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 3v7M8.684 5.291A7.962 7.962 0 0112 4a8 8 0 110 16 8 8 0 01-3.316-14.709"/></svg>`,
  arrowRight: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`,
  pin: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>`,
  pinFilled: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>`,
  plus: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>`,
  trash: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
  tools: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
  bolt: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  shield: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
};

// ========== State ==========
let state = {
  enabledTools: {},
  toolOrder: AI_TOOLS.map(t => t.id),
  customTools: [],
  isExtensionEnabled: true,
  collapsedCategories: {},
  accentColor: '#ccff00',
  isLoading: true,
  highlightedId: null,
  selectedToolId: null,
  selectedToolUrl: null,
  selectedToolName: null,
};

let hasRenderedOnce = false;

// ========== Utility ==========
function saveSettings() {
  const settings = {
    enabledTools: state.enabledTools,
    toolOrder: state.toolOrder,
    isExtensionEnabled: state.isExtensionEnabled,
    collapsedCategories: state.collapsedCategories,
    accentColor: state.accentColor,
    selectedToolId: state.selectedToolId,
    selectedToolUrl: state.selectedToolUrl,
    selectedToolName: state.selectedToolName,
    customTools: state.customTools,
  };
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    chrome.storage.local.set({ [STORAGE_KEY]: settings });
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}

async function loadSettings() {
  try {
    let settings = null;
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      const result = await chrome.storage.local.get([STORAGE_KEY]);
      settings = result[STORAGE_KEY];
    } else {
      const localData = localStorage.getItem(STORAGE_KEY);
      if (localData) settings = JSON.parse(localData);
    }
    if (settings) {
      state.enabledTools = settings.enabledTools || {};
      state.isExtensionEnabled = settings.isExtensionEnabled !== undefined ? settings.isExtensionEnabled : true;
      state.accentColor = settings.accentColor || '#ccff00';
      if (settings.toolOrder?.length > 0) state.toolOrder = settings.toolOrder;
      if (settings.collapsedCategories) state.collapsedCategories = settings.collapsedCategories;
      state.selectedToolId = settings.selectedToolId || null;
      state.selectedToolUrl = settings.selectedToolUrl || null;
      state.selectedToolName = settings.selectedToolName || null;
      state.customTools = settings.customTools || [];
    }
  } catch (e) {
    console.error('Error loading settings:', e);
  }
  state.isLoading = false;
}

function openUrl(url) {
  if (!state.isExtensionEnabled) return;
  if (typeof chrome !== 'undefined' && chrome.windows?.create) {
    chrome.windows.create({ url, type: 'popup', width: 1000, height: 800, focused: true });
  } else {
    window.open(url, '_blank', 'width=1000,height=800,scrollbars=yes,resizable=yes');
  }
}

function getAllTools() {
  return [...AI_TOOLS, ...state.customTools];
}

function getSortedTools() {
  const allTools = getAllTools();
  return state.toolOrder.map(id => allTools.find(t => t.id === id)).filter(Boolean);
}

function getCategorizedTools() {
  const groups = {};
  CATEGORIES.forEach(cat => groups[cat] = []);
  getSortedTools().forEach(tool => {
    if (groups[tool.category]) groups[tool.category].push(tool);
  });
  return groups;
}

function getEnabledCount() {
  return Object.values(state.enabledTools).filter(Boolean).length;
}

function setAccentVar(color) {
  document.documentElement.style.setProperty('--accent', color);
}

// ========== Smart Update (no full re-render) ==========

// Update just the toggle switch for a specific tool (no re-render)
function updateToolToggleInPlace(toolId) {
  const toolEl = document.querySelector(`.dash-tool[data-tool-id="${toolId}"]`);
  if (!toolEl) return false;

  const toggleBtn = toolEl.querySelector(`[data-toggle-tool="${toolId}"]`);
  if (!toggleBtn) return false;

  const enabled = !!state.enabledTools[toolId];
  if (enabled) {
    toggleBtn.classList.add('enabled');
  } else {
    toggleBtn.classList.remove('enabled');
  }

  // Update the active count in the stats bar
  updateStatsInPlace();
  return true;
}

// Update just the fav/pin state for a specific tool (no re-render)
function updateFavInPlace(toolId, previousSelectedId) {
  // Remove selection from previously selected tool
  if (previousSelectedId) {
    const prevToolEl = document.querySelector(`.dash-tool[data-tool-id="${previousSelectedId}"]`);
    if (prevToolEl) {
      prevToolEl.classList.remove('selected-tool');
      const prevFavBtn = prevToolEl.querySelector(`[data-fav-id="${previousSelectedId}"]`);
      if (prevFavBtn) {
        prevFavBtn.classList.remove('favourite');
        prevFavBtn.innerHTML = icons.pin;
        prevFavBtn.title = 'Set as Quick Tool (Alt+A)';
      }
    }
  }

  // Add selection to newly selected tool
  if (state.selectedToolId) {
    const newToolEl = document.querySelector(`.dash-tool[data-tool-id="${state.selectedToolId}"]`);
    if (newToolEl) {
      newToolEl.classList.add('selected-tool');
      const newFavBtn = newToolEl.querySelector(`[data-fav-id="${state.selectedToolId}"]`);
      if (newFavBtn) {
        newFavBtn.classList.add('favourite');
        newFavBtn.innerHTML = icons.pinFilled;
        newFavBtn.title = 'Remove Quick Tool';
      }
    }
  }
  return true;
}

// Update just the stats numbers
function updateStatsInPlace() {
  const enabledCount = getEnabledCount();
  const activeValueEl = document.querySelector('.dash-stat-card:nth-child(2) .dash-stat-value');
  if (activeValueEl) {
    activeValueEl.textContent = enabledCount;
  }
}

// Update all toggle states (for select all / clear all)
function updateAllTogglesInPlace() {
  document.querySelectorAll('[data-toggle-tool]').forEach(btn => {
    const id = btn.dataset.toggleTool;
    const enabled = !!state.enabledTools[id];
    if (enabled) {
      btn.classList.add('enabled');
    } else {
      btn.classList.remove('enabled');
    }
  });
  updateStatsInPlace();
}

// ========== Full Render (with scroll preservation) ==========
function render() {
  const root = document.getElementById('dashboard-root');

  if (state.isLoading) {
    root.innerHTML = `
      <div class="dash-loading">
        <div class="dash-loading-spinner"></div>
        <div class="dash-loading-text">Loading Dashboard</div>
      </div>`;
    return;
  }

  // Save scroll position before re-render
  const scrollY = window.scrollY;

  setAccentVar(state.accentColor);

  const allTools = getAllTools();
  const enabledCount = getEnabledCount();
  const catTools = getCategorizedTools();
  const disabledClass = !state.isExtensionEnabled ? 'dash-tools-disabled' : '';
  const animClass = hasRenderedOnce ? 'no-intro-anim' : '';

  root.innerHTML = `
    <div class="dashboard ${animClass}">
      ${renderHeader()}
      ${renderStats(allTools.length, enabledCount)}
      <div class="${disabledClass}" id="toolsArea">
        ${renderGrid(catTools)}
      </div>
      ${renderActions()}
      <div class="dash-footer-info">Overlay Dashboard • System V3.2</div>
    </div>
    ${renderModal()}
  `;

  attachEvents();

  // Restore scroll position after re-render
  if (hasRenderedOnce) {
    window.scrollTo(0, scrollY);
  }
  hasRenderedOnce = true;
}

function renderHeader() {
  return `
    <div class="dash-header">
      <div class="dash-header-left">
        <img src="icons/icon128.png" class="dash-logo" alt="Overlay Logo">
        <div>
          <div class="dash-brand-title">OVERLAY <span class="dash-brand-accent">PRO</span></div>
          <div class="dash-brand-sub">AI, right where you work</div>
        </div>
      </div>
      <div class="dash-header-right">
        <button class="dash-header-btn" id="addToolBtn" title="Add New Tool">${icons.plus}</button>
        <button class="dash-header-btn" id="settingsBtn" title="Settings">${icons.settings}</button>
      </div>
    </div>`;
}

function renderStats(total, enabled) {
  const statusText = state.isExtensionEnabled ? 'Online' : 'Offline';

  return `
    <div class="dash-stats">
      <div class="dash-stat-card">
        <div class="dash-stat-icon tools-icon">${icons.tools}</div>
        <div>
          <div class="dash-stat-label">Total Tools</div>
          <div class="dash-stat-value">${total}</div>
        </div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-icon active-icon">${icons.bolt}</div>
        <div>
          <div class="dash-stat-label">Active</div>
          <div class="dash-stat-value">${enabled}</div>
        </div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-icon status-icon">${icons.shield}</div>
        <div>
          <div class="dash-stat-label">System</div>
          <div class="dash-stat-value" style="color: ${state.isExtensionEnabled ? state.accentColor : '#ef4444'}">${statusText}</div>
        </div>
      </div>
    </div>`;
}

function renderGrid(catTools) {
  let html = '<div class="dash-grid">';
  for (const [category, tools] of Object.entries(catTools)) {
    if (tools.length === 0) continue;
    const isCollapsed = !!state.collapsedCategories[category];
    const arrowClass = isCollapsed ? 'collapsed' : '';
    const toolsHtml = isCollapsed ? '' : `
      <div class="dash-cat-tools">
        ${tools.map(t => renderTool(t)).join('')}
      </div>`;

    html += `
      <div class="dash-category">
        <button class="dash-cat-header" data-toggle-cat="${category}">
          <div class="dash-cat-header-left">
            <div class="dash-cat-dot" style="background: ${state.accentColor}"></div>
            <span class="dash-cat-title">${category}</span>
            <span class="dash-cat-count">${tools.length}</span>
          </div>
          <svg class="dash-cat-arrow ${arrowClass}">${icons.arrow}</svg>
        </button>
        ${toolsHtml}
      </div>`;
  }
  html += '</div>';
  return html;
}

function renderTool(tool) {
  const enabled = !!state.enabledTools[tool.id];
  const isHighlighted = state.highlightedId === tool.id;
  const isSelected = state.selectedToolId === tool.id;
  const flashClass = isHighlighted ? 'animate-neon-flash' : '';
  const selectedClass = isSelected ? 'selected-tool' : '';
  const disabledClass = !state.isExtensionEnabled ? 'disabled' : '';
  const iconContent = tool.icon
    ? `<img src="${tool.icon}" alt="${tool.name}">`
    : `<span class="dash-tool-icon-fallback">${tool.name[0]}</span>`;

  const favIcon = isSelected ? icons.pinFilled : icons.pin;
  const favClass = isSelected ? 'favourite' : '';

  return `
    <div class="dash-tool ${flashClass} ${selectedClass} ${disabledClass}" data-tool-id="${tool.id}">
      <div class="dash-tool-left">
        <div class="dash-drag" draggable="true" data-drag-id="${tool.id}">${icons.drag}</div>
        <div class="dash-tool-icon">${iconContent}</div>
        <div class="dash-tool-info">
          <div class="dash-tool-name">${tool.name}</div>
          <div class="dash-tool-desc">${tool.isCustom ? 'User Added' : tool.description}</div>
        </div>
      </div>
      <div class="dash-tool-right">
        ${tool.isCustom ? `<button class="dash-tool-btn delete" data-delete-id="${tool.id}" title="Delete Tool">${icons.trash}</button>` : ''}
        <button class="dash-tool-btn" data-copy-url="${tool.url}" title="Copy URL">${icons.copy}</button>
        <button class="dash-tool-btn" data-launch-id="${tool.id}" data-launch-url="${tool.url}" title="Launch Tool">${icons.launch}</button>
        <button class="dash-fav ${favClass}" data-fav-id="${tool.id}" data-fav-url="${tool.url}" data-fav-name="${tool.name}" title="${isSelected ? 'Remove Quick Tool' : 'Set as Quick Tool (Alt+A)'}">${favIcon}</button>
        <button class="dash-toggle ${enabled ? 'enabled' : ''}" data-toggle-tool="${tool.id}"><span class="dash-toggle-knob"></span></button>
      </div>
    </div>`;
}

function renderActions() {
  const disabledAttr = !state.isExtensionEnabled ? 'disabled' : '';
  const powerClass = state.isExtensionEnabled ? 'enabled' : '';
  const launchClass = state.isExtensionEnabled ? 'enabled' : '';
  const powerStyle = state.isExtensionEnabled ? `background-color: ${state.accentColor};` : '';

  return `
    <div class="dash-actions">
      <div class="dash-action-group">
        <button class="dash-action-btn" id="selectAllBtn" ${disabledAttr}>Select All</button>
        <button class="dash-action-btn" id="clearAllBtn" ${disabledAttr}>Clear All</button>
      </div>
      <div class="dash-spacer"></div>
      <div class="dash-power-group">
        <button class="dash-power-btn ${powerClass}" id="powerBtn" style="${powerStyle}">${icons.power}</button>
        <span class="dash-power-status" style="${state.isExtensionEnabled ? `color: ${state.accentColor}` : ''}">${state.isExtensionEnabled ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}</span>
      </div>
      <button class="dash-launch-btn ${launchClass}" id="launchAllBtn" ${disabledAttr}>
        <span>Launch Selected</span>
        ${icons.arrowRight}
      </button>
    </div>`;
}

function renderModal() {
  const colorsHtml = ACCENT_COLORS.map(c => `
    <button class="dash-color-opt ${state.accentColor === c.value ? 'selected' : ''}" data-color="${c.value}" style="background-color: ${c.value}" title="${c.name}"></button>
  `).join('');

  return `
    <div class="dash-modal-overlay hidden" id="modalOverlay">
      <div class="dash-modal">
        <div class="dash-modal-header">
          <h2 class="dash-modal-title">System Settings</h2>
          <button class="dash-modal-close" id="modalClose">${icons.close}</button>
        </div>
        <div class="dash-modal-content">
          <div class="dash-modal-sections">
            <section class="dash-modal-section">
              <h3>Add Custom Tool</h3>
              <form id="addToolForm" class="dash-form">
                <div class="dash-form-row">
                  <input type="text" id="toolName" placeholder="Tool Name (e.g. DeepL)" required class="dash-form-input">
                  <select id="toolCategory" class="dash-form-input">
                    ${CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                  </select>
                </div>
                <div class="dash-form-row">
                  <input type="url" id="toolUrl" placeholder="https://..." required class="dash-form-input" style="flex: 1;">
                  <button type="submit" class="dash-submit-btn" style="background-color: ${state.accentColor}">Add</button>
                </div>
              </form>
            </section>

            <section class="dash-modal-section">
              <h3>Accent Theme</h3>
              <div class="dash-colors">${colorsHtml}</div>
            </section>

            <section class="dash-modal-section">
              <h3>Keyboard Shortcuts</h3>
              <div class="dash-shortcuts">
                <div class="dash-shortcut-item">
                  <span class="dash-shortcut-name">Show/Toggle Quick Tool Overlay</span>
                  <span class="dash-shortcut-key">Alt + A</span>
                </div>
              </div>
            </section>

            <section class="dash-modal-section">
              <h3>Advanced Config</h3>
              <p>System V3.2. Launches tools in 1000×800 popup windows. Reorder via drag & drop. Settings sync between popup and dashboard.</p>
            </section>

            <button class="dash-close-btn" id="closeSettingsBtn" style="background-color: ${state.accentColor}">Close Settings</button>
          </div>
        </div>
      </div>
    </div>`;
}

// ========== Events ==========
function attachEvents() {
  // Settings button
  document.getElementById('settingsBtn')?.addEventListener('click', () => {
    document.getElementById('modalOverlay')?.classList.remove('hidden');
  });

  // Add tool button
  document.getElementById('addToolBtn')?.addEventListener('click', () => {
    document.getElementById('modalOverlay')?.classList.remove('hidden');
    document.getElementById('addToolForm')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Modal close
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('closeSettingsBtn')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') closeModal();
  });

  // Add Tool form
  document.getElementById('addToolForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('toolName').value;
    const url = document.getElementById('toolUrl').value;
    const category = document.getElementById('toolCategory').value;
    if (name && url) {
      handleAddTool(name, url, category);
      closeModal();
    }
  });

  // Delete tool
  document.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Delete this tool?')) handleDeleteTool(btn.dataset.deleteId);
    });
  });

  // Color picker
  document.querySelectorAll('.dash-color-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      state.accentColor = btn.dataset.color;
      saveSettings();
      render();
    });
  });

  // Power button
  document.getElementById('powerBtn')?.addEventListener('click', () => {
    state.isExtensionEnabled = !state.isExtensionEnabled;
    saveSettings();
    render();
  });

  // Select All — in-place update, no full re-render
  document.getElementById('selectAllBtn')?.addEventListener('click', () => {
    getAllTools().forEach(t => state.enabledTools[t.id] = true);
    saveSettings();
    updateAllTogglesInPlace();
  });

  // Clear All — in-place update, no full re-render
  document.getElementById('clearAllBtn')?.addEventListener('click', () => {
    state.enabledTools = {};
    saveSettings();
    updateAllTogglesInPlace();
  });

  // Launch All
  document.getElementById('launchAllBtn')?.addEventListener('click', () => {
    if (!state.isExtensionEnabled) return;
    getAllTools().forEach(t => {
      if (state.enabledTools[t.id]) openUrl(t.url);
    });
  });

  // Category toggles
  document.querySelectorAll('[data-toggle-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.toggleCat;
      state.collapsedCategories[cat] = !state.collapsedCategories[cat];
      saveSettings();
      render();
    });
  });

  // Tool toggles — in-place update, no full re-render
  document.querySelectorAll('[data-toggle-tool]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.toggleTool;
      state.enabledTools[id] = !state.enabledTools[id];
      saveSettings();
      updateToolToggleInPlace(id);
    });
  });

  // Copy URL
  document.querySelectorAll('[data-copy-url]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(btn.dataset.copyUrl).then(() => {
        btn.innerHTML = icons.check;
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = icons.copy; btn.classList.remove('copied'); }, 2000);
      });
    });
  });

  // Fav toggle — in-place update, no full re-render
  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.favId;
      const previousSelectedId = state.selectedToolId;

      if (state.selectedToolId === id) {
        state.selectedToolId = null;
        state.selectedToolUrl = null;
        state.selectedToolName = null;
      } else {
        state.selectedToolId = id;
        state.selectedToolUrl = btn.dataset.favUrl;
        state.selectedToolName = btn.dataset.favName;
      }
      saveSettings();
      updateFavInPlace(id, previousSelectedId);
    });
  });

  // Launch individual — in-place highlight, no full re-render
  document.querySelectorAll('[data-launch-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const toolId = btn.dataset.launchId;
      const toolEl = document.querySelector(`.dash-tool[data-tool-id="${toolId}"]`);
      if (toolEl) {
        toolEl.classList.add('animate-neon-flash');
        setTimeout(() => toolEl.classList.remove('animate-neon-flash'), 1200);
      }
      openUrl(btn.dataset.launchUrl);
    });
  });

  // Drag and drop
  setupDragDrop();
}

function closeModal() {
  document.getElementById('modalOverlay')?.classList.add('hidden');
}

function handleAddTool(name, url, category = 'General') {
  const id = `custom-${Date.now()}`;
  let hostname = '';
  try { hostname = new URL(url).hostname; } catch (e) { /* ignore */ }
  state.customTools.push({
    id, name, url,
    description: 'Custom added tool',
    category,
    isCustom: true,
    icon: hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=64` : null,
  });
  state.toolOrder.push(id);
  saveSettings();
  render();
}

function handleDeleteTool(id) {
  if (state.selectedToolId === id) {
    state.selectedToolId = null;
    state.selectedToolUrl = null;
    state.selectedToolName = null;
  }
  state.customTools = state.customTools.filter(t => t.id !== id);
  state.toolOrder = state.toolOrder.filter(tid => tid !== id);
  delete state.enabledTools[id];
  saveSettings();
  render();
}

// ========== Drag & Drop ==========
let draggedId = null;

function setupDragDrop() {
  document.querySelectorAll('[data-drag-id]').forEach(handle => {
    handle.addEventListener('dragstart', (e) => {
      draggedId = handle.dataset.dragId;
      e.target.closest('.dash-tool')?.classList.add('dragging');
    });
    handle.addEventListener('dragend', () => {
      document.querySelectorAll('.dash-tool').forEach(item => item.classList.remove('dragging'));
      draggedId = null;
    });
  });

  document.querySelectorAll('.dash-tool').forEach(item => {
    item.addEventListener('dragover', (e) => e.preventDefault());
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      const targetId = item.dataset.toolId;
      if (draggedId && targetId && draggedId !== targetId) {
        const oldIdx = state.toolOrder.indexOf(draggedId);
        const newIdx = state.toolOrder.indexOf(targetId);
        if (oldIdx !== -1 && newIdx !== -1) {
          state.toolOrder.splice(oldIdx, 1);
          state.toolOrder.splice(newIdx, 0, draggedId);
          saveSettings();
          render();
        }
      }
    });
  });
}

// ========== Init ==========
async function init() {
  await loadSettings();
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
