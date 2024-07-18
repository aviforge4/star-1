const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const fullScreenBtn = document.getElementById('fullScreenBtn');
const volumeRange = document.getElementById('volumeRange');
const progressBar = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
let isFullScreen = false;

playPauseBtn.addEventListener('click', togglePlayPause);
fullScreenBtn.addEventListener('click', toggleFullScreen);
video.addEventListener('timeupdate', updateProgressBar);
video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
});
progressBar.addEventListener('click', seek);
volumeRange.addEventListener('input', adjustVolume);

function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function toggleFullScreen() {
    if (!isFullScreen) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
        isFullScreen = true;
        fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        isFullScreen = false;
        fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}

function updateProgressBar() {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = progress + '%';
    currentTimeDisplay.textContent = formatTime(video.currentTime);
}

function seek(event) {
    const seekTime = (event.offsetX / progressBar.clientWidth) * video.duration;
    video.currentTime = seekTime;
}

function adjustVolume() {
    video.volume = volumeRange.value;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${padTime(minutes)}:${padTime(secs)}`;
}

function padTime(time) {
    return time < 10 ? `0${time}` : time;
}
