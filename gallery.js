const images_ = [];
const videos_ = [];
const images_adult = [];
const videos_adult = [];
let customFolders = [];
let addFiles = getAddFiles();
let favorites_ = [];
let loca = "HOME";
const folders = [...document.querySelectorAll(".gallery-item.folder")];

document.addEventListener('DOMContentLoaded', () => {
    // Select all the images inside the gallery
    const images = document.querySelectorAll('.gallery-item img');
    loadFavorites();
    closeModal();
    addNewPics();

    addImage("https://cdni.pornpics.com/1280/7/105/55240289/55240289_046_87a2.jpg", "bj_template", true);
    addImage("https://cdni.pornpics.com/1280/7/763/70065296/70065296_132_a341.jpg", "belly-laying", true);
    addImage("https://cdni.pornpics.com/460/7/124/37847024/37847024_026_114d.jpg", "relaxed-shower", true);
    addImage("https://cdni.pornpics.com/1280/7/751/50312897/50312897_017_d773.jpg", "cute-fingernails", true);
    addImage("https://cdni.pornpics.com/1280/7/725/28128720/28128720_018_02d2.jpg", "Ira undressing", true);
    addImage("https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg?t=st=1743000647~exp=1743004247~hmac=4ffed6313587e088f9462259590431a77b4686d54029c255e1da9f7608b608cc&w=360", "background_image_01", false)
    addImage("https://i.pinimg.com/1200x/f7/07/2e/f7072ed7bfc4dc718142bde00dc3d06e.jpg", "background_image_pig", false);
    addImage("https://wallpaper-house.com/data/out/6/wallpaper2you_90760.jpg", "background_image_04", false);
    addVideo("https://www.shorts.xxx/content/shorts/956/f76a210693ac0a11b50e21d1d18d28ad.mp4", "shower_girl", true);
    addVideo("https://i.imgur.com/sOC2RrZ.mp4", "that is so funny", false);
    addVideo("https://i.imgur.com/L7XV2Hf_lq.mp4", "cute cat and dog", false);
    addVideo("https://v.redd.it/uj2c69iyjc0d1/DASH_480.mp4", "total_accident", true);

    
    images.forEach(image => {
        image.addEventListener('click', (event) => {
            openFullscreen(event.target);
        });
    });

    favorites_.forEach(fav => {
        fav.element.addEventListener('click', (event) => {
            openFullscreen(event.target, fav.src);
        });
    });

    folders.forEach(folder => {
        folder.addEventListener('click', (event) => {
            openFolder(event.target);
        });
    });

   refresh();
});

function getAddFiles(){
    let tmp = JSON.parse(localStorage.getItem("addFile_"));
    if(tmp){return tmp;}
    else{tmp = []; return tmp;}
}

function addNewPics(){
    if(!addFiles){return};
    for(let i = 0; i < addFiles.length; i++){
        if(addFiles[i].tag === "image" || addFiles[i].tag === "image_adult") {
            addImage(addFiles[i].src, addFiles[i].name, addFiles[i].adult);
        } else if (addFiles[i].tag === "video" || addFiles[i].tag === "video_adult") {
            addVideo(addFiles[i].src, addFiles[i].name, addFiles[i].adult);
        }
    }
    localStorage.setItem("addFile_", JSON.stringify(addFiles));
}

function openFullscreen(imgOrVid, src_) {
    const modal = document.getElementById('profilePicModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    const wallButton = document.getElementById("setWallpaper");
    let clicked;
    let isImg_;

    if (imgOrVid.tagName === 'IMG') {
        isImg_ = true;
        console.log("found image file");
        wallButton.style.opacity = 100;
        wallButton.style.display = "block"; 
        fullscreenImage.src = imgOrVid.src;
        fullscreenImage.style.display = 'block';
        fullscreenVideo.style.display = 'hidden'; 
        if(src_){
            clicked = favorites_.find(iamge => iamge.src === src_);
            if(!clicked){console.log("fatal error while loading image, because of favorite")}
        } else{
            clicked = images_.find(iamge => iamge.src === imgOrVid.src);
            if(!clicked){
                clicked = images_adult.find(iamge => iamge.src === imgOrVid.src);
            }
        }

    }  else if (imgOrVid.tagName === 'VIDEO') {
        isImg_ = false;
        console.log("found video file");
        wallButton.style.opacity = 0;
        if(src_){fullscreenVideo.src = src_;
        }else{fullscreenVideo.src = imgOrVid.src; }

        fullscreenVideo.style.display = 'block';
        fullscreenImage.style.display = 'hidden';  
        fullscreenVideo.play();  
        if(src_){
            clicked = favorites_.find(vid => vid.src === src_);
            if(!clicked){console.log("fatal error combined with favorite.src");}
        }else{
            clicked = videos_.find(vid => vid.src === imgOrVid.src);
            if(!clicked){
                clicked = videos_adult.find(vid => vid.src === imgOrVid.src);
            }
        }
    }

    modal.style.display = 'block';
    if(!imgOrVid.dataset.folder){
        setUpButtons(clicked, isImg_);
    }

}

function openFolder(folder){
    closeModal();
    const folderName = folder.getAttribute('data-folder');
    console.log("Opening folder << " + folderName + " >>");
    loca = folderName;
    refresh()
}

function closeModal() {
    const modal = document.getElementById('profilePicModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenVideo = document.getElementById('fullscreenVideo');

    fullscreenImage.style.display = 'none';
    fullscreenVideo.style.display = 'none';
    modal.style.display = 'none';
    
    // Video anhalten, wenn es abgespielt wurde
    fullscreenVideo.pause();
    fullscreenVideo.currentTime = 0;
}

function addImage(src, name, adult, without){
    const galleryDiv = document.getElementById("gallery");
    const imgElement = document.createElement("div");
    const img_ = document.createElement("img");
    const overlay_ = document.createElement("div");
    const text_ = document.createElement("p");

    imgElement.classList.add("gallery-item");
    text_.classList.add("overlay-text");
    overlay_.classList.add("overlay");
    img_.classList.add("ripple_button");

    img_.src = src;
    text_.textContent = name;

    galleryDiv.appendChild(imgElement);
    imgElement.appendChild(img_);
    imgElement.appendChild(overlay_);
    overlay_.appendChild(text_);

    const tmp = {
        src: src,
        name: name,
        element: imgElement,
        adult: adult,
        isImg: true
    };

    if(!without){
        if(!adult){
            images_.push(tmp);
        }else{
            images_adult.push(tmp);
        }
    }
    
    img_.addEventListener('click', (event) => {
        openFullscreen(event.target);
    });
}

function addVideo(src, name, adult){
    const galleryDiv = document.getElementById("gallery");
    const imgElement = document.createElement("div");
    const video_ = document.createElement("video");
    const overlay_ = document.createElement("div");
    const text_ = document.createElement("p");

    imgElement.classList.add("gallery-item");
    text_.classList.add("overlay-text");
    overlay_.classList.add("overlay");

    video_.src = src;
    text_.textContent = name;
    video_.classList.add("ripple_button");

    galleryDiv.appendChild(imgElement);
    imgElement.appendChild(video_);
    imgElement.appendChild(overlay_);
    overlay_.appendChild(text_);

    const tmp = {
        src: src,
        name: name,
        element: imgElement,
        isImg: false
    };
    
    if(!adult){
        videos_.push(tmp);
    }else{
        videos_adult.push(tmp);
    }


    video_.addEventListener('click', (event) => {
        openFullscreen(event.target);
    });
}

function addFavorite(src, name, isImg,){
    const galleryDiv = document.getElementById("gallery");
    const imgElement = document.createElement("div");
    let img_;
    let video_;
    if(isImg){
        img_ = document.createElement("img");
    }else{
        video_ = document.createElement("video");
    }
    const overlay_ = document.createElement("div");
    const text_ = document.createElement("p");

    imgElement.classList.add("gallery-item");
    text_.classList.add("overlay-text");
    overlay_.classList.add("overlay");

    if(isImg){
        img_.src = src;
        img_.classList.add("ripple_button");
    }else{
        video_.src = src;
        video_.classList.add("ripple_button");
    }
    
    text_.textContent = name;

    galleryDiv.appendChild(imgElement);
    if(isImg){
        imgElement.appendChild(img_);
    }else{
        imgElement.appendChild(video_);
    }
    imgElement.appendChild(overlay_);
    overlay_.appendChild(text_);

    const tmp = {
        src: src,
        name: name,
        element: imgElement,
        isImg: isImg
    };
    favorites_.push(tmp);
    imgElement.style.display = "none";
}

function addToCustom(src, name, isImg){
    const galleryDiv = document.getElementById("gallery");
    const imgElement = document.createElement("div");
    let img_;
    let video_;
    if(isImg){
        img_ = document.createElement("img");
    }else{
        video_ = document.createElement("video");
    }
    const overlay_ = document.createElement("div");
    const text_ = document.createElement("p");

    imgElement.classList.add("gallery-item");
    text_.classList.add("overlay-text");
    overlay_.classList.add("overlay");

    if(isImg){
        img_.src = src;
        img_.classList.add("ripple_button");
    }else{
        video_.src = src;
        video_.classList.add("ripple_button");
    }
    
    text_.textContent = name;

    galleryDiv.appendChild(imgElement);
    if(isImg){
        imgElement.appendChild(img_);
    }else{
        imgElement.appendChild(video_);
    }
    imgElement.appendChild(overlay_);
    overlay_.appendChild(text_);

    imgElement.style.display = "none";

    const tmp = {
        src: src,
        name: name,
        element: imgElement,
        isImg: isImg
    };

    if(isImg){
        img_.addEventListener('click', (event) => {
            openFullscreen(event.target);
        });
    }else{
        video_.addEventListener('click', (event) => {
            openFullscreen(event.target);
        });
    }

    return tmp;
}

function setUpButtons(clicked, isImg_){
    const setWallButton = document.getElementById('setWallpaper');
    setWallButton.addEventListener('click', () => {
        setWallButton.textContent = "✓";
        localStorage.setItem("wallpaper_", fullscreenImage.src)
    });

    const setFavoriteButton = document.getElementById("heart_");
    console.log("searching for: " + clicked.src);
    if(insideFavorite(clicked)){setFavoriteButton.textContent =  "❤️";}else{setFavoriteButton.textContent = "♡";}
    setFavoriteButton.onclick = () => {
        const nowFav = insideFavorite(clicked);
        if(!nowFav){
            setFavoriteButton.textContent = "❤️";
            favorites_.push(clicked);
            console.log("pushing element " + clicked.element);
            saveFavorites();
        }else if(nowFav){
            setFavoriteButton.textContent = "♡";
            favorites_ = favorites_.filter(favorite => favorite.src !== clicked.src);
            saveFavorites();
        }else{
            console.log("error while pressing heart button");
        }
        
    };

   // 📁 Add to folder button logic
    const addToFolderBtn = document.getElementById("addToFolderBtn");
    const folderSelect = document.getElementById("folderSelect");

    addToFolderBtn.style.display = "inline-block";
    folderSelect.style.display = "none";

    let confirmAddBtn = document.getElementById('confirmAddToFolderBtn');
    if (!confirmAddBtn) {
        confirmAddBtn = document.createElement('button');
        confirmAddBtn.id = 'confirmAddToFolderBtn';
        confirmAddBtn.textContent = '✅ Confirm Add';
        confirmAddBtn.style.marginLeft = '10px';
        confirmAddBtn.style.padding = '4px 10px';
        confirmAddBtn.style.fontSize = '14px';
        confirmAddBtn.style.border = 'none';
        confirmAddBtn.style.borderRadius = '4px';
        confirmAddBtn.style.cursor = 'pointer';
        confirmAddBtn.style.backgroundColor = '#4CAF50';
        confirmAddBtn.style.color = 'white';
        confirmAddBtn.style.display = 'none';
        document.querySelector(".button-container").appendChild(confirmAddBtn);
    }

    let confirmMsg = document.getElementById('add-confirm-msg');
    if (!confirmMsg) {
        confirmMsg = document.createElement('div');
        confirmMsg.id = 'add-confirm-msg';
        confirmMsg.textContent = "✔️ Added to folder!";
        confirmMsg.style.display = 'none';
        confirmMsg.style.position = 'absolute';
        confirmMsg.style.top = '10px';
        confirmMsg.style.right = '10px';
        confirmMsg.style.background = 'rgba(0, 128, 0, 0.8)';
        confirmMsg.style.color = 'white';
        confirmMsg.style.padding = '6px 12px';
        confirmMsg.style.borderRadius = '5px';
        confirmMsg.style.fontSize = '14px';
        confirmMsg.style.zIndex = '1000';
        confirmMsg.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(confirmMsg);
    }

    addToFolderBtn.onclick = () => {
        folderSelect.innerHTML = '';
        folderSelect.style.display = "inline-block";
        confirmAddBtn.style.display = "inline-block";

        customFolders.forEach(folder => {
        const option = document.createElement("option");
        option.value = folder.name;
        option.textContent = "📁 " + folder.name;
        folderSelect.appendChild(option);
    });
};

    confirmAddBtn.onclick = () => {
        const selectedFolder = folderSelect.value;
        const folder = customFolders.find(f => f.name === selectedFolder);

        if (folder && !folder.content.some(item => item.src === clicked.src)) {
            folder.content.push(clicked);
            localStorage.setItem("customFolders", JSON.stringify(customFolders));
            refresh();

            // Show success message
            confirmMsg.textContent = `✔️ Added to "${selectedFolder}"`;
            confirmMsg.style.backgroundColor = 'rgba(0, 128, 0, 0.9)';
            confirmMsg.style.display = 'block';
            confirmMsg.style.opacity = 1;

            setTimeout(() => {
                confirmMsg.style.opacity = 0;
                setTimeout(() => confirmMsg.style.display = 'none', 300);
            }, 1500);
    } else if (folder) {
        // Already in folder
        confirmMsg.textContent = `⚠️ Already in "${selectedFolder}"`;
        confirmMsg.style.backgroundColor = 'rgba(255, 165, 0, 0.9)';
        confirmMsg.style.display = 'block';
        confirmMsg.style.opacity = 1;

        setTimeout(() => {
            confirmMsg.style.opacity = 0;
            setTimeout(() => {
                confirmMsg.style.display = 'none';
                confirmMsg.style.backgroundColor = 'rgba(0, 128, 0, 0.9)';
            }, 300);
        }, 1500);
    }

    folderSelect.style.display = "none";
    };

    const closeModalButton = document.getElementById('closeGalModal');
    closeModalButton.addEventListener('click', () => {
        if(setWallButton.textContent != "Set as Wallpaper"){
            setWallButton.textContent = "Set as Wallpaper";
        }
        closeModal();
    });

    document.querySelector('.gallery-modal').addEventListener('click', (e) => {
        if (e.target === document.querySelector('.gallery-modal')) {
            if(setWallButton.textContent != "Set as Wallpaper"){
                setWallButton.textContent = "Set as Wallpaper";
            }
            closeModal();
        }
    });
}

function insideFavorite(clicked){
    return favorites_.some(favorite => favorite.src === clicked.src);
}

function setDisplay(elements, displayStyle, with_) {
    elements.forEach(item => {
        if (with_) {
            item.element.style.display = displayStyle;
        }else{
            item.style.display = displayStyle;
        }
    });
}

function handleCustomFolders(location) {
    customFolders.forEach(folder => {
        const isMatchingLocation = folder.location === location;
        const action = isMatchingLocation ? "block" : "none";
        if (folder.content) {
            folder.content.forEach(content => {
                if (content && content.element) {
                    content.element.style.display = action;
                }
            });
        }

        const allSpecialFolders = document.querySelectorAll(".specialfolder");
        allSpecialFolders.forEach(specialFolder => {
            specialFolder.style.display = "none";
        });
    });
}

function refresh() {
    console.log("Refreshing page for location:", loca);
    const error = document.getElementById("error");
    //Hide all items initially
    error.style.display = "none";
    setDisplay(favorites_, "none", true);
    setDisplay(images_, "none", true);
    setDisplay(videos_, "none", true);
    setDisplay(videos_adult, "none", true);
    setDisplay(images_adult, "none", true);
    setDisplay(folders, "none", false);

    handleCustomFolders(loca);

    switch(loca) {
        case "HOME":
            console.log("starting page:");
            setDisplay(images_, "block", true);
            setDisplay(folders, "block", false);
            break;
        case "favorites":
            setDisplay(favorites_, "block", true);
            break;
        case "videos":
            setDisplay(videos_, "block", true);
            break;
        case "adult_img":
            if(getSetting("nsfw") === "true"){ 
                setDisplay(images_adult, "block", true);
            }else{
                console.log("nsfw seems to be " + getSetting("nsfw"));
                createErrorMessage("nsfw");
            }
            break;
        case "adult_vids":
            if(getSetting("nsfw") === "true"){
                setDisplay(videos_adult, "block", true);
            }else{
                createErrorMessage("nsfw");
            }
            break;
        default:
            break;
    }

    if (loca === "favorites") {
        createFolder("HOME", "HOME");
    } else if (loca === "videos") {
        createFolder("HOME", "HOME");
        if(getSetting("nsfw") === "true"){
            createFolder("ADULT VIDEOS", "adult_vids");
        }
    } else if (loca === "adult_img") {
        createFolder("HOME", "HOME");
    } else if (loca === "adult_vids") {
        createFolder("videos", "videos");
    } else if (loca === "HOME") {
        //nothing
    } else {
        createFolder("HOME", "HOME");
    }
}

function createFolder(name, loca_){
    const all = document.querySelectorAll(".specialfolder");
    // 🔍 Check if a folder with the same name already exists
    for (const element of all) {
        const text = element.querySelector(".overlay-text")?.textContent;
        if (text === name && !text === "HOME") {
            console.log(`Folder "${name}" already exists. Skipping creation.`);
            return; 
        }
    }
    const gallery_ = document.getElementById("gallery");
    const folder_ = document.createElement("div");
    const img_ = document.createElement("img");
    const overlay_ = document.createElement("div");

    folder_.classList.add("gallery-item"); folder_.classList.add("folder"); folder_.classList.add("specialfolder"); folder_.classList.add("ripple_button");
    overlay_.classList.add("overlay-text");

    img_.src = "https://i.pinimg.com/736x/8e/b6/56/8eb656ee4829bbf6709a724b36def067.jpg";
    overlay_.textContent = name;

    gallery_.appendChild(folder_);
    folder_.appendChild(img_);
    folder_.appendChild(overlay_);

    folder_.addEventListener('click', () => {
        const all_ = document.querySelectorAll(".specialfolder");
        all_.forEach(folder => {
            folder.style.display = "none";
        })
        //folder_.style.display = "none";
        loca = loca_;
        console.log("setting loca to " + loca_);
        refresh();
    });
    
}

function saveFavorites() {
    for(let i = 0; i < favorites_.length; i++)

    favorites_ = Array.from(new Set(favorites_.map(item => item.src))) 
        .map(src => favorites_.find(item => item.src === src));  

    localStorage.setItem("favorites", JSON.stringify(favorites_));
}

function loadFavorites() {
    const tmp = JSON.parse(localStorage.getItem("favorites"));
    if (tmp) {
        for(let i = 0; i < tmp.length; i++){
            console.log(tmp[i].isImg + ": isImage");
            addFavorite(tmp[i].src, tmp[i].name, tmp[i].isImg);
        } 
        refresh();

        console.log("Loading favorites as " + JSON.stringify(tmp));
    }
}

function addCustomFolder(name){
    createFolder(name, name);
    const currentLoca = loca;
    let array = [];
    const tmp = {
        name: name,
        location: currentLoca,
        content: array
    }
    console.log("adding folder " + name + " in " + currentLoca);
    customFolders.push(tmp);
}

function saveCustomFolders() {
    localStorage.setItem("customFolders", JSON.stringify(customFolders));
}

function loadCustomFolders() {
    const tmp = JSON.parse(localStorage.getItem("customFolders"));
    if (tmp) {
        customFolders = tmp;
        // Optional: you may need to recreate DOM elements too depending on structure
        refresh();
    }
}

function getSetting(case_){
    let state;
    switch(case_){
        case "nsfw": 
            state = localStorage.getItem("NSFW");
            console.log("nsfw is -> " + state);
            return state;
        case "wifi": 
            state = localStorage.getItem("Wi-Fi");
            return state;
    }
}

function createErrorMessage(case_){
    const container_ = document.getElementById("error");
    const message = document.getElementById("errror_message");
    container_.appendChild(message);
    switch(case_){
        case "nsfw":
           message.textContent = "NSFW content is deactivated. Go to settings to see hidden content."
    }
    container_.style.display = "block";
}

document.addEventListener('keydown', function(event) {
    if(event.key === "p") {
         localStorage.removeItem("favorites");
     }else if(event.key === "t"){
        localStorage.removeItem("addFile_");
     }
 });

 document.querySelectorAll('.ripple_button').forEach(button => {
    button.addEventListener('click', function(e) {
    console.log("adding ripple to buttons.");
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const size = 10;
    ripple.style.width = ripple.style.height = `${size}px`;

    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);
        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});

document.querySelectorAll('.add-folder-btn').forEach(button => {
    button.addEventListener('click', () => {
        const existingWindow = document.getElementById('folder-input-window');
        const existingOverlay = document.getElementById('modal-overlay');

        if (existingWindow && existingOverlay) {
            existingWindow.classList.add('fade-out-folder');
            existingOverlay.classList.add('fade-out-fodler');

            setTimeout(() => {
                existingWindow.remove();
                existingOverlay.remove();
            }, 200);
            return;
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'modal-overlay';
        overlay.className = 'modal-overlay fade-in-folder';

        // Clicking the overlay also closes the modal
        overlay.addEventListener('click', () => {
            document.getElementById('folder-input-window')?.classList.add('fade-out-folder');
            overlay.classList.add('fade-out-folder');

            setTimeout(() => {
                document.getElementById('folder-input-window')?.remove();
                overlay.remove();
            }, 200);
        });

        // Create input window
        const inputWindow = document.createElement('div');
        inputWindow.id = 'folder-input-window';
        inputWindow.className = 'folder-modal fade-in-folder';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter folder name';
        input.className = 'folder-input';

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Create';
        submitBtn.className = 'folder-submit';

        submitBtn.addEventListener('click', () => {
            const folderName = input.value.trim();
            if (folderName) {
                console.log('Folder to create:', folderName);

                addCustomFolder(folderName);

                inputWindow.classList.add('fade-out-folder');
                overlay.classList.add('fade-out-folder');
                setTimeout(() => {
                    inputWindow.remove();
                    overlay.remove();
                }, 200);
            }
        });

        inputWindow.appendChild(input);
        inputWindow.appendChild(submitBtn);

        document.body.appendChild(overlay);
        document.body.appendChild(inputWindow);
    });
});



