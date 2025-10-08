const toggle = document.getElementById('toggleSwitch');

// Restore previous toggle state
chrome.storage.local.get('lavenderRainEnabled', (data) => {
  toggle.checked = !!data.lavenderRainEnabled;
});

// Handle toggle clicks
toggle.addEventListener('change', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;

  if (toggle.checked) {
    try {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['custom-style-1.css']  // ✅ correct filename
      });
      chrome.storage.local.set({ lavenderRainEnabled: true });
      console.log("Lavender Rain ON");
    } catch (err) {
      console.error("Failed to insert CSS:", err);
    }
  } else {
    try {
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ['custom-style-1.css']  // ✅ must match exactly
      });
      chrome.storage.local.set({ lavenderRainEnabled: false });
      console.log("Lavender Rain OFF");
    } catch (err) {
      console.error("Failed to remove CSS:", err);
    }
  }
});
