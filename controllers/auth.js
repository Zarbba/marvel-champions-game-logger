const express = require(`express`)
const router = express.Router()
const bcrypt = require(`bcrypt`)
const User = require(`../models/User`)
const alreadyLoggedIn = require(`../middleware/alreadyLoggedIn`)
const isLoggedIn = require("../middleware/isLoggedIn")
require(`dotenv`).config()

router.get(`/signup`, alreadyLoggedIn, (req, res) => {
    try {
        res.render(`auth/signup`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`error-500`)
    }
})

router.post(`/signup`, alreadyLoggedIn, async (req, res) => {
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
                message: `Those passwords do not match. Please try again.`,
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
        req.session.user = {
            _id: createdUser._id,
            userName: createdUser.userName
        }
        req.session.save( () => {
            res.redirect(`/`)
        })
    } catch(err) {
        console.log(err)
        res.status(500).render(`error-500`)
    }
})

router.get(`/login`, alreadyLoggedIn, (req, res) => {
    try{
        if (req.session.user) {

        }
        let message
        if (req.query.redirect === `1`) {
            message = `You must be logged in to perform that action. Please login and try again.`
        }
        res.render(`auth/login`, {message})
    } catch(err) {
        console.log(err)
        res.status(500).render(`error-500`)
    }
})    

router.post(`/login`, alreadyLoggedIn, async (req, res) => {
    try {
        const userInDatabase = await User.findOne({userName: req.body.userName})
        if (userInDatabase === null) {
            res.render(`auth/login`, {
            message: `That user name does not exist.`,
            userName: req.body.userName
        })
        return
    }
    if(bcrypt.compareSync(req.body.password, userInDatabase.password) === false) {
        res.render(`auth/login`, {
            message: `That password is incorrect.`,
            userName: req.body.userName
        })
        return
    }
    req.session.user = {
        userName: userInDatabase.userName,
        _id: userInDatabase._id,
    }
    req.session.save( () => {
        res.redirect(`/`)
    })
    } catch(err) {
        console.log(err)
        res.status(500).render(`error-500`)
    }
})

router.get(`/logout`, isLoggedIn, (req, res) => {
    try {
        req.session.destroy()
        res.redirect(`/`)
    } catch(err) {
        console.log(err)
        res.status(500).render(`errors/error-500`)
    }
})


module.exports = router
//TODO - Implement error-404 handling