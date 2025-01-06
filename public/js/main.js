// -----Constants-----

// -----Cached DOM Elements-----
const modalEl = document.querySelector(`.modal`)
const addPlayerEl = document.querySelector(`.add`)
const gameSectionEl = document.querySelector(`.game-section`)
const campaignInfoSectionEl = document.querySelector(`.campaign-info-section`)
const playerCounterEls = document.querySelectorAll(`.player-widget`)
const defaultGameWidgetEl = document.querySelector(`#default-widget`)
// -----Variables-----
let playerCounter = playerCounterEls.length

// -----Event Listeners-----
document.addEventListener(`click`, (e) => {
	if (e.target.classList.contains(`button`)) handleButtonClick(e)
})

document.addEventListener(`change`, (e) => {
	if (e.target.id === `campaign-type`) {
		renderCampaignInformation(e)
	}
})
//TODO - Move Nav links into sub menus and add logic to expand and contract menus

// -----Functions-----

function handleButtonClick(e) {
	if (e.target.classList.contains(`player-button`)) {
		if (
			e.target.classList.contains(`add`) &&
			e.target.classList.contains(`red-skull`)
		) {
			addRedSkullPlayerWidget()
			return
		}
		if (
			e.target.classList.contains(`add`) &&
			e.target.classList.contains(`sin-mot`)
		) {
			addSinisterMotivesPlayerWidget()
			return
		}
		if (
			e.target.classList.contains(`add`) &&
			e.target.classList.contains(`age`)
		) {
			addAgeOfApocalypsePlayerWidget()
			return
		}
		if (e.target.classList.contains(`add`)) {
			addDefaultPlayerWidget()
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
		if (e.target.classList.contains(`game`)) {
			revealDeleteGameModal(e)
			return
		}
		if (e.target.classList.contains(`campaign`)) {
			revealDeleteCampaignModal(e)
			return
		}
	}
	if (e.target.classList.contains(`cancel`)) {
		hideModal()
		return
	}
}

function chooseCampaignInformation(string) {
	return campaignInformation[string].new
}

function renderCampaignInformation(e) {
	let oldCampaignInfoEl = document.querySelector(`.current-campaign`)
	let newCampaignInfoEl = document.querySelector(`.${e.target.value}`)
	newCampaignInfoEl.classList.toggle(`hidden`)
	newCampaignInfoEl.classList.toggle(`current-campaign`)
	if (oldCampaignInfoEl) {
		oldCampaignInfoEl.classList.toggle(`hidden`)
		oldCampaignInfoEl.classList.toggle(`current-campaign`)
	}
}

function addRedSkullPlayerWidget() {
	if (playerCounter < 4) {
		const playerSectionEl = document.getElementById(`red-skull-player-section`)
		const newPlayerEl = document.createElement(`fieldset`)
		newPlayerEl.classList.add(`player-widget`)
		newPlayerEl.innerHTML = `<label class="player-element">
                Player Name:
                <input type="text" name="playerName" required value="">
            </label>
            <label class="hero-element">
                Hero:
                <input type="text" name="playerHero" required value="">
            </label>
            <label class="hp-element">
                Remaining Hitpoints:
                <input type="number" name="remainingHitPoints" value="">
            </label>
                Tech Card:
                <select name="techCard">
                    <option value="Adrenal Stims">Adrenal Stims</option>
                    <option value="Tactical Scanner">Tactical Scanner</option>
                    <option value="Emergency Teleporter">Emergency Teleporter</option>
                    <option value="Laser Cannon">Laser Cannon</option>
                    <option value="" class="hidden" selected></option>
                </select>
            </label>
            <fieldset>
                <label>
                    Condition Card:
                    <select name="conditionCard">
                        <option value="Thwart Upgrade">Thwart Upgrade</option>
                        <option value="Attack Upgrade">Attack Upgrade</option>
                        <option value="Defence Upgrade">Defence Upgrade</option>
                        <option value="Recovery Upgrade">Recovery Upgrade</option>
                        <option value="" class="hidden" selected></option>
                    </select>
                </label>
                <label>
                    Basic
                    <input type="radio" value="basic" name="improvedConditionCard" checked>
                </label>
                <label>
                    Improved
                    <input type="radio" value="improved" name="improvedConditionCard">
                </label>
            </fieldset>
            <h4>Rescued Allies:</h4>
            <fieldset class="campaign-widget checkboxes">
                <input id="moon-knight" type="checkbox" name="rescuedAllyCards${playerCounter}" value="Moon Knight">
                <label for="moon-knight">Moon Knight</label>
                <input id="shang-chi" type="checkbox" name="rescuedAllyCards${playerCounter}" value="Shang-Chi">
                <label for="shang-chi">Shang-Chi</label>
                <input id="white-tiger" type="checkbox" name="rescuedAllyCards${playerCounter}" value="White Tiger">
                <label for="white-tiger">White Tiger</label>
                <input id="elektra" type="checkbox" name="rescuedAllyCards${playerCounter}" value="Elektra">
                <label for="elektra">Elektra</label>
            </fieldset>
            <h4>Obligations:</h4>
            <fieldset class="campaign-widget checkboxes">
                <input id="zolas-algo" type="checkbox" name="expertObligationCards${playerCounter}" value="Zola's Algorithim">
                <label for="zolas-algo">Zola's Algorithim</label>
                <input id="med-emerg" type="checkbox" name="expertObligationCards${playerCounter}" value="Medical Emergency">
                <label for="med-emerg">Medical Emergency</label>
                <input id="martial-law" type="checkbox" name="expertObligationCards${playerCounter}" value="Martial Law">
                <label for="martial-law">Martial Law</label>
                <input id="anti-hero" type="checkbox" name="expertObligationCards${playerCounter}" value="Anti-Hero Propaganda">
                <label for="anti-hero">Anti-Hero Propaganda</label>
            </fieldset>                
            <label>
                Was this player engaged with a minion when Zola was defeated?
                <input type="checkbox" value="true">
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

function addSinisterMotivesPlayerWidget() {
	if (playerCounter < 4) {
		const playerSectionEl = document.getElementById(`sin-mot-player-section`)
		const newPlayerEl = document.createElement(`fieldset`)
		newPlayerEl.classList.add(`player-widget`)
		newPlayerEl.innerHTML = `<label class="player-element">
            Player Name:
            <input type="text" name="playerName" required value="">
        </label>
        <label class="hero-element">
            Hero:
            <input type="text" name="playerHero" required value="">
        </label>
        <label class="hp-element">
            Remaining Hitpoints:
            <input type="number" name="remainingHitPoints" value="">
        </label>
        <label class="shield-tech-element">
            Shield Tech Card:
            <select name="shieldTechCard">
                <option value="Compact Darts">Compact Darts</option>
                <option value="Impact-Dampening Suit">Impact-Dampening Suit</option>
                <option value="Laser Goggles">Laser Goggles</option>
                <option value="Propulsion Gauntlet">Propulsion Gauntlet</option>
                <option value="Retinal Display">Retinal Display</option>
                <option value="Shock Knuckles">Shock Knuckles</option>
                <option value="Wave Bracers">Wave Bracers</option>
                <option value="Wrist-Navigator">Wrist-Navigator</option>
                <option value="" class="hidden" selected></option>
            </select>
        </label>
        <label class="aspect-adv-element">
            Aspect Advantage Card:
            <input type="text" name="aspectAdvantageCard" value="">
        </label>
        <label class="plan-ahead-element">
            Planning Ahead Card:
            <input type="text" name="planningAheadCard" value="">
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
function addAgeOfApocalypsePlayerWidget() {
	if (playerCounter < 4) {
		const playerSectionEl = document.getElementById(`age-player-section`)
		const newPlayerEl = document.createElement(`fieldset`)
		newPlayerEl.classList.add(`player-widget`)
		newPlayerEl.innerHTML = `<label class="player-element">
						Player Name:
						<input type="text" name="playerName" required>
					</label>
					<label class="hero-element">
						Hero:
						<input type="text" name="playerHero" required>
					</label>
					<label class="hp-element">
						Remaining Hitpoints:
						<input type="number" name="remainingHitPoints">
					</label>
	</section>
	<button type="button" class="player-button button add age">Add a player</button>`
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

function addDefaultPlayerWidget() {
	if (playerCounter < 4) {
		const playerSectionEl = document.querySelector(`.player-section`)
		const newPlayerEl = document.createElement(`fieldset`)
		newPlayerEl.classList.add(`player-widget`)
		newPlayerEl.innerHTML = `<label class="player-element">
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

function revealDeleteCampaignModal(e) {
	modalEl.innerHTML = `<p class="delete-text">Are you sure you want to delete ${e.target.childNodes[1].textContent}?</p>
    <section class="button-section">
        <form class="button-element button confirm" action="/campaigns/${e.target.classList[2]}?_method=delete" method="post">
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
