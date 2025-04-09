const profile2Messages = [
    { type: 'text', text: "Hello, welcome to chatnauh!", options: [], paths: [] },
    { type: 'text', text: "I hope you're doing well.", options: ["Hi"], paths: [2] },
    { type: 'text', text: "My name is Ava, how's yours?", options: [], paths: [] },
    { type: 'complete', goal: "chatWithAva", options: [], paths: [] },
    { type: 'notification', name: "You have a new message!", description: "Testname texted you back in chatnauh. Click on the app to see more.", icon: "https://media.xvix.eu/thumbs/6/1/0/2/b/6102beef6e48c5.35612403.mp4/6102beef6e48c5.35612403.mp4-1.jpg", profile: 1}, 
    { type: 'image', imgUrl: "res/2prof/pfp.jpg", options: ["My name's " + localStorage.getItem("name_"), "..."], paths: [9, 6], adult: false },
    { type: 'text', text: "Come on, do you need help?", options: ["Fuck off", "Yes!"], paths: [11, 7] },  
    { type: 'text', text: "Will you tell me you're name after this", options: [], paths: [], adult: true },  
    { type: 'image', imgUrl: "res/2prof/help.jpg", options: ["Okay, it's " + localStorage.getItem("name_")], paths: [9] },
    { type: 'text', text: "Hello, "+ localStorage.getItem("name_") + "!", options: [], paths: [] }, 
    { type: 'text', text: "well anyway, I'm here to help you.", options: [], paths: [] }, 
    { type: 'text', text: "I'm working this boring job as support here so please ask any question you feel necessary", options: [], paths: [] }, 
];

export default profile2Messages;
