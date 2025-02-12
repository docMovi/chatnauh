
    const profile1Messages = [
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
    ]  

export default profile1Messages;


