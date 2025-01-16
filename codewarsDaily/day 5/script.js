
// Create a function which answers the question "Are you playing banjo?".
// If your name starts with the letter "R" or lower case "r", you are playing banjo!

// The function takes a name as its only argument, and returns one of the following strings:

// name + " plays banjo"
// name + " does not play banjo"
// Names given are always valid strings.

function areYouPlayingBanjo(name) {
    const arr = name.split("")  // подивився відповіді інших гравців зрозумів що можна було і не переводити в строку в масив , а отримати значеня на пряму name[0]
    if (arr[0] === "R" || arr[0] === "r") {
        return name + " plays banjo" 
    } else {
        return name + " does not play banjo"
    }
}
console.log(areYouPlayingBanjo('Jon'))




// An isogram is a word that has no repeating letters, consecutive or non - consecutive.Implement a function that determines whether a string that contains only letters is an isogram.Assume the empty string is an isogram.Ignore letter case.

// Example: (Input-- > Output)

// "Dermatoglyphics" -- > true
// "aba" -- > false
// "moOse" -- > false(ignore letter case)
function isIsogram(str) {
    str = str.toLowerCase()
    const unicals = new Set(str)
    return unicals.size ===str.length
}



// У цьому маленькому завданні вам надається рядок чисел, розділених пробілами, і ви повинні повернути найбільше та найменше число.

//     Приклади
// highAndLow("1 2 3 4 5"); // return "5 1"
// highAndLow("1 2 -3 4 5"); // return "5 -3"
// highAndLow("1 9 3 4 -5"); // return "9 -5"
// Примітки
// Усі номери дійсні Int32, перевіряти їх не потрібно.
// У вхідному рядку завжди буде принаймні одне число.
// Вихідний рядок має складатися з двох чисел, розділених одним пробілом, причому першим є найвище число.

function highAndLow(numbers) {
    const numArr = numbers.split(' ').map(Number)
    const maxNum = Math.max(...numArr)
    const minNum = Math.min(...numArr)
    return `${maxNum} ${minNum}`
}

