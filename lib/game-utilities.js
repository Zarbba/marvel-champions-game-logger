const Game = require(`../models/Game`)

function convertToArray(input) {
    let output = input
    if (!Array.isArray(input)) {
        output =[]
        output.push(input)
    }
    return output
}

function formatPlayersForDatabase(input) {
    input.playerName = convertToArray(input.playerName)
    input.playerHero = convertToArray(input.playerHero)
    let playersArray =[]
    input.playerName.forEach( (player) => {
        playersArray.push({playerName: player})
    })    
    input.playerHero.forEach( (player, i) => {
        playersArray[i].identity = player
    })   
    return playersArray
}

async function paginateGames(page, gamesPerPage) {
    const games = await Game.find().populate(`owner`).sort({createdAt: `desc`})
    const startIndex = (page - 1) * gamesPerPage
    const finishIndex = startIndex + gamesPerPage
    const pages = Math.ceil(games.length / gamesPerPage)
    return {games: games.slice(startIndex, finishIndex), pages, page}
}
//TODO - Investigate implementing these on the model itself
//TODO - Try to slide the pagination logic into the mongo query
module.exports = {
    formatPlayersForDatabase,
    paginateGames
}