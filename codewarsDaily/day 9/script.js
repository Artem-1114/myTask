// Build a function that returns an array of integers from n to 1 where n > 0.

// Example: n = 5 -- > [5, 4, 3, 2, 1]

const reverseSeq = n => {
    const array = Array.from({ length: n }, (_, i) => n - i);
    return array;
}
// Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 positive integers.No floats or non - positive integers will be passed.

// For example, when an array is passed like[19, 5, 42, 2, 77], the output should be 7.

// [10, 343445353, 3453445, 3453545353453] should return 3453455.
function sumTwoSmallestNumbers(numbers) {
    const smallest = numbers.sort((a, b) => a - b);
    return smallest[0] + smallest[1];
}
// When provided with a number between 0 - 9, return it in words.Note that the input is guaranteed to be within the range of 0 - 9.

// Input: 1

// Output: "One".

// If your language supports it, try using a switch statement.
function switchItUp(number) {
    if (number === 1) {
        return "One";
    } else if (number === 2) {
        return "Two";
    } else if (number === 3) {
        return "Three";
    } else if (number === 4) {
        return "Four";
    } else if (number === 5) {
        return "Five";
    } else if (number === 6) {
        return "Six";
    } else if (number === 7) {
        return "Seven";
    } else if (number === 8) {
        return "Eight";
    } else if (number === 9) {
        return "Nine";
    } else {
        return "Zero";
    }
}
// Bob needs a fast way to calculate the volume of a cuboid with three values: the length, width and height of the cuboid.Write a function to help Bob with this calculation.

class Kata {
    static getVolumeOfCuboid(length, width, height) {
        return length * width * height
    }
}
// You're writing code to control your town's traffic lights.You need a function to handle each change from green, to yellow, to red, and then to green again.

// Complete the function that takes a string as an argument representing the current state of the light and returns a string representing the state the light should change to.

// For example, when the input is green, output should be yellow.
function updateLight(current) {
    if (current === "green") {
        return "yellow";
    } else if (current === "yellow") {
        return "red";
    } else if (current === "red") {
        return "green";
    } else {
        return "error";
    }
}

