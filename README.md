# Overlay

**Version 1.0.2**

*AI, right where you work.*

Overlay is a Chrome extension that opens the AI site you choose in a dedicated floating window. Pick a **Quick Tool** once, then use a single keyboard shortcut to show, minimize, or restore that window from any tab—without hunting through your main browser tabs.

![Overlay](chrome-extension/icons/icon128.png)

---

## Overview

- Built-in shortcuts to popular AI sites (you can add your own links and reorder tools).
- One **overlay window** (~550×700 px) for your Quick Tool. Switching tools updates that same tab; the extension can remember the last URL per tool (same website) so you are more likely to land on the same conversation when you come back.
- Settings (tool list, order, accent color, Quick Tool selection) are stored **only on your device** using Chrome’s extension storage.

---

## Features

| Area | What it does |
|------|----------------|
| **Quick Tool** | In the toolbar popup, **click a tool row** to set or clear your Quick Tool. The first time you select or change it, the overlay opens; after that, use the global shortcut. |
| **Global shortcut** | **Alt+A** (Windows / Linux) or **Option+A** (Mac) toggles the overlay: show, minimize, or focus the window. |
| **Overlay** | Stays in one small window so tools do not open as extra tabs in your main Chrome window. |
| **Dashboard** | Optional full-page UI (opened from the popup) to manage tools and settings in a larger layout. |
| **Launch** | Optional per-row button opens a tool in a **separate** large window for a one-off preview; everyday use is the overlay + **Alt+A**. |

---

## Requirements

- **Google Chrome** (Manifest V3).
- For development installs, **Developer mode** on `chrome://extensions/`.

---

## Installation (load unpacked)

1. Clone or download this repository.
2. Open **`chrome://extensions/`**.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and choose the **`chrome-extension`** folder inside this project.

To install from the **Chrome Web Store** after publication, use the store listing page instead of these steps.

---

## Usage

1. Click the **Overlay** icon in the Chrome toolbar.
2. Click a tool in the list to set your **Quick Tool** (click the same row again to clear the selection).
3. Press **Alt+A** (or **Option+A** on Mac) from any webpage to open, minimize, or bring back the overlay.

**When the popup is open**, you can also use:

- **Ctrl+Shift+P** / **⌘⇧P** — toggle extension on/off (same as the power control in the UI).
- **Ctrl+Shift+L** / **⌘⇧L** — open the current Quick Tool in the overlay (same target as **Alt+A**).

Add custom tools from the popup, drag to reorder, and open **Settings** for accent color and shortcuts reference.

---

## Privacy

- Data stays **local** to your browser (extension storage). The developer does not receive your chats, prompts, or full browsing history through this extension.
- When you visit an AI site, that site’s own terms and privacy policy apply.
- Names and logos of third-party products (for example ChatGPT, Claude, Gemini) belong to their respective owners. **Overlay is not affiliated with, endorsed by, or sponsored by those services.**

A separate privacy policy document for store listings may live under `webstore-upload/PRIVACY_POLICY.md`—host it at a public HTTPS URL where the Chrome Web Developer Dashboard asks for it.

---

## Project layout

| Path | Role |
|------|------|
| `chrome-extension/` | Extension source: `manifest.json`, popup, dashboard, background service worker, styles, icons. |
| `webstore-upload/` | Store assets such as `PRIVACY_POLICY.md` and packaged **`Overlay-1.0.2.zip`** for upload (regenerate the zip after changing the extension). |

---

*Overlay v1.0.2 — Chrome extension*

rrgtregwr
