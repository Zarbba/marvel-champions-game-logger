const Game = require(`../models/Game`)
const User = require(`../models/User.js`)
const Player = require(`../models/Player.js`)

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

function processPlayerFormData(input) {
    input.playerName = convertToArray(input.playerName)
    input.playerHero = convertToArray(input.playerHero)
    let playersArray = []
    input.playerName.forEach( (name) => {
        playersArray.push({player: {playerName: name}})
    })
    input.playerHero.forEach( (hero, i) => {
        playersArray[i].identity = hero
    })
    return playersArray
}

async function formatPlayerDataForDatabase(input) {
    const formattedPlayers = []
    const existingPlayers = findPlayersInDatabase(input)
    existingPlayers.forEach( (player) => {
        formattedPlayers.push(player)
    })
    const newPlayers = createPlayersForDatabase(input)
    newPlayers.forEach( (player) => {
        formattedPlayers.push(player)
    })
    return formattedPlayers
}

async function findPlayersInDatabase(playersArray) {
    // iterate over array and find any existing players
    // mutate playerNames?
    // return an array of player refs and identities to be pushed into formattedPlayers 
}

async function createPlayersForDatabase(playersArray) {
    const newPlayers = []
    const createdPlayers = await Player.Create([
        playersArray.forEach( (player) => {
            return {playerName: player.playerName}
        })
    ])
    createdPlayers.forEach( (player) => {
        newPlayers.push({player: player._id})
    })
    playersArray.forEach( (player, i) => {
        newPlayers[i].identity = player.identity
    })
}


async function paginateGames(currentPage, gamesPerPage, sorter, order) {
    const games = await Game.find({}, null, {limit: gamesPerPage, skip: (currentPage - 1) * gamesPerPage}).populate(`owner`).sort({[sorter]: `${order}`})
    const totalPages = Math.ceil((await Game.countDocuments()) / gamesPerPage)
    return {games, totalPages, currentPage, order}
}
//REVIEW - Investigate implementing these on the model itself
module.exports = {
    processPlayerFormData,
    formatPlayerDataForDatabase,
    paginateGames,
    reverseOrder
}