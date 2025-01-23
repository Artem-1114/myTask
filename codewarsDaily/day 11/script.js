
// The main idea is to count all the occurring characters in a string.If you have a string like aba, then the result should be { 'a': 2, 'b': 1 }.

// What if the string is empty ? Then the result should be empty object literal, {}.

function count(string) {
    const result = {};
    for (let i = 0; i < string.length; i++) {
        const key = `${string[i]}`;
        if (key in result) {
            result[key]++;
        } else {
            result[key] = 1;
        }
    }
    return result;
}

// Your task is to make a function that can take any non - negative integer as an argument and return it with its digits in descending order.Essentially, rearrange the digits to create the highest possible number.

//     Examples:
// Input: 42145 Output: 54421

// Input: 145263 Output: 654321

// Input: 123456789 Output: 987654321

function descendingOrder(n) {
    return Number(String(n).split('').sort().reverse().join(''));
}

// Make a program that filters a list of strings and returns a list with only your friends name in it.

// If a name has exactly 4 letters in it, you can be sure that it has to be a friend of yours! Otherwise, you can be sure he's not...

// Input = ["Ryan", "Kieran", "Jason", "Yous"]
// Output = ["Ryan", "Yous"]

// Input = ["Peter", "Stephen", "Joe"]
// Output = []
// Input strings will only contain letters.
//     Note: keep the original order of the names in the output.
function friend(friends) {
    return friends.filter(friend => friend.length === 4);
}

