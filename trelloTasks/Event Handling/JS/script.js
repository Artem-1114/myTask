
const cloud = () => { 
    const inputField = document.getElementById("name");
    const tooltip = document.querySelector(".example");
    function giveHint(input) {
        if (!input.value) { 
            tooltip.style.transform = "scale(1)";
        }
    }
    function hideHint() {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "scale(0.8)";
    }
    inputField.addEventListener("focus", () => giveHint(inputField));
    inputField.addEventListener("input", hideHint);
    inputField.addEventListener("blur", hideHint);

}
cloud();

function validateName(name) {
    const regex = /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]+$/;
    return regex.test(name.trim());
}
function validateAndShow() {
    const input = document.getElementById("name");
    const error = document.getElementById("error-name");

    if (!validateName(input.value)) {
        input.classList.add("border");
        error.classList.add("show");
    } else {
        input.classList.remove("border");
        error.classList.remove("show");
    }
}
document.getElementById("name").addEventListener("blur", validateAndShow);
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateAndShowEmail() {
    const input = document.getElementById("email");
    const error = document.getElementById("email-example");

    if (!validateEmail(input.value)) {
        input.classList.add("border");
        error.classList.remove("show");
    } else {
        input.classList.remove("border");
        error.classList.add("show");
    }
}

document.getElementById("email").addEventListener("blur", validateAndShowEmail);

function validatePassword(password) {
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    return passwordRegex.test(password.trim());
}

function validateAndShowPassword() {
    const input = document.getElementById("password");
    const error = document.getElementById("error-password");

    if (!validatePassword(input.value)) {
        input.classList.add("border");
        error.classList.add("show");
    } else {
        input.classList.remove("border");
        error.classList.remove("show");
    }
}


document.getElementById("password").addEventListener("blur", validateAndShowPassword);

let button = document.getElementById("submit");
button.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (validateName(name) && validateEmail(email) && validatePassword(password)) {
        alert("Ви успішно зареєструвались");
    } else {
        alert("Помилка при реєстрації");
    }
});
