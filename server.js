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
const gameController = require(`./controllers/games`)

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
app.use(`/games`, gameController)
app.listen(process.env.PORT,() => {
    console.log(`Server listening at http://localhost:${process.env.PORT}/`)
})

//----------------------- Routing

app.get(`/`, async (req, res) =>{
    const recentGames = (await Game.find().populate(`owner`).sort({createdAt: `desc`})).slice(0, 10)
    res.render(`home`, {recentGames})
})

//REVIEW - By convention, where do my non-routing functions go?
//REVIEW - By convention, where does my main.js file go?
//REVIEW - Is there a more elegant way to pass the player count to main.js?
//REVIEW - Is there a way to make 404 trigger on more than just a bad hex?
//REVIEW - Where do we get our GitHub Campus link?

//----------------------- References
// As always: https://stackoverflow.co/ , https://developer.mozilla.org/en-US/ , https://www.w3schools.com/
// Used this SO article to understand how to check if a value is an array https://stackoverflow.com/questions/767486/how-do-i-check-if-a-variable-is-an-array-in-javascript
// Used this resource to assit with the creation of pagination https://www.turing.com/kb/implementing-javascript-pagination
// Used this to understand how to implement enums in Mongoose https://masteringjs.io/tutorials/mongoose/enum