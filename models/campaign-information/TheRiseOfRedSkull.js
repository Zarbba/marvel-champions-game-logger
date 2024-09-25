const mongoose = require(`mongoose`)

const redSkullSchema = new mongoose.Schema ({
    delayCounters: {
        type: Number,
        required: true,
    },
    experimentalAttachments: [
        {
            type: String,
            enum: [`Laser Rifle`, `Energy Shield`, `Power Gauntlets`, `Exo-Suit`]    
        }
    ],
    techCards: [
        {
            card: {
                type: String,
                enum: [`Adrenal Stims`,`Tactical Scanner`, `Emergency Teleporter`, `Laser Cannon`]
            },
            assignedTo: {
                type: Number,
                required: true
            }
        }
    ],
    conditionCards: [
        {
            card: {
                type: String,
                enum: [`Basic Thwart Upgrade`, `Basic Attack Upgrade`, `Basic Defence Upgrade`, `Basic Recovery Upgrade`]
            },
            assignedTo: {
                type: Number,
                required: true
            },
            improved: {
                type: Boolean,
                required: true
            }
        }
    ],
    rescuedAllyCards: [
        {
            card: {
                type: String,
                enum: [`Moon Knight`, `Shang-Chi`, `White Tiger`, `Elektra`]
            },
            assignedTo: {
                type: Number,
                required: true
            }
        }
    ],
    expertObligationCards: [
        {
            card: {
                type: String,
                enum: [`Zola's Algorithim`,`Medical Emergency`, `Martial Law`, `Anti-Hero Propaganda`]
            },
            assignedTo: {
                type: Number,
                required: true
            }
        }
    ],
    engagedPlayers: [
        {
            player: Number,
            engaged: Boolean
        }
    ],
}, {timestamps: true})

const TheRiseOfRedSkull = mongoose.model(`TheRiseOfRedSkull`, redSkullSchema)

module.exports = TheRiseOfRedSkull
