class QuestManager {
    constructor() {
        if (QuestManager.instance) {
            return QuestManager.instance;  // Return existing instance
        }

        this.quests = [];  
        this.playerProgress = 0;
        QuestManager.instance = this;
        this.loadAllQuests(); // Load quests globally from localStorage
    }
    
    addQuest(name, description) {
        if (this.quests.some(quest => quest.name === name)) {
            console.log(`Quest "${name}" already exists. Skipping add.`);
            return; // If quest already exists, do not add it
        }
        const newQuest = {
            id: this.quests.length + 1,
            name: name,
            description: description,
            completed: false,
            inProgress: false
        };
        this.quests.push(newQuest);
        this.saveAllQuests();  // Save globally for all profiles
    }

    getQuestID(name) {
        for (let i = 0; i < this.quests.length; i++) {
            if (this.quests[i].name == name) {
                return i;
            }
        }
    }

    getQuestName(questId) {
        if (this.quests[questId]) {
            return this.quests[questId].name;
        } else {
            console.log("ERROR: QUEST DOESN'T EXIST");
            return "ERROR: QUEST DOESN'T EXIST";
        }
    }

    startQuest(questId) {
        const quest = this.quests[questId];
        if (quest && !quest.inProgress && !quest.completed) {
            quest.inProgress = true;
            console.log(`Quest started: ${quest.name} - ${quest.description}`);
            this.saveAllQuests(); // Ensure the change is reflected in localStorage globally
        } else {
            console.log("Quest cannot be started because it is either already in progress or completed.");
        }
    }

    completeQuest(questId) {
        const quest = this.quests[questId];
        if (quest && quest.inProgress && !quest.completed) {
            quest.completed = true;
            quest.inProgress = false;
            console.log(`Quest completed: ${quest.name}`);
            this.updatePlayerProgress();
            this.saveAllQuests(); // Save changes globally
        } else {
            console.log("Quest cannot be completed because it is either not started or already completed.");
        }
    }

    updatePlayerProgress() {
        this.playerProgress = this.quests.filter(q => q.completed).length;
        console.log(`You have completed ${this.playerProgress} out of ${this.quests.length} quests!`);
    }

    checkQuestStatus(questId) {
        const quest = this.quests[questId];
        let s = "";
        if(quest.completed) {s = "completed"}
        else if(quest.inProgress) {s = "in progress"}
        else {s = "not started"}
        console.log("Die Quest " + quest.name + " ist -> " + s);
    }

    // Alle Quests anzeigen 
    checkAllQuestStatus() {
        this.quests.forEach(quest => {
            if (quest.inProgress) {
                console.log(`Die Quest "${quest.name}" ist in Arbeit.`);
            } else if (quest.completed) {
                console.log(`Die Quest "${quest.name}" ist abgeschlossen.`);
            } else {
                console.log(`Die Quest "${quest.name}" ist noch nicht begonnen.`);
            }
        });
    }

    // Alle abgeschlossenen Quests bekommen
    getCompletedQuests() {
        return this.quests.filter(quest => quest.completed);
    }

    // Alle nicht abgeschlossenen Quests bekommen
    getInProgressQuests() {
        return this.quests.filter(quest => quest.inProgress);
    }

    // Alle Quests auflisten
    listAllQuests() {
        this.quests.forEach(quest => {
            console.log(`ID: ${quest.id}, Name: ${quest.name}, Status: ${quest.completed ? 'Abgeschlossen' : quest.inProgress ? 'In Arbeit' : 'Noch nicht begonnen'}`);
        });
    }

    saveAllQuests(){
        // Convert the quests array to a JSON string before saving
        localStorage.setItem("quests", JSON.stringify(this.quests));
        console.log("Quests saved: " + JSON.stringify(this.quests));
    }
    
    loadAllQuests(){
        // Retrieve the JSON string and convert it back into an array
        const savedQuests = localStorage.getItem("quests");
        let parsedQuests
        // Check if there's something stored, and parse it back into an array
        if (savedQuests) {
            try{
                parsedQuests = JSON.parse(savedQuests);
            }catch(error){
                console.log("Error while parsing quests!");
            }

            if(parsedQuests){
                parsedQuests.forEach(newQuest => {
                    // Check if the quest is already in the array by id or name
                    const questExists = this.quests.some(existingQuest => existingQuest.id === newQuest.id || existingQuest.name === newQuest.name);
        
                    if (!questExists) {
                        // If the quest does not exist, push it
                        this.quests.push(newQuest);
                    }
                });
            }
            
        } else {
            console.log("Error: no quests found in localstrage");
            this.quests = []; // If no quests were saved, initialize it as an empty array
        }
    }
    resetAllQuests() {
        // Clear the quests array and also remove it from localStorage
        this.quests = [];
        localStorage.removeItem("quests");
    }
    
    
    questIDExist(questId){
        if(this.quests[questId]){
            return true;
        }else {
            return false;
        }
    }
    questNameExist(questName){
        let b = false;
        for(let i = 0; i < this.quests.length; i++){
            if(this.quests[i] == questName){
                b = true
            }
        }
        return b;
    }
    getQuestProgress(questId){
        if(!this.quests[questId]){
            console.log("ERROR: Quest doesn't exist");
            return "NotFound";
        }
        if(this.quests[questId].inProgress){
            return "inProgress";
        }else if(this.quests[questId].completed){
            return "completed";
        }   
    }

}

export default new QuestManager();

/*
const myQuestManager = new QuestManager();

// Quests hinzufügen
myQuestManager.addQuest("Kauf die Kekse", "Gehe zum Supermarkt und kaufe eine Packung Kekse.");
myQuestManager.addQuest("Besuche den Park", "Gehe in den Park und mache ein Foto.");

// Alle Quests anzeigen
myQuestManager.listAllQuests();

// Eine Quest starten
myQuestManager.startQuest(1);

// Eine Quest abschließen
myQuestManager.completeQuest(1);

// Den Status aller Quests überprüfen
myQuestManager.checkQuestStatus();

// Alle abgeschlossenen Quests anzeigen
console.log("Abgeschlossene Quests: ", myQuestManager.getCompletedQuests());

// Alle nicht abgeschlossenen Quests anzeigen
console.log("Noch nicht abgeschlossene Quests: ", myQuestManager.getInProgressQuests());
*/
