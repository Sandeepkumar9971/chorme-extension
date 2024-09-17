console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  if (request.action === 'checkLanguage') {
    const language = analyzeHeadersAndContent(document);
    console.log('Language detected:', language);
    sendResponse({ language });
  } else {
    console.log('Unknown action:', request.action);
  }
  return true; // This line is crucial for asynchronous response handling
});

function analyzeHeadersAndContent(document) {
  console.log('Analyzing document for language...');
  const metaTags = document.getElementsByTagName('meta');
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute('name') === 'generator') {
      return metaTags[i].getAttribute('content');
    }
  }

  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src');
    if (src && src.includes('wp-includes')) {
      return 'WordPress';
    }
  }

  return 'Unknown';
}
