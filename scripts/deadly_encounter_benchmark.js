class DeadlyEncounterBenchmark {  
    
    static _activeDEBM() {
        //Warning message if no tokens selected
        let selected = canvas.tokens.controlled;
        if(selected.length == 0){
            ui.notifications.error("Please select at least 1 token.")
        }

        //DEFINITIONS

        //Defining selectedfriendly tokens (including neutral tokens) vs. hostile tokens
        const [tokenFriendly, tokenHostile] = canvas.tokens.controlled.partition(t => {
            return t.document.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE;
        });

        //Further defining selected friendly and hostile tokens
        let selectedHostile = tokenHostile
        let selectedFriendly = tokenFriendly

        //Defining selected Friendly NPCs tokens vs characters tokens
        const [selectedFriendlyNPC, selectedFriendlyCharacter] = selectedFriendly.partition(t => {
            return t.actor.type === "character";
        });

        //Further defining selected friendly NPCs and Characters
        let sfNPC = selectedFriendlyNPC
        let sfCharacter = selectedFriendlyCharacter

        //CALCULATIONS

        //Calculating CR of friendly selected NPC tokens
        let CR = 0;
        let friendlyCR = 0;
        for (let token of sfNPC.filter(tok=>!!tok.actor.system.details.cr)) {
            friendlyCR += token.actor.system.details.cr
        }

        //Calculating CR of hostile selected tokens
        for (let token of selectedHostile.filter(tok=>!!tok.actor.system.details.cr)) {
            CR += token.actor.system.details.cr
        }

        //Calculating Deadly Encounter Benchmark (DEBM)
        let DEBM = 0;
        let levelMod = 0;
        let characterDEBM = 0;
        for (let token of sfCharacter.filter(tok=>!!tok.actor.system.details.level)) {
            if(token.actor.system.details.level < 5){levelMod = 0.25};
            if(token.actor.system.details.level == 5 || token.actor.system.details.level > 5){levelMod = 0.5};
            DEBM += token.actor.system.details.level*levelMod
        }

        //DIALOG BOX

        //Defining options dialog box for Monster CR
        let npcOptions = ""
        for(let token of selectedHostile){
            if (token.actor.type != "character"){
            let cr = token.actor.system.details.cr;
                if (!cr){cr = "n/a"}
            npcOptions += `<option value=${selected}>${token.document.name} | CR: ${cr}</option>`
            }
        }

        //Defining options of dialog box for Player Level
        let playerOptions = ""
        for(let token of selected){
            if (token.actor.type != "npc"){
            let level = token.actor.system.details.level;
                if (!level){level = "n/a"}
            playerOptions += `<option value=${selected}>${token.document.name} | Level: ${level}</option>`
            }
        }

        //Defining options dialog box for Friendly NPC CR
        let fnpcOptions = ""
        for(let token of selectedFriendly){
            if (token.actor.type != "character"){
            let cr = token.actor.system.details.cr;
                if (!cr){cr = "n/a"}
            fnpcOptions += `<option value=${selected}>${token.document.name} | CR: ${cr}</option>`
            }
        }

        //Is the encounter deadly?
        let isDeadly = 0;
        let testComp = 1;
        if(CR > DEBM + friendlyCR){isDeadly = "This encounter may be <font color='red'>Deadly</font>"}
        if(CR == DEBM + friendlyCR){isDeadly = "This encounter may be <font color='orange'>Challenging</font>"}
        if(CR < DEBM + friendlyCR){isDeadly = "This encounter is <font color='green'>Not Deadly</font>"}

        //Warning messages that are displayed in dialog box
        let newCR = 0;
        let newDEBM = 0;
        if (CR == 0){
                newCR = "<font color='grey'><i>No monster tokens selected</i></font> <font color='red'><i class='fa-solid fa-triangle-exclamation'></i></font>";
                npcOptions = "<font color='grey'><i>No monster tokens selected</i></font> <font color='red'><i class='fa-solid fa-triangle-exclamation'></i></font>"
            }
        if (DEBM == 0){
                newDEBM = "<font color='grey'><i>No player tokens selected</i></font> <font color='red'><i class='fa-solid fa-triangle-exclamation'></i></font>";
                playerOptions = "<font color='grey'><i>No player tokens selected</i></font> <font color='red'><i class='fa-solid fa-triangle-exclamation'></i></font>"
            }
        if (friendlyCR == 0){
                fnpcOptions = "<font color='grey'><i>No friendly NPC tokens selected</i></font> <font color='red'><i class='fa-solid fa-triangle-exclamation'></i></font>"
        }
        if (CR > 0){newCR = "<font color='red'>" + CR + "</font> <i class='fa-solid fa-swords'></i>"}
        if (DEBM > 0 || friendlyCR != 0){newDEBM = "<font color='red'>" + (DEBM + friendlyCR) + "</font> <i class='fa-solid fa-skull'></i>"}

        //Dialog box style
        let dialogTemplate = `
        <div style="display:flex; flex-direction: column">
            <h1><center>${isDeadly}</center></h1>
            <br>    
            <span><center><font size="3"><b>The Deadly Encounter Benchmark is:</b></font></center></span>
            <span><center><font size='3'>${newDEBM}</font></center></span> 
            <br>
            <center><details><summary><b>Player level details</b></summary>${playerOptions}</details></center>
            <br>
            <center><details><summary><b>Friendly NPC details</b></summary>${fnpcOptions}</details></center>
            <br>
            <h3></h3>
            <span><center><font size="3"><b>Total Monster CR:</b></font></center></span>
            <span><id="challenge"><font size="3"><center>${newCR}</font></center></span> 
            <br>
            <center><details><summary><b>Hostile NPC details</b></summary>${npcOptions}</details></center>
            <br>
            <h3></h3>
            <details><summary><i>What is a "Deadly Encounter Benchmark"?</i></summary>
                <blockquote>
                <span>A <i>Deadly Encounter Benchmark</i> is a guideline that helps determine an encounter's difficulty.</span>
                <br>
                <br>
                <span>An encounter may be deadly if the total of all the monsters' challenge ratings is greater than one quarter of the total of all the characters' levels, or one half of the characters' levels if the characters are 5th level or higher.</span>
                <br>
                <br>
                <span>If friendly NPCs join the encounter, their CR values are added to the <i>Deadly Encounter Benchmark</i>.</span>
                </blockquote>
                </details>
            <br>
        </div>
        `
        //Dialog box, only renders if tokens are selected
        if(selected.length > 0){
            const myDialog = new Dialog({
                title: "Deadly Encounter Benchmark",
                content: dialogTemplate,
                buttons: {
                    calculateDEBM: {
                        label: "Calculate Benchmark",
                        icon: `<i class="fa-solid fa-arrow-rotate-right"></i> `,
                        callback: DeadlyEncounterBenchmark._activeDEBM,
                    },
                    close: {
                        label: "Close",
                        icon: `<i class="fa-solid fa-right-from-bracket"></i> `
                    }
                }
            }).render(true);
        }
    }
}

Hooks.on('getSceneControlButtons', (buttons) => {
    if (!game.user.isGM) {return;}
    const basicControlsButton = buttons.find(b => b.name === "token");

    if (basicControlsButton) {
            basicControlsButton.tools.push({
            name: "deadly-encounter-benchmark",
            title: "Deadly Encounter Benchmark",
            icon: 'fas fa-solid fa-shield-halved',
            visible: game.user.isGM,
            onClick: DeadlyEncounterBenchmark._activeDEBM,
            button: true
        });
    }
});