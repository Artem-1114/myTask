// Write Number in Expanded Form
// You will be given a number and you will need to return it as a string in Expanded Form.For example:

// 12 -- > "10 + 2"
// 45 -- > "40 + 5"
// 70304 -- > "70000 + 300 + 4"
// NOTE: All numbers will be whole numbers greater than 0.

function expandedForm(num) {
    return num.toString().split('')
        .map((digit, index, arr) => {
            const placeValue = digit * Math.pow(10, arr.length - index - 1);
            return placeValue; 
        }).filter(value => value > 0) .join(' + '); 
}

// Complete the square sum function so that it squares each number passed into it and then sums the results together.

// For example, for [1, 2, 2] it should return 9 because

function squareSum(numbers) {
    return numbers.reduce((acc, num) => acc + num * num, 0);
}

// You are going to be given a non - empty string.Your job is to return the middle character(s) of the string.

// If the string's length is odd, return the middle character.
// If the string's length is even, return the middle 2 characters.
function getMiddle(s) {
    const middleIndex = Math.floor(s.length / 2);
    if (s.length % 2 === 0) {
        return s.slice(middleIndex - 1, middleIndex + 1);
    } else {
        return s[middleIndex];
    }
}

   