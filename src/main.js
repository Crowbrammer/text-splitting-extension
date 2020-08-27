function splitText(textToSplit) {
    let tSplitter = new EssaySplitter(textToSplit);
    tSplitter.splitDeeplyEssay()
    return tSplitter.splitDeeplyEssayString;
}

// This will be pasted directly where the selection was.