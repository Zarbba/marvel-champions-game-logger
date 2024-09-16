// -----Constants-----

// -----Cached DOM Elements-----
const deleteModalEl = document.querySelector(`.delete-modal`)
const addPlayerEl = document.querySelector(`.add`)
const playerSectionEl = document.querySelector(`.player-section`)
const coutnerEl = document.querySelectorAll(`.player-widget`)

// -----Variables-----
let playerCounter = coutnerEl.length

// -----Event Listeners-----
document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`button`))
    handleClick(e)
})

// -----Functions-----
function handleClick(e) {
    if (e.target.classList.contains(`add`)) {
        addPlayerWidget()
        return
    }
    if (e.target.classList.contains(`remove`)) {
        removePlayerWidget(e)
        return
    }
    if (e.target.classList.contains(`delete`)) {
        revealDeleteModal(e)
        return
    }
    if (e.target.classList.contains(`cancel`)) {
        hideDeleteModal()
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
            addPlayerEl.classList.add(`hidden`)
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

function revealDeleteModal(e) {
    deleteModalEl.innerHTML =
    // REVIEW - There's gotta be a better way to pass these variables through...
`<p class="delete-text">Are you sure you want to delete ${e.target.childNodes[1].textContent}?</p>
    <section class="button-section">
        <form class="button-element button confirm" action="/games/${e.target.classList[2]}?_method=delete" method="post">
            <button>Delete</button>
        </form>
        <button class="button-element button cancel" type="button">Cancel</button>
    </section>`
    deleteModalEl.classList.remove(`hidden`)
}

function hideDeleteModal() {
    deleteModalEl.classList.add(`hidden`)
    deleteModalEl.innerHTML = ``
}