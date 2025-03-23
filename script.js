
document.addEventListener('DOMContentLoaded', () => {
    // Get the profile elements
    const profile1 = document.getElementById('profile1');
    const profile2 = document.getElementById('profile2');
    const profile3 = document.getElementById('profile3');
    
    // Add click event listeners for each profile
    profile1.addEventListener('click', () => {
        localStorage.setItem('activeProfile', 'profile1');
    });
    profile2.addEventListener('click', () => {
        localStorage.setItem('activeProfile', 'profile2');
    });
    profile3.addEventListener('click', () => {
        localStorage.setItem('activeProfile', 'profile3');
    });

    // Load the last message from localStorage
    const lastM_profile1 = document.getElementById("lastM_1");
    const lastM_profile2 = document.getElementById("lastM_2");
    const lastM_profile3 = document.getElementById("lastM_3");

    lastM_profile1.textContent = localStorage.getItem("lastMessage_profile1");
    lastM_profile2.textContent = localStorage.getItem("lastMessage_profile2");
    lastM_profile3.textContent = localStorage.getItem("lastMessage_profile3");
    
    let quests = [];
    quests = loadQuests(quests);
    let notifications = [];
    notifications = loadNotis(notifications);
    console.log(quests);
    console.log(notifications);

    condition(profile2, "chatWithTestname", quests);
    tryPlayingNoti(notifications);
});

function loadQuests(quests){
    const savedQuests = localStorage.getItem("quests");
    let parsedQuests;

    // Check if there's something stored, and parse it back into an array
    if (savedQuests) {
        try{
            parsedQuests = JSON.parse(savedQuests);
        }catch(error){
            console.log("Error while parsing quests!");
        }
        

        if(parsedQuests){
            parsedQuests.forEach(newQuest => {
                const questExists = quests.some(existingQuest => existingQuest.id === newQuest.id || existingQuest.name === newQuest.name);
    
                if (!questExists) {
                    // If the quest does not exist, push it
                    quests.push(newQuest);
                }
            });
        }
        
    } else {
        console.log("Error: no quests found in localstrage");
        quests = []; // If no quests were saved, initialize it as an empty array
    }
    return quests;
}
function loadNotis(noti){
    const savedNotis = localStorage.getItem("notifications");
    
    // Check if there's something stored, and parse it back into an array
    if (savedNotis) {
        const parsedNotis = JSON.parse(savedNotis);

        parsedNotis.forEach(newNot => {
            const notiExists = noti.some(existingNoti => existingNoti.id === newNot.id || existingNoti.name === newNot.name);

            if (!notiExists) {
                // If the quest does not exist, push it
                noti.push(newNot);
            }
        });
    } else {
        console.log("Error: no quests found in localstrage");
        noti = []; // If no quests were saved, initialize it as an empty array
    }
    return noti;
}
function condition(profile, cond, quests){
    let b = false;
    for(let i = 0; i < quests.length; i++){
        if(quests[i].name == cond){
            if(quests[i].completed){
                b = true;
            }
        }
    }
    if(!b){
        profile.style.visibility = "hidden";
        profile.style.display = "none";
    }else{
        profile.style.visibility = "visible";
        profile.style.display = "inherit";
    }
}
function tryPlayingNoti(noti) {
    // Get all notification elements
    const notiBox = document.getElementsByClassName("notification")[0];  // Get the first .notification element
    const notiBox_ = document.getElementById("notification_");  // Get the first .notification element
    const notiName = document.getElementById("notification-name");  // Get the first .notification-name element
    const notiDesc = document.getElementById("notification-description");  // Get the first .notification-description element
    const notiIcon = document.getElementById("notification-icon");  // Get the first .notification-icon element
    

    // Loop through the notifications
    for (let i = 0; i < noti.length; i++) {
        if (noti[i].alerted) {
            console.log("notification was already activated");
            // Do nothing if the notification is already activated
        } else {
            console.log(noti[i].name + " AND " + noti[i].description + " WITH " + noti[i].alerted);
            const notiProfile = document.getElementById("dot" + noti[i].profile);

            // Mark the notification as activated
            noti[i].alerted = true;
            console.log("setting alerted to " + noti[i].alerted);
            // Add animation after a small delay (so they show one after another)
            if (!notiBox) {
                console.log("ERROR: didn't find the container");
            } else {
                console.log("notiBox found!");  // Debugging to confirm `notiBox` is available

                // Set notification content (you can dynamically update the content here)
                notiName.innerText = noti[i].name;
                notiDesc.innerText = noti[i].description;
                notiIcon.src = noti[i].icon || "res/logo.png"; // Use a default icon if no icon is provided
                notiProfile.style.visibility = "visible";

                // Add the 'show' class after the delay (i * 2000 to show notifications sequentially)
                setTimeout(() => {
                    if (notiBox) {
                        console.log("Adding 'show' class to notiBox");
                        notiBox.classList.add('show');  // Make it visible
                        notiBox_.style.opacity = 1;
                    } else {
                        console.log("ERROR: notiBox is undefined during setTimeout");
                    }
                }, i * 2000);  // Delay each notification by 2 seconds (2000 ms)

                // Remove the 'show' class after 5 seconds
                setTimeout(() => {
                    if (notiBox) {
                        console.log("Removing 'show' class from notiBox");
                        notiBox.classList.remove('show');  // Hide the notification after 5 seconds
                        notiBox_.style.opacity = 0;
                    } else {
                        console.log("ERROR: notiBox is undefined during setTimeout");
                    }
                }, (i * 2000) + 5000);  // Remove after 5 seconds (notification stays for 5 seconds)
            }
        }
    }
    saveNotifications(JSON.stringify(noti));
}
function resetNotifications() {
    // Clear the notifications array
    this.notifications = [];
    
    // Clear notifications from localStorage
    localStorage.removeItem("notifications");
    
    console.log("Notifications have been reset.");
}
function saveNotifications(noti){
    localStorage.setItem("notifications", noti);
}

document.addEventListener('keydown', function(event) {
   if(event.key === "p"){
        alert('You just used a button to cheat!');
        resetNotifications();
    }
});
