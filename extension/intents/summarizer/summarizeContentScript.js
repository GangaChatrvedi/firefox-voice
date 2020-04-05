/* globals communicate, Readability, pageMetadataContentScript, screenshotContentScript */

this.summarizeContentScript = (function() {
  communicate.register("readText", async message => {
    const documentClone = document.cloneNode(true); 
    const article = new Readability(documentClone).parse();
    let title = article['title'];
    let textContent = article['textContent'];  
    return {title, textContent};   
  }); 

})();
