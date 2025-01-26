import Chat from "./chat.js";
import profile1Messages from "./test.js";

document.addEventListener('DOMContentLoaded', () => {
    const user1Chat = new Chat('profile1');
    user1Chat.setMessages(profile1Messages);

    user1Chat.loadChatHistory();
    user1Chat.loadSavedTimer();
});