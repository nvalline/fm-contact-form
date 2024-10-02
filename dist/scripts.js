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
    // Validate Query Type
    const queryTypeFieldset = document.getElementById('fieldset');
    const queryTypeRadioInputs = document.querySelectorAll('input[name="queryType"]');
    let queryTypeChecked = false;
    queryTypeRadioInputs.forEach((input) => {
        if (input.checked) {
            queryTypeChecked = true;
        }
    });
    if (!queryTypeChecked) {
        isValid = false;
        showErrorMessage({
            inputElement: queryTypeFieldset,
            message: 'Please select a query type'
        });
    }
    // Validate Message
    const message = document.getElementById('message');
    if (message.validity.valueMissing) {
        isValid = false;
        showErrorMessage({
            inputElement: message,
            message: 'This field is required'
        });
    }
    // Validate Consent
    const consentCheckbox = document.getElementById('consent');
    if (!consentCheckbox.checked) {
        isValid = false;
        showErrorMessage({
            inputElement: consentCheckbox,
            message: 'To submit this form, please consent to being contacted'
        });
    }
    // Display Success
    const confirmation = document.querySelector('.confirmation');
    if (isValid) {
        confirmation.classList.remove('hidden');
        form.reset();
    }
};
form.addEventListener('submit', validateInputs);
