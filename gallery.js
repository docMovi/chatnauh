// Wait for the DOM content to load before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Select all the images inside the gallery
    const images = document.querySelectorAll('.gallery-item img');

    images.forEach(image => {
        // Add click event to each image
        image.addEventListener('click', (event) => {
            // Open the clicked image in fullscreen
            openFullscreen(event.target);
        });
    });
});



function openFullscreen(img) {

    if (img.requestFullscreen) {
        img.requestFullscreen();
    } else if (img.mozRequestFullScreen) { // Firefox
        img.mozRequestFullScreen();
    } else if (img.webkitRequestFullscreen) { // Chrome, Safari and Opera
        img.webkitRequestFullscreen();
    } else if (img.msRequestFullscreen) { // IE/Edge
        img.msRequestFullscreen();
    }
}
