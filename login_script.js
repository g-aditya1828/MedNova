document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));

            // Add active class to clicked button and corresponding form
            button.classList.add('active');
            const formId = `${button.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Handle signin form submission
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Here you would typically send this data to your backend
        console.log('Sign In Data:', { email, password, rememberMe });
        
        // For demo purposes, show success message
        alert('Sign in successful!');
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const termsAccepted = document.getElementById('terms').checked;

        if (!termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        // Here you would typically send this data to your backend
        console.log('Sign Up Data:', { fullName, email, password, termsAccepted });
        
        // For demo purposes, show success message
        alert('Account created successfully!');
    });

    // Handle "Return to Home" link
    document.querySelector('.return-home').addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would typically redirect to your home page
        console.log('Returning to home page');
    });

    // Handle "Forgot password" link
    document.querySelector('.forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would typically redirect to password reset page
        alert('Password reset functionality would go here');
    });

    // Handle terms and conditions link
    document.querySelector('.terms-link').addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would typically show terms and conditions
        alert('Terms and conditions would be shown here');
    });
}); 