const Game = require(`../models/Game`)

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


async function paginateGames(currentPage, gamesPerPage, sorter, order) {
    const games = await Game.find({}, null, {limit: gamesPerPage, skip: (currentPage - 1) * gamesPerPage}).populate(`owner`).sort({[sorter]: `${order}`})
    const totalPages = Math.ceil((await Game.countDocuments()) / gamesPerPage)
    return {games, totalPages, currentPage, order}
}
//REVIEW - Investigate implementing these on the model itself
module.exports = {
    formatPlayersForDatabase,
    paginateGames,
    reverseOrder
}