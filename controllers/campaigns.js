const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const isCampaignOwner = require(`../middleware/isCampaignOwner`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
const Campaign = require(`../models/Campaign`)
require(`dotenv`).config()

router.get(`/new`, isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate(`ownedGames`)
        const ownedGames = user.ownedGames
        res.render(`campaigns/new`, {ownedGames})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

module.exports = router