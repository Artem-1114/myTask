// This code does not execute properly.Try to figure out why. 
// function multiply(a, b) {
//     a * b
// }
function multiply(a, b) {
    sum = a * b
    return sum
}


// Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.
function evenOrOdd(number) {
    if (number % 2 === 0) {
        return `Even`
    } else {
        return `Odd`

    }
}



// Trolls are attacking your comment section!

// A common way to deal with this situation is to remove all of the vowels from the trolls' comments, neutralizing the threat.

// Your task is to write a function that takes a string and return a new string with all vowels removed.

// For example, the string "This website is for losers LOL!" would become "Ths wbst s fr lsrs LL!".

//     Note: for this kata y isn't considered a vowel.
function disemvowel(str) {
    return str.replace(/[euioa]/gi, "") 
}

// Consider an array / list of sheep where some sheep may be missing from their place.We need a function that counts the number of sheep present in the array(true means present).

// For example,

//     [true, true, true, false,
//         true, true, true, true,
//         true, false, true, false,
//         true, false, false, true,
//         true, true, true, true,
//         false, false, true, true]
// The correct answer would be 17.

// Hint: Don't forget to check for bad values like null/undefined

function countSheeps(sheep) {
    const sumSheep = sheep.filter(sheep => sheep === true).length
    return sumSheep
}

// In this simple assignment you are given a number and have to make it negative.But maybe the number is already negative ?

//     Examples
// makeNegative(1);    // return -1
// makeNegative(-5);   // return -5
// makeNegative(0);    // return 0
// makeNegative(0.12); // return -0.12
// Notes
// The number can be negative already, in which case no change is required.
//     Zero(0) is not checked for any specific sign.Negative zeros make no mathematical sense.

function makeNegative(num) {
    if (num > 0) {
        return  num * -1
    } else {
        return num
    }
}
   

