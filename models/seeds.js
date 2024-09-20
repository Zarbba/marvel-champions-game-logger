const mongoose = require(`mongoose`)
require(`dotenv`).config()

const bcrypt = require(`bcrypt`)

const User = require(`./User`)
const Game = require(`./Game`)
const Campaign = require(`./Campaign`)
const SinisterMotives = require(`./campaign-information/SinisterMotives`)

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on(`open`, async () => {
    await seedUsers()
    await seedPlayers()
    await seedGames()
    await seedCampaignInformation()
    await seedCampaigns()
    process.exit(0)
})

async function seedUsers() {
    const deletedUsers = await User.deleteMany()
    const createdUsers = await User.create([
        {userName: `Zarbba`, password: bcrypt.hashSync(`Peni Parker`, 10), email: `fake@hotmail.com`, ownedGames: []},
        {userName: `Hnro`, password: bcrypt.hashSync(`X-23`, 10), email: `false@gmail.com`, ownedGames: []}
    ])
}

async function seedPlayers() {
    const deletedPlayers = await Player.deleteMany()
    const createdUsers = await Player.create([
        {playerName: `Josh`, owner: await User.findOne({userName: `Zarbba`})},
        {playerName: `Henry`, owner: await User.findOne({userName: `Hnro`})},
        {playerName: `Daniel`},
        {playerName: `Luna`},
    ])
}

async function seedGames() {
    const zarbba = await User.findOne({userName: `Zarbba`})
    const hnro = await User.findOne({userName: `Hnro`})
    const josh = await Player.findOne({playerName: `Josh`})
    const henry = await Player.findOne({playerName: `Henry`})
    const daniel = await Player.findOne({playerName:`Daniel`})
    const luna = await Player.findOne({playerName: `Luna`})
    const deletedGames = await Game.deleteMany()
    const createdGames = await Game.create([
        {
            gameName: `Peni vs Crossbones Solo Game`,
            datePlayed: new Date(`2024-08-23`),
            players:[
                {
                    playerName: `Josh`,
                    identity: `Sp//dr`,
                    campaignRef: 0,
                    owner: zarbba
                }
            ],
            scenario: `Crossbones`,
            wonGame: true,
            notes: `Remember not to be tempted by powerful cards in your starting hand. It's always better with Peni to just go straight for some interfaces.`,
            owner: zarbba
        },
        {
            gameName: `X and Cap vs Venom 2-Player Game`,
            datePlayed: new Date(`2024-09-06`),
            players:[
                {   playerName: `Josh`,
                    identity: `Captain America`,
                    campaignRef: 0,
                    owner: zarbba
                },
                {
                    playerName: `Henry`,
                    identity: `X-23`,
                    campaignRef: 1,
                    owner: hnro
                }
            ],
            scenario: `Venom`,
            wonGame: false,
            notes: `Thought we had the kill and went for it but miscounted. Board got out of control. Do better math! Also remember, Honey Badger doesn't ready X-23 if she dies.`,
            owner: hnro
        },
        {
            gameName: `Teaching Daniel`,
            datePlayed: new Date(`2024-07-31`),
            players:[
                {
                    playerName: `Daniel`,
                    identity: `Dr. Strange`,
                    campaignRef: 0
                },
                {
                    playerName: `Josh`,
                    identity: `Sp//dr`,
                    campaignRef: 1,
                    owner: zarbba
                }
            ],
            scenario: `Rhino`,
            wonGame: true,
            notes: `Pretty straightforward teaching session.`,
            owner: zarbba
        },
        {
            gameName: `Strange, Cap and Magneto vs Red Skull 3-Player Game`,
            datePlayed: new Date(`2024-08-06`),
            players:[
                {
                    playerName: `Josh`,
                    identity: `Captain America`,
                    campaignRef: 0,
                    owner: zarbba
                },
                {
                    playerName: `Henry`,
                    identity: `Magneto`,
                    campaignRef: 1,
                    owner: hnro
                },
                {
                    playerName: `Daniel`,
                    identity: `Dr. Strange`,
                    campaignRef: 2
                },
            ],
            scenario: `Red Skull`,
            wonGame: true,
            notes: `Playing with more than 2 players takes a loooooong time. Managed to squeak out the win thanks to OP Strange`,
            owner: zarbba
        },
        {
            gameName: `Rogue vs Mojo Solo Game`,
            datePlayed: new Date(`2024-09-13`),
            players:[
                {
                    playerName: `Henry`,
                    identity: `Rogue`,
                    campaignRef: 0,
                    owner: hnro
                }
            ],
            scenario: `Mojo`,
            wonGame: true,
            notes: `Good practise session with the new cards Josh and I workshopped last week.`,
            owner: hnro
        },
        {
            gameName: `Sp//dr and Rogue vs Mysterio 2-Player Sinister Motives Campaign Game`,
            datePlayed: new Date(`2024-09-06`),
            players:[
                {
                    playerName: `Josh`,
                    identity: `Sp//dr`,
                    campaignRef: 0,
                    owner: zarbba
                },
                {
                    playerName: `Henry`,
                    identity: `Rogue`,
                    campaignRef: 1,
                    owner: hnro
                }
            ],
            scenario: `Mysterio`,
            wonGame: false,
            notes: `Fucken Mysterio man...`,
            owner: hnro
        },
        {
            gameName: `Teaching Luna`,
            datePlayed: new Date(`2024-09-08`),
            players:[
                {
                    playerName: `Josh`,
                    identity: `Ms Marvel`,
                    campaignRef: 0,
                    owner: zarbba
                },
                {
                    playerName: `Luna`,
                    identity: `Ghost Spider`,
                    campaignRef: 1,
                }
            ],
            scenario: `Rhino`,
            wonGame: false,
            notes: `Luna didn't really like the game. I guess I shoulda known ^.^;`,
            notes: `Luna didn't really like the game. I guess I shoulda known ^.^;`,
            owner: zarbba
        },
        {
            gameName: `Iron Man vs Ultron Solo Game`,
            datePlayed: new Date(`2024-09-08`),
            players:[
                {
                    playerName: `Josh`,
                    identity: `Iron Man`,
                    campaignRef: 0,
                    owner: zarbba
                }
            ],
            scenario: `Ultron`,
            wonGame: false,
            notes: `I wanted to try out Iron Man but maybe Ultron was a bit too much of a challange.`,
            owner: zarbba
        },
        {
            gameName: `Nightcrawler and Magneto vs MaGog`,
            datePlayed: new Date(`2024-10-25`),
            players:[
                {
                    playerName: `Henry`,
                    identity: `Magneto`,
                    campaignRef: 0,
                    owner: hnro
                },
                {
                    playerName: `Josh`,
                    identity: `Nightcrawler`,
                    campaignRef: 1,
                    owner: zarbba
                }
            ],
            scenario: `MaGog`,
            wonGame: true,
            notes: `Josh wanted to try out Nightcrawler. Fumbled through it a bit but we held the line. Magneto rocks.`,
            owner: hnro
        },
        {
            gameName: `Cyclops and X-23 vs Sabretooth 2-Player Mutant Genesis Campaign Game`,
            datePlayed: new Date(`2024-12-02`),
            players:[
                {
                    playerName: `Josh`,
                    identity: `Cyclops`,
                    campaignRef: 0,
                    owner: zarbba
                },
                {
                    playerName: `Henry`,
                    identity: `X-23`,
                    campaignRef: 1,
                    owner: hnro
                }
            ],
            scenario: `Sabretooth`,
            wonGame: true,
            notes: `Restarting this campaign. Hopefully we do better this time.`,
            owner: zarbba
        },
        {
            gameName: `Pheonix vs Unus Solo Game`,
            datePlayed: new Date(`2025-01-01`),
            players:[
                {
                    playerName: `Henry`,
                    identity: `Pheonix`,
                    campaignRef: 0,
                    owner: hnro
                }
            ],
            scenario: `Unus`,
            wonGame: true,
            notes: `Got bored on new years day. Decided to give Age of Apocolypse a go.`,
            owner: hnro
        }
    ])
    const allGames = await Game.find()
    console.log(allGames)
    await addOwners(zarbba, hnro)
}

async function seedCampaignInformation() {
    const deletedInformation = await SinisterMotives.deleteMany()
    const createdInformation = await SinisterMotives.create({
        currentReputation: 12,
        osbornTechCards: [`Ionic Boots`],
        completedCommunityServices: [],
        completedWakingNightmare: false,
        completedLastOneStanding: false,
        shieldTechCards: [
            {
                card: `Wave Bracers`,
                assignedTo: 0
            },
            {
                card: `Shock Knuckles`,
                assignedTo: 1
            }
        ],
        aspectAdvantageCards: [
            {
                card: `Make the Call`,
                assignedTo: 0
            },
            {
                card: `Hawkeye/Clint Barton`,
                assignedTo: 1
            }
        ],
        planningAheadCards: []
    })
}

async function seedCampaigns() {
    const zarbba = await User.findOne({userName: `Zarbba`})
    const hnro = await User.findOne({userName: `Hnro`})
    const info = await SinisterMotives.findOne({currentReputation: 12,})
    const deletedCampaigns = await Campaign.deleteMany()
    const createdCampaigns = await Campaign.create({
        campaignName: `Josh and Henry Get Sinister`,
        owner: zarbba,
        players: [
            {
                playerName: `Josh`,
                identity: `Sp//dr`,
                campaignRef: 0,
                owner: zarbba
            },
            {
                playerName: `Henry`,
                identity: `Rogue`,
                campaignRef: 1,
                owner: hnro
            }
        ],
        campaignType: `SinisterMotives`,
        games: [ 
            await Game.findOne({gameName: `Sp//dr and Rogue vs Mysterio 2-Player Sinister Motives Campaign Game`})
        ],
        modes: {
            expert: false,
        },
        campaignInformation: info,
        notes: `Mysterio is crushing us. Might need more or better ways to deal with encounter cards.`
    })
    const allCampaigns = await Campaign.find()
    console.log(allCampaigns)
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