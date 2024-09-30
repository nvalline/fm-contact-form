const form = document.querySelector('.form') as HTMLFormElement;

interface ErrorMessage {
	inputElement: HTMLFormElement;
	message: string;
}

const clearErrors = () => {
	document.querySelectorAll('.error-message').forEach((errorElement) => {
		errorElement.classList.add('hidden');
	});
};

const showErrorMessage = ({ inputElement, message }: ErrorMessage) => {
	const group = inputElement.closest('.form__group') as HTMLFormElement;
	const errorMessage = group.querySelector('.error-message') as HTMLFormElement;

	errorMessage.textContent = message;
	errorMessage.classList.remove('hidden');
};

const validateInputs = (event: SubmitEvent) => {
	event.preventDefault();

	let isValid = true;
	const nameRegex = /^[a-zA-Z\s]+$/;

	// Clear Errors before validation
	clearErrors();

	// Validate First Name
	const firstName = document.getElementById('firstName') as HTMLFormElement;

	if (firstName.validity.valueMissing) {
		isValid = false;

		showErrorMessage({
			inputElement: firstName,
			message: 'This field is required'
		});
	} else if (!nameRegex.test(firstName.value)) {
		isValid = false;

		showErrorMessage({
			inputElement: firstName,
			message: 'Incorrect format'
		});
	}

	// Validate Last Name
	const lastName = document.getElementById('lastName') as HTMLFormElement;

	if (lastName.validity.valueMissing) {
		isValid = false;

		showErrorMessage({
			inputElement: lastName,
			message: 'This field is required'
		});
	} else if (!nameRegex.test(lastName.value)) {
		isValid = false;

		showErrorMessage({
			inputElement: lastName,
			message: 'Incorrect format'
		});
	}
};

form.addEventListener('submit', validateInputs);
