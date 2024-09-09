const mongoose = require(`mongoose`)

const playerSchema = new mongoose.Schema ({

})

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

const campaignSchema = new mongoose.Schema ({
    campaignName: {
        type: String,
        required: true
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    }],
    players: [playerSchema],
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
    notes: String,
})

const Campaign = mongoose.model(`Campaign`, campaignSchema)

module.exports = Campaign

/*
----- Things specific to Sinister Motives Campaigns:
currentReputation: {
    type: Number,
    required: true
},
osbornTechCards: [
    {
        type: String,
        enum: [``, ``, ``, ``, ``, ``]
    }
],
completedCommunityServices: [
    {
        type: String
        enum: [``, ``, ``, ``, ``]
    }
],
completedWakingNightmare: Boolean,
completedLastOneStanding: Boolean

----- Things specific to Sinister Motives Players:
shieldTech: {
    type: String,
    enum: [``, ``, ``, ``, ``, ``, ``, ``]
}
aspectAdvantage: String
planningAhead: String
remainingHitPoints: Number
*/
