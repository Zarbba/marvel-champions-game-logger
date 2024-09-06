const mongoose = require(`mongoose`)
require(`dotenv`).config()

const bcrypt = require(`bcrypt`)

const User = require(`./User`)
const Game = require(`./Game`)

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on(`open`, async () => {
    await seedUsers()
    await seedGames()
    process.exit(0)
})

async function seedUsers() {
    const deletedUsers = await User.deleteMany()
    const createdUsers = await User.create([
        {userName: `Zarbba`, password: bcrypt.hashSync(`Peni Parker`, 10), email: `fake@hotmail.com`, ownedGames: []},
        {userName: `Hnro`, password: bcrypt.hashSync(`X-23`, 10), email: `false@gmail.com`, ownedGames: []}
    ])
}

async function seedGames() {
    const zarbba = await User.findOne({userName: `Zarbba`})
    const hnro = await User.findOne({userName: `Hnro`})
    const deletedGames = await Game.deleteMany()
    const createdGames = await Game.create([
        {
            gameName: `Peni v Rhino Solo Game`,
            players:[
                {playerName: `Josh`,
                    identity: `Sp//dr`,
                    owner: zarbba
                }
            ],
            scenario: `Rhino`,
            wonGame: true,
            notes: `Remember not to be tempted by powerful cards in your starting hand. 
            It's always better with Peni to just go straight for some interfaces.`,
            owner: zarbba
        },
        {
            gameName: `X and Cap vs Venom`,
            players:[
                {playerName: `Josh`,
                    identity: `Captain America`,
                    owner: zarbba
                },
                {playerName: `Henry`,
                    identity: `X-23`,
                    owner: hnro
                }
            ],
            scenario: `Venom`,
            wonGame: false,
            notes: `Thought we had the kill and went for it but miscounted.
            Board got out of control. Do better math!
            Also remember, Honey Badger doesn't ready X-23 if she dies.`,
            owner: hnro
        },
    ])
    const allGames = await Game.find()
    console.log(allGames)
    await addOwners(zarbba, hnro)
}

async function addOwners(u1, u2) {
    const u1Games = await Game.find({owner: u1})
    const u2Games = await Game.find({owner: u2})
    u1Games.forEach((game) => {
        u1.ownedGames.push(game)
    })
    u2Games.forEach((game) => {
        u2.ownedGames.push(game)
    })
    await u1.save()
    await u2.save()
    const allUsers = await User.find()
    console.log(allUsers)
    
}