class DeadlyEncounterBenchmark {  

    //Fraction Option + No Token Outline
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
        for (let token of sfCharacter.filter(tok=>!!tok.actor.system.details.level)) {
            if(token.actor.system.details.level < 5){levelMod = 0.25};
            if(token.actor.system.details.level < 11 && token.actor.system.details.level > 4){levelMod = 0.5};
            if(token.actor.system.details.level < 17 && token.actor.system.details.level > 10){levelMod = 0.75};
            if(token.actor.system.details.level > 16){levelMod = 1};
            DEBM += token.actor.system.details.level*levelMod
        }

        //DIALOG BOX

        let htokenName = ""
        for(let token of selectedHostile){
            if (token.actor.type != "character"){
                let cr = token.actor.system.details.cr;
                    if (!cr){cr = "n/a"}
                        if (cr < 1 && cr == 0.125){cr = "1⁄8"}
                        if (cr < 1 && cr == 0.25){cr = "1⁄4"}
                        if (cr < 1 && cr == 0.375){cr = "3⁄8"}
                        if (cr < 1 && cr == 0.5){cr = "1⁄2"}
                        if (cr < 1 && cr == 0.625){cr = "5⁄8"}
                        if (cr < 1 && cr == 0.75){cr = "3⁄4"}
                        if (cr < 1 && cr == 0.875){cr = "7⁄8"}
            htokenName += `${token.document.name} | CR: ${cr}`
            }
        }

        let sfCharName = ""
        for(let token of sfCharacter){
            if (token.actor.type != "npc"){
                let level = token.actor.system.details.level;
                    if (!level){level = "n/a"}
            let sName = `${token.document.name}`
            sfCharName += `${sName} | Level: ${level}`
            }
        }
        
        let sfNPCName = ""
        for(let token of selectedFriendly){
            if (token.actor.type != "character"){
                let cr = token.actor.system.details.cr;
                    if (!cr){cr = "n/a"}
                        if (cr < 1 && cr == 0.125){cr = "1⁄8"}
                        if (cr < 1 && cr == 0.25){cr = "1⁄4"}
                        if (cr < 1 && cr == 0.375){cr = "3⁄8"}
                        if (cr < 1 && cr == 0.5){cr = "1⁄2"}
                        if (cr < 1 && cr == 0.625){cr = "5⁄8"}
                        if (cr < 1 && cr == 0.75){cr = "3⁄4"}
                        if (cr < 1 && cr == 0.875){cr = "7⁄8"}
            sfNPCName += `${token.document.name} | CR: ${cr}`
            }
        }

        //Monster IMG Container

        let htokenImg = selectedHostile.map(token => {
            return token.document.texture.src
        })

        let hTagNameArray = selectedHostile.map(token => {
            return token.document.name
        })

        let hTagCRArray = selectedHostile.map(token => {
            return token.actor.system.details.cr
        })

        let monsterContainer = ""
        for (let i = 0; i < htokenImg.length; i++) {
            let img = `<img src=${htokenImg[i]} class="container" width="50" height="50" title="${hTagNameArray[i]} | CR: ${hTagCRArray[i]}"> `
            monsterContainer += img
        }

        //Player IMG Container

        let sfChartokenImg = sfCharacter.map(token => {
            return token.document.texture.src
        })

        let CharTagNameArray = sfCharacter.map(token => {
            return token.document.name
        })

        let CharTagCRArray = sfCharacter.map(token => {
            return token.actor.system.details.level
        })

        let playerContainer = ""
        for (let i = 0; i < sfChartokenImg.length; i++) {
            let img = `<img src=${sfChartokenImg[i]} class="container" width="50" height="50" title="${CharTagNameArray[i]} | Level: ${CharTagCRArray[i]}"> `
            playerContainer += img
        }

        //Ally IMG Container

        let sfNPCtokenImg = sfNPC.map(token => {
            return token.document.texture.src
        })
        console.log(sfNPCtokenImg)

        let NPCTagNameArray = sfNPC.map(token => {
            return token.document.name
        })
        
        let NPCTagCRArray = sfNPC.map(token => {
            return token.actor.system.details.cr
        })

        let allyContainer = ""
        for (let i = 0; i < sfNPCtokenImg.length; i++) {
            let img = `<img src=${sfNPCtokenImg[i]} class="container" width="50" height="50" title="${NPCTagNameArray[i]} | CR: ${NPCTagCRArray[i]}"> `
            allyContainer += img
        }

        //Defining options dialog box for Monster CR
        let npcOptions = ""
        for(let token of selectedHostile){
            if (token.actor.type != "character"){
            let cr = token.actor.system.details.cr;
                if (!cr){cr = "n/a"}
                    if (cr < 1 && cr == 0.125){cr = "1⁄8"}
                    if (cr < 1 && cr == 0.25){cr = "1⁄4"}
                    if (cr < 1 && cr == 0.375){cr = "3⁄8"}
                    if (cr < 1 && cr == 0.5){cr = "1⁄2"}
                    if (cr < 1 && cr == 0.625){cr = "5⁄8"}
                    if (cr < 1 && cr == 0.75){cr = "3⁄4"}
                    if (cr < 1 && cr == 0.875){cr = "7⁄8"}
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
                    if (cr < 1 && cr == 0.125){cr = "1⁄8"}
                    if (cr < 1 && cr == 0.25){cr = "1⁄4"}
                    if (cr < 1 && cr == 0.375){cr = "3⁄8"}
                    if (cr < 1 && cr == 0.5){cr = "1⁄2"}
                    if (cr < 1 && cr == 0.625){cr = "5⁄8"}
                    if (cr < 1 && cr == 0.75){cr = "3⁄4"}
                    if (cr < 1 && cr == 0.875){cr = "7⁄8"}
            fnpcOptions += `<option value=${selected}>${token.document.name} | CR: ${cr}</option>`
            }
        }

        //Warning messages that are displayed in dialog box
        let newCR = 0;
        let newDEBM = 0;
        let zeroCR = 0;
        let zeroDEBM = 0;
        if (CR == 0){
                newCR = "<font color='grey'><i>No monster tokens selected</i></font> <font color='#b94a48'><i class='fa-solid fa-triangle-exclamation'></i></font>";
                npcOptions = "<font color='grey'><i>No monster tokens selected</i></font> <font color='#b94a48'><i class='fa-solid fa-triangle-exclamation'></i></font>";
                zeroCR = "<font color='grey'>n/a</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"
            }
        if (DEBM == 0){
                newDEBM = "<font color='grey'><i>No player tokens selected</i></font> <font color='#b94a48'><i class='fa-solid fa-triangle-exclamation'></i></font>";
                playerOptions = "<font color='grey'><i>No player tokens selected</i></font> <font color='#b94a48'><i class='fa-solid fa-triangle-exclamation'></i></font>";
                zeroDEBM = "<font color='grey'>n/a</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"
            }
        if (friendlyCR == 0){
                fnpcOptions = "<font color='grey'><i>No friendly NPC tokens selected</i></font> <font color='#b94a48'><i class='fa-solid fa-triangle-exclamation'></i></font>"
        }
        if (CR > 0){
                newCR = "<font color='#b94a48'>" + CR + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>";
                zeroCR = "<font color='#b94a48'>" + CR + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"
            }
        if (DEBM > 0 || friendlyCR != 0){
                newDEBM = (DEBM + friendlyCR);
                zeroDEBM = (DEBM + friendlyCR);
            }
        
        let textDEBM = "<font color='#b94a48'>" + (newDEBM) + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
        let textZeroDEBM = "<font color='#b94a48'>" + (newDEBM) + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
        
        //Fractions
            if(newDEBM < 1 && newDEBM == 0.125){textDEBM = "<font color='#b94a48'>" + "1⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
                                          textZeroDEBM = "<font color='#b94a48'>" + "1⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"}
            if(newDEBM < 1 && newDEBM == 0.25){textDEBM = "<font color='#b94a48'>" + "1⁄4" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
                                            textZeroDEBM = "<font color='#b94a48'>" + "1⁄4" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"}
            if(newDEBM < 1 && newDEBM == 0.375){textDEBM = "<font color='#b94a48'>" + "3⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
                                            textZeroDEBM = "<font color='#b94a48'>" + "3⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"}
            if(newDEBM < 1 && newDEBM == 0.5){textDEBM = "<font color='#b94a48'>" + "1⁄2" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
                                            textZeroDEBM = "<font color='#b94a48'>" + "1⁄2" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"}
            if(newDEBM < 1 && newDEBM == 0.625){textDEBM = "<font color='#b94a48'>" + "5⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
                                            textZeroDEBM = "<font color='#b94a48'>" + "5⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"}
            if(newDEBM < 1 && newDEBM == 0.75){textDEBM = "<font color='#b94a48'>" + "3⁄4" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
                                            textZeroDEBM = "<font color='#b94a48'>" + "3⁄4" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"}
            if(newDEBM < 1 && newDEBM == 0.875){textDEBM = "<font color='#b94a48'>" + "7⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>";
                                            textZeroDEBM = "<font color='#b94a48'>" + "7⁄8" + "</font> <span title='Deadly Encounter Benchmark'><i class='fa-solid fa-shield-check'></i></span>"}

            if(CR < 1 && CR == 0.125){newCR = "<font color='#b94a48'>" + "1⁄8" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>";
                                      zeroCR = "<font color='#b94a48'>" + "1⁄8" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"}
            if(CR < 1 && CR == 0.25){newCR = "<font color='#b94a48'>" + "1⁄4" + "</font> <span title='Monster Token CR'><i class='fa-solid fa-swords'></i></span>";
                                     zeroCR = "<font color='#b94a48'>" + "1⁄4" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"}
            if(CR < 1 && CR == 0.375){newCR = "<font color='#b94a48'>" + "3⁄8" + "</font> <span title='Monster Token CR'><i class='fa-solid fa-swords'></i></span>";
                                      zeroCR = "<font color='#b94a48'>" + "3⁄8" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"}
            if(CR < 1 && CR == 0.5){newCR = "<font color='#b94a48'>" + "1⁄2" + "</font> <span title='Monster Token CR'><i class='fa-solid fa-swords'></i></span>";
                                    zeroCR = "<font color='#b94a48'>" + "1⁄2" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"}
            if(CR < 1 && CR == 0.625){newCR = "<font color='#b94a48'>" + "5⁄8" + "</font> <span title='Monster Token CR'><i class='fa-solid fa-swords'></i></span>";
                                      zeroCR = "<font color='#b94a48'>" + "5⁄8" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"}
            if(CR < 1 && CR == 0.75){newCR = "<font color='#b94a48'>" + "3⁄4" + "</font> <span title='Monster Token CR'><i class='fa-solid fa-swords'></i></span>";
                                     zeroCR = "<font color='#b94a48'>" + "3⁄4" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"}
            if(CR < 1 && CR === 0.875){newCR = "<font color='#b94a48'>" + "7⁄8" + "</font> <span title='Monster Token CR'><i class='fa-solid fa-swords'></i></span>";
                                      zeroCR = "<font color='#b94a48'>" + "7⁄8" + "</font> <span title='Monster CR'><i class='fa-solid fa-swords'></i></span>"}

        //Is the encounter deadly?
        let isDeadly = 0;
        if(CR > DEBM + friendlyCR){isDeadly = 
                `
                <div class="padding"><center><span class="isdeadly-backgroundClear">This encounter may be</span><span class="isdeadly-backgroundRed" title="${DEBM + friendlyCR} is less than ${CR}">Deadly</span></center>
                </div>
                `
            }

        if(CR == DEBM + friendlyCR){isDeadly = 
                `
                <div class="padding"><center><span class="isdeadly-backgroundClear">This encounter may be</span><span class="isdeadly-backgroundOrange" title="${DEBM + friendlyCR} is equal to ${CR}">Challenging</span></center>
                </div>
                `
            }

        if(CR < DEBM + friendlyCR){isDeadly = 
                `
                <div class="padding"><center><span class="isdeadly-backgroundClear">This encounter is</span><span class="isdeadly-backgroundGreen" title="${DEBM + friendlyCR} is greater than ${CR}">Not Deadly</span></center>
                </div>
                `
            }

        //Dialog box style

        let dialogTemplate = `
        <div class="dialogbox">
            ${isDeadly}
            <filigree-box>
                <span><center><font size="3"><b>The Deadly Encounter Benchmark is:</b></font></center></span>
                <span><center><font size="4">${textDEBM}</font></center></span> 
                    <br>
                <center><span>${playerContainer}</span></center>
                    <br>
                <center><span>${allyContainer}</span></center>
            </filigree-box>
            <br>
            <filigree-box>
                <span><center><font size="3"><b>Total Monster CR:</b></font></center></span>
                <span><id="challenge"><font size="4"><center>${newCR}</font></center></span>
                    <br>
                <center><span>${monsterContainer}</span></center>
            </filigree-box>
                <br>
            <details><summary><b>What is a "Deadly Encounter Benchmark"?</b></summary>
                <br>
                <span>A <i>Deadly Encounter Benchmark</i> is a guideline that helps determine an encounter's difficulty.</span>
                <br>
                <br>
                <span>An encounter may be deadly if the sum total of monster challenge ratings is greater than:</span>
                <ul>
                    <li>1⁄4 of the sum total of character levels, for characters of 1st to 4th level;</li>
                    <li>1⁄2 of the sum total of character levels, for characters of 5th to 10th level;</li>
                    <li>3⁄4 of the sum total of character levels, for characters of 11th to 16th level;</li>
                    <li>Equal to the sum total of characters levels, for characters 17th level or higher.</li>
                </ul>
                <br>
                <span> A Deadly Encounter means:</span>
                <ul>
                    <li>Most characters might lose more than half their hit points.</i>
                    <li>Several character might go unconscious.</li>
                    <li>There's a chance that one or more chracter might die.</li>
                </ul>
                <br>
                <span>If friendly NPCs join the encounter, their CR values are added to the <i>Deadly Encounter Benchmark</i>.</span>
                </details>
            <br>
        </div>
        `
        
        const myDialogOptions = {
            id: "debm-window", 
        };
        
        //Dialog box display
        if(selected.length > 0){
            const myDialog = new Dialog({
                title: "Deadly Encounter Benchmark",
                content: dialogTemplate,
                popOut: true,
                buttons: {
                    close: {
                        label: "Close",
                        icon: `<i class="fa-solid fa-right-from-bracket"></i> `
                    }
                }
            }, myDialogOptions).render(true); 
        }
    }  
}

//Button
Hooks.on('getSceneControlButtons', (buttons) => {
    if (!game.user.isGM) {return;}
    const basicControlsButton = buttons.find(b => b.name === "token");
    if (basicControlsButton) {
            basicControlsButton.tools.push({
            name: "deadly-encounter-benchmark",
            title: "Deadly Encounter Benchmark",
            icon: 'fas fa-solid fa-shield-check',
            visible: game.user.isGM,
            onClick: DeadlyEncounterBenchmark._activeDEBM,
            button: true
        });
    }  
});
