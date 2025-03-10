
class Chat {
    constructor(profileId, QuestManager) {
        this.profileId = profileId;
        this.qm = QuestManager;

        // Initialize gameData properly
        this.gameData = this.gameData || { messages: [] }; // Ensure gameData is always initialized

        // Access the DOM elements
        this.messageDiv = document.getElementById('messages');
        this.optionsDiv = document.getElementById('options');
        this.typingIndicator = document.querySelector('.typing-indicator');

        // Check if the DOM elements are correctly found
        if (!this.messageDiv) {
            console.error("ERROR: Element with id 'messages' not found.");
            return; // Exit constructor early if 'messages' not found
        }
        if (!this.optionsDiv) {
            console.error("ERROR: Element with id 'options' not found.");
            return;
        }
        if (!this.typingIndicator) {
            console.error("ERROR: Element with class 'typing-indicator' not found.");
            return;
        }

        this.message_ = "";
        this.localMessageKey = `chatHistory_${profileId}`; // Profile-specific key
        this.localIndexKey = `currentMessageIndex_${profileId}`; // Profile-specific key
 

        this.bindResetButton();
        // Load chat history
        this.loadChatHistory();

        this.notifications = [];
    }

    setMessages(messages) {
        console.log("Setting messages:", messages); // Log the messages being set
        if (!Array.isArray(messages)) {
            console.error("ERROR: Expected messages to be an array, but got:", messages);
            return;
        }
        this.gameData.messages = messages; // Set the messages
    }

    bindResetButton() {
        const resetButton = document.getElementById('reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetChatHistory());
        }
    }

    loadChatHistory() {
        console.log("Loading chat history...");
        const savedChatHistory = localStorage.getItem(this.localMessageKey);
        const savedMessageIndex = localStorage.getItem(this.localIndexKey);
        this.loadAllNotis();
   
        if (savedChatHistory) {
            this.messageDiv.innerHTML = savedChatHistory;
            this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
        }else {
            this.displayMessage(0);
        }
   
        if (savedMessageIndex) {
            this.gameData.currentMessageIndex = parseInt(savedMessageIndex, 10);
        }
   
        // Start the message rendering process if no message is currently displayed
        if (this.gameData.currentMessageIndex >= 0 && this.gameData.currentMessageIndex < this.gameData.messages.length) {
            this.displayMessage(this.gameData.currentMessageIndex);
        }

    }
   

    saveChatHistory() {
        localStorage.setItem(this.localMessageKey, this.messageDiv.innerHTML); // Use profile-specific key
        localStorage.setItem(this.localIndexKey, this.gameData.currentMessageIndex); // Use profile-specific key
        console.log("saving " + this.message_);
        localStorage.setItem(`lastMessage_${this.profileId}`, this.message_); // Store last message per profile
        
    }

    displayMessage(messageIndex) {
        if (messageIndex >= this.gameData.messages.length){
            return;
        } 
        
        console.log('currentMessageIndex:', this.gameData.currentMessageIndex);
        this.wait = false;

        const message = this.gameData.messages[messageIndex];
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
    
        const modCanvas = document.getElementById("modal");
        modCanvas.style.visibility = "hidden";
        // Handle the type of message (text, image, wait, etc.)
        if (message.type === 'text') {
            messageDiv.textContent = message.text;
            this.message_ = message.text;
        } else if (message.type === 'image') {
            const imgElement = document.createElement('img');
            imgElement.src = message.imgUrl;
            imgElement.alt = 'Image message';
            imgElement.style.maxWidth = '100%';
            messageDiv.appendChild(imgElement);
            this.message_ = "[img]";
          
            imgElement.addEventListener('click', () => this.openPic(imgElement, modCanvas));
        } else if (message.type === "wait"){
            let id = this.qm.getQuestID(message.goal);
            if(this.qm.questIDExist(id)){
                if(this.qm.getQuestProgress(id) == "completed"){
                    this.wait = false;
                    //continue
                }else if(this.qm.getQuestProgress(id) !== "inProgress"){
                    this.qm.startQuest(id);
                    this.wait = true;
                }
                else{
                   alert("you have to wait until you have reached: " + message.goal);
                   this.wait = true;
                }
            }else{
                console.log("Error: quest doesn't exist");
                this.wait = true;
            }
            
        }else if(message.type === "complete"){
            let id = this.qm.getQuestID(message.goal);
            if(this.qm.getQuestProgress(id) == "inProgress"){
                this.qm.completeQuest(id);
            }else if(this.qm.getQuestProgress(id) == "completed"){
                console.log("Quest " + message.goal + " already completed.");
            }else{
                this.qm.startQuest(id);
                this.qm.completeQuest(id);
            }
        }else if(message.type === "create"){
            if(this.qm.questNameExist(message.goal)){
                //Quest already exists
            }else{
               this.qm.addQuest(message.goal, message.description);
            }
            //continue
        }else if(message.type === "createAndWait"){
            if(this.qm.questNameExist(message.goal)){
                console.log("Quest already exists");
            }else{
               this.qm.addQuest(message.goal, message.description);
            }
            let id = this.qm.getQuestID(message.goal);
            if(this.qm.questIDExist(id)){
                if(this.qm.getQuestProgress(id) == "completed"){
                    this.wait = false;
                    //continue
                }else if(this.qm.getQuestProgress(id) != "inProgress"){
                    this.qm.startQuest(id);
                    this.wait = true;
                }
                else{
                   alert("you have to wait until you have reached: " + message.goal);
                   this.wait = true;
                }
            }else{
                console.log("Error: Something went wrong");
                this.wait = true;
            }
        }else if(message.type === "notification"){
            this.addNoti(message.name, message.description, message.icon, message.profile);
            this.playNotification();
            console.log("added notification " + message.name);
        }
    
        // Show typing indicator while the bot is sending messages
        this.typingIndicator.style.display = 'flex';
        this.optionsDiv.style.display = 'none';
    
        // Display the message after the typing delay
        setTimeout(() => {
            this.typingIndicator.style.display = 'none';
            const lastBotMessage = this.messageDiv.querySelector('.message.bot:last-child');
            if (lastBotMessage && lastBotMessage.innerHTML === messageDiv.innerHTML) {
                this.messageDiv.removeChild(lastBotMessage);
            }
            this.messageDiv.appendChild(messageDiv);
            this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
    
            // After displaying the message, check for options
            if (message.options && message.options.length > 0 && !this.wait) {
                // Show options if available
                this.displayOptions(message.options, message.paths);
                this.enableReset();
            } else if(!this.wait) {
                // No options, continue to the next message immediately
                this.displayMessage(messageIndex + 1);
                if(messageIndex != this.gameData.messages.length - 1){
                    this.disableReset();
                }else{
                    this.enableReset();
                }  
            }
    
            this.gameData.currentMessageIndex = messageIndex; // Update currentMessageIndex after each message
            this.saveChatHistory();
        }, 2000); // Typing delay for bot messages
    }
    

    displayOptions(options, paths) {
        this.optionsDiv.innerHTML = '';
        options.forEach((optionText, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option';
            optionButton.textContent = optionText;
            optionButton.onclick = () => this.handleOptionClick(index, paths); // Pass paths to handleOptionClick
            this.optionsDiv.appendChild(optionButton);
        });
        this.optionsDiv.style.display = 'flex';
    }

    handleOptionClick(optionIndex, paths) {
        const currentMessage = this.gameData.messages[this.gameData.currentMessageIndex];
        if (paths[optionIndex] === undefined) {
            console.error('Undefined path for option index: ', optionIndex);
            return;
        }
        const nextMessageIndex = paths[optionIndex];
        const selectedOptionText = currentMessage.options[optionIndex];
    
        // Show user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user';
        userMessageDiv.textContent = `You: ${selectedOptionText}`;
        this.messageDiv.appendChild(userMessageDiv);
    
        // Update current message index to next one in path
        this.gameData.currentMessageIndex = nextMessageIndex;
        localStorage.setItem(this.localIndexKey, nextMessageIndex); // Store index for persistence
    
        // Display the next message according to the selected option
        this.displayMessage(nextMessageIndex);
    }
    

    startTimer(minutes, messageIndex) {
        const timerDiv = document.createElement('div');
        timerDiv.className = 'timer';
        this.messageDiv.appendChild(timerDiv); // Corrected reference to this.messageDiv

        const endTime = Date.now() + minutes * 60 * 1000;
        localStorage.setItem('endTime', endTime);

        const interval = setInterval(() => {
            const remainingTime = localStorage.getItem('endTime') - Date.now();
            if (remainingTime <= 0) {
                clearInterval(interval);
                this.messageDiv.removeChild(timerDiv); // Corrected reference to this.messageDiv
                this.gameData.currentMessageIndex = messageIndex + 1; // Update the current message index
                this.displayMessage(this.gameData.currentMessageIndex);
                localStorage.setItem('newMessage', 'true');
                localStorage.removeItem('endTime');
                const profileElement = document.getElementById('profile1');
                profileElement.querySelector('.notification').classList.add('active'); // Activate notification
            } else {
                const minutesLeft = Math.floor(remainingTime / 60000);
                const secondsLeft = Math.floor((remainingTime % 60000) / 1000);
                timerDiv.textContent = `Next message in: ${minutesLeft}m ${secondsLeft}s`;
                localStorage.setItem('timer', timerDiv.textContent);
            }
        }, 1000);
    }

    saveProgress() {
        localStorage.setItem('chatHistory', this.messageDiv.innerHTML); // Corrected reference to this.messageDiv
        localStorage.setItem('currentMessageIndex', this.gameData.currentMessageIndex);
        const endTime = localStorage.getItem('endTime');
        if (endTime) {
            localStorage.setItem('endTime', endTime);
        }
    }

    resetChatHistory() {
        console.log("Resetting chat history...");
        localStorage.removeItem(this.localMessageKey);
        localStorage.removeItem(this.localIndexKey);
        localStorage.removeItem(`lastMessage_${this.profileId}`);
   
        this.messageDiv.innerHTML = '';
        this.gameData.currentMessageIndex = 0;
        this.displayMessage(0);
   
        this.optionsDiv.innerHTML = ''; 
        this.optionsDiv.style.display = 'none';  // Ensure optionsDiv is hidden
        this.resetNotifications();
   }
   
   openPic(img, modCanvas) {
       modCanvas.style.visibility = "visible";

       this.disableReset();

       const picSlot = document.getElementById("modal-img");
       picSlot.src = img.src;

       const close_btn = document.getElementById("close-btn");
       close_btn.addEventListener('click', () => this.closePic(modCanvas, picSlot))
       
     
   }

   closePic(modCanvas, picSlot){
       modCanvas.style.visibility = "hidden";
       this.enableReset();
       picSlot.src = "";
   }

   disableReset(){
    const resetButton = document.getElementById("reset-button")
    if(resetButton){
        resetButton.disabled = true;
        resetButton.style.backgroundColor = "#ccc";
        resetButton.style.cursor = "not-allowed";
    }
}
   enableReset(){
const resetButton = document.getElementById("reset-button")
if(resetButton){
    resetButton.disabled = false;
    resetButton.style.backgroundColor = "";
    resetButton.style.cursor = "";
}
}

addQuestToProfile(name, description) {
    this.qm.addQuest(name, description);
    this.qm.saveAllQuests();  // Ensure the quest is saved globally for all profiles
}

// Example method to complete a quest
completeQuestInProfile(questId) {
    this.qm.completeQuest(questId);
    this.qm.saveAllQuests();  // Ensure the quest completion is saved globally
}

loadAllNotis(){
    if(!this.notifications) {
        this.notifications = [];
    }

    const savedNotis = localStorage.getItem("notifications");
    console.log(savedNotis);

    if (savedNotis) {
        const parsedNotis = JSON.parse(savedNotis);

        parsedNotis.forEach(newNot => {
            const notiExists = this.notifications.some(existingNoti => existingNoti.id === newNot.id || existingNoti.name === newNot.name);

            if (!notiExists) {
                // If the quest does not exist, push it
                this.notifications.push(newNot);
            }
        });
    } else {
        console.log("Error: no notifications found in localstrage");
        this.notifications = []; // If no quests were saved, initialize it as an empty array
    }
}

addNoti(name, description, icon_, profile_) {
    const newNot = {
        id: this.notifications.length + 1,
        name: name,
        description: description,
        alerted: false,
        icon: icon_,
        profile: profile_
    };
    this.notifications.push(newNot);
    this.saveNotifications();  
}

resetNotifications() {
    // Clear the notifications array
    this.notifications = [];
    
    // Clear notifications from localStorage
    localStorage.removeItem("notifications");
    
    console.log("Notifications have been reset.");
}

playNotification(){
        // Get all notification elements
        const notiBox_ = document.getElementById("notification_");  // Get the first .notification element
        const notiName = document.getElementById("notification-name");  // Get the first .notification-name element
        const notiDesc = document.getElementById("notification-description");  // Get the first .notification-description element
        const notiIcon = document.getElementById("notification-icon");  // Get the first .notification-icon element
   
       
     
        notiName.innerText = "You just got a new notification!";
        notiDesc.innerText = "Turn back to the main screen and find out.";
        notiIcon.src = "res/alerted.png"; // Use a default icon if no icon is provided
    
                    // Add the 'show' class after the delay (i * 2000 to show notifications sequentially)
       setTimeout(() => {
                if (notiBox_) {      
                  notiBox_.style.opacity = 1;
                } else {
                     console.log("ERROR: notiBox_ is undefined during setTimeout");
                 }
            }, 1 * 2000);  // Delay each notification by 2 seconds (2000 ms)
    
            //  after 5 seconds
               setTimeout(() => {
                    if (notiBox_) {
                            notiBox_.style.opacity = 0;
                        } else {
                            console.log("ERROR: notiBox_ is undefined during setTimeout");
                        }
                }, (1 * 2000) + 5000);  
       }
     
        
    



saveNotifications(){
    console.log("saving " + this.notifications);
    localStorage.setItem("notifications", JSON.stringify(this.notifications))
}
    
}

export default Chat;
