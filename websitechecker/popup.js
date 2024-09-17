// popup.js

document.getElementById('checkButton').addEventListener('click', async () => {
    try {
        const tb = await chrome
        console.log(tb)
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: detectLanguages
      });
      console.log(results)
      const { languages, frameworks, tools } = results[0].result;
      const resultElement = document.getElementById('result');
      
      if (languages.length > 0 || frameworks.length > 0 || tools.length > 0) {
        resultElement.innerHTML = `
          Languages: ${languages.join(', ')}<br>
          Frameworks: ${frameworks.join(', ')}<br>
          Tools: ${tools.join(', ')}
        `;
      } else {
        resultElement.textContent = 'No programming languages, frameworks, or tools detected.';
      }
    } catch (error) {
      console.error('Error:', error.message);
      document.getElementById('result').textContent = 'Error: ' + error.message;
    }
  });
  
  function detectLanguages() {
    const languages = new Set();
    const frameworks = new Set();
    const tools = new Set();
    
    // Logic to detect languages, frameworks, and tools
    const metaTags = document.getElementsByTagName('meta');
    for (let i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute('name') === 'generator') {
            tools.add(metaTags[i].getAttribute('content'));
        }
    }
  
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const src = scripts[i].getAttribute('src');
        console.log(src)
        if (src && src.includes('react')) {
            frameworks.add('React');
        }
        // Add more frameworks/tools detection logic here as needed
    }
    
    return {
        languages: Array.from(languages),
        frameworks: Array.from(frameworks),
        tools: Array.from(tools)
    };
}
  