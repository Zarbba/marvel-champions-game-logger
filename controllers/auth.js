const express = require(`express`)
const router = express.Router()
const bcrypt = require(`bcrypt`)
const User = require(`../models/User`)
require(`dotenv`).config()

router.get(`/signup`, (req, res) => {
    try {
        if (res.session.user !== null) {
            res.redirect(`/`)
        }
        res.render(`auth/signup`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`error-500`)
    }
})

router.post(`/signup`, async (req, res) => {
    try {
        const userInDatabase = await User.findOne({userName: req.body.userName})
        if (userInDatabase !== null) {
            res.render(`auth/signup`, {
                message: `That user name is already taken. Please try a different user name.`,
                userName: req.body.userName,
                email: req.body.email
            })
            return
        }
        const emailInDatabase = await User.findOne({email: req.body.email})
        if (emailInDatabase !== null) {
            res.render(`auth/signup`, {
                message: `That email is already in use. Please try an alternative email.`,
                userName: req.body.userName,
                email: req.body.email
            })
            return
        }
        if (req.body.password !== req.body.confirm) {
            res.render(`auth/signup`, {
                message: `Those passwords do not match.`,
                userName: req.body.userName,
                email: req.body.email
            })
            return
        }
        const createdUser = await User.create(
            {
                userName: req.body.userName, 
                password: bcrypt.hashSync(req.body.password, 10), 
                email: req.body.email,
                ownedGames: []
            }
        )
        res.session.user = {
            _id: createdUser._id,
            userName: createdUser.userName
        }
        res.redirect(`/`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`error-500`)
    }
})

module.exports = router