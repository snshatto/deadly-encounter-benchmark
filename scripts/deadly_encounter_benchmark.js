import { 
    fractionMap, 
    formatCR, 
    formatValue, 
    generateTokenData, 
    attachTokenClickHandlers,
    formatTokenImages, 
    sumCR, 
    determineEncounterDanger, 
    categorizeTokens, 
    filterTokensWithCR, 
    filterTokensWithLevel, 
    calculateFriendlyCR, 
    calculateDEBM, 
    renderDEBMDialogContent
} from "./utils.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const DialogV2 = foundry.applications.api.DialogV2;

let debmDialogInstance = null;
let debmDialogPosition = null;

class DeadlyEncounterBenchmark extends HandlebarsApplicationMixin(ApplicationV2) {

    static async _activeDEBM() {
        const selected = canvas.tokens.controlled;
        if (selected.length === 0) {
            ui.notifications.error("Please select at least 1 token.");
            return;
        }
    
        const {
            tokenHostile,
            selectedFriendlyNPC,
            selectedFriendlyCharacter
        } = categorizeTokens(selected);
    
        const hostileWithCR = filterTokensWithCR(tokenHostile);
        const sfNPCWithCR = filterTokensWithCR(selectedFriendlyNPC);
        const sfCharacterWithLevel = filterTokensWithLevel(selectedFriendlyCharacter);
    
        const CR = sumCR(hostileWithCR);
        const friendlyCR = calculateFriendlyCR(sfNPCWithCR);
        const DEBM = calculateDEBM(sfCharacterWithLevel);
    
        const textDEBM = (DEBM === 0)
            ? `<span class="noToken">No player tokens selected</span> <i class="fa-solid fa-triangle-exclamation" style="color: #ff8c00; font-size: 15px;"></i>`
            : formatValue(formatCR(DEBM + friendlyCR), "fa-solid fa-shield-check", "Deadly Encounter Benchmark");
    
        const newCR = (CR === 0)
            ? `<span class="noToken">No monster tokens selected</span> <i class="fa-solid fa-triangle-exclamation" style="color: #ff8c00; font-size: 15px;"></i>`
            : formatValue(formatCR(CR), "fa-solid fa-swords", "Monster Token CR");
    
        const isDeadly = determineEncounterDanger(CR, DEBM, friendlyCR);
    
        const content = await renderDEBMDialogContent({
            isDeadly,
            textDEBM,
            newCR,
            playerContainer: formatTokenImages(sfCharacterWithLevel, "Level"),
            allyContainer: formatTokenImages(sfNPCWithCR, "CR"),
            monsterContainer: formatTokenImages(hostileWithCR, "CR")
        });
    
        if (debmDialogInstance?.rendered) {
            debmDialogPosition = debmDialogInstance.position;
            debmDialogInstance.close({ force: true });
        }
    
        debmDialogInstance = new DialogV2({
            window: {
                title: "Deadly Encounter Benchmark"
            },
            id: "debm-window",
            content,
            buttons: [
                {
                    action: "recalculate",
                    label: "Recalculate",
                    icon: "fa-solid fa-rotate-right",
                    class: "V2button",
                    callback: () => DeadlyEncounterBenchmark._activeDEBM()
                },
                {
                    action: "close",
                    label: "Close",
                    icon: "fa-solid fa-square-xmark",
                    class: "V2button",
                    default: true
                }
            ],
            ...(debmDialogPosition ? { position: debmDialogPosition } : {}),
            rejectClose: false
        });
    
        await debmDialogInstance.render(true);
        attachTokenClickHandlers();
    }    
}

//Token Controls Button
Hooks.on("getSceneControlButtons", (controls) => {
    if (!game.user.isGM) return;
    const isV13 = !foundry.utils.isNewerVersion("13.0.0", game.version);
    
    const tokensControl = isV13 ? controls.tokens : controls.find(control => control.name === "token");
    if (!tokensControl) return;

    if (isV13) {
        tokensControl.tools["deadly-encounter-benchmark"] = {
            name: "deadly-encounter-benchmark",
            title: "Deadly Encounter Benchmark",
            icon: "fas fa-solid fa-shield-check",
            order: 6,
            onChange: DeadlyEncounterBenchmark._activeDEBM,
            button: true
        };
    } else {
        tokensControl.tools.push({
            name: "deadly-encounter-benchmark",
            title: "Deadly Encounter Benchmark",
            icon: "fas fa-solid fa-shield-check",
            onClick: DeadlyEncounterBenchmark._activeDEBM,
            button: true
        });
    }
});
