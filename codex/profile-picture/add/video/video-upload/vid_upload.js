document.addEventListener('DOMContentLoaded', function() {
    const videoInput = document.getElementById('videoFile');
    const videoDisplaySection = document.getElementById('videoDisplaySection');
    const uploadedVideo = document.getElementById('uploadedVideo');
    const thumbnailInput = document.getElementById('thumbnailFile');
    const thumbnailDisplaySection = document.getElementById('thumbnailDisplaySection');
    const chosenThumbnail = document.getElementById('chosenThumbnail');
    const previewButton = document.getElementById('previewVideoButton');
    const formContainer = document.querySelector('.form-container');

    let videoSelected = false;
    let thumbnailSelected = false;

    // Initially hide the preview button
    previewButton.style.display = 'none';

    videoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            uploadedVideo.src = videoURL;
            videoDisplaySection.style.display = 'block';
            videoSelected = true;
            checkPreviewButton();
        }
    });

    thumbnailInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                chosenThumbnail.src = e.target.result;
                thumbnailDisplaySection.style.display = 'block';
                thumbnailSelected = true;
                checkPreviewButton();
            };
            reader.readAsDataURL(file);
        }
    });

    function checkPreviewButton() {
        if (videoSelected && thumbnailSelected) {
            previewButton.style.display = 'inline-block';
        }
    }

    document.getElementById('closeVideoUploadForm').addEventListener('click', function() {
        document.getElementById('videoUploadForm').style.display = 'none';
    });

    previewButton.addEventListener('click', function() {
        const title = document.getElementById('videoTitle').value;
        const description = document.getElementById('videoDescription').value;
        const tags = document.getElementById('videoTags').value;
        const location = document.getElementById('videoLocation').value;
        const dateTime = document.getElementById('videoDateTime').value;
        const category = document.getElementById('videoCategory').value;
        const privacy = document.getElementById('videoPrivacy').value;

        const shortDescription = truncateDescription(description, 20);
        const descriptionHTML = highlightLinks(shortDescription);
        const fullDescriptionHTML = highlightLinks(description);

        let previewHTML = `
            <h2 style="color: black; text-align: inherit;">${title}</h2>
            <div id="thumbnailVideoContainer" style="position: relative; display: inline-block;">
                <img id="previewThumbnail" src="${chosenThumbnail.src}" alt="Thumbnail" style="max-width: 100%; cursor: pointer;">
                <video id="previewVideo" controls src="${uploadedVideo.src}" style="display: none; max-width: 100%;"></video>
            </div>
            <p id="previewDescription" style="max-width: 100%; overflow-wrap: break-word; white-space: pre-wrap; text-align: inherit;">
                <strong id="toggleDescription" style="color: blue; cursor: pointer;">Description:</strong> ${descriptionHTML}
            </p>
            <p id="previewFullDescription" style="display: none; max-width: 100%; overflow-wrap: break-word; white-space: pre-wrap; text-align: inherit;">
                <strong id="toggleDescription" style="color: blue; cursor: pointer;">Description:</strong> ${fullDescriptionHTML}
            </p>
            <p style="max-width: 100%; overflow-wrap: break-word; text-align: inherit;"><strong>Tags:</strong> ${tags}</p>
            <p style="max-width: 100%; overflow-wrap: break-word; text-align: inherit;"><strong>Location:</strong> ${location}</p>
            <p style="text-align: inherit;"><strong>Date & Time:</strong> ${dateTime}</p>
            <p style="text-align: inherit;"><strong>Category:</strong> ${category}</p>
            <p style="text-align: inherit;"><strong>Privacy:</strong> ${privacy}</p>
        `;

        const previewSection = document.createElement('div');
        previewSection.innerHTML = previewHTML;

        // Ensure only one preview is displayed at a time
        const existingPreview = document.getElementById('videoPreviewSection');
        if (existingPreview) {
            existingPreview.remove();
        }

        previewSection.id = 'videoPreviewSection';
        formContainer.appendChild(previewSection);

        const previewThumbnail = document.getElementById('previewThumbnail');
        const previewVideo = document.getElementById('previewVideo');

        previewThumbnail.addEventListener('click', function() {
            previewVideo.style.display = 'block';
            previewThumbnail.style.display = 'none';
            previewVideo.play();
        });

        previewVideo.addEventListener('pause', function() {
            setTimeout(() => {
                if (previewVideo.paused) {
                    previewVideo.style.display = 'none';
                    previewThumbnail.style.display = 'block';
                }
            }, 30000); // 30 seconds
        });

        previewVideo.addEventListener('ended', function() {
            previewVideo.style.display = 'none';
            previewThumbnail.style.display = 'block';
        });

        const toggleDescriptions = document.querySelectorAll('#toggleDescription');
        toggleDescriptions.forEach(toggleDescription => {
            toggleDescription.addEventListener('click', function() {
                const fullDescription = document.getElementById('previewFullDescription');
                const shortDescription = document.getElementById('previewDescription');
                if (fullDescription.style.display === 'none') {
                    fullDescription.style.display = 'block';
                    shortDescription.style.display = 'none';
                } else {
                    fullDescription.style.display = 'none';
                    shortDescription.style.display = 'block';
                }
            });
        });
    });

    function truncateDescription(description, wordLimit) {
        const words = description.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return description;
    }

    function highlightLinks(text) {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlPattern, '<a href="$1" target="_blank" style="color: blue;">$1</a>');
    }
});
