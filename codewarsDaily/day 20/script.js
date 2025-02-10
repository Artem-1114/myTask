
// You are given an odd - length array of integers, in which all of them are the same, except for one single number.

// Complete the method which accepts such an array, and returns that single different number.

// The input array will always be valid!(odd - length >= 3)
function stray(numbers) {
    return numbers.find(n => numbers.indexOf(n) === numbers.lastIndexOf(n));
}

// Given an array of integers, find the one that appears an odd number of times.

// There will always be only one integer that appears an odd number of times.
function findOdd(A) {
    for (let i = 0; i < A.length; i++) {
        let count = 0;
        for (let j = 0; j < A.length; j++) {
            if (A[i] === A[j]) {
                count++;
            }
        }
        if (count % 2 !== 0) {
            return A[i];
        }
    }
}
// ATM machines allow 4 or 6 digit PIN codes and PIN codes cannot contain anything but exactly 4 digits or exactly 6 digits.

// If the function is passed a valid PIN string, return true, else return false.
function validatePIN(pin) {
    if (pin.length === 4 || pin.length === 6) {
        return /^[0-9]{4}$|^[0-9]{6}$/.test(pin);
    }
    return false;
}
// Given the triangle of consecutive odd numbers:

// 1
// 3     5
// 7     9    11
// 13    15    17    19
// 21    23    25    27    29

function rowSumOddNumbers(n) {
    return Math.pow(n, 3); 
}


