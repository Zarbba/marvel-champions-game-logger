const mongoose = require(`mongoose`)

const playerSchema = new mongoose.Schema ({
    playerName: {
        type: String,
        required: true
    }, 
    identity: String,
    remainingHitPoints: Number,
    shieldTechCard: 
    {
        type: String,
        enum: [`Compact Darts`, `Impact-Dampening Suit`, `Laser Goggles`, `Propulsion Gauntlet`, `Retinal Display`, `Shock Knuckles`, `Wave Bracers`, `Wrist-Navigator`, ``]
    },
    aspectAdvantageCard:String,
    planningAheadCard: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    }
})

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
            enum: [`Back Alley Burglary`, `Cat in a Tree`, `Henchmen Heist`, `Off the Rails`, `Rubble Rescue`]
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
    players: [playerSchema] 
}, {timestamps: true})

const SinisterMotives = mongoose.model(`SinisterMotives`, sinisterMotivesSchema)

module.exports = SinisterMotives
//REVIEW - Remove empty string enums and apply ternaries/conditionals in appropriate places
