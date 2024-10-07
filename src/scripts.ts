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

	// Validate Email
	const email = document.getElementById('email') as HTMLFormElement;

	if (email.validity.valueMissing || email.validity.typeMismatch) {
		isValid = false;

		showErrorMessage({
			inputElement: email,
			message: 'Please enter a valid email address'
		});
	}

	// Validate Query Type
	const queryTypeFieldset = document.getElementById(
		'fieldset'
	) as HTMLFormElement;
	const queryTypeRadioInputs = document.querySelectorAll(
		'input[name="queryType"]'
	) as NodeListOf<HTMLFormElement>;

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
	const message = document.getElementById('message') as HTMLFormElement;

	if (message.validity.valueMissing) {
		isValid = false;

		showErrorMessage({
			inputElement: message,
			message: 'This field is required'
		});
	}

	// Validate Consent
	const consentCheckbox = document.getElementById('consent') as HTMLFormElement;

	if (!consentCheckbox.checked) {
		isValid = false;

		showErrorMessage({
			inputElement: consentCheckbox,
			message: 'To submit this form, please consent to being contacted'
		});
	}

	// Display Success
	const confirmation = document.querySelector('.confirmation') as HTMLElement;

	if (isValid) {
		confirmation.classList.add('open');

		form.reset();

		setTimeout(() => {
			confirmation.classList.add('close');
		}, 3000);
	}
};

form.addEventListener('submit', validateInputs);
