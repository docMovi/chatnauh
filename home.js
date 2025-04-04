const phone = document.getElementById('phone');
let apps = initializeApps(); 

let wallpaper = localStorage.getItem("wallpaper_");
if(wallpaper){
    const container = document.getElementsByClassName("profile-containerH")[0];
    container.style.setProperty("--myWallpaper", "url(" + wallpaper + ")");
}
const totalSlots = 15;

initializeSlots();
loadAppOrder();

document.addEventListener('keydown', function(event) {
   if(event.key === "p"){
        localStorage.removeItem('appOrder');
        localStorage.removeItem("apps");
    }
    if(event.key === "t"){
        activateApp("SPOTIFY");
    }
});

function initializeApps() {
    const savedApps = JSON.parse(localStorage.getItem('apps'));
    if (savedApps) {
        return savedApps;  // If saved apps exist, return them
    } else {
        const defaultApps = [
            { id: "SETTINGS", image: "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Settings-icon.png", page: "home_settings.html", active: true },
            { id: "CHATNAUH", image: "https://cdn-icons-png.flaticon.com/512/5539/5539745.png", page: "chatnauh.html", active: true },
            { id: "GALLERY", image: "https://cdn-icons-png.flaticon.com/512/8377/8377243.png", page: "gallery.html", active: true },
            { id: "STORE", image: "res/icons/store_icon.png", page: "appstore.html", active: true}, 
            { id: "SPOTIFY", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1024px-Spotify_icon.svg.png?20220821125323", page: "spotify.html", active: false}, 
        ];
        localStorage.setItem('apps', JSON.stringify(defaultApps));  // Save default apps to localStorage
        return defaultApps;
    }
}

function saveApps() {
    localStorage.setItem('apps', JSON.stringify(apps)); // Save the apps array to localStorage
}

function initializeSlots() {
    for (let i = 0; i < totalSlots; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        phone.appendChild(slot);
        addSlotEvents(slot); 
    }
}

function loadAppOrder() {
    console.log("Apps array before filtering:", apps);
    const savedOrder = JSON.parse(localStorage.getItem('appOrder')) || apps.map(app => app.id);

    console.log("Saved app order:", savedOrder);

    const sortedApps = savedOrder.map(id => {
        const app = apps.find(app => app.id === id);
        return app && app.active ? app : null;
    });
    const slots = document.querySelectorAll('.slot');
    console.log('Sorted apps:', JSON.stringify(sortedApps, null, 2)); 
    
    sortedApps.forEach((app, index) => {
        if (app && slots[index]) { 
            const slot = slots[index];

            const appElement = document.createElement('button');
            appElement.classList.add('app');
            appElement.setAttribute('draggable', 'true');
            appElement.style.backgroundImage = `url(${app.image})`;
            appElement.setAttribute('id', app.id);

            if (app.page) {
                appElement.addEventListener('click', () => {
                    window.location.href = app.page; 
                });
            } else {
                appElement.addEventListener('click', () => {
                    alert(`Keine Seite für "${app.id}" definiert!`);
                });
            }
            slot.appendChild(appElement);
            addDragEvents(appElement);
        }
    });

    // Fill remaining slots with empty slots if necessary
    for (let i = sortedApps.length; i < totalSlots; i++) {
        if (slots[i] && !slots[i].querySelector('.app')) {
            const emptySlot = document.createElement('div');
            emptySlot.classList.add('empty-slot'); 
            slots[i].appendChild(emptySlot);
        }
    }
}

function addDragEvents(app) {
    app.addEventListener('dragstart', (e) => {
        draggedElement = e.target;
        e.target.classList.add('dragging');
        phone.classList.add('dragging-active'); 
    });

    app.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        draggedElement = null;
        phone.classList.remove('dragging-active'); 
        saveAppOrder(); 
    });
}

function addSlotEvents(slot) {
    slot.addEventListener('dragover', (e) => {
        e.preventDefault(); 
    });

    slot.addEventListener('drop', (e) => {
        if (!slot.querySelector('.app')) { 
            slot.appendChild(draggedElement);
        }
        saveAppOrder();
    });
}

function saveAppOrder() {
    const order = [];
    document.querySelectorAll('.slot').forEach(slot => {
        const app = slot.querySelector('.app');
        order.push(app ? app.id : null); 
    });
    localStorage.setItem('appOrder', JSON.stringify(order));
}

function addAppToNextFreeSlot(appId) {
    const app = apps.find(app => app.id === appId);

    if (!app || !app.active) {
        console.log("App not found or not active.");
        return;
    }

    const slots = document.querySelectorAll('.slot'); 
    let added = false;  

    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];

        if (!slot.querySelector('.app')) {
            const appElement = document.createElement('button');
            appElement.classList.add('app');
            appElement.setAttribute('draggable', 'true');
            appElement.style.backgroundImage = `url(${app.image})`;
            appElement.setAttribute('id', app.id);

            if (app.page) {
                appElement.addEventListener('click', () => {
                    window.location.href = app.page; 
                });
            } else {
                appElement.addEventListener('click', () => {
                    alert(`Keine Seite für "${app.id}" definiert!`);
                });
            }

            slot.appendChild(appElement);
            addDragEvents(appElement);
            
            added = true;  
            break; 
        }
    }

    if (added) {
        saveAppOrder();
    } else {
        console.log("No empty slot available.");
    }
}

function activateApp(id){
    const app_ = apps.find(app => app.id === id);
    if (app_) {
        app_.active = !app_.active;
        saveApps();  
    }
    initializeApps();
    addAppToNextFreeSlot(id);
    window.location.reload();
}