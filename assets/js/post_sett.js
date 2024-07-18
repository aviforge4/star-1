document.addEventListener('DOMContentLoaded', function() {
    // Get the toggle button
    var toggleBtn = document.getElementById('togglePostFormBtn');
    // Get the post form container
    var postFormContainer = document.getElementById('postFormContainer');
    // Get the settings button
    var settingsBtn = document.getElementById('settingsBtn');
    // Get the settings form container
    var settingsFormContainer = document.getElementById('settingsFormContainer');

    // Add click event listener to toggle button
    toggleBtn.addEventListener('click', function() {
        // Hide settings form if visible
        if (!settingsFormContainer.classList.contains('d-none')) {
            settingsFormContainer.classList.add('d-none');
        }
        // Toggle the visibility of the post form container
        postFormContainer.classList.toggle('d-none');
    });

    // Add click event listener to settings button
    settingsBtn.addEventListener('click', function() {
        // Hide post form if visible
        if (!postFormContainer.classList.contains('d-none')) {
            postFormContainer.classList.add('d-none');
        }
        // Toggle the visibility of the settings form container
        settingsFormContainer.classList.toggle('d-none');
    });
});