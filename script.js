document.addEventListener('DOMContentLoaded', () =>{
    const lastM = document.getElementById("lastM");
    let p = localStorage.getItem("lastMessage");
    console.log(p);
    lastM.textContent = p;
    

});