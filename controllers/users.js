const express = require(`express`)
const router = express.Router()
const bcrypt = require(`bcrypt`)
const User = require(`../models/User`)
const Game = require(`../models/Game`)
const isAlreadyLoggedIn = require(`../middleware/isAlreadyLoggedIn`)
const isLoggedIn = require("../middleware/isLoggedIn")
const isCurrentUser = require("../middleware/isCurrentUser")
require(`dotenv`).config()

router.get(`/:userId`, isLoggedIn, (req, res) => {
    try {
        res.render(`users/show`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

router.put(`/:userId`, isLoggedIn, isCurrentUser, async (req, res) => {
    try {
        const userInDatabase = await User.findById(req.params.userId)
        if (bcrypt.compareSync(req.body.password, userInDatabase.password) === false) {
            res.render(`users/show`, {
                message: `That password is incorrect.`
            })   
            return 
        }
        if (req.body.newPassword !== req.body.confirm) {
            res.render(`users/show`, {
                message: `Those passwords do not match. Please try again.`
            })
            return
        }
        userInDatabase.password = bcrypt.hashSync(req.body.newPassword, 10)
        userInDatabase.save()
        res.render(`users/show`, {message: `Your password was updated successfully!`})
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})

module.exports = router
