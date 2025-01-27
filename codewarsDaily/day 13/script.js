
// Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.

// It should remove all values from list a, which are present in list b keeping their order.

//     arrayDiff([1, 2], [1]) == [2]
// If a value is present in b, all of its occurrences must be removed from the other:

// arrayDiff([1, 2, 2, 2, 3], [2]) == [1, 3]
function arrayDiff(a, b) {
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] === b[j]) {
                a.splice(i, 1);
                i--;
            }
        }
    }
    return a;
}
// Code as fast as you can! You need to double the integer and return it.     
function doubleInteger(i) {
    i *= 2;
    return i;
}


// Timmy & Sarah think they are in love, but around where they live, they will only know once they pick a flower each.If one of the flowers has an even number of petals and the other has an odd number of petals it means they are in love.

// Write a function that will take the number of petals of each flower and return true if they are in love and false if they aren't.
function lovefunc(flower1, flower2) {
    if (flower1 % 2 === 0 && flower2 % 2 !== 0 || flower1 % 2 !== 0 && flower2 % 2 === 0) {
        return true
    }
    else {
        return false
    }
        
}
// Your task is to sort a given string.Each word in the string will contain a single number.This number is the position the word should have in the result.

//     Note: Numbers can be from 1 to 9. So 1 will be the first word(not 0).

// If the input string is empty, return an empty string.The words in the input String will only contain valid consecutive numbers.
function order(words) {
    return words.split(' ').sort((a, b) => a.match(/\d/)[0] - b.match(/\d/)[0]).join(' ');
}