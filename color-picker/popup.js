document.addEventListener('DOMContentLoaded', function () {
  const pickColorButton = document.getElementById('pickColorButton');
  const resultElement = document.getElementById('result');

  pickColorButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'pickColor' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Could not send message to content script:", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent to content script:", response);
        }
      });
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'updateColor') {
      const { color } = request;
      resultElement.style.backgroundColor = color;
      resultElement.textContent = `Color: ${color}`;
    }
  });

  // Retrieve and update the color from storage if previously set
  chrome.runtime.sendMessage({ command: 'getColor' }, (response) => {
    if (response && response.color) {
      resultElement.style.backgroundColor = response.color;
      resultElement.textContent = `Color: ${response.color}`;
    } else {
      resultElement.textContent = 'No color stored.';
    }
  });
});
