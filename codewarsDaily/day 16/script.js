
// The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string.Ignore capitalization when determining if a character is a duplicate.

function duplicateEncode(word) {
    word = word.toLowerCase();// тут я приводил к нижнему регистру

    let sum = new Map();// створив новий мап щоб потім можна було порахувати кількість повторень

    for (let i = 0; i < word.length; i++) {
        if (sum.has(word[i])) {// перевіряю чи є символ у мап
            sum.set(word[i], sum.get(word[i]) + 1);// якщо є Set  то дадаю його і прибавляю 1 get - отримую значення
        } else {
            sum.set(word[i], 1);// якщо ні то додаю в мап 1
        }
    }
    let result = '';// створив рядок
    for (let i = 0; i < word.length; i++) {
        if (sum.get(word[i]) > 1) {
            result += ')';
        } else {
            result += '(';
        }
    }
    return result;
}
// In DNA strings, symbols "A" and "T" are complements of each other, as "C" and "G".Your function receives one side of the DNA(string, except for Haskell); you need to return the other complementary side.DNA strand is never empty or there is no DNA at all(again, except for Haskell).

// More similar exercise are found here: http://rosalind.info/problems/list-view/ (source)

// Example: (input-- > output)

// "ATTGC" -- > "TAACG"
// "GTAT" -- > "CATA"
function dnaStrand(dna) {
    dna = dna.toUpperCase();

    let result = '';
    for (let i = 0; i < dna.length; i++) {
        if (dna[i] === 'A') {
            result += 'T';
        } else if (dna[i] === 'T') {
            result += 'A';
        } else if (dna[i] === 'C') {
            result += 'G';
        } else if (dna[i] === 'G') {
            result += 'C';
        }
    }
    return result;
}
// There is an array with some numbers.All numbers are equal except for one.Try to find it!

// findUniq([1, 1, 1, 2, 1, 1]) === 2
// findUniq([0, 0, 0.55, 0, 0]) === 0.55
// It’s guaranteed that array contains at least 3 numbers.

// The tests contain some very huge arrays, so think about performance.

// This is the first kata in series:

function findUniq(arr) {
    arr.sort((a, b) => a - b);
    if (arr[0] === arr[1]) {
        return arr[arr.length - 1];
    } else {
        return arr[0];
    }
}

        
   


    
