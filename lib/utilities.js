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
        playersArray[i].campaignRef = i
    })
    return playersArray
}

async function processCampaignFormData(input, owner) {
    const campaignInformation = await processCampaignInformationFormData(input)
    const games = convertToArray(input.games)
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
    //TODO - Fill in logic for this function
}

async function processSinisterMotivesInformationFormData(input) {
    input.osbornTechCards = convertToArray(input.osbornTechCards)
        input.completedComunityServices = convertToArray(input.completedComunityServices)
        input.lastOnesStanding = convertToArray(input.lastOnesStanding)
        const campaignInformation = await SinisterMotives.create({
            currentReputation: input.currentReputation,
            osbornTechCards: input.osbornTechCards,
            completedComunityServices: input.completedComunityServices,
            wakingNightmares: Number(input.wakingNightmares),
            lastOnesStanding: input.lastOnesStanding,
        })
        return campaignInformation
}

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