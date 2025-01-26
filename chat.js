class Chat { 

    constructor(profileId) {
        this.profileId = profileId;

        // Initialize gameData properly
        this.gameData = this.gameData || { messages: [] }; // Ensure gameData is always initialized

        // Access the DOM elements
        this.messageDiv = document.getElementById('messages');
        this.optionsDiv = document.getElementById('options');
        this.typingIndicator = document.querySelector('.typing-indicator');

        // Check if the DOM elements are correctly found
        if (!this.messageDiv) {
            console.error("ERROR: Element with id 'messages' not found.");
            return; // Exit constructor early if 'messages' is not found
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
        this.localMessageKey = `chatHistory_${profileId}`;
        this.localIndexKey = `currentMessageIndex_${profileId}`;
        this.localTimeKey = `endTime_&${profileId}`;
        
        this.bindResetButton();
        // Load chat history
        this.loadChatHistory();
    }

    setMessages(messages) {
        console.log("Setting messages:", messages); // Log the messages being set
        // Ensure the messages are valid and gameData.messages is an array
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
        const savedChatHistory = localStorage.getItem('chatHistory');
        const savedMessageIndex = localStorage.getItem('currentMessageIndex');
        
        if (savedChatHistory) {
            this.messageDiv.innerHTML = savedChatHistory;
            this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
        }
        
        if (savedMessageIndex) {
            this.gameData.currentMessageIndex = parseInt(savedMessageIndex, 10);
        }
    }

    saveChatHistory() {
        localStorage.setItem('chatHistory', this.messageDiv.innerHTML); // Corrected reference to this.messageDiv
        localStorage.setItem('currentMessageIndex', this.gameData.currentMessageIndex);
        console.log("saving " + this.message_);
        localStorage.setItem('lastMessage', this.message_);
    }

    displayMessage(messageIndex) {
        if (messageIndex >= this.gameData.messages.length) return;

        const message = this.gameData.messages[messageIndex];
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';

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
        } else if (message.type === 'wait') {
            this.startTimer(message.minutes, messageIndex);
            this.optionsDiv.style.display = 'none';
        }

        this.typingIndicator.style.display = 'flex';
        this.optionsDiv.style.display = 'none';

        setTimeout(() => {
            this.typingIndicator.style.display = 'none';
            const lastBotMessage = this.messageDiv.querySelector('.message.bot:last-child');
            if (lastBotMessage && lastBotMessage.innerHTML === messageDiv.innerHTML) {
                this.messageDiv.removeChild(lastBotMessage);
            }
            this.messageDiv.appendChild(messageDiv);
            this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
            this.displayOptions(message.options);
            this.saveChatHistory();
        }, 2000);
    }

    displayOptions(options) {
        this.optionsDiv.innerHTML = '';
        options.forEach((optionText, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option';
            optionButton.textContent = optionText;
            optionButton.onclick = () => this.handleOptionClick(index); // Corrected reference to this.handleOptionClick
            this.optionsDiv.appendChild(optionButton);
        });
        this.optionsDiv.style.display = 'flex';
    }

    handleOptionClick(optionIndex) {
        const currentMessage = this.gameData.messages[this.gameData.currentMessageIndex];
        if (currentMessage.paths[optionIndex] === undefined) {
            console.error('Undefined path for option index: ', optionIndex);
            return;
        }
        const nextMessageIndex = currentMessage.paths[optionIndex];
        const selectedOptionText = currentMessage.options[optionIndex];
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user';
        userMessageDiv.textContent = `You: ${selectedOptionText}`;
        this.messageDiv.appendChild(userMessageDiv); // Corrected reference to this.messageDiv
        localStorage.setItem('currentMessageIndex', nextMessageIndex);
        this.gameData.currentMessageIndex = nextMessageIndex;
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
        localStorage.removeItem('chatHistory');
        localStorage.removeItem('currentMessageIndex');
        localStorage.removeItem('endTime');
        localStorage.removeItem('timer');
        
        this.messageDiv.innerHTML = '';  // Clear the messages container
        this.gameData.currentMessageIndex = 0;  // Reset to the first message
        
        // Display the first message again
        this.displayMessage(0);
        
        this.optionsDiv.innerHTML = '';  // Clear options if any
        this.optionsDiv.style.display = 'none';  // Hide options initially
    }

    loadSavedTimer() {
        const endTime = localStorage.getItem('endTime');
        if (endTime) {
            const remainingTime = endTime - Date.now();
            if (remainingTime > 2000) {  // If more than 2 seconds
                this.startTimer(remainingTime / 60000, this.gameData.currentMessageIndex - 1); // Corrected reference to this.startTimer
            } else {
                // If less than or equal to 2 seconds, wait for 2 seconds
                setTimeout(() => {
                    this.gameData.currentMessageIndex = parseInt(localStorage.getItem('currentMessageIndex'), 10) || 0;
                    if (this.gameData.messages[this.gameData.currentMessageIndex - 1]?.type === 'wait') {
                        this.gameData.currentMessageIndex++;
                    }
                    this.displayMessage(this.gameData.currentMessageIndex);
                    const profileElement = document.getElementById('profile1'); // Double-check that profile1 is always the right profile.
                    profileElement.querySelector('.notification').classList.add('active'); // Activate notification
                    localStorage.removeItem('endTime');
                }, remainingTime);
            }
        } else {
            this.displayMessage(this.gameData.currentMessageIndex);
        }
    }
}

export default Chat;
