// -----Constants-----

// -----Cached DOM Elements-----
const addPlayerEl = document.querySelector(`.add-player`)
const playerSectionEl = document.querySelector(`.player-section`)
const coutnerEl = document.querySelector(`.counter`)

// -----Variables-----
let playerCounter = coutnerEl ? Number(coutnerEl.textContent) : 0

// -----Event Listeners-----
if (addPlayerEl) {
    addPlayerEl.addEventListener(`click`, (e) => {
        handleClick(e)
    })
}

// -----Functions-----
function handleClick(e) {
    if (playerCounter < 3) {
        console.log(playerCounter)
        playerSectionEl.innerHTML +=`<label for="player-name${playerCounter}">Player Name:</label>
        <input id="player-name${playerCounter}" type="text" name="playerName" required>
        <label for="hero${playerCounter}">Hero:</label>
        <input id="hero${playerCounter}" type="text" name="playerHero" required>`
        playerCounter++
    } else {
        playerSectionEl.innerHTML +=`<label for="player-name${playerCounter}">Player Name:</label>
        <input id="player-name${playerCounter}" type="text" name="playerName" required>
        <label for="hero${playerCounter}">Hero:</label>
        <input id="hero${playerCounter}" type="text" name="playerHero" required>`
        addPlayerEl.classList.add(`hidden`)
    }
}