

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const selection = request.greeting[0];
    const splitText = request.greeting[1];
    console.log(selection);
    console.log(splitText);
    replaceSelection(selection, splitText);
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