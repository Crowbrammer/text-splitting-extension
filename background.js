chrome.contextMenus.create({
   id:"split-it",
   title:"Split %s",
   contexts:["selection"]
});

function atActiveTab(message = {}, cb) {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, cb);
    });
}

// The Essay Splitter uses the ParagraphSplitter, so both are required. 

function splitText(textToSplit) {
   let tSplitter = new EssaySplitter(textToSplit);
   tSplitter.splitDeeplyEssay()
   return tSplitter.splitDeeplyEssayString;
}


class ParagraphSplitter {  
   #content;
   #splitContentArray;
   #splitContentString = '';
   constructor(content, shouldSplitParagraphNow, shouldStringifySplitParagraphsNow) {
       this.content = content;
       
       if (shouldSplitParagraphNow === true) {
       this.splitContent();
       }
       
       if (shouldStringifySplitParagraphsNow === true) {
       this. stringifySplitContent();
       }
   }

   get content() {
       return this.#content;
   }

   set content(_content) {
       this.#content = _content;
   }

   get splitContentArray() {
       return this.#splitContentArray;
   }

   get splitContentString() {
       return this.#splitContentString;
   }

   splitContent() {
       if (!this.content) {
       throw new Error('ParagraphSplitter requires content to split. 🤣')
       }
       let copyContent = `${this.content}`;
       copyContent = copyContent.replace('\n', ' ');
       this.#splitContentArray = copyContent.split('. ');
       
       for (let i = 0; i < this.#splitContentArray.length; i++) {
       const sentence = this.#splitContentArray[i];
       this.#splitContentArray[i] = sentence.trim() + '.';
       this.#splitContentArray[i] = this.#splitContentArray[i].replace('..', '.'); // This is inefficient...
       }
   }

   stringifySplitContent() {
       if (!this.#splitContentArray) {
       throw new Error('The content has not been split yet! 😂');
       }
       
       this.#splitContentArray.forEach(sentence => {
       this.#splitContentString += sentence + '\n\n';
       });
       
       // Get rid of the last \n\n
       this.#splitContentString = this.#splitContentString.slice(0,-2) ;
   }
}

class EssaySplitter {
   #content;
   #splitDeeplyEssayArray = [];
   #splitDeeplyEssayString = '';
   #splitEssayArray = [];
   #splitEssayString = '';
   constructor(content, breakEssayIntoArrayOfParagraphs) {
       this.#content = content;
       if (breakEssayIntoArrayOfParagraphs === true) {
           this.splitEssay();
       }
   }

   set content(_content) {
       this.#content = _content;
   }

   get content() {
       return this.#content;
   }

   get splitDeeplyEssayArray() {
       return this.#splitDeeplyEssayArray;
   }

   set splitDeeplyEssayArray(_splitDeeplyEssayArray) {
       this.#splitDeeplyEssayArray = _splitDeeplyEssayArray;
   }

   get splitDeeplyEssayString() {
       return this.#splitDeeplyEssayString;
   }

   set splitDeeplyEssayString(_splitDeeplyEssayString) {
       this.#splitDeeplyEssayString = _splitDeeplyEssayString;
   }

   set splitEssayArray(_splitEssayArray) {
       this.#splitEssayArray = _splitEssayArray;
   }

   get splitEssayArray() {
       return this.#splitEssayArray;
   }

   get splitEssayString() {
       return this.#splitEssayString;
   }

   set splitEssayString(_splitEssayString) {
       this.#splitEssayString = _splitEssayString;
   }

   splitDeeplyEssay() {
       if (!this.#content) {
           throw new Error('You need content before splitting 😂')
       }
       this.splitEssay();
       this.splitParagraphs();
       this.stringifySplitDeeplyEssay();
   }

   splitEssay() {
       if (!this.#content) {
           throw new Error('You need content before splitting 😂')
       }
       this.#splitEssayArray = this.#content.split('\n');
       for (let i = 0; i < this.#splitEssayArray.length; i++) {
           const paragraph = this.#splitEssayArray[i];
           this.#splitEssayArray[i] = paragraph.trim();
       }
       this.stringifySplitEssay();
   }

   splitParagraphs() {
       for (let i = 0; i < this.splitEssayArray.length; i++) {
           const paragraph = this.splitEssayArray[i];
           // Somehow a null gets in here;
           if (paragraph) {
               this.splitDeeplyEssayArray[i] = new ParagraphSplitter(paragraph, true, true).splitContentString;  
           }
       
       }
       
   }

   stringifySplitDeeplyEssay() {
       for (let i = 0; i < this.splitDeeplyEssayArray.length; i++) {
           const splitParagraph = this.splitDeeplyEssayArray[i];
           if (i === this.splitDeeplyEssayArray.length - 1) {
               this.splitDeeplyEssayString += splitParagraph;
           } else {
               this.splitDeeplyEssayString += splitParagraph + '\n\n - - - - - - \n\n';
           }
       }
   }

   stringifySplitEssay() {
       for (let i = 0; i < this.splitEssayArray.length; i++) {
           const paragraph = this.splitEssayArray[i];
           if (i === this.splitEssayArray.length - 1) {
               this.splitEssayString += paragraph;
           } else {
               this.splitEssayString += paragraph + '\n\n - - - - - - \n\n';
           }
       }
   }
}

chrome.contextMenus.onClicked.addListener(function(sel) {
   let message = {greeting: [sel.selectionText, splitText(sel.selectionText)]};
   atActiveTab(message);
});