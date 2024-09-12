const Game = require(`../models/Game.js`)

function convertToArray(input) {
    let temp = structuredClone(input)
    if (!Array.isArray(input)) {
        input = [temp]
    } 
    return input   
}

function generatePlayers(input) {
    input.playerName = convertToArray(input.playerName)
    input.playerHero = convertToArray(input.playerHero)
    input.playerOwner = convertToArray(input.playerOwner)
    let playersArray = []
    input.playerName.forEach( (name) => {
        playersArray.push({player: {playerName: name}})
    })
    input.playerOwner.forEach( (owner, i) => {
        playersArray[i].player.owner = owner
    })
    input.playerHero.forEach( (hero, i) => {
        playersArray[i].identity = hero
    })
    return playersArray
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
    generatePlayers,
    paginateGames
}