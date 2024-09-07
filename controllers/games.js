const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
require(`dotenv`).config()

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