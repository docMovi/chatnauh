import Chat from "./chat.js";
import profile1Messages from "./test.js";
import profile2Messages from "./profile2.js";
//import profile3Messages from "./profile3.js";  // Assuming profile3Messages exist

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the active profile from localStorage
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

    // Initialize the chat for the selected profile
    const userChat = new Chat(activeProfile);
    userChat.setMessages(messages);

    // Load chat history and timer if applicable
    userChat.loadChatHistory();


    if (activeProfile === 'profile1') {
        profilePic.src = 'res/test/pfp.jpg';  // Set image for profile1
        profileName.textContent = 'Testname'; // Set name for profile1
    } else if (activeProfile === 'profile2') {
        profilePic.src = 'res/2prof/pfp.jpg';  // Set image for profile2
        profileName.textContent = 'Ava Marie'; // Set name for profile2
    } else if (activeProfile === 'profile3') {
        profilePic.src = 'res/test/pfp.jpg';  // Set image for profile3
        profileName.textContent = 'Testname3'; // Set name for profile3
    }

});
