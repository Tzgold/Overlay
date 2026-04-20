# Overlay — Privacy Policy

**Last updated:** April 20, 2026

This policy describes how the **Overlay** Chrome extension (“Extension”) handles information. The Extension is developed to help you open websites you choose (for example, AI tools) in a separate small browser window.

## What the Extension does

- You select which site to use as your “Quick Tool” and may add custom links.
- The Extension can open that site in a dedicated window and remember your preferences on your device.

## Data storage (on your computer only)

The Extension stores data **locally in your browser** using Chrome’s `chrome.storage` APIs. This may include:

- Your settings (for example, which tool is selected, order of tools, accent color).
- The last URL you had open per tool (so returning to a tool can restore the same page when the site uses normal web addresses).
- The current Quick Tool state used to control whether the overlay window is shown, minimized, focused, or reopened.

**We do not operate servers for this Extension.** We do not receive this data. The developer does not collect, transmit, or sell your browsing history, prompts, or messages from third-party sites.

## Permissions (why they are needed)

| Permission   | Purpose |
|-------------|---------|
| **storage** | Save your settings and last URLs locally. |
| **notifications** | Show simple messages when the Extension is off or no Quick Tool is selected (for example, when using the keyboard shortcut). |
| **tabs**    | Update or activate the tab inside the Extension’s overlay window when you switch tools or restore a saved URL, and focus it without forced reload during shortcut toggles. |
| **windows** | Create, focus, minimize, and position the small overlay window. |

## Third-party websites

When you open a site (for example, an AI service), your use of that site is governed by **that site’s** terms and privacy policy. The Extension does not inject scripts into those pages to read your conversations.

## Contact

For privacy questions about this Extension, contact the publisher through the contact information on the Chrome Web Store listing.

## Changes

We may update this policy if the Extension’s behavior changes. The “Last updated” date will be revised when that happens.

---

*Third-party names and logos (such as ChatGPT, Claude, Gemini) belong to their owners. Overlay is not affiliated with or endorsed by those services.*
