const Game = require(`../models/Game`)
const User = require(`../models/User`)
const SinisterMotives = require(`../models/campaign-information/SinisterMotives`)
const TheRiseOfRedSkull = require(`../models/campaign-information/TheRiseOfRedSkull`)

function reverseOrder(string) {
    return string === `desc` ? `asc` : `desc`
}

function convertToArray(input) {
    let output = input
    if (!Array.isArray(input)) {
        output =[]
        output.push(input)
    }
    return output
}

// This function exists to take data from the new/edit forms of player widgets (in both Games and campaigns) and format it for the database.
// For campaigns, helper functions convert additional data specific to each campaign
// Typically the input it accepts is req.body which will have both a playerName array and a playerHero array. These need to be grouped into players for the DB.
function processPlayerFormData(input) {
    input.playerName = convertToArray(input.playerName)
    input.playerHero = convertToArray(input.playerHero)
    let playersArray = []
    input.playerName.forEach( (name) => {
        playersArray.push({playerName: name})
    })
    input.playerHero.forEach( (hero, i) => {
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
    input.remainingHitPoints.forEach( (player, i) => {
        array[i].remainingHitPoints = player
        array[i].techCard = input.techCard[i]
        array[i].conditionCard = {
            card: input.conditionCard[i], 
            improved: input.improvedConditionCard[i] === `improved`? true : false
        }
        array[i].rescuedAllyCards = input[`rescuedAllyCards${i}`] ? convertToArray(input[`rescuedAllyCards${i}`]) : []
        array[i].expertObligationCards = input[`expertObligationCards${i}`] ? convertToArray(input[`expertObligationCards${i}`]) : []
        array[i].wasEngaged = input.wasEngaged[i]
    })
}
function processSinisterMotivesPlayerFormData(input, array) {
    console.log(input)
    input.remainingHitPoints = convertToArray(input.remainingHitPoints)
    input.shieldTechCard = convertToArray(input.shieldTechCard)
    input.aspectAdvantageCard = convertToArray(input.aspectAdvantageCard)
    input.planningAheadCard = convertToArray(input.planningAheadCard)
    input.remainingHitPoints.forEach( (player, i) => {
        array[i].remainingHitPoints = player
        array[i].shieldTechCard = input.shieldTechCard[i]
        array[i].aspectAdvantageCard = input.aspectAdvantageCard[i]
        array[i].planningAheadCard = input.planningAheadCard[i]
    })
}

async function processCampaignFormData(input, owner) {
    const campaignInformation = await processCampaignInformationFormData(input)
    const games = input.games ? convertToArray(input.games) : []
    const modes = processModeFormData(input)
    return {
        campaignName: input.campaignName,
        owner,
        campaignInformation,
        campaignType: input.campaignType,
        games,
        modes,
        notes: input.notes
    }
}

function processCampaignInformationFormData (input) {
    if (input.campaignType === `TheRiseOfRedSkull`) {
        return processRedSkullFormData(input)
    }
    if (input.campaignType === `SinisterMotives`) {
        return processSinisterMotivesInformationFormData(input)
    }
}

async function processRedSkullFormData(input) {
    input.experimentalAttachments = convertToArray(input.experimentalAttachments)
    const players = input.playnerName ? processPlayerFormData(input) : []
    const campaignInformation = await TheRiseOfRedSkull.create({
        delayCounters: Number(input.delayCounters),
        experimentalAttachments: input.experimentalAttachments,
        players
    })
    return campaignInformation
}

async function processSinisterMotivesInformationFormData(input) {
    input.osbornTechCards = convertToArray(input.osbornTechCards)
    input.completedComunityServices = convertToArray(input.completedComunityServices)
    input.lastOnesStanding = convertToArray(input.lastOnesStanding)
    const players = input.playerName ? processPlayerFormData(input) : []
    const campaignInformation = await SinisterMotives.create({
        currentReputation: input.currentReputation,
        osbornTechCards: input.osbornTechCards,
        completedComunityServices: input.completedComunityServices,
        wakingNightmares: Number(input.wakingNightmares),
        lastOnesStanding: input.lastOnesStanding,
        players
    })
    return campaignInformation
}
//REVIEW - Currently there are a lot of erroneous campaignInformation items being stored in the DB. Refactor this so that it doesn't create a new entry until the last moment.
function processModeFormData (input) {
    return {
        expert: input.expertMode,
        heroic: input.heroicMode
    }
}

async function paginateGames(currentPage, gamesPerPage, sorter, order) {
    const games = await Game.find({}, null, {limit: gamesPerPage, skip: (currentPage - 1) * gamesPerPage}).populate(`owner`).sort({[sorter]: `${order}`})
    const totalPages = Math.ceil((await Game.countDocuments()) / gamesPerPage)
    return {games, totalPages, currentPage, order}
}
//REVIEW - Investigate implementing these on the model itself
module.exports = {
    processPlayerFormData,
    processCampaignFormData,
    paginateGames,
    reverseOrder
}