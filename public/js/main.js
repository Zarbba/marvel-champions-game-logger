// -----Constants-----

// -----Cached DOM Elements-----
const modalEl = document.querySelector(`.modal`)
const addPlayerEl = document.querySelector(`.add`)
const playerSectionEl = document.querySelector(`.player-section`)
const gameSectionEl = document.querySelector(`.game-section`)
const playerCounterEls = document.querySelectorAll(`.player-widget`)
const defaultGameWidgetEl = document.querySelector(`#default-widget`)
// -----Variables-----
let playerCounter = playerCounterEls.length

// -----Event Listeners-----
document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`button`))
    handleClick(e)
})

// -----Functions-----
function handleClick(e) {
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
        revealDeleteModal(e)
        return
    }
    if (e.target.classList.contains(`cancel`)) {
        hideModal()
        return
    }
}

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
        if (playerCounter === 4) {
            addPlayerEl.classList.add(`hidden`)
            const maxPlayerMessageEl = document.createElement(`p`)
            maxPlayerMessageEl.classList.add(`player-message`)
            maxPlayerMessageEl.textContent = `Maximum player count reached.`
            playerSectionEl.appendChild(maxPlayerMessageEl)
            const maxPlayerMessageEl = document.createElement(`p`)
            maxPlayerMessageEl.classList.add(`player-message`)
            maxPlayerMessageEl.textContent = `Maximum player count reached.`
            playerSectionEl.appendChild(maxPlayerMessageEl)
        }
    }
}

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

function revealDeleteModal(e) {
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

function hideModal() {
    modalEl.classList.add(`hidden`)
    modalEl.innerHTML = ``
}
