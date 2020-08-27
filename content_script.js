

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.greeting[0]);
    console.log(request.greeting[1]);
  
  // console.log(sender.tab ?
  //             "from a content script:" + sender.tab.url :
  //             "from the extension");
  // if (request.greeting == "hello")
  //   sendResponse({farewell: "goodbye"});
});

/**
 * Belief-driven development. Most important belief in mind, hold that until I make the right code happen. 
 * The greeting will be an array. The first element is the selection. The second element is the split text.
 * String replace to handle the specifics. 
 * I'm going to use a bundler to transpile it to a single script.
 **/

function replaceSelection(selection, replaceValue) {
  let str = document.activeElement.value;
  str = str.replace(selection, replaceValue); // Should use TS for this. 
  document.activeElement.value = str;
}