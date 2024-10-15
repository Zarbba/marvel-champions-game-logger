const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const isCampaignOwner = require(`../middleware/isCampaignOwner`)
const utilities = require(`../lib/utilities`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
const Campaign = require(`../models/Campaign`)
const { default: mongoose } = require("mongoose")
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
        const owner = await User.findById(req.session.user._id)
        campaign.owner = owner
        await utilities.createCampaignInformation(campaign)
        const newCampaign = await Campaign.create(campaign)
        owner.ownedCampaigns.push(newCampaign)
        await owner.save()
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
    try {
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

router.get(`/:campaignId/edit`, isLoggedIn, isCampaignOwner, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate(`ownedGames`)
        const ownedGames = user.ownedGames
        const campaign = await Campaign.findById(req.params.campaignId).populate(`campaignInformation`)
        if (!campaign) {
            res.status(404).render(`errors/error-404`)
            return
        }
        res.render(`campaigns/edit`, {campaign, ownedGames})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.put(`/:campaignId`, isLoggedIn, isCampaignOwner, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate(`ownedGames`)
        const ownedGames = user.ownedGames
        const nameInDatabase = await Campaign.findOne({campaignName: req.body.campaignName})
        const targetCampaign = await Campaign.findById(req.params.campaignId)
        const campaign = utilities.processCampaignFormData(req.body)
        if (nameInDatabase && nameInDatabase.id !== targetCampaign.id) {
            res.render(`campaigns/edit`, {campaign, ownedGames, message: `A campaign log already exists with that name.`})
            return
        }
        // TODO - Write logic for updating campaigns and campaignInfo
        res.redirect(`/campaigns`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.delete(`/:campaignId`, isLoggedIn, isCampaignOwner, async (req, res) => {
    try {
        const owner = await User.findById(req.session.user._id).populate(`ownedCampaigns`)
        const targetCampaign = await Campaign.findById(req.params.campaignId)
        owner.ownedCampaigns.pull(targetCampaign._id)
        await owner.save()
        const deletedCampaignInformation = 
        mongoose.model(`${targetCampaign.campaignType}`)
        .deleteOne({_id: targetCampaign.campaignInformation})
        const updatedGames = await Game.updateMany(
            {_id: {"$in":[targetCampaign.games]}},
            {"$unset": {campaign: ``}})
        const deletedCampaign = await Campaign.findOneAndDelete({_id: req.params.campaignId})
        res.redirect(`/campaigns`)    
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

module.exports = router