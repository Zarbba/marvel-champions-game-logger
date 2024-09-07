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
        const newPlayerFormEl = document.createElement(`div`)
        newPlayerFormEl.innerHTML = 
        `<label>
            Player Name:
            <input type="text" name="playerName" required>
        </label>
        <label>
            Hero:
            <input type="text" name="playerHero" required>
        </label>`
        playerSectionEl.appendChild(newPlayerFormEl)
        playerCounter++
    } else {
        const newPlayerFormEl = document.createElement(`div`)
        newPlayerFormEl.innerHTML = 
        `<label>
            Player Name:
            <input type="text" name="playerName" required>
        </label>
        <label>
            Hero:
            <input type="text" name="playerHero" required>
        </label>`
        playerSectionEl.appendChild(newPlayerFormEl)
        addPlayerEl.classList.add(`hidden`)
    }
}