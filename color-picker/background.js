chrome.runtime.onInstalled.addListener(() => {
    console.log('Color Picker Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'updateColor') {
      chrome.storage.local.set({ color: request.color }, () => {
        sendResponse({ message: 'Color updated successfully' });
      });
      return true; // to indicate that sendResponse will be called asynchronously
    } else if (request.command === 'getColor') {
      chrome.storage.local.get('color', (data) => {
        sendResponse({ color: data.color });
      });
      return true; // to indicate that sendResponse will be called asynchronously
    }
  });
  