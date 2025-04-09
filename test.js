
    const profile1Messages = [
        { type: 'text', text: "Hey! How's it going?", options: ["Good, you?", "Not so great."], paths: [1, 2] },
      
        { type: 'text', text: "Same here. What are you doing?", options: ["Just chilling.", "Working on a project."], paths: [3, 4] },
        { type: 'text', text: "Oh no! Anything I can help with?", options: ["Not really.", "Maybe."], paths: [5, 6] },
        { type: 'text', text: "Cool! do you want to know a secret?", options: ["Sure!", "Nah."], paths: [7, 12] },
        { type: 'text', text: "Sounds cool! What project are you working on?", options: ["A web app.", "A school assignment."], paths: [9, 10] },
        { type: 'text', text: "Alright, let me know if you change your mind.", options: [], paths: [] }, // 5
        { type: 'text', text: "I'm here to help!", options: ["you wouldnt understand", "Thanks, but I don't know.."], paths: [7, 7] }, // 6
        { type: 'text', text: "Maybe I'd like to send you a picture", options: ["oh okay", "please dont"], paths: [8, 12] }, // 7
        { type: 'image', imgUrl: "res/test/pic.png", options: ["Thanks"], paths: [12, 12], adult: false }, // 8
        { type: 'text', text: "That's awesome! Good luck with the web app.", options: ["..."], paths: [12] }, // 9
        { type: 'text', text: "Best of luck with your assignment!", options: ["..."], paths: [12] }, // 10
        { type: 'text', text: "Have a nice day then!", options: ["...", "See you"], paths: [12, 12] }, // 11
        { type: 'complete', goal: "chatWithTestname"},          //12
        { type: 'notification', name: "You have a new message!", description: "Someone texted you in chatnauh. Click on the app to see more.", icon: "https://www.famousbirthdays.com/headshots/hannah-kim-3.jpg", profile: 2},          //13
        { type: 'createAndWait', goal: "chatWithAva", description: "Chat with Ava for the first time."}, // 14
        { type: 'text', text: "Hi!", options: ["Hi, how are you?", "What do you want?"], paths: [16, 17]}, // 15
        { type: 'text', text: "good! How are you?", options: ["Better", "Good"], paths: [17, 18]}, // 16
        { type: 'text', text: "Well.. What are you doing?", options: ["Depends", "Nothing really"], paths: [18, 20]}, // 17
        { type: 'text', text: "What do you mean?", options: [], paths: []}, // 18
        { type: 'image', imgUrl: "https://media.tenor.com/GSUqW6Z4gQAAAAAM/funny-video-comedy.gif", options: ["nice response", "mean response"], optionsBig: ["I love your personality. Keep acting that way","Just come to the point. What do you want?"], paths: [20,21], adult: false}, // 19
        { type: 'text', text: "I like you too. Anyway..."}, // 20
        { type: 'video', imgUrl: "res/vid/testREDGIF.mp4", options: [], paths: [],adult: true}, // 21
        
    ]  

export default profile1Messages;



