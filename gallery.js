document.addEventListener('DOMContentLoaded', () => {
    // Select all the images inside the gallery
    const images = document.querySelectorAll('.gallery-item img');
    const folders = document.querySelectorAll("#folder");
    closeModal();

    addImage("https://cdni.pornpics.com/1280/7/725/28128720/28128720_018_02d2.jpg", "Ira undressing");
    addImage("https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg?t=st=1743000647~exp=1743004247~hmac=4ffed6313587e088f9462259590431a77b4686d54029c255e1da9f7608b608cc&w=360", "background_image_01")
    addImage("https://i.pinimg.com/1200x/f7/07/2e/f7072ed7bfc4dc718142bde00dc3d06e.jpg", "background_image_pig")
    addImage("https://wallpaper-house.com/data/out/6/wallpaper2you_90760.jpg", "background_image_04");

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
   
   
    const setWallButton = document.getElementById('setWallpaper');
    setWallButton.addEventListener('click', () => {
        alert('Wallpaper set to: ' + fullscreenImage.src);
        setWallButton.textContent = "✓";
        localStorage.setItem("wallpaper_", fullscreenImage.src)
    });

    const setFavoriteButton = document.getElementById("heart_");
    setFavoriteButton.addEventListener("click", () => {
        if(setFavoriteButton.textContent != "❤️"){
            setFavoriteButton.textContent = "❤️"
        }else{
            setFavoriteButton.textContent = "♡";
        }
        
    });

    const closeModalButton = document.getElementById('closeGalModal');
    closeModalButton.addEventListener('click', () => {
        if(setWallButton.textContent != "Set as Wallpaper"){
            setWallButton.textContent = "Set as Wallpaper";
        }
        if(setFavoriteButton.textContent == "❤️"){
            setFavoriteButton.textContent = "♡";
        }
        closeModal();
    });
});



function openFullscreen(img) {

    const fullscreenImage = document.getElementById('fullscreenImage');
    fullscreenImage.src = img.src;

    const modal = document.getElementById('profilePicModal');
    modal.style.display = 'block';
}

function openFolder(folder){
    closeModal();
    console.log("opening folder <<" + folder + ">>")
}

function closeModal() {
    const modal = document.getElementById('profilePicModal');
    modal.style.display = 'none';
}

function addImage(src, name){
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

    img_.addEventListener('click', (event) => {
        openFullscreen(event.target);
    });
}
