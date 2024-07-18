document.getElementById('postOption').addEventListener('click', function() {
    var postFormContainer = document.getElementById('postFormContainer');
    var settingsFormContainer = document.getElementById('settingsFormContainer');
    settingsFormContainer.style.display = 'none';
    if (postFormContainer.style.display === 'none' || postFormContainer.style.display === '') {
        postFormContainer.style.display = 'block';
    } else {
        postFormContainer.style.display = 'none';
    }
});

document.getElementById('settingsOption').addEventListener('click', function() {
    var settingsFormContainer = document.getElementById('settingsFormContainer');
    var postFormContainer = document.getElementById('postFormContainer');
    postFormContainer.style.display = 'none';
    if (settingsFormContainer.style.display === 'none' || settingsFormContainer.style.display === '') {
        settingsFormContainer.style.display = 'block';
    } else {
        settingsFormContainer.style.display = 'none';
    }
});

document.getElementById('goBackIconPost').addEventListener('click', function() {
    document.getElementById('postFormContainer').style.display = 'none';
});

document.getElementById('goBackIconSettings').addEventListener('click', function() {
    document.getElementById('settingsFormContainer').style.display = 'none';
});