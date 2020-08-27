chrome.contextMenus.create({
   id:"split-it",
   title:"Split %s",
   contexts:["selection"]
});

// I can send something to the screen when click the context button.

chrome.contextMenus.onClicked.addListener(function(sel) {
      let message = {greeting: [sel.selectionText, 'howdy']};
      atActiveTab(message);
});

// chrome.contextMenus.onClicked.addListener(function(sel){
//    let message = {greeting: 'hello'};
//    let cb = function(response) {
//       console.log(response.farewell);
//     }
//    atActiveTab(message, cb);
//    // console.log(sel);
//    // console.log(sel.selectionText);
// });

// chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//      console.log(sender.tab ?
//                  "from a content script:" + sender.tab.url :
//                  "from the extension");
//      if (request.greeting == "hello")
//        sendResponse({farewell: "goodbye"});
// });

function atActiveTab(message = {}, cb) {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, cb);
    });
}