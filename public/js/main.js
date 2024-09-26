// -----Constants-----
const campaignInformation = {
    TheRiseOfRedSkull: {
        new: `
        <h4>Experimental Attachments:</h4>
        <fieldset class="campaign-widget checkboxes">
            <input id="laser-rifle" type="checkbox" name="experimentalAttachments" value="Laser Rifle">
            <label for="laser-rifle">Laser Rifle</label>
            <input id="energy-shield" type="checkbox" name="experimentalAttachments" value="Energy Shield">
            <label for="energy-shield">Energy Shield</label>
            <input id="power-gaunts" type="checkbox" name="experimentalAttachments" value="Power Gauntlets">
            <label for="power-gaunts">Power Gauntlets</label>
            <input id="exo-suit" type="checkbox" name="experimentalAttachments" value="Exo-Suit">
            <label for="exo-suit">Exo-Suit</label>
        </fieldset>`,
        edit: ``
    },
    SinisterMotives: {
        new: `
        <label>
            Current Reputation
            <input type="number" name="currentReputation">
        </label>
        <h4>Osborn Tech:</h4>
        <fieldset class="campaign-widget checkboxes">
            <input type="checkbox" name="osbornTechCards" value="Arm Cannon">Arm Cannon</input>
            <input id="ion-boots" type="checkbox" name="osbornTechCards" value="Ionic Boots">
            <label for="ion-boots">Ionic Boots</label>
            <input id="kin-armor" type="checkbox" name="osbornTechCards" value="Kinetic Armor">
            <label for="kin-armor">Kinetic Armor</label>
            <input id="neo-scales" type="checkbox" name="osbornTechCards" value="Neocarbon Scales">
            <label for="neo-scales">Neocarbon Scales</label>
            <input id="spiked" type="checkbox" name="osbornTechCards" value="Spiked Gauntlet">
            <label for="spiked">Spiked Gauntlet</label>
            <input id="tracking" type="checkbox" name="osbornTechCards" value="Tracking Display">
            <label for="tracking">Tracking Display</label>
        </fieldset>
        <h4>Community Service:</h4>
        <fieldset class="campaign-widget checkboxes">
            <input id="burglary" type="checkbox" name="completedCommunityServices" value="Back Alley Burglary">
            <label for="burglary">Back Alley Burglary</label>
            <input id="ciat" type="checkbox" name="completedCommunityServices" value="Cat in a Tree">
            <label for="ciat">Cat in a Tree</label>
            <input id="heist" type="checkbox" name="completedCommunityServices" value="Henchmen Heist">
            <label for="heist">Henchmen Heist</label>
            <input id="rails" type="checkbox" name="completedCommunityServices" value="Off the Rails">
            <label for="rails">Off the Rails</label>
            <input id="rubble" type="checkbox" name="completedCommunityServices" value="Rubble Rescue">
            <label for="rubble">Rubble Rescue</label>
        </fieldset>
        <label>
            Waking Nightmares:
            <input type="number" name="wakingNightmares">
        </label>
        <h4>Last Ones Standing:</h4>
        <fieldset class="campaign-widget checkboxes">
            <input id="doc-oc" type="checkbox" name="lastOnesStanding" value="Doctor Octopus">
            <label for="doc-oc">Doctor Octopus</label>
            <input id="electro" type="checkbox" name="lastOnesStanding" value="Electro">
            <label for="electro">Electro</label>
            <input id="hobgob" type="checkbox" name="lastOnesStanding" value="Hobgoblin">
            <label for="hobgob">Hobgoblin</label>
            <input id="kraven" type="checkbox" name="lastOnesStanding" value="Kraven the Hunter">
            <label for="kraven">Kraven the Hunter</label>
            <input id="scorpion" type="checkbox" name="lastOnesStanding" value="Scorpion">
            <label for="scorpion">Scorpion</label>
            <input id="vulture" type="checkbox" name="lastOnesStanding" value="Vulture"> 
            <label for="vulture">Vulture</label>
        </fieldset>`,
        edit: ``
    },
}

// -----Cached DOM Elements-----
const modalEl = document.querySelector(`.modal`)
const addPlayerEl = document.querySelector(`.add`)
const playerSectionEl = document.querySelector(`.player-section`)
const gameSectionEl = document.querySelector(`.game-section`)
const campaignInfoSectionEl = document.querySelector(`.campaign-info-section`)
const playerCounterEls = document.querySelectorAll(`.player-widget`)
const defaultGameWidgetEl = document.querySelector(`#default-widget`)
// -----Variables-----
let playerCounter = playerCounterEls.length

// -----Event Listeners-----
document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`button`))
    handleButtonClick(e)
})

document.addEventListener(`change`, (e) => {
    if (e.target.id === `campaign-type`) {
        insertCampaignInformation(e)
    }
})
//TODO - Move Nav links into sub menus and add logic to expand and contract menus

// -----Functions-----
function handleButtonClick(e) {
    if (e.target.classList.contains(`player-button`)) {
        if (e.target.classList.contains(`add`)) {
            addPlayerWidget()
            return
        }
        if (e.target.classList.contains(`remove`)) {
            removePlayerWidget(e)
            return
        }
    }
    if (e.target.classList.contains(`game-button`)) {
        if (e.target.classList.contains(`add`)) {
            addGameWidget()
            return
        }
        if (e.target.classList.contains(`remove`)) {
            removeGameWidget(e)
            return
        }
    }
    if (e.target.classList.contains(`delete`)) {
        revealDeleteGameModal(e)
        return
    }
    if (e.target.classList.contains(`cancel`)) {
        hideModal()
        return
    }
}

function chooseCampaignInformation(string) {
    return campaignInformation[string].new
}

function insertCampaignInformation(e) {
    let campaignInfoEl = document.getElementById(`campaign-type`)
    campaignInfoSectionEl.innerHTML = chooseCampaignInformation(campaignInfoEl.value)
}
//TODO - Change this logic to be reveal/hide style instead of inserting new elements.

function addPlayerWidget() {
    if (playerCounter < 4) {
        const newPlayerEl = document.createElement(`fieldset`)
        newPlayerEl.classList.add(`player-widget`)
        newPlayerEl.classList.add(`player${playerCounter}`)
        newPlayerEl.innerHTML = 
        `<label class="player-element">
            Player Name:
            <input type="text" name="playerName" required">
        </label>
        <label class="hero-element">
            Hero:
            <input type="text" name="playerHero" required">
        </label>
        <button type="button" class="player-button button remove">Remove Player</button>`
        playerSectionEl.appendChild(newPlayerEl)
        playerCounter++
        if (playerCounter === 4) {
            addPlayerEl.classList.add(`hidden`)
            const maxPlayerMessageEl = document.createElement(`p`)
            maxPlayerMessageEl.classList.add(`player-message`)
            maxPlayerMessageEl.textContent = `Maximum player count reached.`
            playerSectionEl.appendChild(maxPlayerMessageEl)
        }
    }
}
//TODO - Adjust this so that it works for any player widget instead of just the standard game widget.

function removePlayerWidget(e) {
    if (playerCounter > 0) {
        playerCounter--
        const removePlayerEl = e.target.parentNode
        removePlayerEl.remove()
        if (playerCounter === 3) {
            addPlayerEl.classList.remove(`hidden`)
            const maxPlayerMessageEl = document.querySelector(`.player-message`)
            maxPlayerMessageEl.remove()
        }
    }
}

function addGameWidget() {
    if (defaultGameWidgetEl.classList.contains(`hidden`)) {
        defaultGameWidgetEl.classList.remove(`hidden`)
    } else {
        const newGameEl = defaultGameWidgetEl.cloneNode(true)
        newGameEl.classList.remove(`default-widget`)
        gameSectionEl.appendChild(newGameEl)    
    }
}

function removeGameWidget(e) {
    if (e.target.classList.contains(`default-widget`)) {
        defaultGameWidgetEl.classList.add(`hidden`)
    } else {
        const removeGameEl = e.target.parentNode
        removeGameEl.remove()
    }
}

function revealDeleteGameModal(e) {
    modalEl.innerHTML =
    // REVIEW - There's gotta be a better way to pass these variables through...
`<p class="delete-text">Are you sure you want to delete ${e.target.childNodes[1].textContent}?</p>
    <section class="button-section">
        <form class="button-element button confirm" action="/games/${e.target.classList[2]}?_method=delete" method="post">
            <button>Delete</button>
        </form>
        <button class="button-element button cancel" type="button">Cancel</button>
    </section>`
    modalEl.classList.remove(`hidden`)
}

//TODO - Add revealDeleteCampaignModal()

function hideModal() {
    modalEl.classList.add(`hidden`)
    modalEl.innerHTML = ``
}
