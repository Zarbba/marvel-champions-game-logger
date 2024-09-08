// -----Constants-----

// -----Cached DOM Elements-----
const addPlayerEl = document.querySelector(`.add`)
const playerSectionEl = document.querySelector(`.player-section`)
const coutnerEl = document.querySelector(`.counter`)

// -----Variables-----
let playerCounter = coutnerEl ? Number(coutnerEl.textContent) : 0

// -----Event Listeners-----
document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`player-button`))
    handleClick(e)
})

// -----Functions-----
function handleClick(e) {
    e.target.classList.contains(`add`) ? addPlayer() : removePlayer()
}

function addPlayer() {
    if (playerCounter < 4) {
        playerSectionEl.innerHTML +=`<label class="label${playerCounter} for="player-name${playerCounter}">Player Name:</label>
        <input id="player-name${playerCounter}" type="text" name="playerName" required>
        <label class="label${playerCounter} for="hero${playerCounter}">Hero:</label>
        <input id="hero${playerCounter}" type="text" name="playerHero" required>
        <button type="button" class="player-button" id="button${playerCounter}">Remove Player</button>`
        playerCounter++
        if (playerCounter >= 4) {
            addPlayerEl.classList.add(`hidden`)
        }
    }
}

function removePlayer() {
    try {
        if (playerCounter > 0) {
        playerCounter--
        const targetEls = []
        targetEls.push(document.querySelector(`#player-name${playerCounter}`))
        targetEls.push(document.querySelector(`#hero${playerCounter}`))
        targetEls.push(document.querySelector(`#button${playerCounter}`))
        const labelEls = document.querySelectorAll(`.label${playerCounter}`)
        labelEls.forEach((labelEl) => {
            targetEls.push(labelEl)
        })
        console.log(targetEls)
        targetEls.forEach((targetEl) => {
            playerSectionEl.removeChild(targetEl)
        })
        if (playerCounter <= 3) {
            addPlayerEl.classList.remove(`hidden`)
        }
        }    
    } catch(err) {
        playerCounter ++
        console.log(err)
        return
    }
}