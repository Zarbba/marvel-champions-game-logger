const express = require(`express`)
const router = express.Router()
const isLoggedIn = require(`../middleware/isLoggedIn`)
const isGameOwner = require(`../middleware/isGameOwner`)
const utilities = require(`../lib/utilities`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
const Campaign = require(`../models/Campaign`)
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
        const nameInDatabase = await Game.findOne({gameName: req.body.gameName})
        const players = req.body.playerName ? utilities.processPlayerFormData(req.body) : []
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
//TODO - Add functionality to attach a game to a campaign at creation.

router.get(`/`, async (req, res) => {
    try {
        let order = req.query.order ? utilities.reverseOrder(req.query.order) : `asc`
        res.render(`games/index`, await utilities.paginateGames(req.query.page ? req.query.page : 1, 10, req.query.sorting, order))
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})
//TODO - Create a way to search the data for a specific game

router.get(`/:gameId`, async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId).populate(`campaign`)
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
        const game = await Game.findById(req.params.gameId).populate(`campaign`)
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
        const players = req.body.playerName ? utilities.processPlayerFormData(req.body) : []
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
            {new: true, runValidators: true}
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
        const user = await User.findById(req.session.user._id).populate(`ownedGames`)
        const targetGame = await Game.findById(req.params.gameId).populate(`owner`)
        user.ownedGames.pull(targetGame._id)
        await user.save()
        if (targetGame.campaign) {
            const targetCampaign = await Campaign.findById(targetGame.campaign)
            targetCampaign.games.pull(targetGame._id)
            await targetCampaign.save()
        }
        const deletedGame = await Game.findOneAndDelete({_id: req.params.gameId})
        res.redirect(`/games`)    
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

module.exports = router