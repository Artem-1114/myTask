const inputName = document.getElementById("name")
const buttonName = document.getElementById("button__Name")

function clickButton() {
    const userName = inputName.value

    console.log(userName)
}
buttonName.addEventListener('click', clickButton)
//=============================================================================
const inputAge = document.getElementById("age__user")
const buttonAge = document.getElementById("button__Age")

function age() {
    const userAge = String(inputAge.value)
    console.log(typeof userAge)
}
buttonAge.addEventListener(`click`, age)
//========================================================================

let nam = 10
sum = nam + "20"
console.log(sum)
console.log(typeof nam)


