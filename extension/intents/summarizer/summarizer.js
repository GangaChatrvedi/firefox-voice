import * as intentRunner from "../../background/intentRunner.js";
import * as content from "../../background/content.js";
import * as browserUtil from "../../browserUtil.js";

intentRunner.registerIntent({
  name: "summarizer.summarize",
  async run(context) {
    const activeTab = await browserUtil.activeTab();
    await content.lazyInject(activeTab.id, [
      "/js/vendor/Readability.js",
      "/js/vendor/SummarizerManager/SummarizerManager.js",
      "/background/pageMetadata-contentScript.js",
      "/intents/summarizer/summarizeContentScript.js",
    ]);
    const {title, textContent} = await browser.tabs.sendMessage(activeTab.id, {
      type: "readText",
    });
//summarize text
    
  console.log("in intent")
  
  },
});

