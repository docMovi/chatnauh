const apps = [];
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.app-buttons button');
    const bigInfos = document.querySelectorAll(".info-big");

    addApps("Spotify",
         "https://cdn.dribbble.com/userupload/28356320/file/original-9e8e7b758718b06bf6f43be0f5bf9c37.gif",
         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1024px-Spotify_icon.svg.png?20220821125323",
        "Listen to Music®",
        "<b>Listen to Music®</b> – because silence is awkward and nobody actually wants to hear themselves think. <br> <br> 🎧 Welcome to <b>Spotify</b>, the app that insists it knows your vibe better than you do. <br> <br> Whether you're in the <b>mood</b> for chill beats or hardcore headbanging, we've got you covered—along with that one guilty pleasure song you accidentally liked back in 2017. <br>(It's still here. Waiting.) <br> <br> With <b>Spotify</b>, you can explore endless playlists, curate the perfect mix for every mood, and enjoy the thrill of random surprises.",
        false
    );

    bigInfos.forEach(info => {
        info.style.display = "none";
    });

    downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetButton = event.target;

            if (targetButton.textContent === 'Download') {
                startDownload(targetButton);
            }

            if (targetButton.textContent === 'Info') {
                showInfo(targetButton);
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

function showInfo(button) {
    const appCard = button.closest('.app-card');
    const infoBig = appCard.querySelector('.info-big'); 

    if (infoBig) {
        infoBig.style.display = infoBig.style.display === 'none' ? 'block' : 'none';
    }
}

function addApps(name, cover, icon, small, info, downloaded){
    const store = document.getElementById("store");
    const card = document.createElement("div");
    const img_ = document.createElement("img");
    const info_ = document.createElement("div");
    const title = document.createElement("h3");
    const first_ingo = document.createElement("p");
    const buttonCont = document.createElement("div"); 
    const download = document.createElement("button"); 
    const infob = document.createElement("button");
    const bigInfo = document.createElement("p");

    card.classList.add("app-card");
    info_.classList.add("app-info");
    buttonCont.classList.add("app-buttons");
    bigInfo.classList.add("app-info");
    bigInfo.classList.add("info-big");

    download.textContent = "Download"; infob.textContent = "Info";
    img_.src = cover;
    title.textContent = name;
    first_ingo.textContent = small
    bigInfo.innerHTML = info;
    bigInfo.style.display = "none";

    store.appendChild(card);
    card.appendChild(img_);
    card.appendChild(info_);
    card.appendChild(bigInfo);
    info_.appendChild(title);
    info_.appendChild(first_ingo);
    info_.appendChild(buttonCont);
    buttonCont.appendChild(download);
    buttonCont.appendChild(infob);

    download.addEventListener('click', () => startDownload(download));
    infob.addEventListener('click', () => showInfo(infob));

    const tmp = {
        name: name,
        cover: cover,
        icon: icon,
        small:small,
        info: info,
        downloaded: downloaded
    };
    apps.push(tmp);
}
