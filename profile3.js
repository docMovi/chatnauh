const profile3Messages = [
    //{ type: 'text', text: "Hello, welcome to chatnauh!", options: [], paths: [] },
    //{ type: 'image', imgUrl: "res/2prof/pfp.jpg", options: ["My name's Joe", "..."], paths: [9, 6] },
    //{ type: 'video', imgUrl: "res/2prof/pfp.jpg", options: ["My name's Joe", "..."], paths: [9, 6] },
    //{ type: 'complete', goal: "chatWithAva", options: [], optionsBig:[], paths: [] },
    //{ type: 'notification', name: "You have a new message!", description: "Testname texted you back in chatnauh. Click on the app to see more.", icon: "https://media.xvix.eu/thumbs/6/1/0/2/b/6102beef6e48c5.35612403.mp4/6102beef6e48c5.35612403.mp4-1.jpg", profile: 1}, 
    
    { type: 'text', text: "Heyy Bro what are you doing? 🖐", options: ["Nothing. How about you?", "What do you want 🙄"], paths: [1,2] },
    { type: 'text', text: "I was just scrolling TikTok when I noticed", options: [], paths: [] },
    { type: 'text', text: "I'm sorry, " + localStorage.getItem("name_") + ". About yesterday...", options: [], paths: [] },
    { type: 'text', text: "I didn't know your girlfriend broke up with you. And my comments were horrible", options: [], paths: [] },
    { type: 'image', imgUrl: "https://media.tenor.com/N4a4SAa0qtsAAAAM/sorry-sad.gif",imgDesc: "sad_gif" ,options: ["It's fine.", "It's tough"], optionsBig:["Thank you Sis, it's fine actually. I've come to enjoy my freedom 😊." , "Thank you Sis, it's been really rough lately. Thanks for finally taking interest in me 😅."], paths: [5,6], adult: false },
    { type: 'text', text: "Well, if you need anything I'll be there for you! ☺😘", options: ["distraction", "help with dating"], optionsBig:["Actually, I'd love it if you could just distract me from what's going on 🤗. Just tell me a little about your life.", "Well, actually, I've been thinking of going back to dating 😅. Get my mind off and maybe find someone new..."], paths: [7,8] },
    { type: 'text', text: "I'm sorry to hear that. If you need anything I'm there for you! ☺😘", options: ["distraction", "help with dating"], optionsBig:["Actually, I'd love it if you could just distract me from what's going on 🤗. Just tell me a little about your life.", "Well, actually, I've been thinking of going back to dating 😅. Get my mind off and maybe find someone new..."], paths: [7,8] },
];  

export default profile3Messages;
