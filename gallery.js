const images_ = [];
const videos_ = [];
const images_adult = [];
const videos_adult = [];
let loca = "HOME";
const folders = [...document.querySelectorAll(".gallery-item.folder")];

document.addEventListener('DOMContentLoaded', () => {
    // Select all the images inside the gallery
    const images = document.querySelectorAll('.gallery-item img');
    
    closeModal();

    addImage("https://cdni.pornpics.com/1280/7/105/55240289/55240289_046_87a2.jpg", "bj_template", false, true);
    addImage("https://cdni.pornpics.com/1280/7/763/70065296/70065296_132_a341.jpg", "belly-laying", false, true);
    addImage("https://cdni.pornpics.com/460/7/124/37847024/37847024_026_114d.jpg", "relaxed-shower", false, true);
    addImage("https://cdni.pornpics.com/1280/7/751/50312897/50312897_017_d773.jpg", "cute-fingernails", false, true);
    addImage("https://cdni.pornpics.com/1280/7/725/28128720/28128720_018_02d2.jpg", "Ira undressing", false, true);
    addImage("https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg?t=st=1743000647~exp=1743004247~hmac=4ffed6313587e088f9462259590431a77b4686d54029c255e1da9f7608b608cc&w=360", "background_image_01", false, false)
    addImage("https://i.pinimg.com/1200x/f7/07/2e/f7072ed7bfc4dc718142bde00dc3d06e.jpg", "background_image_pig", false, false);
    addImage("https://wallpaper-house.com/data/out/6/wallpaper2you_90760.jpg", "background_image_04", false, false);
    addVideo("https://www.shorts.xxx/content/shorts/956/f76a210693ac0a11b50e21d1d18d28ad.mp4", "shower_girl", false, true);
    addVideo("https://nvms11.cdn.privatehost.com/215000/215737/215737.mp4?lr=2500k&lra=5000k&c=14&exp_time=1743785006&sign=1e26d5817c6fac5b101758e594d18c18", "forgot panties", false, true);
    addVideo("https://i.imgur.com/sOC2RrZ.mp4", "that is so funny", false, false);
    addVideo("https://i.imgur.com/L7XV2Hf_lq.mp4", "cute cat and dog", false, false);

    
    images.forEach(image => {
        image.addEventListener('click', (event) => {
            openFullscreen(event.target);
        });
    });

    folders.forEach(folder => {
        folder.addEventListener('click', (event) => {
            openFolder(event.target);
        });
    });

   refresh();
});

function openFullscreen(imgOrVid) {
    const modal = document.getElementById('profilePicModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    const wallButton = document.getElementById("setWallpaper");
    let clicked;

    if (imgOrVid.tagName === 'IMG') {
        wallButton.style.opacity = 100;
        wallButton.style.display = "block"; 
        fullscreenImage.src = imgOrVid.src;
        fullscreenImage.style.display = 'block';
        fullscreenVideo.style.display = 'hidden';  
        clicked = images_.find(iamge => iamge.src === imgOrVid.src);
        if(!clicked){
            clicked = images_adult.find(iamge => iamge.src === imgOrVid.src);
        }
    }  else if (imgOrVid.tagName === 'VIDEO') {
        wallButton.style.opacity = 0;
        fullscreenVideo.src = imgOrVid.src;
        fullscreenVideo.style.display = 'block';
        fullscreenImage.style.display = 'hidden';  
        fullscreenVideo.play();  
        clicked = videos_.find(vid => vid.src === imgOrVid.src);
        if(!clicked){
            clicked = videos_adult.find(vid => vid.src === imgOrVid.src);
        }
    }

    modal.style.display = 'block';
    if(!imgOrVid.dataset.folder){
        setUpButtons(clicked);
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

function addImage(src, name, favorite, adult){
    const galleryDiv = document.getElementById("gallery");
    const imgElement = document.createElement("div");
    const img_ = document.createElement("img");
    const overlay_ = document.createElement("div");
    const text_ = document.createElement("p");

    imgElement.classList.add("gallery-item");
    text_.classList.add("overlay-text");
    overlay_.classList.add("overlay");

    img_.src = src;
    text_.textContent = name;

    galleryDiv.appendChild(imgElement);
    imgElement.appendChild(img_);
    imgElement.appendChild(overlay_);
    overlay_.appendChild(text_);

    const tmp = {
        src: src,
        name: name,
        favorite: favorite,
        element: imgElement,
        adult: adult
    };

    if(!adult){
        images_.push(tmp);
    }else{
        images_adult.push(tmp);
    }
    
    img_.addEventListener('click', (event) => {
        openFullscreen(event.target);
    });
}

function addVideo(src, name, favorite, adult){
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

    galleryDiv.appendChild(imgElement);
    imgElement.appendChild(video_);
    imgElement.appendChild(overlay_);
    overlay_.appendChild(text_);

    const tmp = {
        src: src,
        name: name,
        favorite: favorite,
        element: imgElement
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

function setUpButtons(clicked){
    const setWallButton = document.getElementById('setWallpaper');
    setWallButton.addEventListener('click', () => {
        setWallButton.textContent = "✓";
        localStorage.setItem("wallpaper_", fullscreenImage.src)
    });

    const setFavoriteButton = document.getElementById("heart_");
    if(clicked.favorite){setFavoriteButton.textContent =  "❤️";}else{setFavoriteButton.textContent = "♡";}
    setFavoriteButton.addEventListener("click", () => {
        if(setFavoriteButton.textContent != "❤️"){
            setFavoriteButton.textContent = "❤️";
            clicked.favorite = true;
        }else{
            setFavoriteButton.textContent = "♡";
            clicked.favorite = false;
        }
        
    });

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
            if(setFavoriteButton.textContent == "❤️"){
                setFavoriteButton.textContent = "♡";
            }
            closeModal();
        }
    });
}

function refresh(){
    if(loca == "HOME"){
        console.log("starting page:");
        for(let i = 0; i < images_.length; i++){
            images_[i].element.style.display = "block";
        }       
        for(let i = 0; i < folders.length; i++){
            folders[i].style.display = "block";
        }
        for(let i = 0; i < videos_.length; i++){
            videos_[i].element.style.display = "none";
        }
        for(let i = 0; i < images_adult.length; i++){
            images_adult[i].element.style.display = "none";
        } 
        for(let i = 0; i < videos_adult.length; i++){
            videos_adult[i].element.style.display = "none";
        }
    }else if(loca == "favorites"){
        console.log("favorites folder:");
        for(let i = 0; i < images_.length; i++){
            if(images_[i].favorite){
                images_[i].element.style.display = "block";
            }else{
                images_[i].element.style.display = "none";
            }
        }
        for(let i = 0; i < videos_.length; i++){
            if(videos_[i].favorite){
                videos_[i].element.style.display = "block";
            }else{
                videos_[i].element.style.display = "none";
            }
        }
        for(let i = 0; i < images_adult.length; i++){
            if(images_adult[i].favorite){
                images_adult[i].element.style.display = "block";
            }else{
                images_adult[i].element.style.display = "none";
            }
        }
        for(let i = 0; i < videos_adult.length; i++){
            if(videos_adult[i].favorite){
                videos_adult[i].element.style.display = "block";
            }else{
                videos_adult[i].element.style.display = "none";
            }
        }
        for(let i = 0; i < folders.length; i++){
            folders[i].style.display = "none";
        }
        createFolder("HOME", "HOME");
    }else if(loca == "videos"){
        console.log("video folder:");
        for(let i = 0; i < images_.length; i++){
            images_[i].element.style.display = "none";
        }
        for(let i = 0; i < videos_.length; i++){
            videos_[i].element.style.display = "block";
        }
        for(let i = 0; i < videos_adult.length; i++){
            videos_adult[i].element.style.display = "none";
        }
        for(let i = 0; i < images_adult.length; i++){
            images_adult[i].element.style.display = "none";
        }
        for(let i = 0; i < folders.length; i++){
            folders[i].style.display = "none";
        }
        createFolder("HOME", "HOME");
        createFolder("ADULT VIDEOS", "adult_vids")
    }else if(loca == "adult_img"){
        for(let i = 0; i < images_.length; i++){
            images_[i].element.style.display = "none";
        }       
        for(let i = 0; i < folders.length; i++){
            folders[i].style.display = "none";
        }
        for(let i = 0; i < videos_.length; i++){
            videos_[i].element.style.display = "none";
        }
        for(let i = 0; i < images_adult.length; i++){
            images_adult[i].element.style.display = "block";
        } 
        for(let i = 0; i < videos_adult.length; i++){
            videos_adult[i].element.style.display = "none";
        }
        createFolder("HOME", "HOME");
    }else if(loca == "adult_vids"){
        for(let i = 0; i < images_.length; i++){
            images_[i].element.style.display = "none";
        }       
        for(let i = 0; i < folders.length; i++){
            folders[i].style.display = "none";
        }
        for(let i = 0; i < videos_.length; i++){
            videos_[i].element.style.display = "none";
        }
        for(let i = 0; i < images_adult.length; i++){
            images_adult[i].element.style.display = "none";
        } 
        for(let i = 0; i < videos_adult.length; i++){
            videos_adult[i].element.style.display = "block";
        }
        createFolder("videos", "videos");
    }
}

function createFolder(name, loca_){
    const gallery_ = document.getElementById("gallery");
    const folder_ = document.createElement("div");
    const img_ = document.createElement("img");
    const overlay_ = document.createElement("div");

    folder_.classList.add("gallery-item"); folder_.classList.add("folder"); folder_.classList.add("specialfolder");
    overlay_.classList.add("overlay-text");

    img_.src = "https://i.pinimg.com/736x/8e/b6/56/8eb656ee4829bbf6709a724b36def067.jpg";
    overlay_.textContent = name;

    gallery_.appendChild(folder_);
    folder_.appendChild(img_);
    folder_.appendChild(overlay_);

    folder_.addEventListener('click', () => {
        const all = document.querySelectorAll(".specialfolder");
        all.forEach(folder => {
            folder.style.display = "none";
        })
        //folder_.style.display = "none";
        loca = loca_;
        refresh();
    });
    
}

