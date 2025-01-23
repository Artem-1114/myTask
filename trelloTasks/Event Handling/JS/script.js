
// const cloud = () => { 
//     const inputField = document.getElementById("name");
//     const tooltip = document.querySelector(".example");
//     function giveHint(input) {
//         if (!input.value) { 
//             tooltip.style.transform = "scale(1)";
//         }
//     }
//     function hideHint() {
//         tooltip.style.opacity = "0";
//         tooltip.style.transform = "scale(0.8)";
//     }
//     inputField.addEventListener("focus", () => giveHint(inputField));
//     inputField.addEventListener("input", hideHint);
//     inputField.addEventListener("blur", hideHint);

// }
// cloud();

// function validateName(name) {
//     const regex = /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]+$/;
//     return regex.test(name.trim());
// }
// function validateAndShow() {
//     const input = document.getElementById("name");
//     const error = document.getElementById("error-name");

//     if (!validateName(input.value)) {
//         input.classList.add("border");
//         error.classList.add("show");
//     } else {
//         input.classList.remove("border");
//         error.classList.remove("show");
//     }
// }
// document.getElementById("name").addEventListener("blur", validateAndShow);
// function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email.trim());
// }

// function validateAndShowEmail() {
//     const input = document.getElementById("email");
//     const error = document.getElementById("email-example");

//     if (!validateEmail(input.value)) {
//         input.classList.add("border");
//         error.classList.remove("show");
//     } else {
//         input.classList.remove("border");
//         error.classList.add("show");
//     }
// }

// document.getElementById("email").addEventListener("blur", validateAndShowEmail);

// function validatePassword(password) {
//     const passwordRegex = /^[a-zA-Z0-9]+$/;
//     return passwordRegex.test(password.trim());
// }

// function validateAndShowPassword() {
//     const input = document.getElementById("password");
//     const error = document.getElementById("error-password");

//     if (!validatePassword(input.value)) {
//         input.classList.add("border");
//         error.classList.add("show");
//     } else {
//         input.classList.remove("border");
//         error.classList.remove("show");
//     }
// }


// document.getElementById("password").addEventListener("blur", validateAndShowPassword);

// let button = document.getElementById("submit");
// button.addEventListener("click", function () {
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     if (validateName(name) && validateEmail(email) && validatePassword(password)) {
//         alert("Ви успішно зареєструвались");
//     } else {
//         alert("Помилка при реєстрації");
//     }
// });



document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");

    const validateName = (name) => /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]+$/.test(name.trim());
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const validatePassword = (password) => /^[a-zA-Z0-9]+$/.test(password.trim());

    const showError = (input, errorId, isError) => {
        const errorElement = document.getElementById(errorId);
        if (isError) {
            input.classList.add("border-error");
            errorElement.classList.add("show");
        } else {
            input.classList.remove("border-error");
            errorElement.classList.remove("show");
        }
    };

    const validateField = (input, validator, errorId) => {
        const isValid = validator(input.value);
        showError(input, errorId, !isValid);
        return isValid;
    };

    const handleInput = (event) => {
        const input = event.target;
        switch (input.id) {
            case "name":
                validateField(input, validateName, "error-name");
                break;
            case "email":
                validateField(input, validateEmail, "email-example");
                break;
            case "password":
                validateField(input, validatePassword, "error-password");
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const isNameValid = validateField(nameInput, validateName, "error-name");
        const isEmailValid = validateField(emailInput, validateEmail, "email-example");
        const isPasswordValid = validateField(passwordInput, validatePassword, "error-password");

        if (isNameValid && isEmailValid && isPasswordValid) {
            alert("Ви успішно зареєструвались");
        } else {
            alert("Помилка при реєстрації");
        }
    };

    const handleHint = () => {
        const nameInput = document.getElementById("name");
        const tooltip = document.querySelector(".example");

        nameInput.addEventListener("focus", () => {
            tooltip.style.transform = "scale(1)";
            tooltip.style.opacity = "1";
        });

        nameInput.addEventListener("blur", () => {
            tooltip.style.transform = "scale(0.8)";
            tooltip.style.opacity = "0";
        });
    };

    form.addEventListener("input", handleInput);
    form.addEventListener("submit", handleSubmit);
    handleHint();
});