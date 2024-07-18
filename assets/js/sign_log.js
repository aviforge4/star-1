// JavaScript for switching between forms and handling form submissions
$(document).ready(function() {
    // Show Sign Up form, hide Log In form initially
    $('#signupForm').removeClass('d-none');
    
    // Click event to switch to Log In form
    $('#goToLogin').click(function(e) {
        e.preventDefault();
        $('#signupForm').addClass('d-none');
        $('#loginForm').removeClass('d-none');
    });
    
    // Click event to switch back to Sign Up form
    $('#goBackSignup').click(function(e) {
        e.preventDefault();
        $('#loginForm').addClass('d-none');
        $('#signupForm').removeClass('d-none');
    });
    
    // Submit event for Sign Up form
    $('#signupForm').submit(function(e) {
        e.preventDefault();
        // Perform form validation and submission logic here
        // Upon successful submission, display message and proceed
        alert('Sign-up form submitted');
        $('#authForms').addClass('d-none'); // Hide forms after submission
        $('#mainContent').removeClass('d-none'); // Show main content
    });
    
    // Submit event for Log In form
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        // Perform form validation and submission logic here
        // Upon successful submission, display message and proceed
        alert('Login form submitted');
        $('#authForms').addClass('d-none'); // Hide forms after submission
        $('#mainContent').removeClass('d-none'); // Show main content
    });
});