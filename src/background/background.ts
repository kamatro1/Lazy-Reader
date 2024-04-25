chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
  console.log("I just installed my chrome extension")
})


/**
 * Sends a request to the OpenAI API to generate a response based on the provided parameters.
 *
 * @param {string} apiKey - The API key for authentication. Throws a detailed error if incorrect.
 * @param {string} model - The OpenAI model to use for generating the response. Allowed values: "gpt-4", "gpt-4-turbo", "gpt-3.5-turbo" (default).
 * @param {string} responseType - The type of response to generate. Allowed values: "summarization" (default), "questions", "terms".
 * @param {string} content - The selected/page text to be concatenated to the end of the prompt.
 * @param {string} format - The format of the generated response. Allowed values: "bullet points" (default), "paragraph".
 *                          Only applicable when responseType is "summarization".
 * @param {string} readingLevel - The reading level of the generated response. Allowed values: "beginner", "intermediate" (default), "advanced".
 *                                Only applicable when responseType is "summarization".
 * @param {string} length - The desired length of the generated response. Allowed values: "concise", "regular" (default), "detailed".
 *                          Only applicable when responseType is "summarization".
 * @param {function} sendResponse - The callback function to send the API response back to the caller.
 */
function getGPTResponse(apiKey: string, model: string, responseType: string, content: string, format: string, readingLevel: string, length: string, sendResponse: any) {
  let promptPrefix = "";

  if (responseType === "summarization") {
    promptPrefix = "Please provide a summary of the following text, which will be provided after the instructions, denoted by a ```."
      + " The summary should be written with clarity and conciseness."
      + " It should incorporate main ideas and essential information, eliminating extraneous language and focusing on critical aspects."
      + " Rely strictly on the provided text, without including external information."

      + " The summary format must be";
    if (format === "bullet points") {
      promptPrefix += " in bullet points.";
    } else if (format === "paragraph") {
      promptPrefix += " in paragraph(s). Seperate different paragraphs with a new line.";
    }

    promptPrefix += "The summary should be written in the complexity and detailed required";
    if (readingLevel === "beginner") {
      promptPrefix += " for a 5th grader.";
    } else if (readingLevel === "intermediate") {
      promptPrefix += " for a high schooler.";
    } else if (readingLevel === "advanced") {
      promptPrefix += " for a university graduate.";
    }

    promptPrefix += "The summary should have a length of approximately";
    if (length === "concise") {
      promptPrefix += " 250 words.";
    } else if (length === "regular") {
      promptPrefix += " 500 words.";
    } else if (length === "detailed") {
      promptPrefix += " 1000 words. Use markdown headings to seperate different sections of the summary. Add a short 'tl;dr' section at the very end of the summary.";
    }

    promptPrefix += " ```\n";
  } else if (responseType === "questions") {
    promptPrefix = "Draft 3 reflection questions based on the following text: ";
  } else if (responseType === "terms") {
    promptPrefix = "Provide 5 key terms, along with their definition, from the following text: ";
  }

  let data = {
    "model": model,
    "messages": [{ "role": "user", "content": promptPrefix + content }]
  };

  let requestBody = JSON.stringify(data);

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    body: requestBody
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errorData => {
          if (errorData.error && errorData.error.code === "invalid_api_key") {
            throw new Error("Invalid API key. Please provide a valid OpenAI API key.");
          } else {
            throw new Error("API request failed.");
          }
        });
      }
      return res.json();
    })
    .then((res) => {
      var result = "No response";
      if (res.choices) {
        result = res.choices[0].message.content;
      }
      console.log("[Background] sending response: " + result);
      sendResponse({ result: result });
    })
    .catch(err => {
      console.log("error: " + err);
      sendResponse({ result: err.message });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "getResponse") {
    console.log("[Background] Getting response");
    const { body } = request;
    const apiKey = body.apiKey;
    const model = body.model;
    const responseType = body.responseType;
    const format = body.format;
    const readingLevel = body.readingLevel;
    const length = body.length;
    // Retrieve the selected text from Chrome's local storage
    chrome.storage.local.get('selectedText', function(result) {
      const content = result.selectedText;
      console.log("[Background] API_KEY: " + apiKey);
      console.log("[Background] Model: " + model);
      console.log("[Background] Response Type: " + responseType);
      console.log("[Background] Content: " + content);
      console.log("[Background] Format: " + format);
      console.log("[Background] Reading Level: " + readingLevel);
      console.log("[Background] Length: " + length);
      getGPTResponse(apiKey, model, responseType, content, format, readingLevel, length, sendResponse);
    });
  }
  return true;
});

console.log("[Background] Loaded script");

chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item
  // See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#method-create
  chrome.contextMenus.create({
    id: 'captureSnippet', // Unique identifier for the context menu item
    title: 'Capture Snippet', // Text to be displayed in the context menu
    contexts: ['selection'], // Show the context menu item only when text is selected
  });
  
// Listen for the context menu click event
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log("[Background] Listening for onClicked");
    if (info.menuItemId === "captureSnippet") {
      console.log("[Background] Captured Snippet");
      const selectedText = info.selectionText;
      chrome.storage.local.set({ selectedText: selectedText });
    }
  });
});


export { };

