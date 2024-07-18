function previewVideo(input) {
    const videoPreview = document.getElementById('videoPreview');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        videoPreview.src = e.target.result;
        videoPreview.style.display = 'block';
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        videoPreview.src = '';
        videoPreview.style.display = 'none';
    }
}

