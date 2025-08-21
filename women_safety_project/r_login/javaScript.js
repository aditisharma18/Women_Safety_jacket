// Register form submission
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password!== confirmPassword) {
        document.getElementById('error-message').innerHTML = 'Passwords do not match.';
        return;
    }

    // Hash and salt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Send registration request to backend API
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password: hashedPassword }),
    })
   .then((response) => response.json())
   .then((data) => {
        if (data.success) {
            document.getElementById('error-message').innerHTML = 'User registered successfully!';
        } else {
            document.getElementById('error-message').innerHTML = data.error;
        }
    })
   .catch((error) => {
        console.error(error);
    });
});

// Login form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to backend API
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
   .then((response) => response.json())
   .then((data) => {
        if (data.success) {
            // Login successful, redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            document.getElementById('error-message').innerHTML = data.error;
        }
    })
   .catch((error) => {
        console.error(error);
    });
});