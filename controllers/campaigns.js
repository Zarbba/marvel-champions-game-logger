const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const isCampaignOwner = require(`../middleware/isCampaignOwner`)
const utilities = require(`../lib/utilities`)
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

router.post(`/`, isLoggedIn, async (req, res) => {
    try {
        const campaignData = await utilities.processCampaignFormData(req.body)
        const newCampaign = await Campaign.create(campaignData)
        const updatedGames = await Game.updateMany({_id: {"$in":[newCampaign.games]}}, {"$set":{campaign: newCampaign}})
        res.redirect(`/campaigns`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})
//TODO - Add warning when changing games from one campaign to another

//TODO - Add post for /new
//TODO - Add get for /
//TODO - Add get for /edit
//TODO - Add put for /edit
//TODO - Add delete for /delete

module.exports = router