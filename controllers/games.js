const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const isGameOwner = require(`../middleware/isGameOwner`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
require(`dotenv`).config()
function generatePlayers(input) {
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
    const first = (page - 1) * gamesPerPage
    const last = first + gamesPerPage
    const pages = Math.ceil(games.length / gamesPerPage)
    console.log(pages)
    return {games: games.slice(first, last), pages, page}
}

router.get(`/new`, isLoggedIn, (req, res) => {
    try {
        res.render(`games/new`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.post(`/`, isLoggedIn, async (req, res) => {
    try {
        const nameInDatabase = await Game.findOne({gameName: req.body.gameName})
        const players = req.body.playerName ? generatePlayers(req.body) : []
        if(nameInDatabase !== null) {
            const game = {
                gameName: req.body.gameName,
                datePlayed: req.body.datePlayed,
                scenario: req.body.scenario,
                players,
                wonGame: req.body.wonGame,
                notes: req.body.notes,
                owner: req.session.user    
            }
            res.render(`games/new`, {game, message: `A game log already exists with that name.`})
            return
        }
        const createdGame = await Game.create({
            gameName: req.body.gameName,
            datePlayed: req.body.datePlayed,
            scenario: req.body.scenario,
            players,
            wonGame: req.body.wonGame,
            notes: req.body.notes,
            owner: req.session.user
        })
        res.redirect(`/games`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/`, async (req, res) => {
    try {
        res.render(`games/index`, await paginateGames(req.query.page ? req.query.page : 1, 10))
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/:gameId`, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        if (!game) {
            res.status(404).render(`errors/error-404`)
            return
        }
        res.render(`games/show`, {game})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/:gameId/edit`, isLoggedIn, isGameOwner, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        if (!game) {
            res.status(404).render(`errors/error-404`)
            return
        }
        res.render(`games/edit`, {game})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.put(`/:gameId`, isLoggedIn, isGameOwner, async (req, res) => {
    try {
        const nameInDatabase = await Game.findOne({gameName: req.body.gameName})
        const targetGame = await Game.findById(req.params.gameId)
        const players = req.body.playerName ? generatePlayers(req.body) : []
        if (nameInDatabase && nameInDatabase.id !== targetGame.id) {
            const game = {
                gameName: req.body.gameName,
                datePlayed: req.body.datePlayed,
                scenario: req.body.scenario,
                players,
                wonGame: req.body.wonGame,
                notes: req.body.notes,
                owner: req.session.user    
            }
            res.render(`games/edit`, {game, message: `A game log already exists with that name.`})
            return
        }
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.gameId, 
            {
                gameName: req.body.gameName,
                datePlayed: req.body.datePlayed,
                scenario: req.body.scenario,
                players,
                wonGame: req.body.wonGame,
                notes: req.body.notes,
                owner: req.session.user    
            }, 
            {new: true}
        )
        res.redirect(`/games`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/:gameId/delete`, isLoggedIn, isGameOwner, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        if (!game) {
            res.status(404).render(`errors/error-404`)
            return
        }
        res.render(`games/delete`, {game})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.delete(`/:gameId`, isLoggedIn, isGameOwner, async (req, res) => {
    try {
        const deletedGame = await Game.findOneAndDelete({_id: req.params.gameId})
        res.redirect(`/games`)    
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

module.exports = router