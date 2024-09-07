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

router.get(`/:gameId/delete`, isLoggedIn, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId)
        if (game.owner != req.session.user._id) {
            res.status(403).render(`errors/error-403`)
            return
        }
        res.render(`games/delete`, {game})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.delete(`/:gameId`, isLoggedIn, async (req, res) => {
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