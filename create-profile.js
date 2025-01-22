document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');
    let messagesList = document.getElementById('messages-list');
    const messageTypeSelect = document.getElementById('messageType');
    const messageContentSection = document.getElementById('message-content-section');
    const imageSection = document.getElementById("imageSection")
    const waitTimeSection = document.getElementById('wait-time-section');
    let messages = [];

    messageTypeSelect.addEventListener('change', () => {
        updateType();
    });
    updateType();

    function updateType(){
        const messageType = messageTypeSelect.value;
        waitTimeSection.style.display = messageType === 'wait' ? 'block' : 'none';
        imageSection.style.display = messageType === "image" ? "block" : "none";
    }

    document.getElementById('add-message-btn').addEventListener('click', () => {
        const messageType = messageTypeSelect.value;
        let message = { type: messageType, options: [], paths: [] };

        message.options[0] = document.getElementById('option1').value;
        message.options[1] = document.getElementById('option2').value;
        message.paths[0] = parseInt(document.getElementById('path1').value, 10);
        message.paths[1]  = parseInt(document.getElementById('path2').value, 10);

        if (messageType === 'text') {
            message.text = document.getElementById('messageContent').value;
        } else if (messageType === 'image') {
            const imageFile = document.getElementById('imageUpload').files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                message.imgUrl = e.target.result;
                addMessageToList(message);
            };
            if (imageFile) {
                reader.readAsDataURL(imageFile);
            }
        } else if (messageType === 'wait') {
            message.minutes = parseInt(document.getElementById('waitTime').value, 10);
        }

        if (messageType !== 'image') {
            addMessageToList(message);
        }
    });

    function addMessageToList(message) {
        messages.push(message);
        const listItem = document.createElement('li');
        listItem.textContent = "" + message.type + ": <<" + message.text + ">> with options " + message.options[0] + " and " + message.options[1] + " leading to paths " + message.paths[0] + " and " + message.paths[1];
        messagesList.appendChild(listItem);
    }

    form.addEventListener('submit', (e) => {
        saveLocal();
        // Add profile saving logic here
    });

    function saveLocal() {
        localStorage.setItem("ownProfileName", document.getElementById('profileName').value);
        localStorage.setItem("ownProfilePic", document.getElementById('profilePic').files[0]);

        // Store messages array as a string (JSON format)
        localStorage.setItem("messages_array", JSON.stringify(messages));
    }

    loadLocal();
    function loadLocal() {
        if (localStorage.getItem("ownProfileName") != null) {
            document.getElementById('profileName').value = localStorage.getItem("ownProfileName");
        }
        if (localStorage.getItem("ownProfilePic") != null) {
            document.getElementById('profilePic').files[0] = localStorage.getItem("ownProfilePic"); // This doesn't work for file preview
        }
    
        const savedMessages = localStorage.getItem("messages_array");
        if (savedMessages) {
            try {
                messages = JSON.parse(savedMessages);
                messagesList.textContent = ""; // Clear the current list
                messages.forEach(message => {
                    addMessageToList(message); // Re-render each message
                });
            } catch (error) {
                console.error("Error parsing messages array from localStorage:", error);
                messages = []; // Initialize with an empty array if parsing fails
            }
        } else {
            messages = []; // If no saved messages, initialize as an empty array
        }
    }
    
    

    form.addEventListener('reset', (e) => {
        clearLocal();
    });


    function clearLocal(){
        localStorage.setItem("ownProfileName", "");
        localStorage.setItem("ownProfilePic", "");

        localStorage.setItem("messages_array", "");
        location.reload;
    }

    form.addEventListener('removeMessage', (e) => {
        deleteLastMessage();
    });

    function deleteLastMessage(){
        if (messages.length > 0) {
            messages.pop();
            messagesList.removeChild(messagesList.lastChild);
            localStorage.setItem("messages_array", JSON.stringify(messages));
            location.reload;
        }
    }
});
