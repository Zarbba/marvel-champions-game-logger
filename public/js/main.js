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
        playerSectionEl.innerHTML +=`<label for="player-name${playerCounter}">Player Name:</label>
        <input id="player-name${playerCounter}" type="text" name="playerName" required>
        <label for="hero${playerCounter}">Hero:</label>
        <input id="hero${playerCounter}" type="text" name="playerHero" required>
        <button type="button">Remove Player</button>`
        playerCounter++
        if (playerCounter >= 4) {
            addPlayerEl.classList.add(`hidden`)
        }
    }
}

function removePlayer() {
    //TODO - Figure out logic for this function
}