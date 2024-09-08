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
        //TODO - Add check for duplicate game names.
        const createdGame = await Game.create({
            gameName: req.body.gameName,
            datePlayed: req.body.datePlayed,
            scenario: req.body.scenario,
            players: generatePlayers(req.body),
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
        const games = await Game.find().populate(`owner`).sort({createdAt: `desc`})
        res.render(`games/index`, {games})    
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/:gameId`, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        res.render(`games/show`, {game})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/:gameId/edit`, isLoggedIn, isGameOwner, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        res.render(`games/edit`, {game})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.put(`/:gameId`, isLoggedIn, isGameOwner, async (req, res) => {
    try {
        //TODO - Add check for duplicate game names.
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.gameId, 
            {
                gameName: req.body.gameName,
                datePlayed: req.body.datePlayed,
                scenario: req.body.scenario,
                players: generatePlayers(req.body),
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
        res.render(`games/delete`, {game})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.delete(`/:gameId`, isLoggedIn, isGameOwner, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        if (game.owner != req.session.user._id) {
            res.status(403).render(`errors/error-403`)
            return
        }
        const deletedGame = await Game.findOneAndDelete({_id: req.params.gameId})
        res.redirect(`/games`)    
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

module.exports = router

//TODO - Implement error-404 handling