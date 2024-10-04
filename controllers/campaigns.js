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
        const campaign = utilities.processCampaignFormData(req.body)
        const nameInDatabase = await Campaign.findOne({campaignName: campaign.campaignName})
        if (nameInDatabase !== null) {
            const user = await User.findById(req.session.user._id).populate(`ownedGames`)
            const ownedGames = user.ownedGames
            res.render(`campaigns/new`, {campaign, ownedGames, message: `A campaign log already exists with that name.`})
            return
        }
        campaign.owner = req.session.user._id
        await utilities.createCampaignInformation(campaign)
        const newCampaign = await Campaign.create(campaign)
        const updatedGames = await Game.updateMany({_id: {"$in":[newCampaign.games]}}, {"$set":{campaign: newCampaign}})
        res.redirect(`/campaigns`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})
//TODO - Add warning when changing games from one campaign to another

router.get(`/`, async (req, res) => {
    try {
        let order = req.query.order ? utilities.reverseOrder(req.query.order) : `asc`
        res.render(`campaigns/index`, await utilities.paginateModel(`Campaign`, req.query.page ? req.query.page : 1, 10, req.query.sorting, order))
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.get(`/:campaignId`, async (req, res) => {
    try{
        const campaign = await Campaign.findById(req.params.campaignId)
        .populate(`campaignInformation`)
        .populate({path: `games`, populate:{path: `owner`}})
        .populate(`owner`)
        res.render(`campaigns/show`, {campaign})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

//TODO - Add get for /:campaignId
//TODO - Add get for /edit
//TODO - Add put for /edit
//TODO - Add delete for /delete

module.exports = router