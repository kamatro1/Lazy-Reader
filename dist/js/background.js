(()=>{"use strict";chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0}).catch((function(e){return console.error(e)})),chrome.runtime.onInstalled.addListener((function(){chrome.runtime.openOptionsPage(),console.log("I just installed my chrome extension")})),chrome.runtime.onMessage.addListener((function(e,o,n){if("getResponse"===e.type){console.log("[Background] Getting response");var t=e.body,r=t.apiKey,a=t.model,i=t.responseType,s=t.content,l=t.format,c=t.readingLevel,d=t.length;console.log("[Background] API_KEY: "+r),console.log("[Background] Model: "+a),console.log("[Background] Response Type: "+i),console.log("[Background] Content: "+s),console.log("[Background] Format: "+l),console.log("[Background] Reading Level: "+c),console.log("[Background] Length: "+d),function(e,o,n,t,r,a,i,s){var l="";"summarization"===n?(l="Please provide a summary of the following text, which will be provided after the instructions, denoted by a ```. The summary should be written with clarity and conciseness. It should incorporate main ideas and essential information, eliminating extraneous language and focusing on critical aspects. Rely strictly on the provided text, without including external information. The summary format must be","bullet points"===r?l+=" in bullet points.":"paragraph"===r&&(l+=" in paragraph(s). Seperate different paragraphs with a new line."),l+="The summary should be written in the complexity and detailed required","beginner"===a?l+=" for a 5th grader.":"intermediate"===a?l+=" for a high schooler.":"advanced"===a&&(l+=" for a university graduate."),l+="The summary should have a length of approximately","concise"===i?l+=" 250 words.":"regular"===i?l+=" 500 words.":"detailed"===i&&(l+=" 1000 words. Use markdown headings to seperate different sections of the summary. Add a short 'tl;dr' section at the very end of the summary."),l+=" ```\n"):"questions"===n?l="Draft 3 reflection questions based on the following text: ":"terms"===n&&(l="Provide 5 key terms, along with their definition, from the following text: ");var c={model:o,messages:[{role:"user",content:l+t}]},d=JSON.stringify(c);fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:"Bearer "+e,"Content-Type":"application/json"},body:d}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw e.error&&"invalid_api_key"===e.error.code?new Error("Invalid API key. Please provide a valid OpenAI API key."):new Error("API request failed.")}))})).then((function(e){var o="No response";e.choices&&(o=e.choices[0].message.content),console.log("[Background] sending response: "+o),s({result:o})})).catch((function(e){console.log("error: "+e),s({result:e.message})}))}(r,a,i,s,l,c,d,n)}return!0})),console.log("[Background] Loaded script")})();