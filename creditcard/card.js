function isCardNumberValid(number) {
    // Normally we would contact a credit card service, but for simplicity, we'll accept only one number.
    return number === '1234123412341234';
}

function displayError(msg) {
    // Display error message
    const errorMsgElement = document.querySelector('.errorMsg');
    if (errorMsgElement) {
        errorMsgElement.textContent = msg;
    }
}

function checkDate(year, month) {
    const currentDate = new Date();
    const enteredYear = parseInt(year, 10) + 2000; // Assuming YY format, so we add 2000 to get YYYY
    const currentYear = currentDate.getFullYear();
    const enteredMonth = parseInt(month, 10);
    const currentMonth = currentDate.getMonth() + 1;

    if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
        return false;
    }
    return true;
}

function submitHandler(event) {
    event.preventDefault();
    let errorMsg = '';

    // Clear any previous errors
    displayError('');

    // Check credit card number
    const cardNumber = this.cardNumber.value.replace(/\s/g, ''); // Remove spaces for validation
    if (isNaN(cardNumber)) { // Fixed: Added missing closing parenthesis
        errorMsg += 'Card number is not a valid number\n';
    } else if (!isCardNumberValid(cardNumber)) {
        errorMsg += 'Card number is not a valid card number\n';
    }

    // Check expiration date
    const expirationMonth = this.expirationMonth.value;
    const expirationYear = this.expirationYear.value;

    if (expirationMonth < 1 || expirationMonth > 12) {
        errorMsg += 'Month is not valid\n';
    } else if (!checkDate(expirationYear, expirationMonth)) {
        errorMsg += 'Date is invalid\n';
    }

    // Check CVC
    const cvc = this.cvc.value;
    if (cvc.length !== 3 || isNaN(cvc)) {
        errorMsg += 'CVC is not valid\n';
    }

    // If there are errors, display them and stop form submission
    if (errorMsg !== '') {
        displayError(errorMsg);
        return false;
    }

    // If everything is valid, you can proceed with form submission
    alert('Form submitted successfully!');
    return true;
}

document.querySelector('#creditCardForm').addEventListener('submit', submitHandler);