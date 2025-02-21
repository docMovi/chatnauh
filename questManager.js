class QuestManager {
    constructor() {
        this.quests = [];  
        this.playerProgress = 0;  // Anzahl abgeschlossener Quests
    }

    addQuest(name, description) {
        const newQuest = {
            id: this.quests.length + 1,
            name: name,
            description: description,
            completed: false,
            inProgress: false
        };
        this.quests.push(newQuest);
    }

    getQuestID(name){
        for(let i = 0; i < this.quests.length; i++){
            if(this.quests[i].name == name){
                return i;
            }
        }
    }

    getQuestName(questId){
        if(this.quests[questId]){
            return this.quests[questId].name;
        } else{
            console.log("ERROR: QUEST DOESN'T EXIST")
            return "ERROR: QUEST DOESN'T EXIST"
        }
        
    }

    startQuest(questId) {
        const quest = this.quests[questId];
        if (quest && !quest.inProgress && !quest.completed) {
            quest.inProgress = true;
            console.log(`Quest gestartet: ${quest.name} - ${quest.description}`);
        } else {
            console.log("Diese Quest kann nicht gestartet werden, da sie entweder schon gestartet oder beendet ist.");
        }
    }

    completeQuest(questId) {
        const quest = this.quests[questId];
        if (quest && quest.inProgress && !quest.completed) {
            quest.completed = true;
            quest.inProgress = false;
            console.log(`Quest abgeschlossen: ${quest.name}`);
            this.updatePlayerProgress();
        } else {
            console.log("Diese Quest kann nicht abgeschlossen werden, da sie entweder noch nicht gestartet oder schon beendet ist.");
        }
    }

    //Fortschritt des Spielers 
    updatePlayerProgress() {
        this.playerProgress = this.quests.filter(q => q.completed).length;
        console.log(`Du hast ${this.playerProgress} von ${this.quests.length} Quests abgeschlossen!`);
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
        localStorage.setItem("quests", this.quests);
    }


}

export default QuestManager;

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
