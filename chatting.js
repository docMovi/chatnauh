import Chat from "./chat.js";
import QuestManager from "./questManager.js";

import profile1Messages from "./test.js";
import profile2Messages from "./profile2.js";
//import profile3Messages from "./profile3.js"; 

document.addEventListener('DOMContentLoaded', () => {
    setUpActiveProfile();
    setUpQuests();
});

function setUpActiveProfile() {
    const activeProfile = localStorage.getItem('activeProfile');
    if (!activeProfile) {
        console.error("No active profile found!");
        return;
    }

    let messages;
    
    // Based on the active profile, load the correct set of messages
    switch(activeProfile) {
        case 'profile1':
            messages = profile1Messages;
            break;
        case 'profile2':
            messages = profile2Messages;
            break;
       /* case 'profile3':
            messages = profile3Messages;
            break; */
        default:
            console.error('Unknown profile selected!');
            return;
    }

    const userChat = new Chat(activeProfile);
    userChat.setMessages(messages);

    // Load chat history 
    userChat.loadChatHistory();

    if (activeProfile === 'profile1') {
        profilePic.src = 'res/test/pfp.jpg';  // Set image for profile1
        profileName.textContent = 'Testname'; // Set name for profile1
    } else if (activeProfile === 'profile2') {
        profilePic.src = 'res/2prof/pfp.jpg';  
        profileName.textContent = 'Ava Marie'; 
    } else if (activeProfile === 'profile3') {
        profilePic.src = 'res/test/pfp.jpg';  
        profileName.textContent = 'Testname3'; 
    }
}
function setUpQuests(){
    
}