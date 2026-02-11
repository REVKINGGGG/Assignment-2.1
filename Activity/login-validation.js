document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        clearLoginErrors();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username === '') {
            showLoginError(usernameInput, 'Username is required');
            valid = false;
        }

        if (password === '') {
            showLoginError(passwordInput, 'Password is required');
            valid = false;
        } else if (!passwordPattern.test(password)) {
            showLoginError(passwordInput, 'Invalid password format. It must contain uppercase, lowercase, number, and a special character.');
            valid = false;
        }

        if (valid && (username !== 'testuser' || password !== 'Password123!')) {
            showLoginError(passwordInput, 'Wrong username or password');
            valid = false;
        }

        if (valid) {
            alert('Login successful!');
            loginForm.reset();
            clearLoginErrors();
        }
    });

    function showLoginError(input, message) {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains('error-message')) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
        input.classList.add('error-input');
    }

    function clearLoginErrors() {
        [usernameInput, passwordInput].forEach(input => {
            let errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
            input.classList.remove('error-input');
        });
    }
});
