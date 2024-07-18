document.addEventListener('DOMContentLoaded', function() {
    var postImages = document.getElementById('postImages');
    var selectedImagesContainer = document.getElementById('selectedImages');
    var swiperContainer = null; // Initialize Swiper object
    var postMusic = document.getElementById('postMusic'); // Music file input
    var musicPlayer = document.getElementById('musicPlayer'); // Audio player element

    var maxImageCount = 10; // Maximum number of images allowed
    var imageFiles = []; // Array to store selected image files
    var musicFile = null; // Variable to store selected music file

    // Function to initialize Swiper
    function initializeSwiper() {
        // Destroy existing swiper if it exists
        if (swiperContainer) {
            swiperContainer.destroy(true, true);
            swiperContainer = null;
        }

        // Initialize swiper if more than one image is selected
        if (imageFiles.length > 0) {
            swiperContainer = new Swiper('.swiper-container', {
                slidesPerView: 1, // Show one slide at a time
                spaceBetween: 10, // Space between slides
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // Enable touch events for swipe on mobile
                touchEventsTarget: 'container',
                touchStartPreventDefault: false,
                touchMoveStopPropagation: true,
            });
            swiperContainer.update(); // Update swiper to reflect new slides
        }
    }

    // Event listener for file input change (images)
    if (postImages) {
        postImages.addEventListener('change', function(event) {
            var files = event.target.files;

            // Clear previous selections from UI only if new files are selected
            if (files.length > 0) {
                selectedImagesContainer.innerHTML = '';
                imageFiles = []; // Clear selected images array
            }

            // Add newly selected files to existing imageFiles array
            for (var i = 0; i < files.length && imageFiles.length < maxImageCount; i++) {
                var file = files[i];
                if (file instanceof Blob) {
                    imageFiles.push(file); // Store file in array

                    var reader = new FileReader();
                    reader.onload = (function(theFile) {
                        return function(e) {
                            var img = new Image();
                            img.className = 'swiper-slide'; // Each image as a slide
                            img.src = e.target.result;
                            img.style.maxWidth = '100%'; // Responsive image size
                            img.style.height = 'auto'; // Maintain aspect ratio

                            // Add click event to view image in full screen
                            img.addEventListener('click', function() {
                                viewImageFullScreen(e.target.result);
                            });

                            // Add image to selectedImagesContainer
                            selectedImagesContainer.appendChild(img);

                            // Initialize or update Swiper if multiple images are selected
                            initializeSwiper();
                        };
                    })(file);

                    reader.readAsDataURL(file);
                }
            }
        });
    }

    // Event listener for file input change (music)
    if (postMusic) {
        postMusic.addEventListener('change', function(event) {
            var file = event.target.files[0]; // Assuming single music file
            if (file instanceof Blob) {
                musicFile = file;

                // Update label to show selected file name
                var label = postMusic.nextElementSibling;
                label.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> ' + file.name;

                // Update audio player source and display
                musicPlayer.src = URL.createObjectURL(file);
                musicPlayer.style.display = 'block';

                // Auto play the music when selected
                musicPlayer.play();
            }
        });
    }

    // Event listener for form submission
    var postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validate form fields (example)
            var postTitle = document.getElementById('postTitle').value.trim();
            var postContent = document.getElementById('postContent').value.trim();
            var postTags = document.getElementById('postTags').value.trim();
            var postLocation = document.getElementById('postLocation').value.trim();
            var postSchedule = document.getElementById('postSchedule').value.trim();

            if (postTitle === '' || postContent === '') {
                alert('Title and content are required.');
                return;
            }

            // Prepare form data
            var formData = new FormData();
            formData.append('title', postTitle);
            formData.append('content', postContent);
            formData.append('tags', postTags);
            formData.append('location', postLocation);
            formData.append('schedule', postSchedule);

            // Append selected images to form data
            for (var i = 0; i < imageFiles.length; i++) {
                formData.append('images[]', imageFiles[i]);
            }

            // Append selected music file to form data
            if (musicFile) {
                formData.append('music', musicFile);
            }

            // Perform form submission (replace with actual logic)
            alert('Form submitted successfully!');

            // Clear form and reset state after submission
            clearForm();
        });
    }

    // Function to clear form and reset state
    function clearForm() {
        document.getElementById('postForm').reset(); // Reset form fields
        selectedImagesContainer.innerHTML = ''; // Clear selected images
        imageFiles = []; // Clear selected image files array
        musicFile = null; // Clear selected music file
        musicPlayer.src = ''; // Clear audio player source
        musicPlayer.style.display = 'none'; // Hide audio player
        initializeSwiper(); // Update swiper after clearing form
    }

    // Function to load draft from localStorage
    function loadDraft() {
        var draft = JSON.parse(localStorage.getItem('postDraft'));
        if (draft) {
            document.getElementById('postTitle').value = draft.title;
            document.getElementById('postContent').value = draft.content;
            document.getElementById('postTags').value = draft.tags;
            document.getElementById('postLocation').value = draft.location;
            document.getElementById('postSchedule').value = draft.schedule;

            // Load selected images from draft
            imageFiles = draft.images || [];
            imageFiles.forEach(function(file) {
                if (file instanceof Blob) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var img = new Image();
                        img.className = 'swiper-slide';
                        img.src = e.target.result;
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                        img.addEventListener('click', function() {
                            viewImageFullScreen(e.target.result);
                        });
                        selectedImagesContainer.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Load selected music file from draft
            if (draft.music instanceof Blob) {
                musicFile = draft.music;

                // Update label to show selected file name
                var label = postMusic.nextElementSibling;
                label.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> ' + musicFile.name;

                // Update audio player source and display
                musicPlayer.src = URL.createObjectURL(musicFile);
                musicPlayer.style.display = 'block';
            }

            initializeSwiper(); // Update swiper after loading draft
        }
    }

    // Function to view image in full screen
    function viewImageFullScreen(imageSrc) {
        var viewer = document.createElement('div');
        viewer.style.position = 'fixed';
        viewer.style.top = '0';
        viewer.style.left = '0';
        viewer.style.width = '100%';
        viewer.style.height = '100%';
        viewer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        viewer.style.zIndex = '1000';
        viewer.style.display = 'flex';
        viewer.style.justifyContent = 'center';
        viewer.style.alignItems = 'center';

        var fullImg = new Image();
        fullImg.src = imageSrc;
        fullImg.style.maxWidth = '90%'; // Adjust size as needed
        fullImg.style.maxHeight = '90%'; // Adjust size as needed

        viewer.appendChild(fullImg);
        document.body.appendChild(viewer);

        // Close viewer when clicked outside the image
        viewer.addEventListener('click', function() {
            viewer.remove();
        });
    }

    // Load draft on page load
    loadDraft();

    // Save draft periodically (example)
    setInterval(function() {
        saveDraft();
    }, 5000);

    // Function to save draft to localStorage
    function saveDraft() {
        var postTitle = document.getElementById('postTitle').value.trim();
        var postContent = document.getElementById('postContent').value.trim();
        var postTags = document.getElementById('postTags').value.trim();
        var postLocation = document.getElementById('postLocation').value.trim();
        var postSchedule = document.getElementById('postSchedule').value.trim();

        var draft = {
            title: postTitle,
            content: postContent,
            tags: postTags,
            location: postLocation,
            schedule: postSchedule,
            images: imageFiles,
            music: musicFile // Save music file in draft
        };

        localStorage.setItem('postDraft', JSON.stringify(draft));
    }
});