//get selected text from the local storage 
chrome.storage.local.get("selectedText", function(data) {
    const selectedText = data.selectedText;
  });