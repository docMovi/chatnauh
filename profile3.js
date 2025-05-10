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
    { type: 'image', imgUrl: "https://media.tenor.com/N4a4SAa0qtsAAAAM/sorry-sad.gif",imgDesc: "sad_gif" ,options: ["It's fine.", "It's tough"], optionsBig:["Thank you Sis, it's fine actually. I've come to enjoy my freedom 😊. And you were totally right." , "You know Sis, it's been really rough lately and you didn't really help yesterday. But Thanks for finally taking initiative in apologizing to me 😅."], paths: [5,6], adult: false },
    { type: 'text', text: "Well, if you need anything I'll be there for you! ☺😘", options: ["distraction", "help with dating"], optionsBig:["Actually, I'd love it if you could just distract me from what's going on 🤗. Just tell me a little about your life.", "Well, actually, I've been thinking of going back to dating 😅. Get my mind off and maybe find someone new..."], paths: [7,8] },
    { type: 'text', text: "I'm sorry to hear that. If you need anything I'm there for you! ☺😘", options: ["distraction", "help with dating"], optionsBig:["Actually, I'd love it if you could just distract me from what's going on 🤗. Just tell me a little about your life.", "Well, actually, I've been thinking of going back to dating 😅. Get my mind off and maybe find someone new..."], paths: [7,15] },
    { type: 'text', text: "Okay...", options: [], paths: [] }, //7
    { type: 'text', text: "Been hitting the gym a lot, keeping busy lately 💪", options: ["really? What have you been working out?", "I don't think you stand a chance against me!"], paths: [9, 10] }, // 8
    { type: 'text', text: "haha. mostly my butt actually 🙀", options: [], paths: [] }, //9
    { type: 'image', imgUrl: "https://cdni.pornpics.com/460/3/1/55658612/55658612_003_3d4a.jpg", imgDesc: "Amy showing off her fitness.", adult: true, options: [], paths: [] }, //10
    { type: 'text', text: "I think in this category, I'll win 😜", options: ["Wtf, amy", "Wow, amy 🤯"], optionsBig: ["What the fuck Amy, you should not send that shit to me! 😨", "Wow, amy. You were not joking."], paths: [12,12] }, //11
    { type: 'text', text: "Don't make it weird " + localStorage.getItem("name_"), options: [], paths: [] }, //12
    { type: 'text', text: "But I'll take it as a compliment 😘", options: [], paths: [] }, //13
    { type: 'text', text: "We should go together one day. It would definetely help you take your mind off things", options: ["you're right", "I don't think I have the energy for that"], paths: [30,15] }, //14
    { type: 'text', text: "Not even when I spot you like this? 😜", options: [], paths: [] }, //15
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/1/55658612/55658612_010_9766.jpg", imgDesc: "spotting advice", adult: true, options: ["Amy wth"], optionsBig: ["Amy what the hell."] ,paths: [17] }, //16
    { type: 'text', text: "", options: ["pants off?", "don't comment"], optionsBig: ["why did you even take your pants off?", ""], paths: [18,22] }, //17
    { type: 'text', text: "Because it's hot in here??", options: [], paths: [] }, //18
    { type: 'text', text: "And to show off my workout a bit more 😈", options: [], paths: [] }, //19
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/1/55658612/55658612_009_967e.jpg", imgDesc: "easier to see", adult: true, options: [], paths: [] }, //20
    { type: 'text', text: "You don't understand fun 🤔", options: ["You're really funny 😒", "I don't quite get your humor"], paths: [22,22] }, //21
    { type: 'text', text: "But don't I now have your interest in taking me to the gym?", options: [], paths: [] }, //22
    { type: "image", imgUrl: "https://cdni.pornpics.com/1280/3/1/55658612/55658612_005_74de.jpg", imgDesc: "amy getting out of hand", adult: true, options:["this is getting out of hand, amy 😅"], paths: [24]}, //23
    { type: 'text', text: "Oh, come on! I'm just having some fun, you need to lighten up! 😘", options: [], paths: [] }, //24
    { type: 'text', text: "I mean, you said you wanted to get distracted, right? 😉", options: [], paths: [] }, //25
    { type: 'text', text: "Don't tell me you're shy now... 😏", options: ["I'm not shy", "I'm just not into this, Amy."] , paths: [28,27]}, //26
    { type: 'text', text: "Come on! It's not like I don't know you better than anyone else 😘", options: [], paths: [] }, //27
    { type: 'text', text: "Tell you what, if you come with me to the gym, I'll stop teasing you. Deal? 😜", options: ["Fine", "I don't know, Amy"] , paths: [30, 29] }, //28
    { type: 'text', text: "You're so boring bro...", options: [], paths: [] }, //29
    { type: 'text', text: "Look I'm already changing to my workout clothes 😋", options: [], paths: [] }, //30
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/3/80655471/80655471_014_8a8b.jpg", imgDesc: "Amy in underwear", adult:true, options: ["You better not work out like this", "Amy..."], paths: [32,33] }, //31
    { type: 'text', text: "No, silly. I'm just undressing, to dress up again", options: ["you're crazy"], paths: [33] }, //32
    { type: 'text', text: "Come on, don’t tell me you're actually intimidated now? 😏", options: [], paths: [] }, //33
    { type: 'text', text: "Tell you what, I’ll make it easier for you and get dressed", options: [], paths: [] }, //34
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/3/80655471/80655471_021_3f03.jpg", imgDesc: "Amy in her gym clothes", adult: true, options: [], paths: [] }, //35
    { type: 'text', text: "But if you’re not into that... Maybe I could find other ways to distract you 😜", options: ["Okay go ahead", "I don’t think that’s a good idea, Amy."], paths: [37,41] }, //36
    { type: 'text', text: "I can’t believe you’re actually making me do this 😳", options: ["You’re the one teasing me, Amy. Don’t act surprised."], paths: [38] }, //37
    { type: 'text', text: "I didn't expect you to play along though", options: ["I just want to see how far you go, Amy.", "You're right, I shouldn't"], paths: [39, 41] }, //38
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/1/11070634/11070634_008_92aa.jpg", imgDesc: "Amy covering breasts", adult: true, options: [], paths: [] }, //39
    { type: 'text', text: "This is how far I'll go 🫣", options: [], paths: [] }, //40
    { type: 'text', text: "I hope you are ready for the gym now though...", options: ["Oh I’m ready... I think 😅", "almost."], paths: [42, 42] }, //42
    
    { type: 'text', text: "Good. Because I’ve got the *perfect* gym attire to motivate you 😏", options: [], paths: [43] }, //42
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/1/89377112/89377112_030_0902.jpg", imgDesc: "Amy's 'motivation technique'", adult: true, options: ["This is *not* gym-legal 🫣", "You're gonna get us kicked out"], paths: [44, 44] }, //43
    { type: 'text', text: "Rules are just suggestions when you look this good 💅", options: ["You're dangerous"], paths: [45] }, //44
    { type: 'text', text: "Dangerous? Or irresistible? 😘", options: ["A little of both tbh", "I think you don't know your place"], paths: [48, 46] }, //45
    { type: 'image', imgUrl: "https://evocdn.net/pphw/pornpics/11/files/6232/0154/ffc1/2265/e781/f7ce/9b3f/387f/1.jpg", imgDesc: "Amy showing off her 'summer bod'", adult: true, options: [], paths: [] }, //46
    { type: 'text', text: "I'm hoping to become as I looked back then", options: ["You already are", "Good luck with that"], paths: [48, 48] }, //47
    { type: 'text', text: "I try my best 😌 Now get your gym stuff. You’ve officially been summoned.", options: ["Only if you promise to behave", "Fine... but give me some time to calm down"], paths: [49, 50] }, //48
    { type: 'text', text: "I never behave 😈", options: [], paths: [50, 50] }, //49
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/3/41041463/41041463_024_36e1.jpg", imgDesc: "Amy showing off again?", adult: true, options: ["Amy!"], paths: [51, 51] }, //50
    { type: 'text', text: "", options: ["Say what are you trying to achieve?"], paths: [52] }, //51
    
    { type: 'text', text: "Oh come *on*! Do I really need to spell it out for you?", options: ["Maybe you should.", "Yes?"], paths: [53, 53] }, //52
    { type: 'text', text: "Fine. Let's just say... I’m trying to *motivate* you. Physically, mentally... visually", options: ["Wow", "wtf"], paths: [54, 54] }, // 53
    { type: 'text', text: "You needed a push, so I became the... *push-up*. 😉", options: ["That was terrible.", "You're unbelievable."], paths: [55, 56] }, // 54
    { type: 'text', text: "Terribly effective, though 😜", options: ["You're jokes get progressively worse"], paths: [56] }, // 55
    { type: 'text', text: "I'm your distraction and I have a lot of fun being it🍑", options: [], paths: [] }, // 56
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/3/83370154/83370154_007_198e.jpg", imgDesc: "Amy having fun'", adult: true, options: ["This is wrong"], paths: [58] }, // 57
    { type: 'text', text: "Obviously. But why do we have to care", options: [], paths: [] }, // 58
    { type: 'text', text: "For all I know, I'm having fun", options: [], paths: [] }, // 59
    { type: 'text', text: "And it excites me knowing how you are reacting right now", options: ["Amy stop.", "You are not thinking straight"], paths: [61, 61] }, // 60
    { type: 'text', text: "I know you have a boner right now", options: [], paths: [] }, // 61
    { type: 'text', text: "To your own sister", options: [], paths: [] }, // 62
    { type: "video", imgUrl: "res/vid/amy/amy_kaylla.mov", imgDesc: "Amy first video", adult: true, options: ["You look really good", "Amy stop it, before you do something stupid"], paths: [64, 64]}, // 63
    { type: 'text', text: "Stop saying anything", options: [], paths: [] }, // 64
    { type: 'text', text: "Just let this happen", options: ["...", "you're out of control"], paths: [67, 66] }, // 65
    { type: 'text', text: "And you'll better be fine with it", options: [], paths: [] }, // 66
    { type: 'text', text: "I'm too turned on, " + localStorage.getItem("name_"), options: [], paths: [] }, // 67
    { type: "video", imgUrl: "res/vid/amy/amy_almost_masturbating.mov", imgDesc: "about to masturbate", adult: true, options: ["Wow", "Amy"], paths: [69, 69]}, // 63
    { type: 'text', text: "we better stop now " + localStorage.getItem("name_"), options: [], paths: [] }, // 69
    { type: 'text', text: "i think I have to come to my senses real quick", options: ["no wait", "you are right"], paths: [74, 71] }, // 70
    { type: 'text', text: "let me give you one last distraction", options: [], paths: [] }, // 71
    { type: 'text', text: "because you listened so well", options: [], paths: [] }, // 72
    { type: 'image', imgUrl: "res/3prof/last_present.png", imgDesc: "last present", adult: true, options: ["Thank you!"], paths: [] }, //73
    { type: 'text', text: "What do you mean", options: ["you're going to get off anyway", "my bad, sorry"], paths: [75,71] }, // 74
    { type: 'text', text: "yes?", options: ["why not show to me", "just one more"], paths: [76,71] }, // 75
    { type: 'text', text: "", options: ["I will not talk about it ever"], paths: [77] }, // 76
    { type: 'text', text: "", options: ["I just want to see"], paths: [78] }, // 77
    { type: 'text', text: "", options: ["Amy"], paths: [79] }, // 78
    { type: 'text', text: "", options: ["sorry"], paths: [80] }, // 79
    { type: "video", imgUrl: "res/vid/amy/amy_masturbating.mov", imgDesc: "amy fingering", adult: true, options: ["show me more", "thank you"], paths: [81, 71]}, // 80
    { type: 'text', text: "okay", options: [], paths: [] }, // 81
    { type: 'text', text: "I will", options: [], paths: [] }, // 82
    { type: 'text', text: "because I can't stop imagining your boner. You get an extra long video.", options: [], paths: [] }, // 83
    { type: "video", imgUrl: "res/vid/amy/vibrator_tease.mp4", imgDesc: "vibrator tease", adult: true, options: ["you're so hot"], paths: [85]}, // 84
    { type: 'text', text: "I wish you'd fuck me right now", options: [], paths: [] }, // 85
    { type: "video", imgUrl: "res/vid/amy/vibrator_fuck.mp4", imgDesc: "amy masturbating with vibrator", adult: true, options: [], paths: []}, // 86
    { type: 'text', text: "oh, " + localStorage.getItem("name_") + "I'm so close", options: [], paths: [] }, // 87
    { type: "video", imgUrl: "res/vid/amy_cumming.mov", imgDesc: "amy cumming with vibrator", adult: true, options: [], paths: []}, // 88
    { type: 'text', text: "Wow", options: [], paths: [] }, // 89
    { type: 'text', text: "This was so intense", options: [], paths: [] }, // 90
    { type: 'text', text: "And so wrong", options: [], paths: [] }, // 90
    { type: 'text', text: "You promise we'll never talk about it?", options: [], paths: [] }, // 90
    { type: 'text', text: "And you take me to the gym?", options: ["Promised"], paths: [] }, // 91
];
export default profile3Messages;
