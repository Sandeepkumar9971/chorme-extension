chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'pickColor') {
    document.body.style.cursor = 'crosshair';
    document.addEventListener('click', function handler(event) {
      const color = window.getComputedStyle(event.target).backgroundColor;
      chrome.runtime.sendMessage({ command: 'updateColor', color });
      document.body.style.cursor = 'default';
      document.removeEventListener('click', handler);
    });
  }
});
