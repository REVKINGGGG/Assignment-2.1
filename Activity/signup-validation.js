const signupForm = document.getElementById('login-form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

const namePattern = /^[A-Za-z\s'-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

firstNameInput.addEventListener('input', () => validateFirstName());
lastNameInput.addEventListener('input', () => validateLastName());
emailInput.addEventListener('input', () => validateEmail());
passwordInput.addEventListener('input', () => validatePassword());
confirmPasswordInput.addEventListener('input', () => validateConfirmPassword());

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        alert('Signup successful! Form submitted.');
        
        console.log({
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        });
        
        signupForm.reset();
        clearAllErrors();
    }
});

function validateFirstName() {
    const value = firstNameInput.value.trim();
    
    if (value === '') {
        showError(firstNameError, 'First name is required');
        return false;
    }
    
    if (value.length < 2) {
        showError(firstNameError, 'First name must be at least 2 characters');
        return false;
    }
    
    if (!namePattern.test(value)) {
        showError(firstNameError, 'First name can only contain letters');
        return false;
    }
    
    clearError(firstNameError);
    return true;
}

function validateLastName() {
    const value = lastNameInput.value.trim();
    
    if (value === '') {
        showError(lastNameError, 'Last name is required');
        return false;
    }
    
    if (value.length < 2) {
        showError(lastNameError, 'Last name must be at least 2 characters');
        return false;
    }
    
    if (!namePattern.test(value)) {
        showError(lastNameError, 'Last name can only contain letters');
        return false;
    }
    
    clearError(lastNameError);
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    
    if (value === '') {
        showError(emailError, 'Email is required');
        return false;
    }
    
    if (!emailPattern.test(value)) {
        showError(emailError, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailError);
    return true;
}

function validatePassword() {
    const value = passwordInput.value;
    
    if (value === '') {
        showError(passwordError, 'Password is required');
        return false;
    }
    
    if (value.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters');
        return false;
    }
    
    if (!passwordPattern.test(value)) {
        showError(passwordError, 'Password must contain uppercase, lowercase, number, and special character');
        return false;
    }
    
    clearError(passwordError);
    return true;
}

function validateConfirmPassword() {
    const value = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    
    if (value === '') {
        showError(confirmPasswordError, 'Please confirm your password');
        return false;
    }
    
    if (value !== passwordValue) {
        showError(confirmPasswordError, 'Passwords do not match');
        return false;
    }
    
    clearError(confirmPasswordError);
    return true;
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.previousElementSibling.classList.add('error-input');
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    errorElement.previousElementSibling.classList.remove('error-input');
}

function clearAllErrors() {
    clearError(firstNameError);
    clearError(lastNameError);
    clearError(emailError);
    clearError(passwordError);
    clearError(confirmPasswordError);
}

firstNameInput.addEventListener('keypress', function(e) {
    const char = String.fromCharCode(e.which);
    if (!namePattern.test(char)) {
        e.preventDefault();
    }
});

lastNameInput.addEventListener('keypress', function(e) {
    const char = String.fromCharCode(e.which);
    if (!namePattern.test(char)) {
        e.preventDefault();
    }
});
