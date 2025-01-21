
// The cockroach is one of the fastest insects.Write a function which takes its speed in km per hour and returns it in cm per second, rounded down to the integer(= floored).

// For example:

// 1.08 -- > 30
// Note! The input is a Real number(actual type is language dependent) and is >= 0. The result should be an Integer.
function cockroachSpeed(s) {
    const fast = s * (100000 / 3600)
    return Math.floor(fast)
}


// Write a function to convert a name into initials.This kata strictly takes two words with one space in between them.

// The output should be two capital letters with a dot separating them.

// It should look like this:

// Sam Harris => S.H

// patrick feeney => P.F
function abbrevName(name) {
    return name.split(' ')
        .map(word => word[0].toUpperCase())
        .join('.');

}
// You are given two interior angles(in degrees) of a triangle.

// Write a function to return the 3rd.

//     Note: only positive integers will be tested.

//         https://en.wikipedia.org/wiki/Triangle

function otherAngle(a, b) {
    let c = 180 - a - b
    return c
}


//Я не знаю задача про крокетний клуб Код працює вірно але його не проспускає чомусь , говрить якась помилка =(
function categorizeMembers(input) {
    return data.map(([age, handicap]) => {
        if (age >= 55 && handicap > 7) {
            return "Senior";
        } else {
            return "Open";
        }
    });
}

// You ask a small girl, "How old are you?" She always says, "x years old", where x is a random number between 0 and 9.

// Write a program that returns the girl's age (0-9) as an integer.

// Assume the test input string is always a valid string.For example, the test input may be "1 year old" or "5 years old".The first character in the string is always a number.
function getAge(inputString) {
    const num = inputString.match(/\d+/)[0];
    return Number(num);
}

// Complete the function that accepts a string parameter, and reverses each word in the string.All spaces in the string should be retained.

//     Examples
// "This is an example!" ==> "sihT si na !elpmaxe"
// "double  spaces" ==> "elbuod  secaps"
function reverseWords(str) {
    return str.split(' ')
        .map(word => word.split('').reverse().join(''))
        .join(' ');
}
