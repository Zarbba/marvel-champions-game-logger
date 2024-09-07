const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
require(`dotenv`).config()

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
        if (req.body.gameName === null) {
            res.render(`games/new`, {
                message: `Please enter a unique name for your game.`,
                datePlayed: req.body.datePlayed,
                scenario: req.body.scenario,
                notes: req.body.notes
            })
            return
        }
        if (req.body.datePlayed === null) {
            res.render(`games/new`, {
                message: `Please enter the date you played your game.`,
                gameName: req.body.gameName,
                scenario: req.body.scenario,
                notes: req.body.notes
            })
            return
        }
        if (req.body.scenario === null) {
            res.render(`games/new`, {
                message: `Please enter the scenario you played in your game.`,
                gameName: req.body.gameName,
                datePlayed: req.body.datePlayed,
                notes: req.body.notes
            })
            return
        }
        const createdGame = await Game.create({
            gameName: req.body.gameName,
            datePlayed: req.body.datePlayed,
            scenario: req.body.scenario,
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
        const games = await Game.find().sort({createdAt: `desc`})
        res.render(`games/index`, {games})    
    } catch(err) {
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/:gameId`, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        res.render(`games/show`, {game})
    } catch(err) {
        res.status(500).render(`errors/error-500`)
    }
})

module.exports = router