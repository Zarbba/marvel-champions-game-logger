const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
require(`dotenv`).config()

router.get(`/`, async (req, res) => {
    const games = await Game.find().sort({createdAt: `desc`})
    res.render(`games/index`, {games})
})

module.exports = router