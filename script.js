document.addEventListener('DOMContentLoaded', () =>{
    const lastM = document.getElementById("lastM");
    let p = localStorage.getItem("lastMessage");
    console.log(p);
    lastM.textContent = p;
    
    document.getElementById('create-profile-btn').addEventListener('click', () => 
        { window.location.href = 'create-profile.html'; });

});