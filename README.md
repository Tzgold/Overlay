# Overlay

**Version 1.0.2** · **AI, right where you work.**

Overlay is a Chrome extension that opens your chosen AI sites (ChatGPT, Claude, Gemini, DeepSeek, and more) in a small floating window—toggle it with a keyboard shortcut so you stay in flow.

![Overlay Logo](chrome-extension/icons/icon128.png)

## Features

- **Quick Tool**: Click a **tool row** in the extension popup to set your Quick Tool (click again to clear). The first pick or switch opens it in the overlay; after that, use the shortcut.
- **Shortcut**: **`Alt+A`** (Windows / Linux) or **`⌥+A`** (Mac) toggles the overlay—show, minimize, or bring it back.
- **Overlay window**: One compact window (`550×700`); switching tools navigates that same tab. Last page URL per tool is remembered when possible (same site), so you can return to a thread instead of always landing on the home page.
- **Optional dashboard**: Open the full dashboard from the popup to manage tools and settings in a larger UI.
- **Local settings**: Tool order, accent color, Quick Tool choice, and saved URLs stay in Chrome’s local storage on your device.

## Installation

1. Download or clone this repository.
2. Open Chrome → `chrome://extensions/`.
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the **`chrome-extension`** folder in this project.

## Usage

1. Click the **Overlay** icon in the toolbar.
2. **Click a tool** in the list to set it as your Quick Tool (or click the same row again to clear).
3. Press **`Alt+A`** / **`⌥+A`** from any tab to show or hide the overlay.

**Tip:** Use the **Launch** button on a row only if you want a separate large preview window; day-to-day Quick Tool behavior uses the single overlay + shortcut.

## Privacy

- The extension runs locally; settings are stored with `chrome.storage` on your machine.
- It does not send your chats or browsing history to the extension author. When you open an AI site, your relationship is with that website’s terms and privacy policy.
- Third-party names (e.g. ChatGPT, Claude) belong to their owners; Overlay is not affiliated with those services.

---

*Overlay • v1.0.2*
