//----------------------- DB Setup
require(`dotenv`).config()
const mongoose = require(`mongoose`)
const MongoStore = require(`connect-mongo`)
mongoose.connect(process.env.MONGODB_URI)

//----------------------- Module Imports
const morgan = require(`morgan`)
const express = require(`express`)
const methodOverride = require(`method-override`)
const session = require(`express-session`)
const app = express()
const Game = require(`./models/Game`)
const User = require(`./models/User`)
const authController = require(`./controllers/auth`)
const gamesController = require(`./controllers/games`)
const usersController = require(`./controllers/users`)

//----------------------- Server Config
app.use(morgan(`dev`))
app.use(express.static(`public`))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set(`view engine`, `ejs`)
app.use(methodOverride(`_method`, {methods: [`POST`, `GET`]}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI})
}))
app.use((req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
})
app.use(`/auth`, authController)
app.use(`/games`, gamesController)
app.use(`/users`, usersController)
app.listen(process.env.PORT,() => {
    console.log(`Server listening at http://localhost:${process.env.PORT}/`)
})

//----------------------- Routing

app.get(`/`, async (req, res) =>{
    const recentGames = await Game.find({}, null, {limit: 10}).populate(`owner`).sort({createdAt: `desc`})
    res.render(`home`, {recentGames})
})

app.get(`/*`, (req, res) => {
    res.status(404).render(`errors/error-404`)
})