
// Take an array and remove every second element from the array.Always keep the first element and start removing with the next element.

//     Example:
// ["Keep", "Remove", "Keep", "Remove", "Keep", ...]-- > ["Keep", "Keep", "Keep", ...]

// None of the arrays will be empty, so you don't have to worry about that!

function removeEveryOther(arr) {
    return arr.filter((_,element) =>element % 2 === 0)
}


// Write a function that takes an array of numbers and returns the sum of the numbers.The numbers can be negative or non - integer.If the array does not contain any numbers then you should return 0.

// Examples
// Input: [1, 5.2, 4, 0, -1]
// Output: 9.2

// Input: []
// Output: 0

// Input: [-2.398]
// Output: -2.398

// Assumptions
// You can assume that you are only given numbers.
// You cannot assume the size of the array.
// You can assume that you do get an array and if the array is empty, return 0.
// What We're Testing
// We're testing basic loops and math operations. This is for beginners who are just learning loops and math operations.
// Advanced users may find this extremely easy and can easily write this in one line.
function sum(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
// Complete the function so that it finds the average of the three scores passed to it and returns the letter value associated with that grade.

// Numerical Score	Letter Grade
// 90 <= score <= 100	'A'
// 80 <= score < 90	'B'
// 70 <= score < 80	'C'
// 60 <= score < 70	'D'
// 0 <= score < 60	'F'
// Tested values are all between 0 and 100. Theres is no need to check for negative values or values greater than 100.

function getGrade(s1, s2, s3) {
    midSum = (s1 + s2 + s3) / 3;
    if (midSum >= 90) {
        return 'A';
    } else if (midSum >= 80 ){
        return 'B';
    } else if (midSum >= 70) {    
        return 'C';
    } else if (midSum >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

// You might know some pretty large perfect squares.But what about the NEXT one ?

//     Complete the findNextSquare method that finds the next integral perfect square after the one passed as a parameter.Recall that an integral perfect square is an integer n such that sqrt(n) is also an integer.

// If the argument is itself not a perfect square then return either - 1 or an empty value like None or null, depending on your language.You may assume the argument is non - negative.

//     Examples(Input-- > Output)
// 121 -- > 144
// 625 -- > 676
// 114 -- > -1  #  because 114 is not a perfect square
function findNextSquare(sq) {
    let square = Math.sqrt(sq);
    if (square % 1 === 0) {
        return (square +1 )* (square +1)
    }
    return -1;
}