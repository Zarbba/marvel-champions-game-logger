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
    wakingNightmares: {
        type: Number,
        required: true,
    },
    lastOnesStanding: [
        {
            type: String,
            enum: [`Doctor Octopus`, `Electro`, `Hobgoblin`, `Kraven the Hunter`, `Scorpion`, `Vulture`]    
        }
    ],
    shieldTechCards: [
        {
            card: {
                type: String,
                enum: [`Compact Darts`, `Impact-Dampening Suit`, `Laser Goggles`, `Propulsion Gauntlet`, `Retinal Display`, `Shock Knuckles`, `Wave Bracers`, `Wrist-Navigator`]
            },
            assignedTo: {
                type: Number,
                required: true
            }
        }
    ],
    aspectAdvantageCards: [
        {
            card: String,
            assignedTo: {
                type: Number,
                required: true
            }
        }
    ],
    planningAheadCards: [
        {
            card: String,
            assignedTo: {
                type: Number,
                required: true
            }
        }
    ], 
    remainingHitPoints: Number         
}, {timestamps: true})

const SinisterMotives = mongoose.model(`SinisterMotives`, sinisterMotivesSchema)

module.exports = SinisterMotives
