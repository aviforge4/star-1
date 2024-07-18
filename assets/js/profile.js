$(document).ready(function () {
    $("#profilePhoto").on("click", function () {
        $("#mainContent").toggleClass("d-none");
        $("#profileSection").toggleClass("d-none");
    });
});

function previewProfilePicture(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#profilePicture').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function editName() {
    // Your logic to edit name
}

function editEmail() {
    // Your logic to edit email
}

function updateProfile() {
    // Your logic to update profile
}

// JavaScript function to close the profile section
function closeProfileSection() {
    $("#mainContent").toggleClass("d-none");
    $("#profileSection").toggleClass("d-none");
}

// Open the image modal
function openImageModal(imgElement) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

// Close the image modal
function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Delete the image (example function, replace with your implementation)
function deleteImage() {
    // Implement your delete logic here
    // For example, remove the image from the DOM or update the backend
    var modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Close the modal after deletion
}
// Open the image modal
function openImageModal(imgElement) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

// Close the image modal
function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Delete the image (example function, replace with your implementation)
function deleteImage() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Close the modal after deletion
    // Implement your delete logic here, e.g., remove image from DOM or update backend
}

// Function to update profile information
function updateProfile() {
    // Implement profile update functionality here
}

// Function to edit name
function editName() {
    // Implement name editing functionality here
}

// Function to edit email
function editEmail() {
    // Implement email editing functionality here
}