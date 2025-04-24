const defaultSettings = {
    'Wi-Fi': false,
    'Bluetooth': false,
    'NSFW': true,
    'Notifications': true,
    'Location Services': false
};

document.addEventListener('DOMContentLoaded', () => {
    const settingItems = document.querySelectorAll('.setting-item');

    settingItems.forEach(item => {
        const titleElement = item.querySelector('h3');
        const settingName = titleElement?.innerText;
        const toggle = item.querySelector('input[type="checkbox"]');
        const slider = item.querySelector('input[type="range"]');

        // Handle switches
        if (toggle) {
            const storedValue = localStorage.getItem(settingName);
            if (storedValue !== null) {
                toggle.checked = storedValue === 'true';
            } else if (defaultSettings.hasOwnProperty(settingName)) {
                toggle.checked = defaultSettings[settingName];
                localStorage.setItem(settingName, toggle.checked);
            } else {
                toggle.checked = false;
            }

            toggle.addEventListener('change', () => {
                localStorage.setItem(settingName, toggle.checked);

                // Handle special behaviors per setting
                switch (settingName) {
                    case 'Location Services':
                        if (toggle.checked) {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    pos => {
                                        alert(`Location enabled.\nLat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`);
                                    },
                                    err => {
                                        alert(`Failed to get location: ${err.message}`);
                                    }
                                );
                            } else {
                                alert("Geolocation not supported.");
                            }
                        } else {
                            alert("Location disabled.");
                        }
                        break;

                    case 'NSFW':
                        if (toggle.checked) {
                            alert("Warning: Adult content is now enabled.");
                        }
                        break;
                        case 'Wi-Fi':
                        if (toggle.checked) {
                            const fakeNetworks = [
                                { name: 'Pretty Fly for a Wi-Fi', password: null },
                                { name: 'FBI Surveillance Van', password: 'topsecret' },
                                { name: '404 Network Not Found', password: 'notfound' },
                                { name: 'Mom’s Router', password: 'iloveyoumom' },
                                { name: 'It Hurts When IP', password: 'ouch123' }
                            ];

                            showFakeList('Available Wi-Fi Networks:', fakeNetworks.map(n => n.name), (chosenName) => {
                                const selected = fakeNetworks.find(n => n.name === chosenName);
                                if (selected.password) {
                                    const entered = prompt(`Enter password for "${selected.name}":`);
                                    if (entered === selected.password) {
                                        alert(`✅ Connected to "${selected.name}"`);
                                        localStorage.setItem('ConnectedWiFi', selected.name);
                                    } else {
                                        alert(`❌ Incorrect password for "${selected.name}"`);
                                        toggle.checked = false;
                                        localStorage.removeItem('ConnectedWiFi');
                                    }
                                } else {
                                    alert(`✅ Connected to "${selected.name}"`);
                                    localStorage.setItem('ConnectedWiFi', selected.name);
                                }
                                
                            }, () => {
                                toggle.checked = false; // If user cancels the selection
                            });
                        } else {
                            alert('📡 Wi-Fi turned off.');
                            localStorage.removeItem('ConnectedWiFi');
                        }
                        break;

                        
                        
                        case 'Bluetooth':
                        if (toggle.checked) {
                            const fakeDevices = [
                                'Toothbrush 9000',
                                'Banana Phone 🍌',
                                'AirBeans Max',
                                'Bluetooth Speaker of Doom',
                                'Your Ex’s AirPods'
                            ];

                            showFakeList('Nearby Bluetooth Devices:', fakeDevices, (chosen) => {
                                alert(`🔵 Connected to "${chosen}"`);
                                localStorage.setItem('ConnectedBluetooth', chosen);
                            }, () => {
                                toggle.checked = false;
                                localStorage.removeItem('ConnectedBluetooth');
                            });
                        } else {
                            alert('🔌 Bluetooth turned off.');
                            localStorage.removeItem('ConnectedBluetooth');
                        }
                        break;
                      

                    // You can add more cases for Wi-Fi, Bluetooth, etc. if needed
                    default:
                        // Optional: generic feedback
                        console.log(`${settingName} toggled: ${toggle.checked}`);
                }

                
            });
        }
    });
});


function showFakeList(title, options, callback, onCancel) {
    const choice = prompt(`${title}\n\n` + options.map((o, i) => `${i + 1}. ${o}`).join('\n') + '\n\nChoose a number:');
    const index = parseInt(choice) - 1;
    if (!isNaN(index) && options[index]) {
        callback(options[index]);
    } else {
        if (onCancel) onCancel();
    }
}

function resetAllSettings() {
        // List of keys to remove from localStorage
        const keysToRemove = [
            'Wi-Fi',
            'Bluetooth',
            'NSFW',
            'Notifications',
            'Location Services',
            'ConnectedWiFi',
            'ConnectedBluetooth',
        ];
    
        // Remove each key from localStorage
        keysToRemove.forEach(key => localStorage.removeItem(key));
    
        alert("🧹 All settings have been reset!");
        location.reload(); // Optional: reload to reflect reset states
    }
    

document.addEventListener('keydown', function(event) {
    if(event.key === "p") {
         resetAllSettings();
     }
 });


