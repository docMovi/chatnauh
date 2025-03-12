document.addEventListener('DOMContentLoaded', function() {
    if(window.location.pathname === "/profile.html"){
        console.log("you're on profile.html");
    }else{
        return;
    }
    const menu = document.getElementById('profile-menu');
    const nameInput = document.getElementById('name');
    const editNameButton = document.getElementById('edit-name-btn');
    const saveButton = document.getElementById("save-profile");
    const colorPicker = document.getElementById('favorite-color');
    if(nameInput){
        loadHistory();
    }
   

    document.getElementById('preview-img').addEventListener('click', function() {
        menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
    });

    const profileOptions = document.querySelectorAll('.profile-option');
    profileOptions.forEach(function(option) {
        option.addEventListener('click', function(event) {
            const imageUrl = option.getAttribute('data-image');
            const previewImg = document.getElementById('preview-img');
            previewImg.src = imageUrl;
            menu.style.display = 'none'; // Menü schließen nach Auswahl
        });
    });

    document.getElementById('upload-btn').addEventListener('click', function() {
        document.getElementById('file-input').click(); 
    });

    document.getElementById('file-input').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById('preview-img');
            img.src = e.target.result;  // Profilbild wird mit dem ausgewählten Bild ersetzt
            menu.style.display = 'none'; // Menü schließen
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('remove-img-btn').addEventListener('click', function() {
        const previewImg = document.getElementById('preview-img');
        const fileInput = document.querySelector('input[type="file"]');
        
        // Bild auf das Standard-Bild zurücksetzen
        previewImg.src = 'res/unknown.png';
        
        // Zurücksetzen des Dateieingabefeldes
        fileInput.value = '';  // Löscht den Wert des Dateieingabefelds
    });

    nameInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !nameInput.disabled) {
            nameInput.disabled = true; // Lock the input
            editNameButton.textContent = 'Edit'; // Change the button text to "Edit"
        }
    });

    colorPicker.addEventListener('input', function() {
        const selectedColor = colorPicker.value;  // Get the selected color
        colorPicker.style.backgroundColor = selectedColor;
    });

    editNameButton.addEventListener('click', function() {
        if (nameInput.disabled) {
            nameInput.disabled = false; // Allow editing again
            nameInput.focus(); // Focus the input for editing
            editNameButton.textContent = '✓'; // Change the button text back to "Enter"
        }else{
            nameInput.disabled = true;
            editNameButton.textContent = 'Edit';
        }
    });

    saveButton.addEventListener("click", function(){
        console.log("name: " + nameInput.value);
        const previewImg = document.getElementById("preview-img");
        console.log("img: " + previewImg.src);
        console.log("color: " + colorPicker.value);

        localStorage.setItem("name_", nameInput.value);
        localStorage.setItem("pfp_", previewImg.src);
        localStorage.setItem("color_", colorPicker.value);
    });

    function loadHistory(){
        let savedName = localStorage.getItem("name_");
        console.log("loaded: " + savedName);
        let savedpfp = localStorage.getItem("pfp_");
        console.log("loaded: " + savedpfp);
        let savedColor = localStorage.getItem("color_");
        console.log("loaded: " + savedColor);

        if(savedName){
            nameInput.value = savedName;
            nameInput.disabled = true;
            editNameButton.textContent = 'Edit';
        }
        if(savedpfp){
            const preview = document.getElementById("preview-img");
            preview.src = savedpfp;
        }
        if(savedColor){
            colorPicker.value = savedColor;
            colorPicker.style.backgroundColor = savedColor;
        }
    }

});
