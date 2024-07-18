document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings-icon').addEventListener('click', function() {
        document.getElementById('settings-section').style.display = 'block';
    });

    document.getElementById('back-arrow').addEventListener('click', function() {
        document.getElementById('settings-section').style.display = 'none';
    });

    document.querySelectorAll('.setting-header').forEach(function(header) {
        header.addEventListener('click', function() {
            const options = document.getElementById(header.getAttribute('data-toggle') + '-options');
            if (options.style.display === 'block') {
                options.style.display = 'none';
            } else {
                options.style.display = 'block';
            }
        });
    });

    document.getElementById('dark-mode').addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    document.getElementById('language-select').addEventListener('change', function() {
        alert('Language changed to ' + this.value);
    });
});
