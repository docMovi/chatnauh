import Chat from "./chat.js";
import QuestManager from "./questManager.js";

import profile1Messages from "./test.js";
import profile2Messages from "./profile2.js";
//import profile3Messages from "./profile3.js"; 

const quests = new QuestManager();
const activeProfile = localStorage.getItem('activeProfile');
const userChat = new Chat(activeProfile, quests);

document.addEventListener('DOMContentLoaded', () => {
    setUpActiveProfile(activeProfile);
    setUpQuests(quests);
});

function setUpActiveProfile(activeProfile) {
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
function setUpQuests(qm){
    qm.addQuest("chatWithAva", "this is an example quest. Chat with Ava for the first time");
    qm.startQuest(qm.getQuestID("chatWithAva"));
    completeQuest(qm.getQuestID("chatWithAva"), qm);
    qm.checkAllQuestStatus();
}

function completeQuest(id, qm){
    qm.completeQuest(id);
    userChat.questUpdate("chatWithAva");
}