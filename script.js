
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
    console.log(quests);

    condition(profile2, "chatWithTestname", quests);
});

function loadQuests(quests){
    const savedQuests = localStorage.getItem("quests");
    
    // Check if there's something stored, and parse it back into an array
    if (savedQuests) {
        const parsedQuests = JSON.parse(savedQuests);

        parsedQuests.forEach(newQuest => {
            const questExists = quests.some(existingQuest => existingQuest.id === newQuest.id || existingQuest.name === newQuest.name);

            if (!questExists) {
                // If the quest does not exist, push it
                quests.push(newQuest);
            }
        });
    } else {
        console.log("Error: no quests found in localstrage");
        quests = []; // If no quests were saved, initialize it as an empty array
    }
    return quests;
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