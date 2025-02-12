document.addEventListener('DOMContentLoaded', () => {
    // Get the profile elements
    const profile1 = document.getElementById('profile1');
    const profile2 = document.getElementById('profile2');
    const profile3 = document.getElementById('profile3');
    
    // Add click event listeners for each profile
    profile1.addEventListener('click', () => {
        localStorage.setItem('activeProfile', 'profile1');
    });
    profile2.addEventListener('click', () => {
        localStorage.setItem('activeProfile', 'profile2');
    });
    profile3.addEventListener('click', () => {
        localStorage.setItem('activeProfile', 'profile3');
    });

    // Load the last message from localStorage
    const lastM_profile1 = document.getElementById("lastM_1");
    const lastM_profile2 = document.getElementById("lastM_2");
    const lastM_profile3 = document.getElementById("lastM_3");

    lastM_profile1.textContent = localStorage.getItem("lastMessage_profile1");
    lastM_profile2.textContent = localStorage.getItem("lastMessage_profile2");
    lastM_profile3.textContent = localStorage.getItem("lastMessage_profile3");
});
