function scrapePageContent() {
  const pageContent = document.body.innerText;
  chrome.runtime.sendMessage({ action: 'pageContentScraped', content: pageContent });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ELEMENT_CLICKED') {
    scrapePageContent();
    sendResponse({ success: true });
  }
});