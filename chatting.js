import Chat from "./chat.js";
import quests from "./questManager.js";

import profile1Messages from "./test.js";
import profile2Messages from "./profile2.js";
import profile3Messages from "./profile3.js"; 

const activeProfile = localStorage.getItem('activeProfile');
const userChat = new Chat(activeProfile, quests);

document.addEventListener('DOMContentLoaded', () => {
    quests.loadAllQuests();
    setUpActiveProfile(activeProfile);
    console.log(localStorage.getItem("quests"));
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
        case 'profile3':
            messages = profile3Messages;
            break; 
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
        profilePic.src = 'https://cdni.pornpics.de/1280/3/3/80655471/80655471_010_4a0d.jpg';  
        profileName.textContent = 'Testname3'; 
    }
}
function setUpQuests(qm){
    console.log("checking Quests");
    qm.addQuest("chatWithTestname", "chat with testname to unlock Ava");
    qm.checkAllQuestStatus();
}

function completeQuest(id, qm){
    qm.completeQuest(id);
}

//INPUT MACHINE
document.addEventListener('keydown', function(event) {
    if(event.key === "t") {
        alert('You just used a button to cheat!');
        completeQuest(quests.getQuestID("chatWithAva"), quests);
        quests.saveAllQuests();  
    }else if(event.key === "p"){
        alert('You just used a button to cheat!');
        quests.resetAllQuests();
    }
});

quests.loadAllQuests();