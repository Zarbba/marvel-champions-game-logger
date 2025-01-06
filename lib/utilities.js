const mongoose = require(`mongoose`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
const Campaign = require('../models/Campaign')
const SinisterMotives = require(`../models/campaign-information/SinisterMotives`)
const TheRiseOfRedSkull = require(`../models/campaign-information/TheRiseOfRedSkull`)
const AgeOfApocalypse = require(`../models/campaign-information/AgeOfApocalypse`)

function reverseOrder(string) {
	return string === `desc` ? `asc` : `desc`
}

function convertToArray(input) {
	let output = input
	if (!Array.isArray(input)) {
		output = []
		output.push(input)
	}
	return output
}

//The process function series all take an input(usually req.body) and convert form data into a format that conforms with the relvent DB Schema.
function processPlayerFormData(input) {
	input.playerName = convertToArray(input.playerName)
	input.playerHero = convertToArray(input.playerHero)
	let playersArray = []
	input.playerName.forEach((name) => {
		playersArray.push({playerName: name})
	})
	input.playerHero.forEach((hero, i) => {
		playersArray[i].identity = hero
	})
	if (input.campaignType && input.campaignType === `TheRiseOfRedSkull`) {
		processRedSkullPlayerFormData(input, playersArray)
	} else if (input.campaignType && input.campaignType === `SinisterMotives`) {
		processSinisterMotivesPlayerFormData(input, playersArray)
	}
	return playersArray
}

function processRedSkullPlayerFormData(input, array) {
	input.remainingHitPoints = convertToArray(input.remainingHitPoints)
	input.techCard = convertToArray(input.techCard)
	input.conditionCard = convertToArray(input.conditionCard)
	input.wasEngaged = convertToArray(input.wasEngaged)
	input.remainingHitPoints.forEach((player, i) => {
		array[i].remainingHitPoints = player
		if (input.techCard[i] !== ``) {
			array[i].techCard = input.techCard[i]
		}
		if (input.conditionCard[i] !== ``) {
			array[i].conditionCard = {
				card: input.conditionCard[i],
				improved: input.improvedConditionCard[i] === `improved` ? true : false,
			}
		}
		array[i].rescuedAllyCards = input[`rescuedAllyCards${i}`]
			? convertToArray(input[`rescuedAllyCards${i}`])
			: []
		array[i].expertObligationCards = input[`expertObligationCards${i}`]
			? convertToArray(input[`expertObligationCards${i}`])
			: []
		array[i].wasEngaged = input.wasEngaged[i]
	})
}

function processSinisterMotivesPlayerFormData(input, array) {
	input.remainingHitPoints = convertToArray(input.remainingHitPoints)
	input.shieldTechCard = convertToArray(input.shieldTechCard)
	input.aspectAdvantageCard = convertToArray(input.aspectAdvantageCard)
	input.planningAheadCard = convertToArray(input.planningAheadCard)
	input.remainingHitPoints.forEach((player, i) => {
		array[i].remainingHitPoints = player
		array[i].shieldTechCard = input.shieldTechCard[i]
		array[i].aspectAdvantageCard = input.aspectAdvantageCard[i]
		array[i].planningAheadCard = input.planningAheadCard[i]
	})
}

function processCampaignFormData(input, owner) {
	const campaignInformation = processCampaignInformationFormData(input)
	const games = input.games
		? convertToArray(input.games).filter((game) => game !== ``)
		: []
	const modes = processModeFormData(input)
	return {
		campaignName: input.campaignName,
		owner,
		campaignInformation,
		campaignType: input.campaignType,
		games,
		modes,
		notes: input.notes,
	}
}

function processCampaignInformationFormData(input) {
	if (input.campaignType === `TheRiseOfRedSkull`) {
		return processRedSkullInformationFormData(input)
	}
	if (input.campaignType === `SinisterMotives`) {
		return processSinisterMotivesInformationFormData(input)
	}
	if (input.campaignType === `AgeOfApocalypse`) {
		return processAgeOfApocalypseInformationFormData(input)
	}
}

function processRedSkullInformationFormData(input) {
	input.experimentalAttachments = convertToArray(input.experimentalAttachments)
	const players = input.playerName ? processPlayerFormData(input) : []
	const campaignInformation = {
		delayCounters: Number(input.delayCounters),
		experimentalAttachments: input.experimentalAttachments.includes(``)
			? []
			: input.experimentalAttachments,
		players,
	}
	return campaignInformation
}

function processSinisterMotivesInformationFormData(input) {
	input.osbornTechCards = convertToArray(input.osbornTechCards)
	input.completedCommunityServices = convertToArray(
		input.completedCommunityServices
	)
	input.lastOnesStanding = convertToArray(input.lastOnesStanding)
	const players = input.playerName ? processPlayerFormData(input) : []
	const campaignInformation = {
		currentReputation: input.currentReputation,
		osbornTechCards: input.osbornTechCards,
		completedCommunityServices: input.completedCommunityServices,
		wakingNightmares: Number(input.wakingNightmares),
		lastOnesStanding: input.lastOnesStanding,
		players,
	}
	return campaignInformation
}

function processAgeOfApocalypseInformationFormData(input) {
	input.defeatedSideMissions = convertToArray(input.defeatedSideMissions)
	input.defeatedOvseerMinions = convertToArray(input.defeatedOvseerMinions)
	const players = input.playerName ? processPlayerFormData(input) : []
	const campaignInformation = {
		defeatedSideMissions: input.defeatedSideMissions.includes(``)
			? []
			: input.defeatedSideMissions,
		defeatedOverseerMinions: input.defeatedOverseerMinions.includes(``)
			? []
			: input.defeatedOverseerMinions,
		players,
	}
	return campaignInformation
}

function processModeFormData(input) {
	return {
		expert: input.expertMode,
		heroic: input.heroicMode,
	}
}

async function createCampaignInformation(campaign) {
	const {campaignType, campaignInformation} = campaign
	if (campaignType === `TheRiseOfRedSkull`) {
		const newCampaignInfo = await TheRiseOfRedSkull.create(campaignInformation)
		campaign.campaignInformation = newCampaignInfo
	}
	if (campaignType === `SinisterMotives`) {
		const newCampaignInfo = await SinisterMotives.create(campaignInformation)
		campaign.campaignInformation = newCampaignInfo
	}
	if (campaignType === `AgeOfApocalypse`) {
		const newCampaignInfo = await AgeOfApocalypse.create(campaignInformation)
		campaign.campaignInformation = newCampaignInfo
	}
}

async function paginateModel(
	modelName,
	currentPage,
	gamesPerPage,
	sorter,
	order
) {
	const paginatedResults = await mongoose
		.model(modelName)
		.find({}, null, {
			limit: gamesPerPage,
			skip: (currentPage - 1) * gamesPerPage,
		})
		.populate(`owner`)
		.sort({[sorter]: `${order}`})
	const totalPages = Math.ceil(
		(await mongoose.model(modelName).countDocuments()) / gamesPerPage
	)
	return {paginatedResults, totalPages, currentPage, order}
}
//REVIEW - Investigate implementing these on the model itself
module.exports = {
	processPlayerFormData,
	processCampaignFormData,
	createCampaignInformation,
	paginateModel,
	reverseOrder,
}
