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
 * @param {string} model - The OpenAI model to use for generating the response. Allowed values: "gpt-4-turbo" or "gpt-3.5-turbo" (default).
 * @param {string} responseType - The type of response to generate. Allowed values: "summarization" (default), "questions", "terms".
 * @param {string} content - The selected/page text to be concatenated to the end of the prompt.
 * @param {string} format - The format of the generated response. Allowed values: "bullet points" (default), "paragraph".
 *                          Only applicable when responseType is "summarization".
 * @param {string} readingLevel - The reading level of the generated response. Allowed values: "beginner", "intermediate" (default), "advanced".
 *                                Only applicable when responseType is "summarization".
 * @param {string} length - The desired length of the generated response. Allowed values: "s", "m" (default), "l".
 *                          Only applicable when responseType is "summarization".
 * @param {function} sendResponse - The callback function to send the API response back to the caller.
 */
function getGPTResponse(apiKey: string, model: string, responseType: string, content: string, format: string, readingLevel: string, length: string, sendResponse: any) {
let promptPrefix = "";

if (responseType === "summarization") {
  promptPrefix = "Task: Summarize the text provided after the triple backticks (```). Follow these guidelines:"
    + "\n- Identify and extract the main ideas, key points, and essential information from the text."
    + "\n- Synthesize the content into a concise and coherent summary, maintaining the original meaning and context."
    + "\n- Use clear, concise, and easy-to-understand language, avoiding jargon or complex terminology."
    + "\n- Organize the summary logically, ensuring a smooth flow of information and coherence between points."
    + "\n- Retain the objectivity of the original text, without introducing personal opinions or biases."
    + "\n\nSummary Format:"
    + "\n- Present the summary";
  if (format === "bullet points") {
    promptPrefix += " as a well-structured list of bullet points."
      + "\n- Each bullet point should represent a key idea or topic from the text."
      + "\n- Use concise and informative phrases or sentences for each bullet point."
      + "\n- Maintain a parallel structure and consistent level of detail across all bullet points.";
  } else if (format === "paragraph") {
    promptPrefix += " in well-organized paragraphs."
      + "\n- Begin with a topic sentence that introduces the main idea of each paragraph."
      + "\n- Follow the topic sentence with supporting details, examples, or explanations."
      + "\n- Use transitional words or phrases to ensure smooth flow and logical connection between paragraphs."
      + "\n- Conclude the summary with a paragraph that ties together the main points and provides a final overview.";
  }
  promptPrefix += "\n\nReading Level: Tailor the summary to a";
  if (readingLevel === "beginner") {
    promptPrefix += " 5th-grade reading level."
      + "\n- Use simple vocabulary and short, straightforward sentences."
      + "\n- Explain any complex concepts or terms in a way that is easily understandable for young readers."
      + "\n- Focus on the most essential information and avoid unnecessary details or abstractions.";
  } else if (readingLevel === "intermediate") {
    promptPrefix += " high school reading level."
      + "\n- Use clear, accessible language that is appropriate for a general audience."
      + "\n- Provide sufficient context and explanations to ensure comprehension of the main ideas."
      + "\n- Strike a balance between simplicity and depth, considering the reader's expected level of knowledge.";
  } else if (readingLevel === "advanced") {
    promptPrefix += " university graduate level."
      + "\n- Use precise, academic language and sophisticated vocabulary appropriate for a well-educated audience."
      + "\n- Engage with complex ideas, theories, or arguments presented in the text."
      + "\n- Provide nuanced explanations and insights, demonstrating a deep understanding of the subject matter.";
  }
  promptPrefix += "\n\nSummary Length:";
  if (length === "concise") {
    promptPrefix += " Create a concise summary that captures the essence of the text."
      + "\n- Focus on the most critical points and main takeaways."
      + "\n- Omit minor details, examples, or peripheral information."
      + "\n- Aim for a word count of approximately 100-150 words.";
  } else if (length === "regular") {
    promptPrefix += " Develop a balanced and informative summary of the text."
      + "\n- Include the main ideas, key supporting points, and relevant details."
      + "\n- Provide sufficient context and explanations to ensure a comprehensive understanding."
      + "\n- Aim for a word count of approximately 250-300 words.";
  } else if (length === "detailed") {
    promptPrefix += " Craft a detailed and thorough summary that covers all significant aspects of the text."
      + "\n- Discuss each main idea in depth, providing extensive supporting details and examples."
      + "\n- Explore the nuances, implications, and connections between different concepts or arguments."
      + "\n- Use markdown headings to organize the summary into logical sections or themes."
      + "\n- Include a 'TL;DR' (Too Long; Didn't Read) section at the end, summarizing the key points in 1-2 concise paragraphs."
      + "\n- Aim for a word count of approximately 500-700 words.";
  }
  promptPrefix += "\n\nText to summarize: ```\n";

} else if (responseType === "questions") {
  promptPrefix = "Task: Generate 3 thought-provoking reflection questions based on the provided text."
    + "\n\nGuidelines:"
    + "\n- Craft open-ended questions that stimulate critical thinking, analysis, and personal reflection."
    + "\n- Encourage readers to explore the deeper meanings, implications, or applications of the text."
    + "\n- Avoid questions that can be answered superficially or by simply restating information from the text."
    + "\n- Use clear, concise, and engaging language that invites thoughtful responses."
    + "\n\nQuestion Types:"
    + "\n- Conceptual Questions: Focus on the key concepts, theories, or ideas presented in the text."
    + "\n  - Example: How does the author's theory of [concept] challenge conventional understanding of [related topic]?"
    + "\n- Analytical Questions: Encourage readers to examine the text critically and draw their own conclusions."
    + "\n  - Example: What are the strengths and limitations of the evidence presented in support of [argument]?"
    + "\n- Reflective Questions: Prompt readers to relate the text to their own experiences, beliefs, or values."
    + "\n  - Example: How has your perspective on [issue] evolved after reading this text, and why?"
    + "\n\nText: ";

} else if (responseType === "terms") {
  promptPrefix = "Task: Identify and define 5 key terms or concepts from the given text."
    + "\n\nInstructions:"
    + "\n- Select terms that are central to understanding the main ideas, arguments, or themes of the text."
    + "\n- Choose terms that are specific, significant, and likely to be unfamiliar to readers."
    + "\n- Provide clear, accurate, and concise definitions that capture the essence of each term."
    + "\n- Use simple language and relatable examples to make the definitions accessible to a general audience."
    + "\n- Format each term and its definition as follows:"
    + "\n  - Term: [Term]"
    + "\n    Definition: [Definition]"
    + "\n- Ensure that the definitions are self-contained and can be understood independently of the text."
    + "\n\nText: ";
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
        // Parsing the error JSON to get detailed error message from OpenAI
        return res.json().then(errorData => {
          // Building a detailed error message based on OpenAI's response
          let errorMessage = errorData.error && errorData.error.message ? errorData.error.message : "Unknown error occurred.";
          if (errorData.error && errorData.error.code) {
            errorMessage += ` (Error Code: ${errorData.error.code})`;
          }
          throw new Error(errorMessage); // Throwing an error to be caught in the catch block
        });
      }
      return res.json();
    })
    .then((res) => {
      var result = "No response";
      if (res.choices && res.choices.length > 0) {
        result = res.choices[0].message.content;
      }
      console.log("[Background] sending response: " + result);
      sendResponse({ result: result });
    })
    .catch(err => {
      console.error("API error: " + err.message);
      sendResponse({ error: err.message }); // Sending the error message directly as received from the catch block
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
    //chrome.storage.local.get('selectedText', function(result) {
      chrome.storage.local.get('selectedText', function(result) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          sendResponse({ result: "Error retrieving selected text." });
          return;
        }
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

