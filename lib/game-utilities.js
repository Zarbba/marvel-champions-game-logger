const Game = require(`../models/Game.js`)
const User = require(`../models/User.js`)
const Player = require(`../models/Player.js`)

function convertToArray(input) {
    let temp = structuredClone(input)
    if (!Array.isArray(input)) {
        input = [temp]
    } 
    return input   
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

async function paginateGames(page, gamesPerPage) {
    const games = await Game.find().populate(`owner`).sort({createdAt: `desc`})
    const first = (page - 1) * gamesPerPage
    const last = first + gamesPerPage
    const pages = Math.ceil(games.length / gamesPerPage)
    return {games: games.slice(first, last), pages, page}
}
//TODO - Investigate implementing these on the model itself
//TODO - Try to slide the pagination logic into the mongo query
module.exports = {
    processPlayerFormData,
    paginateGames,
    formatPlayerDataForDatabase
}