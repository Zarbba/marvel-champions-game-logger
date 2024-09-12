// -----Constants-----

// -----Cached DOM Elements-----
const addPlayerEl = document.querySelector(`.add`)
const playerSectionEl = document.querySelector(`.player-section`)
const coutnerEl = document.querySelectorAll(`.player-widget`)

// -----Variables-----
let playerCounter = coutnerEl.length

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
        <label class="owner-element">
            Owner:
            <input type="text" name="playerOwner">
        </label>
        <button type="button" class="player-button">Remove Player</button>`
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

function removePlayer() {
    try {
        if (playerCounter > 0) {
            playerCounter--
            const removePlayerEl = document.querySelector(`.player${playerCounter}`)
            removePlayerEl.remove()
            if (playerCounter === 3) {
                addPlayerEl.classList.remove(`hidden`)
                const maxPlayerMessageEl = document.querySelector(`.player-message`)
                maxPlayerMessageEl.remove()
            }
        }
    } catch(err) {
        playerCounter ++
        console.log(err)
        return
    }
}
