
// Given a random non - negative number, you have to return the digits of this number within an array in reverse order.

function digitize(n) {
    return n.toString().split('').map(Number).reverse()
}
console.log(digitize(348597))


// There was a test in your class and you passed it.Congratulations!

// But you're an ambitious person. You want to know if you're better than the average student in your class.

// You receive an array with your peers' test scores. Now calculate the average and compare your score!

// Return true if you're better, else false!

// Note:
// Your points are not included in the array of your class's points. Do not forget them when calculating the average score!

function betterThanAverage(classPoints, yourPoints) {
    const sumClass = classPoints.reduce((total, index) => total + index) 
    const midlPointsClass = sumClass / classPoints.length
    const allPoints = midlPointsClass + yourPoints
    if (yourPoints > midlPointsClass) {
        return true
    } else {
        return false
    }
 
}



// It's pretty straightforward. Your goal is to create a function that removes the first and last characters of a string. You're given one parameter, the original string.You don't have to worry about strings with less than two characters.
function removeChar(str) {
    const some = str.slice(1, -1)
    return some
};


