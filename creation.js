document.addEventListener("DOMContentLoaded", () => {
    const chatList = document.getElementById("chatList");
  
    function renderChats() {
      chatList.innerHTML = "";
      const chats = getAllChats();
  
      if (chats.length === 0) {
        chatList.innerHTML = "<p>No chats created yet.</p>";
        return;
      }
  
      chats.forEach(chat => {
        const card = document.createElement("div");
        card.className = "chat-card";
  
        const img = document.createElement("img");
        img.src = chat.imageUrl || "https://via.placeholder.com/80";
        img.alt = chat.name;
        img.className = "chat-thumb";
  
        const name = document.createElement("h3");
        name.textContent = chat.name || "Unnamed Chat";
  
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
          window.location.href = `edit.html?id=${chat.id}`;
        };
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
          if (confirm(`Delete chat "${chat.name}"?`)) {
            deleteChat(chat.id);
            renderChats();
          }
        };
  
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);
  
        chatList.appendChild(card);
      });
    }
  
    window.createNewChat = () => {
      const newId = "chat-" + Date.now();
      const newChat = {
        id: newId,
        name: "New Chat",
        imageUrl: "",
        messages: []
      };
      saveChat(newChat);
      window.location.href = `edit.html?id=${newId}`;
    };
  
    renderChats();
  });
  