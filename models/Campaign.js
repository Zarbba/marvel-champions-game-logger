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

const campaignSchema = new mongoose.Schema ({
    campaignName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    },
    campaignInformation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath:`campaignType`
    },
    campaignType: {
        type: String,
        required: true,
        enum: [`TheRiseofRedSkull`, `TheGalaxysMostWanted`, `TheMadTitansShadow`, `SinisterMotives`, `MutantGenesis`, `NeXtEvolution`, `AgeOfApocalypse`]
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Game`
    }],
    modes: {
        type: modesSchema,
        required: true
    },
    remainingHitPoints: [{
        hitPoints: Number,
        assignedTo: Number
    }],
    notes: String,
}, {timestamps: true, virtuals: true})

campaignSchema.virtual(`playerNames`).get(function () {
    let playerNames = []
    this.players.forEach( (player) => {
        playerNames.push(player.playerName)
    })
    return playerNames
})

campaignSchema.virtual(`htmlDate`).get(function () {
    return this.datePlayed.toISOString().slice(0,10)
})

const Campaign = mongoose.model(`Campaign`, campaignSchema)

module.exports = Campaign