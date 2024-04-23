chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  console.log("I just installed my chrome extension")
}); 

function sendMessageToContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const activeTabId = tabs[0].id;
      chrome.tabs.sendMessage(activeTabId, { type: 'ELEMENT_CLICKED' }, function (response) {
        if (response && response.success) {
          const pageText = response.text;
          // Send the page text to the ChatGPT API for summarization
          // ...
        }
      });
    }
  });
}
export {};