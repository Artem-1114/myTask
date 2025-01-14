// Clock shows h hours, m minutes and s seconds after midnight.

// Your task is to write a function which returns the time since midnight in milliseconds.

function past(h, m, s) {
    const h1 = h * 60 * 60 * 1000
    const m1 = m * 60 * 1000
    const s1 = s * 1000
    return h1 + m1 +s1
}
past()

console.log(past(0, 1, 1))


// Can you find the needle in the haystack ?

//     Write a function findNeedle() that takes an array full of junk but containing one "needle"

// After your function finds the needle it should return a message(as a string) that says:

// "found the needle at position " plus the index it found the needle, so:

// Example(Input-- > Output)

function findNeedle(haystack) {
    index = haystack.indexOf("needle")

    if (index !== -1) {
        return `found the needle at position ${index}`
    } else {
        return "needle not found";
    }
}
// Very simple, given a number(integer / decimal / both depending on the language), find its opposite(additive inverse).

//     Examples:

function opposite(number) {
    if (number > 0) {
        return -Math.abs(number)
    } else {
        return Math.abs(number)
    }
}

opposite()
console.log(opposite(-3.14))
// Given a set of numbers, return the additive inverse of each.Each positive becomes negatives, and the negatives become positives.

function invert(array) {
    const arr = array.map(num => num * -1) // тут показує помилку
    return arr
}
invert([1, 2, 3, 4, 5])
console.log(invert())

// Остане завдання в консоль лог показує помилку на codewars прийняло і показало що все працює коректно в чому проблема ?