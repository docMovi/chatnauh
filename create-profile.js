document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');
    const messagesList = document.getElementById('messages-list');
    const messageTypeSelect = document.getElementById('messageType');
    const messageContentSection = document.getElementById('message-content-section');
    const messageOptionsSection = document.getElementById('message-options-section');
    const waitTimeSection = document.getElementById('wait-time-section');
    let messages = [];

    messageTypeSelect.addEventListener('change', () => {
        const messageType = messageTypeSelect.value;
        messageContentSection.style.display = messageType === 'text' || messageType === 'image' ? 'block' : 'none';
        messageOptionsSection.style.display = messageType === 'text' || messageType === 'image' || messageType === 'wait' ? 'block' : 'none';
        waitTimeSection.style.display = messageType === 'wait' ? 'block' : 'none';
    });

    document.getElementById('add-message-btn').addEventListener('click', () => {
        const messageType = messageTypeSelect.value;
        let message = { type: messageType, options: [], paths: [] };

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

        const option1 = document.getElementById('option1').value;
        const path1 = parseInt(document.getElementById('path1').value, 10);
        const option2 = document.getElementById('option2').value;
        const path2 = parseInt(document.getElementById('path2').value, 10);
        
        if (option1 && !isNaN(path1)) {
            message.options.push(option1);
            message.paths.push(path1);
        }
        if (option2 && !isNaN(path2)) {
            message.options.push(option2);
            message.paths.push(path2);
        }
    });

    function addMessageToList(message) {
        messages.push(message);
        const listItem = document.createElement('li');
        listItem.textContent = `${message.type}: ${JSON.stringify(message)}`;
        messagesList.appendChild(listItem);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const profileName = document.getElementById('profileName').value;
        const profilePic = document.getElementById('profilePic').files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const profilePicURL = e.target.result;
            
            const profile = {
                name: profileName,
                profilePic: profilePicURL,
                messages: messages
            };

            let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
            profiles.push(profile);
            localStorage.setItem('profiles', JSON.stringify(profiles));

            addProfileToIndex(profile);
            window.location.href = 'index.html';
        };

        if (profilePic) {
            reader.readAsDataURL(profilePic);
        }
    });

    function addProfileToIndex(profile) {
        const profileContainer = document.querySelector('.profile-container');

        const profileDiv = document.createElement('div');
        profileDiv.className = 'profile-';

        const profileLink = document.createElement('a');
        profileLink.href = 'test.html'; // Ideally, you create a unique profile page for each profile
        const profileImg = document.createElement('img');
        profileImg.src = profile.profilePic;
        profileImg.alt = 'profilePic';
        profileLink.appendChild(profileImg);

        const profileName = document.createElement('h2');
        profileName.textContent = profile.name;

        profileDiv.appendChild(profileLink);
        profileDiv.appendChild(profileName);
        profileContainer.appendChild(profileDiv);
    }
});
