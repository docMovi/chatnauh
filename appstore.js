document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.app-buttons button');

    // Loop through all download buttons and add an event listener
    downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetButton = event.target;

            // Only trigger download on "Download" button (check the text)
            if (targetButton.textContent === 'Download') {
                startDownload(targetButton);
            }
        });
    });
});


function startDownload(button) {
    button.style.display = 'none';

    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress-container');
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressContainer.appendChild(progressBar);
    button.parentElement.appendChild(progressContainer);

    const downloadTime = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;

    let progress = 0;

    const interval = setInterval(() => {
        progress += 100 / (downloadTime / 100);

        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            progressBar.style.backgroundColor = 'green';

            // Add the "Downloaded" text below the progress bar
            const downloadedText = document.createElement('span');
            downloadedText.textContent = 'Downloaded';
            downloadedText.style.color = 'green';
            downloadedText.style.marginTop = '10px';
            progressContainer.appendChild(downloadedText);

            // Wait a few seconds, then reset the button and remove progress bar
            setTimeout(() => {
                button.style.display = 'inline-block';  // Show the button again
                button.textContent = "Downloaded";
                button.style.backgroundColor = "green";
                progressContainer.remove();  // Remove progress bar and "Downloaded" text
            }, 2000);
        }
    }, 100); // Update the progress every 100ms
}
