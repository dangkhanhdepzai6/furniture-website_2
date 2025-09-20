const auth = firebase.auth();

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');
const email = document.getElementById('email').value.trim();
const username = document.getElementById('username').value.trim();
const password = document.getElementById('password').value;

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

    if (!email || !username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
        alert('No user found. Please sign in first.');
        return;
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        event.preventDefault();
        alert('Please enter a valid email address.');
        emailInput.focus();
    }
});

    const user = JSON.parse(userData);
    const hashedPassword = await hashPassword(password);

    if (email === user.email && username === user.username && hashedPassword === user.passwordHash) {
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email, username, or password.');
    }
});

const loginForm = document.getElementById('loginForm');
