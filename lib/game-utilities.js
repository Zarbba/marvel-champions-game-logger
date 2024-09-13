const Game = require(`../models/Game`)

function formatPlayersForDatabase(input) {
    let playersArray =[]
    if (input.playerName.constructor === Array) {
        input.playerName.forEach( (player) => {
            playersArray.push({playerName: player})
        })    
    } else {
        playersArray.push({playerName: input.playerName})
    }
    if (input.playerHero.constructor === Array) {
        input.playerHero.forEach( (player, i) => {
            playersArray[i].identity = player
        })    
    } else {
        playersArray[0].identity = input.playerHero
    }
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