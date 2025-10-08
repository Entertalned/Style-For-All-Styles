const button = document.getElementById('toggleBtn');
let injected = false;

button.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab) return;

  if (!injected) {
    try {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['custom-style.css']
      });
      injected = true;
      button.textContent = "Remove CSS";
      console.log("CSS injected");
    } catch (e) {
      console.error("Failed to inject CSS:", e);
    }
  } else {
    try {
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ['custom-style.css']
      });
      injected = false;
      button.textContent = "Toggle CSS";
      console.log("CSS removed");
    } catch (e) {
      console.error("Failed to remove CSS:", e);
    }
  }
});
