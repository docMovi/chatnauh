function getAllChats() {
    const raw = localStorage.getItem("customChats");
    return raw ? JSON.parse(raw) : [];
  }
  
  function saveChat(chat) {
    const chats = getAllChats();
    const existing = chats.findIndex(c => c.id === chat.id);
    if (existing !== -1) {
      chats[existing] = chat;
    } else {
      chats.push(chat);
    }
    localStorage.setItem("customChats", JSON.stringify(chats));
  }
  
  function getChatById(id) {
    return getAllChats().find(c => c.id === id);
  }
  
  function deleteChat(id) {
    const updated = getAllChats().filter(c => c.id !== id);
    localStorage.setItem("customChats", JSON.stringify(updated));
  }
  