
// Write a function that removes the spaces from the string, then return the resultant string.
function noSpace(x) {
    return x.replace(/\s/g, '');
}
// Given a string of words, you need to find the highest scoring word.
// Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.
// For example, the score of abad is 8(1 + 2 + 1 + 4).
// You need to return the highest scoring word as a string.
// If two words score the same, return the word that appears earliest in the original string.
// All letters will be lowercase and all inputs will be valid.
function high(x) {
    let arr = x.split(' ');
    let maxScore = 0;
    let maxIndex = 0;

    arr.forEach((element, index) => {
        let score = 0;
        for (let i = 0; i < element.length; i++) {
            score += element.charCodeAt(i) - 96;
        }
        if (score > maxScore) {
            maxScore = score;
            maxIndex = index;
        }
    });

    return arr[maxIndex];
}

        
   


    
