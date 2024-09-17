// background.js

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: '1',
          priority: 1,
          action: { type: 'allow' },
          condition: { urlFilter: '*', resourceTypes: ['main_frame'] }
        }
      ],
      removeRuleIds: ['1']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error updating rules:', chrome.runtime.lastError.message);
      } else {
        console.log('Rules updated successfully.');
      }
    });
  });
  