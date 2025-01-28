// You will be given an array of numbers.You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

//     Examples
// [7, 1]  => [1, 7]
// [5, 8, 6, 3, 4]  => [3, 8, 6, 5, 4]
// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  => [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]

function sortArray(array) {
    oddArray = array.filter(item => item % 2 !== 0).sort((a, b) => a - b);
    
    let addIndex = 0;
    return array.map(item => item % 2 !== 0 ? oddArray[addIndex++] : item);

}
// Given an array of integers as strings and numbers, return the sum of the array values as if all were numbers.

// Return your answer as a number.
function sumMix(x) {
    num = x.map(Number);
    return num.reduce((a, b) => a + b);
}
// Implement a function which convert the given boolean value into its string representation.

//     Note: Only valid inputs will be given.
function booleanToString(b) {
    return b.toString();
}
// Ben has a very simple idea to make some profit: he buys something and sells it again.Of course, this wouldn't give him any profit at all if he was simply to buy and sell it at the same price. Instead, he's going to buy it for the lowest possible price and sell it at the highest.

//     Task
// Write a function that returns both the minimum and maximum number of the given list / array.
function minMax(arr) {
    return [Math.min(...arr), Math.max(...arr)];
}
// той випадок коли над першим завданям ламаєш голову і гугл як це можна реалізувати а інші завданя на 2-3 хвилини про остані 2 я взагалі мовчу але такі завданя теж іноді треба виконувати думаю))
