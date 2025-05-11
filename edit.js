document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get("id");
  
    if (!chatId) {
      alert("No chat ID provided!");
      window.location.href = "index.html";
      return;
    }
  
    const chat = getChatById(chatId);
    if (!chat) {
      alert("Chat not found!");
      window.location.href = "index.html";
      return;
    }
  
    const chatNameInput = document.getElementById("chatName");
    const chatImageUrlInput = document.getElementById("chatImageUrl");
    const chatImagePreview = document.getElementById("chatImagePreview");
  
    chatNameInput.value = chat.name || "";
    chatImageUrlInput.value = chat.imageUrl || "";
    chatImagePreview.src = chat.imageUrl || "res/pr/unknown.png";
  
    chatImageUrlInput.addEventListener("input", () => {
      chatImagePreview.src = chatImageUrlInput.value || "res/pr/unknown.png";
    });
  
    const messagesContainer = document.getElementById("messagesContainer");
    const addMessageBtn = document.getElementById("addMessageBtn");
    const saveBtn = document.getElementById("saveBtn");
    const exportBtn = document.getElementById("exportBtn");
    const previewBTN = document.getElementById("previewBtn");
  
    const messageTemplate = document.getElementById("messageTemplate");
    const optionTemplate = document.getElementById("optionTemplate");
  
    let messages = chat.messages || [];
    let messageCount = messages.length;
  
    // RENDER EXISTING MESSAGES
    messages.forEach((msg, index) => {
      renderMessage(msg, index + 1);
    });
  
    // BUTTONS
    addMessageBtn.addEventListener("click", () => {
      const newMessage = {
        type: "text",
        text: "",
        options: [],
        paths: []
      };
      messages.push(newMessage);
      renderMessage(newMessage, ++messageCount);
  
      // Optional: Scroll zur neu hinzugefügten Nachricht
      setTimeout(() => {
        messagesContainer.lastElementChild?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    });
  
    saveBtn.addEventListener("click", () => {
      chat.name = chatNameInput.value;
      chat.imageUrl = chatImageUrlInput.value;
      chat.messages = messages;
      saveChat(chat);
      alert("Chat saved!");
    });
  
    exportBtn.addEventListener("click", () => {
      const safeName = chat.name.replace(/\s+/g, "_");
      const fileContent = `const ${safeName}Messages = ${JSON.stringify(messages, null, 2)};\n\nexport default ${safeName}Messages;`;
      const blob = new Blob([fileContent], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeName}.js`;
      a.click();
      URL.revokeObjectURL(url);
    });

    previewBTN.addEventListener("click", () => {
      alert("trying preview");
    });
  
    // === MESSAGE RENDERING ===
    function renderMessage(msg, index) {
      const messageClone = messageTemplate.content.cloneNode(true);
      const card = messageClone.querySelector(".message-card");
      const title = card.querySelector(".message-title");
      const toggleBtn = card.querySelector(".toggle-btn");
      const body = card.querySelector(".message-body");
      const addOptionBtn = card.querySelector(".add-option-btn");
      const optionsList = card.querySelector(".options-list");
  
      card.dataset.index = index - 1;
      title.textContent = `Message ${index}`;
  
      toggleBtn.addEventListener("click", () => {
        const isVisible = body.style.display === "block";
        body.style.display = isVisible ? "none" : "block";
        toggleBtn.textContent = isVisible ? "▼" : "▲";
      });

      const deleteBtn = card.querySelector(".delete-message-btn");

        deleteBtn.addEventListener("click", () => {
        const confirmDelete = confirm(`Delete Message ${index}?`);
        if (!confirmDelete) return;

        // Remove from data and re-render all
        messages.splice(index - 1, 1);
        messageCount--;
        messagesContainer.innerHTML = "";
        messages.forEach((m, i) => renderMessage(m, i + 1));
        });
    
      const typeSelect = card.querySelector(".msg-type");
      const contentInput = card.querySelector(".msg-content");
      typeSelect.value = msg.type || "text";
      contentInput.value = msg.text || msg.imgUrl || "";
  
      typeSelect.addEventListener("change", () => {
        msg.type = typeSelect.value;
      });
  
      contentInput.addEventListener("input", () => {
        if (msg.type === "image" || msg.type === "video") {
          msg.imgUrl = contentInput.value;
        } else {
          msg.text = contentInput.value;
        }
      });
  
      // OPTION HANDLING
      addOptionBtn.addEventListener("click", () => {
        const optionClone = optionTemplate.content.cloneNode(true);
        const optionElement = optionClone.querySelector(".option"); // ← this is the actual .option div
        const pathDropdown = optionClone.querySelector(".path-dropdown");
        const optionText = optionClone.querySelector(".option-text");
        const deleteOptionBtn = optionClone.querySelector(".delete-option-btn");
      
        updatePathDropdown(pathDropdown, messages);
      
        msg.options.push("");
        msg.paths.push(0);
        const index = msg.options.length - 1;
      
        optionText.addEventListener("input", () => {
          msg.options[index] = optionText.value;
        });
      
        pathDropdown.addEventListener("change", () => {
          msg.paths[index] = parseInt(pathDropdown.value);
        });
      
        deleteOptionBtn.addEventListener("click", () => {
          msg.options.splice(index, 1);
          msg.paths.splice(index, 1);
          optionsList.removeChild(optionElement); // ✅ remove the actual .option div, not the template fragment
        });
      
        optionsList.appendChild(optionElement); // ✅ append actual .option div, not the fragment
      });
      
      // Bestehende Optionen anzeigen
      if (msg.options?.length) {
        msg.options.forEach((option, i) => {
          const optionClone = optionTemplate.content.cloneNode(true);
          const pathDropdown = optionClone.querySelector(".path-dropdown");
          const optionText = optionClone.querySelector(".option-text");
          const deleteOptionBtn = optionClone.querySelector(".delete-option-btn");
  
          optionText.value = option;
          updatePathDropdown(pathDropdown, messages);
          pathDropdown.value = msg.paths[i];
  
          optionText.addEventListener("input", () => {
            msg.options[i] = optionText.value;
          });
  
          pathDropdown.addEventListener("change", () => {
            msg.paths[i] = parseInt(pathDropdown.value);
          });
  
          deleteOptionBtn.addEventListener("click", () => {
            msg.options.splice(i, 1);
            msg.paths.splice(i, 1);
            optionsList.removeChild(optionClone);
          });
  
          optionsList.appendChild(optionClone);
        });
      }
  
      messagesContainer.appendChild(messageClone);
    }
  
    // PATH DROPDOWN
    function updatePathDropdown(dropdown, messages) {
      dropdown.innerHTML = "";
      messages.forEach((_, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `Message ${i + 1}`;
        dropdown.appendChild(opt);
      });
    }
  
    // === STORAGE HELPERS ===
    function getChatById(id) {
      const allChats = JSON.parse(localStorage.getItem("customChats") || "[]");
      return allChats.find(c => c.id === id);
    }
  
    function saveChat(updatedChat) {
      const allChats = JSON.parse(localStorage.getItem("customChats") || "[]");
      const index = allChats.findIndex(c => c.id === updatedChat.id);
      if (index !== -1) {
        allChats[index] = updatedChat;
      } else {
        allChats.push(updatedChat);
      }
      localStorage.setItem("customChats", JSON.stringify(allChats));
    }
  });
  