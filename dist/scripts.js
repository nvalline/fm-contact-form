"use strict";
const form = document.querySelector('.form');
const clearErrors = () => {
    document.querySelectorAll('.error-message').forEach((errorElement) => {
        errorElement.classList.add('hidden');
    });
};
const showErrorMessage = ({ inputElement, message }) => {
    const group = inputElement.closest('.form__group');
    const errorMessage = group.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
};
const validateInputs = (event) => {
    event.preventDefault();
    let isValid = true;
    const nameRegex = /^[a-zA-Z\s]+$/;
    // Clear Errors before validation
    clearErrors();
    // Validate First Name
    const firstName = document.getElementById('firstName');
    if (firstName.validity.valueMissing) {
        isValid = false;
        showErrorMessage({
            inputElement: firstName,
            message: 'This field is required'
        });
    }
    else if (!nameRegex.test(firstName.value)) {
        isValid = false;
        showErrorMessage({
            inputElement: firstName,
            message: 'Incorrect format'
        });
    }
    // Validate Last Name
    const lastName = document.getElementById('lastName');
    if (lastName.validity.valueMissing) {
        isValid = false;
        showErrorMessage({
            inputElement: lastName,
            message: 'This field is required'
        });
    }
    else if (!nameRegex.test(lastName.value)) {
        isValid = false;
        showErrorMessage({
            inputElement: lastName,
            message: 'Incorrect format'
        });
    }
    // Validate Email
    const email = document.getElementById('email');
    if (email.validity.valueMissing || email.validity.typeMismatch) {
        isValid = false;
        showErrorMessage({
            inputElement: email,
            message: 'Please enter a valid email address'
        });
    }
};
form.addEventListener('submit', validateInputs);
