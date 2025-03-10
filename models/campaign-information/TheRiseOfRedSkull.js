const mongoose = require(`mongoose`)

const playerSchema = new mongoose.Schema ({
    playerName: {
        type: String,
        required: true
    }, 
    identity: String,
    remainingHitPoints: Number,    
    techCard:
        {
            type: String,
            enum: [`Adrenal Stims`,`Tactical Scanner`, `Emergency Teleporter`, `Laser Cannon`]
        },
    conditionCard: {
        card: {
            type: String,
            enum: [`Thwart Upgrade`, `Attack Upgrade`, `Defence Upgrade`, `Recovery Upgrade`]
        },
        improved: {
            type: Boolean,
            required: true
        },
    },
    rescuedAllyCards: [
        {
                type: String,
                enum: [`Moon Knight`, `Shang-Chi`, `White Tiger`, `Elektra`]
            }
        ],
    expertObligationCards: [
        {
                type: String,
                enum: [`Zola's Algorithim`,`Medical Emergency`, `Martial Law`, `Anti-Hero Propaganda`]
            }
    ],
    wasEngaged: Boolean,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    }
})

const redSkullSchema = new mongoose.Schema ({
    delayCounters: {
        type: Number,
    },
    experimentalAttachments: [
        {
            type: String,
            enum: [`Laser Rifle`, `Energy Shield`, `Power Gauntlets`, `Exo-Suit`]    
        }
    ],
    players: [playerSchema]
}, {timestamps: true, virtuals: true})

playerSchema.virtual(`fullConditionCard`).get(function () {
    const type = this.conditionCard.improved ? `Improved` : `Basic`
    return `${type} ${this.conditionCard.card}`
})

// redSkullSchema.virtual(`playerNames`).get(function () {
//     let playerNames = []
//     this.players.forEach( (player) => {
//         playerNames.push(player.playerName)
//     })
//     return playerNames
// })

const TheRiseOfRedSkull = mongoose.model(`TheRiseOfRedSkull`, redSkullSchema)

module.exports = TheRiseOfRedSkull
