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
    { type: 'text', text: "Tell you what, if you come with me to the gym, I'll stop teasing you. Deal? 😜", options: ["Fine... but you owe me a lot of distraction", "I don't know, Amy. I might just want to leave you to your own teasing."] , paths: [30, 29] }, //28
    { type: 'text', text: "You're so boring bro...", options: [], paths: [] }, //29
    { type: 'text', text: "Look I'm already changing to my workout clothes 😋", options: [], paths: [] }, //30
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/3/80655471/80655471_014_8a8b.jpg", imgDesc: "Amy in underwear", adult:true, options: ["You better not work out like this", "Amy..."], paths: [32,33] }, //31
    { type: 'text', text: "No, silly. I'm just undressing, to dress up again", options: ["you're crazy"], paths: [33] }, //32
    { type: 'text', text: "Come on, don’t tell me you're actually intimidated now? 😏", options: [], paths: [] }, //33
    { type: 'text', text: "Tell you what, I’ll make it easier for you and get dressed", options: [], paths: [] }, //34
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/3/80655471/80655471_021_3f03.jpg", imgDesc: "Amy in her gym clothes", adult: true, options: [], paths: [] }, //35
    { type: 'text', text: "But if you’re not into that... Maybe I could find other ways to distract you 😜", options: ["I’m curious, what other distractions do you have in mind?", "I don’t think that’s a good idea, Amy."], paths: [37,41] }, //36
    { type: 'text', text: "I can’t believe you’re actually making me do this 😳", options: ["You’re the one teasing me, Amy. Don’t act surprised."], paths: [38] }, //37
    { type: 'text', text: "I didn't expect you to play along though", options: ["I just want to see how far you go, Amy.", "You're right, I shouldn't"], paths: [39, 41] }, //38
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/1/11070634/11070634_008_92aa.jpg", imgDesc: "Amy covering breasts", adult: true, options: [], paths: [] }, //39
    { type: 'text', text: "This is how far I'll go 🫣", options: [], paths: [] }, //40
    { type: 'text', text: "I hope you are ready for the gym now though...", options: ["Oh I’m ready... I think 😅", "No I don't think so."], paths: [43, 120] }, //42
    
    { type: 'text', text: "Good. Because I’ve got the *perfect* gym attire to motivate you 😏", options: [], paths: [44] }, //43
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/1/89377112/89377112_030_0902.jpg", imgDesc: "Amy's 'motivation technique'", adult: true, options: ["This is *not* gym-legal 🫣", "You're gonna get us kicked out"], paths: [45, 45] }, //44
    { type: 'text', text: "Rules are just suggestions when you look this good 💅", options: ["You're dangerous"], paths: [46] }, //45
    { type: 'text', text: "Dangerous? Or irresistible? 😘", options: ["A little of both tbh", "I think you don't know your place"], paths: [49, 47] }, //46
    { type: 'image', imgUrl: "desc: Amy in her bedroom mirror, doing a double bicep flex in tight gym shorts, but posing with exaggerated cutenesshttps://evocdn.net/pphw/pornpics/11/files/6232/0154/ffc1/2265/e781/f7ce/9b3f/387f/1.jpg", imgDesc: "Amy showing off her 'summer bod'", adult: true, options: [], paths: [] }, //47
    { type: 'text', text: "I'm hoping to become as I looked back then", options: ["You already are", "Good luck with that"], paths: [49, 49] }, //48
    { type: 'text', text: "I try my best 😌 Now get your gym stuff. You’ve officially been summoned.", options: ["Only if you promise to behave", "Fine... but you're spotting me the *whole* time."], paths: [50, 51] }, //49
    { type: 'text', text: "I never behave 😈", options: [], paths: [51, 51] }, //50
    { type: 'image', imgUrl: "https://cdni.pornpics.com/1280/3/1/89377112/89377112_023_80c3.jpg", imgDesc: "Amy showing off again?", adult: true, options: ["This is gonna be chaos", "We’re getting banned for sure "], paths: [52, 52] }, //51
    { type: 'text', text: "", options: ["Say what are you trying to achieve?"], paths: [53] }, //52
    
    { type: 'text', text: "Oh come *on*! Do I really need to spell it out for you? 😏", options: ["Maybe you should.", "You're being impossible."], paths: [54, 55] },
    { type: 'text', text: "Fine. Let's just say... I’m trying to *motivate* you. Physically, mentally... visually 💋", options: ["Wow"], paths: [56] }, // 54
    { type: 'text', text: "Impossible? Or just impressively committed? 😌", options: [], paths: [56] }, // 55
    { type: 'text', text: "You needed a push, so I became the... *push-up*. 😉", options: ["That was terrible.", "You're unbelievable."], paths: [57, 58] }, // 56
    { type: 'text', text: "Terribly effective, though 😜", options: ["You're jokes get progressively worse"], paths: [59] }, // 57
    { type: 'text', text: "Believe it. I’m your *personal tease trainer* now. Stretching limits... and maybe patience too 💪🍑", options: [], paths: [59] }, // 58
    { type: 'image', imgUrl: "desc: Amy standing with one foot on a workout bench, wearing overly tight yoga pants and a wicked grin", imgDesc: "Amy's 'trainer mode'", adult: true, options: ["You're enjoying this way too much", "How am I supposed to focus like this?"], paths: [60, 61] }, // 59
    { type: 'text', text: "Obviously. Watching you squirm is part of my workout too 😏", options: [], paths: [62] }, // 60
    { type: 'text', text: "Exactly. Distraction *is* my favorite cardio 😘", options: [], paths: [62] }, // 61
    { type: 'text', text: "So what do you say? One more set... or are you already out of breath? 😇", options: ["Let’s see what you’ve got, coach", "I need a cooldown after that"], paths: [63, 64] }, // 62
    { type: 'text', text: "Now *that’s* the spirit! Don’t worry, I’ll go easy on you... for the first round 😈", options: [], paths: [] }, // 63
    { type: 'text', text: "Aww, are you blushing already? Don’t worry... we’ll stretch that endurance eventually 😘", options: [], paths: [65] }, // 64

    { type: 'text', text: "You know... if texting had a fitness level, I think you'd be burning calories already 😏", options: ["You're not exactly helping me cool down", "That’s one way to make me sweat..."], paths: [66, 66] }, // 65
    { type: 'text', text: "Good. Consider it part of my very *motivational* coaching style 😇", options: [], paths: [67] }, // 66
    { type: 'text', text: "Speaking of which... wanna see what I'm *not* wearing to the gym today? 😌", options: ["That’s not how gym prep works, Amy...", "What are you even trying to prove?"], paths: [68, 68] }, // 67
    { type: 'image', imgUrl: "", imgDesc: "A mirror selfie showing Amy in a messy room, wearing only a sports bra and loosely draped towel around her waist. She's mid-laugh, clearly posing more for effect than function.", adult: true, options: ["Okay that’s not gym legal", "You’re such a tease"], paths: [69, 69] }, // 68
    { type: 'text', text: "Oh please, it’s *practically* workout gear... if you count emotional endurance training 😜", options: ["I’m not sure I’ll survive this training arc", "You're making it really hard to focus"], paths: [70, 70] }, // 69
    { type: 'text', text: "Focus is overrated anyway. Distraction? Way more fun 😘", options: ["You're impossible", "This is getting dangerously fun..."], paths: [71, 72] }, // 70
    { type: 'text', text: "Impossible is just another word for 'Amy being herself'", options: [], paths: [73] }, // 71
    { type: 'text', text: "Mmhmm... and yet here you are, still chatting with me. You *must* like danger 😏", options: [], paths: [73] }, // 72
    { type: 'text', text: "So tell me honestly... what part of me makes it hardest to concentrate? Asking for... science. 📊", options: ["Amy...", "This feels illegal to answer"], paths: [74, 74] }, // 73
    { type: 'text', text: "Relax. No wrong answers... just increasingly right ones 😇", options: ["Fine. It's the way you always act like this is normal."], paths: [75] }, // 74
    { type: 'text', text: "What, casual family bonding with a hint of chaos? Totally normal 😌", options: [], paths: [76] }, // 75
    { type: 'text', text: "But seriously... I do know how far I’m pushing things. And I kinda like it when you let me.", options: ["You're dangerous, Amy", "You're walking a really fine line..."], paths: [77, 77] }, // 76
    { type: 'text', text: "Balance, bro. It's all about *balance*. A little tease, a little tension... keeps things exciting 🖤", options: [], paths: [78] }, // 77
    { type: 'text', text: "And don’t worry, I’ll stop *right before* things get too hot to handle. Probably. Maybe. 😏", options: ["...You're such a brat", "I'll pretend I believe you"], paths: [79, 79] }, // 78
    { type: 'text', text: "Mmm, guess you'll have to stay tuned to see just *how far* I take this game 😘", options: ["That sounds like a threat AND a promise", "You’re not gonna make this easy, huh?"], paths: [80, 81] }, // 79
    { type: 'text', text: "Only fair. You never made it easy for me growing up... payback is a *flirt* 😏", options: [], paths: [] }, // 80
    { type: 'text', text: "Easy? Nah. You’d get bored. And we can’t have *that*, now can we? 😇", options: [], paths: [] }, // 81

];
export default profile3Messages;
