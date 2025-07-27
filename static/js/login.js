document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';
    document.getElementById('resetPasswordForm').reset();
});

document.getElementById('resetPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('reset_username').value;
    const newPassword = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    const response = await fetch('/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, new_password: newPassword, confirm_password: confirmPassword })
    });

    const result = await response.json();
    alert(result.message);

    if (result.success) {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('resetPasswordForm').reset();
    }
});

document.getElementById('closeForgotPassword').addEventListener('click', function () {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('forgotPasswordForm').style.display = 'none';
    document.getElementById('resetPasswordForm').reset();
});

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            window.location.href = result.redirectUrl;
        } else {
            alert(result.message || "Login failed");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
    }
});