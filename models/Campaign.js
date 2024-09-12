const mongoose = require(`mongoose`)

const modesSchema = new mongoose.Schema ({
    expert: {
        type: Boolean,
        required: true
    },
    heroic: {
        type: Number,
        enum: [1, 2, 3, 4]
        },
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

const campaignSchema = new mongoose.Schema ({
    campaignName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    },
    players: [{
        player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Players`
        },
        identity: String
    }],
    campaignType: {
        type: String,
        required: true,
        enum: [`The Rise of Red Skull`, `The Galaxy's Most Wanted`, `The Mad Titan's Shadow`, `Sinister Motives`, `Mutant Genesis`, `NeXt Evolution`, `Age of Apocalypse`]
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Game`
    }],
    modes: {
        type: modesSchema,
        required: true
    },
    campaignInformation: sinisterMotivesSchema, //TODO - Find out how to make this dynamic based on campaignType.
    notes: String,
}, {timestamps: true, virtuals: true})

const Campaign = mongoose.model(`Campaign`, campaignSchema)

module.exports = Campaign