export const fractionMap = {
    0.125: "1⁄8",
    0.25: "1⁄4",
    0.375: "3⁄8",
    0.5: "1⁄2",
    0.625: "5⁄8",
    0.75: "3⁄4",
    0.875: "7⁄8"
};

export function formatCR(cr) {
    const numCR = typeof cr === "string" ? Number(eval(cr)) : cr;
    if (!numCR && numCR !== 0) return "n/a";

    if (numCR < 1) {
        return fractionMap[numCR] ?? numCR.toFixed(2);
    }

    if (numCR % 1 !== 0) {
        const whole = Math.floor(numCR);
        const fractional = numCR - whole;
        return `${whole} ${fractionMap[fractional] ?? fractional.toFixed(2)}`;
    }

    return numCR;
}

export function formatValue(value, iconClass, title) {
    const displayValue = (value < 1 && fractionMap[value]) ? fractionMap[value] : value;
    return `<span style="color: #b94a48">${displayValue}</span> <span title='${title}'><i class='${iconClass}' style="font-size: 16px;"></i></span>`;
}

export function generateTokenData(tokens, type = "CR", tooltip = null, asOption = false) {
    return tokens.map(token => {
        const value = type === "CR" ? formatCR(token.actor?.system?.details?.cr) : token.actor?.system?.details?.level ?? "n/a";      
        const name = token.document.name;
        const title = tooltip ? `title="${tooltip}: ${value}"` : '';
        
        if (asOption) {
            return `<option value=${token.id} ${title}>${name} | ${type}: ${value}</option>`;
        } else {
            return `${name} | ${type}: ${value}`;
        }
    }).join(asOption ? "" : " ");
}

export function attachTokenClickHandlers () {
  setTimeout(() => {
    document.querySelectorAll(".debm-token-img").forEach(img => {
      img.addEventListener("click", async (event) => {
        const tokenId = event.currentTarget.dataset.tokenId;
        const token = canvas.tokens.get(tokenId);
        if (token?.actor?.sheet) {
          token.actor.sheet.render(true);
        } else {
          ui.notifications.warn("Could not open sheet for this token.");
        }
      });
    });
  }, 100);
}

export function formatTokenImages(tokens, label) {
    return tokens.map(token => {
        const name = token.document.name;
        const value = label === "CR" ? formatCR(token.actor.system.details.cr) : token.actor.system.details.level;
        const src = token.document.texture.src;
        return `<img src="${src}" class="container debm-token-img" data-token-id="${token.id}" width="50" height="50" title="${name} | ${label}: ${value}">`;
    }).join(" ");
}

export function sumCR(tokens) {
    return tokens.reduce((sum, token) => sum + token.actor.system.details.cr, 0);
}

export function determineEncounterDanger(CR, DEBM, friendlyCR) {
    const totalDEBM = DEBM + friendlyCR;
    if (CR > totalDEBM) {
        return `<div class="padding"><span class="isdeadly-backgroundClear">This encounter may be</span><span class="isdeadly-backgroundRed">Deadly</span></div>`;
    } else if (CR === totalDEBM) {
        return `<div class="padding"><span class="isdeadly-backgroundClear">This encounter may be</span><span class="isdeadly-backgroundOrange">Challenging</span></div>`;
    } else {
        return `<div class="padding"><span class="isdeadly-backgroundClear">This encounter is</span><span class="isdeadly-backgroundGreen">Not Deadly</span></div>`;
    }
}

export function categorizeTokens(tokens) {
    const [tokenFriendly, tokenHostile] = tokens.partition(t => t.document.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE);
    const [selectedFriendlyNPC, selectedFriendlyCharacter] = tokenFriendly.partition(t => t.actor.type === "character");

    return {
        tokenHostile,
        selectedFriendlyNPC,
        selectedFriendlyCharacter
    };
}

export function filterTokensWithCR(tokens) {
    return tokens.filter(tok => tok.actor?.system?.details?.cr != null);
}

export function filterTokensWithLevel(tokens) {
    return tokens.filter(tok => tok.actor?.system?.details?.level != null);
}

export function calculateFriendlyCR(tokens) {
    return tokens.reduce((sum, t) => sum + t.actor.system.details.cr, 0);
}

export function calculateDEBM(tokens) {
    return tokens.reduce((sum, token) => {
        const level = token.actor.system.details.level;
        const mod = level < 5 ? 0.25 : level < 11 ? 0.5 : level < 17 ? 0.75 : 1;
        return sum + level * mod;
    }, 0);
}

export async function renderDEBMDialogContent(data) {
    const div = document.createElement("div");
    div.innerHTML = await foundry.applications.handlebars.renderTemplate(
        "modules/deadly-encounter-benchmark/templates/deadly-encounter-benchmark.hbs",
        data
    );
    return div;
}

