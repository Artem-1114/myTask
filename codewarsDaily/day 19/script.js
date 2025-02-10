// Complete the method that takes a boolean value and return a "Yes" string for true, or a "No" string for false.
function boolToWord(bool) {
    if (bool === true) {
        return 'Yes'
    } else {
        return 'No'
    }
}
// In a factory a printer prints labels for boxes.For one kind of boxes the printer has to use colors which, for the sake of simplicity, are named with letters from a to m.

// The colors used by the printer are recorded in a control string.For example a "good" control string would be aaabbbbhaijjjm meaning that the printer used three times color a, four times color b, one time color h then one time color a...

// Sometimes there are problems: lack of colors, technical malfunction and a "bad" control string is produced e.g.aaaxbbbbyyhwawiwjjjwwm with letters not from a to m.

// You have to write a function printer_error which given a string will return the error rate of the printer as a string representing a rational whose numerator is the number of errors and the denominator the length of the control string.Don't reduce this fraction to a simpler expression.

// The string has a length greater or equal to one and contains only letters from ato z.

function printerError(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'm') {
            count++;
        }
    }
    return `${count}/${s.length}`
}
// Return an array, where the first element is the count of positives numbers and the second element is sum of negative numbers. 0 is neither positive nor negative.

// If the input is an empty array or is null, return an empty array.

//     Example
// For input[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15], you should return [10, -65].

function countPositivesSumNegatives(input) {
    if (input === null || input.length === 0) {
        return []
    } else {
        let positive = 0
        let negative = 0
        for (let i = 0; i < input.length; i++) {
            if (input[i] > 0) {
                positive++
            } else if (input[i] < 0) {
                negative += input[i]
            }
        }
        return [positive, negative]
    }
}

// We need a function that can transform a number(integer) into a string.

// What ways of achieving this do you know ?
function numberToString(num) {
    const string = String(num)
    return string
}
// This time no story, no theory.The examples below show you how to write function accum:

//     Examples:
// accum("abcd") -> "A-Bb-Ccc-Dddd"
// accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
// accum("cwAt") -> "C-Ww-Aaa-Tttt"

function accum(s) {
    let result = ''
    for (let i = 0; i < s.length; i++) {
        if (i > 0) {
            result += '-'
        }
        result += s[i].toUpperCase() + (s[i].toLowerCase()).repeat(i)
    } 
    return result
}
console.log(accum("ZpglnRxqenU"));