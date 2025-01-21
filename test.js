document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const optionsDiv = document.getElementById('options');
    const typingIndicator = document.querySelector('.typing-indicator');

    const gameData = {
        messages: [
            { type: 'text', text: "Hey! How's it going?", options: ["Good, you?", "Not so great."], paths: [1, 2] },
            { type: 'text', text: "Same here. What are you doing?", options: ["Just chilling.", "Working on a project."], paths: [3, 4] },
            { type: 'text', text: "Oh no! Anything I can help with?", options: ["Not really.", "Maybe."], paths: [5, 6] },
            { type: 'text', text: "Cool! do you want to know a secret?", options: ["Sure!", "Nah."], paths: [7, 11] },
            { type: 'text', text: "Sounds cool! What project are you working on?", options: ["A web app.", "A school assignment."], paths: [9, 10] },
            { type: 'text', text: "Alright, let me know if you change your mind.", options: [], paths: [] }, // 5
            { type: 'text', text: "I'm here to help!", options: ["you wouldnt understand", "Thanks, but I don't know.."], paths: [7, 7] }, // 6
            { type: 'text', text: "Maybe I'd like to send you a picture", options: ["oh okay", "please dont"], paths: [8, 11] }, // 7
            { type: 'image', imgUrl: "res/test/pic.png", options: ["Thanks"], paths: [11, 11] }, // 8
            { type: 'text', text: "That's awesome! Good luck with the web app.", options: ["..."], paths: [12] }, // 9
            { type: 'text', text: "Best of luck with your assignment!", options: ["..."], paths: [12] }, // 10
            { type: 'text', text: "Have a nice day then!", options: ["...", "See you"], paths: [12, 12] }, // 11
            { type: 'wait', minutes: 1, options: [], paths: [13] }, // 12
            { type: 'text', text: "Hi!", options: ["Hi, how are you?", "What do you want?"], paths: [14, 15]}, // 13
            { type: 'text', text: "good! How are you?", options: ["Better", "Good"], paths: [16, 17]}, // 14
            { type: 'text', text: "Well.. What are you doing?", options: ["Depends", "Nothing really"], paths: [17, 18]}, // 15
        ],
        currentMessageIndex: 0
    };

    function saveChatHistory() {
        localStorage.setItem('chatHistory', messagesDiv.innerHTML);
        localStorage.setItem('currentMessageIndex', gameData.currentMessageIndex);
    }

    function loadChatHistory() {
        const savedChatHistory = localStorage.getItem('chatHistory');
        const savedMessageIndex = localStorage.getItem('currentMessageIndex');
        if (savedChatHistory) {
            messagesDiv.innerHTML = savedChatHistory;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        if (savedMessageIndex) {
            gameData.currentMessageIndex = parseInt(savedMessageIndex, 10);
        }
    }

    function displayMessage(messageIndex) {
        if (messageIndex >= gameData.messages.length) return;

        const message = gameData.messages[messageIndex];
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';

        if (message.type == 'text') {
            messageDiv.textContent = message.text;
        } else if (message.type == 'image') {
            const imgElement = document.createElement('img');
            imgElement.src = message.imgUrl;
            imgElement.alt = 'Image message';
            imgElement.style.maxWidth = '100%';
            messageDiv.appendChild(imgElement);
        } else if (message.type == 'wait') {
            startTimer(message.minutes, messageIndex);
            optionsDiv.style.display = 'none';
        }

        typingIndicator.style.display = 'flex';
        optionsDiv.style.display = 'none';

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const lastBotMessage = messagesDiv.querySelector('.message.bot:last-child');
            if (lastBotMessage && lastBotMessage.innerHTML === messageDiv.innerHTML) {
                messagesDiv.removeChild(lastBotMessage);
            }
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            displayOptions(message.options);
            saveChatHistory();
        }, 2000);
    }

    function displayOptions(options) {
        optionsDiv.innerHTML = '';
        options.forEach((optionText, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option';
            optionButton.textContent = optionText;
            optionButton.onclick = () => handleOptionClick(index);
            optionsDiv.appendChild(optionButton);
        });
        optionsDiv.style.display = 'flex';
    }

    function handleOptionClick(optionIndex) {
        const currentMessage = gameData.messages[gameData.currentMessageIndex];
        const nextMessageIndex = currentMessage.paths[optionIndex];
        const selectedOptionText = currentMessage.options[optionIndex];
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user';
        userMessageDiv.textContent = `You: ${selectedOptionText}`;
        messagesDiv.appendChild(userMessageDiv);
        localStorage.setItem('currentMessageIndex', nextMessageIndex);
        gameData.currentMessageIndex = nextMessageIndex;
        displayMessage(nextMessageIndex);
    }
    function startTimer(minutes, messageIndex) {
        const timerDiv = document.createElement('div');
        timerDiv.className = 'timer';
        messagesDiv.appendChild(timerDiv);
    
        const endTime = Date.now() + minutes * 60 * 1000;
        localStorage.setItem('endTime', endTime);
    
        const interval = setInterval(() => {
            const remainingTime = localStorage.getItem('endTime') - Date.now();
            if (remainingTime <= 0) {
                clearInterval(interval);
                messagesDiv.removeChild(timerDiv);
                gameData.currentMessageIndex = messageIndex + 1; // Update the current message index
                displayMessage(gameData.currentMessageIndex);
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
    
   
    
    
    
    loadChatHistory();
    document.getElementById('back-link').addEventListener('click', saveProgress);
    document.getElementById('reset-button').addEventListener('click', resetChatHistory);

    function saveProgress() {
        localStorage.setItem('chatHistory', messagesDiv.innerHTML);
        localStorage.setItem('currentMessageIndex', gameData.currentMessageIndex);
        const endTime = localStorage.getItem('endTime');
        if (endTime) {
            localStorage.setItem('endTime', endTime);
        }
    }

    function resetChatHistory() {
        localStorage.removeItem('chatHistory');
        localStorage.removeItem('currentMessageIndex');
        localStorage.removeItem('endTime');
        localStorage.removeItem('timer');
        messagesDiv.innerHTML = '';
        gameData.currentMessageIndex = 0;
        // Ensure to display the first message again
        displayMessage(0);
        optionsDiv.innerHTML = ''; // Clear options if any
        optionsDiv.style.display = 'none'; // Hide options initially
    }
    
    function loadSavedTimer() {
        const endTime = localStorage.getItem('endTime');
        if (endTime) {
            const remainingTime = endTime - Date.now();
            if (remainingTime > 2000) {  // If more than 2 seconds
                startTimer(remainingTime / 60000, gameData.currentMessageIndex - 1);
            } else {
                // If less than or equal to 2 seconds, wait for 2 seconds
                setTimeout(() => {
                    gameData.currentMessageIndex = parseInt(localStorage.getItem('currentMessageIndex'), 10) || 0;
                    if (gameData.messages[gameData.currentMessageIndex - 1]?.type === 'wait') {
                        gameData.currentMessageIndex++;
                    }
                    displayMessage(gameData.currentMessageIndex);
                    const profileElement = document.getElementById('profile1'); // Double-check that profile1 is always the right profile.
                    profileElement.querySelector('.notification').classList.add('active'); // Activate notification
                    localStorage.removeItem('endTime');
                }, remainingTime);
            }
        } else {
            displayMessage(gameData.currentMessageIndex);
        }
    
    }
    
    
    loadSavedTimer();
    
    if (!localStorage.getItem('endTime')) {
        displayMessage(gameData.currentMessageIndex);
    }
    
    
});
