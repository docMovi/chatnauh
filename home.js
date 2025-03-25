const phone = document.getElementById('phone');
const apps = [
    { id: "SETTINGS", image: "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Settings-icon.png", page: "phone_settings.html" },
    { id: "CHATY", image: "https://cdn-icons-png.flaticon.com/512/5539/5539745.png", page: "chatnauh.html" },
    { id: "GALLERY", image: "https://cdn-icons-png.flaticon.com/512/8377/8377243.png", page: "gallery.html" },
    { id: "STORE", image: "res/icons/store_icon.png", page: "appstore.html"}
];

const totalSlots = 12;

initializeSlots();
loadAppOrder();

document.addEventListener('keydown', function(event) {
   if(event.key === "p"){
        localStorage.removeItem('appOrder');
    }
});

function initializeSlots() {
    for (let i = 0; i < totalSlots; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        phone.appendChild(slot);
        addSlotEvents(slot); 
    }
}

function loadAppOrder() {
    const savedOrder = JSON.parse(localStorage.getItem('appOrder')) || apps.map(app => app.id);
    const sortedApps = savedOrder.map(id => {
        const app = apps.find(app => app.id === id);
        return app || null;
    });

    const slots = document.querySelectorAll('.slot');
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
