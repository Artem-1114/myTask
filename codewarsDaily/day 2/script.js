
// Rock Paper Scissors
// Let's play! You have to return which player won! In case of a draw return Draw!.

// Examples(Input1, Input2 --> Output):
// "scissors", "paper" -- > "Player 1 won!"
// "scissors", "rock" -- > "Player 2 won!"
// "paper", "paper" -- > "Draw!"

const rps = (p1, p2) => {
    if (p1 == p2)
        return 'Draw!';

    if (p1 == 'rock' && p2 == 'scissors')
        return 'Player 1 won!'
    else if (p1 == 'scissors' && p2 == 'paper')
        return 'Player 1 won!'
    else if (p1 == 'paper' && p2 == 'rock')
        return 'Player 1 won!'
    else
        return 'Player 2 won!';
}

// Your task is to create a function that does four basic mathematical operations.

// The function should take three arguments - operation(string / char), value1(number), value2(number).
// The function should return result of numbers after applying the chosen operation.

//     Examples(Operator, value1, value2)-- > output

// ('+', 4, 7)-- > 11
//     ('-', 15, 18)-- > -3
//         ('*', 5, 5)-- > 25
//             ('/', 49, 7)-- > 7


function basicOp(operation, value1, value2) {
    if (operation === "+") {
        return value1 + value2
    } else if (operation === "-") {
        return value1 - value2
    } else if (operation === "*") {
        return value1 * value2
    } else if (operation === "/") {
        return value1 / value2
    } else
        return "Invalid operation"
}

console.log(basicOp('+', 5, 3));

// Given an array of integers, return a new array with each value doubled.

// For example:

// [1, 2, 3]-- > [2, 4, 6]
function maps(x) {
    return x.map(i => i * 2)
}
console.log(maps([1, 2, 3]));