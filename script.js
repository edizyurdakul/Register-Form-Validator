const form = document.getElementById('form-validator');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password-2');

function displayError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error"
    const small = formControl.querySelector('small');
    small.innerText = message
}
function displaySuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}
function checkEmail(input) {
    const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validation.test(input.value.trim())) {
        displaySuccess(input)
    } else {
        displayError(input, 'Email is not valid')
    }
}
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === "") {
            displayError(input, `${getFieldName(input)} is required`)

        } else {
            displaySuccess(input)
        }
    });
}
function checkPassword(pass, pass2) {
    if (pass.value !== pass2.value) {
        displayError(pass2, 'Password does not match')
    }
}
function checkLength(input, min, max) {
    if (input.value.length < min) {
        displayError(input, `${getFieldName(input)} must be atleast ${min}`)

    } else if (input.value.length > max) {
        displayError(input, `${getFieldName(input)} must be less then ${max}`)

    } else {
        displaySuccess(input)
    }
}
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2])
    checkPassword(password, password2)
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkEmail(email)
}); 
