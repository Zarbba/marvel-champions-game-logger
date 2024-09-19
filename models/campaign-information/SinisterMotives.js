const mongoose = require(`mongoose`)

const sinisterMotivesSchema = new mongoose.Schema ({
    currentReputation: {
        type: Number,
        required: true
    },
    osbornTechCards: [
        {
            type: String,
            enum: [`Arm Cannon`, `Ionic Boots`, `Kinetic Armor`, `Neocarbon Scales`, `Spiked Gauntlet`, `Tracking Display`]
        }
    ],
    completedCommunityServices: [
        {
            type: String,
            enum: [`Back Alley Burglary`, `Cat in a Tree`, `Henchmen heist`, `Off the Rails`, `Rubble Rescue`]
        }
    ],
    completedWakingNightmare: {
        type: Boolean,
        required: true,
    },
    completedLastOneStanding: {
        type: Boolean,
        required: true,
    },
    shieldTechCards: [
        {
            card: {
                type: String,
                enum: [`Compact Darts`, `Impact-Dampening Suit`, `Laser Goggles`, `Propulsion Gauntlet`, `Retinal Display`, `Shock Knuckles`, `Wave Bracers`, `Wrist-Navigator`]
            },
            assignedTo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: `Player`
            }
        }
    ],
    aspectAdvantageCards: [
        {
            card: String,
            assignedTo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: `Player`
            }
        }
    ],
    planningAheadCards: [
        {
            card: String,
            assignedTo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: `Player`
            }
        }
    ], 
    remainingHitPoints: Number         
})

const SinisterMotives = mongoose.model(`SinisterMotives`, sinisterMotivesSchema)

module.exports = SinisterMotives
