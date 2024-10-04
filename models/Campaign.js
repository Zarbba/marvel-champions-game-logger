const mongoose = require(`mongoose`)

const modesSchema = new mongoose.Schema ({
    expert: {
        type: Boolean,
        required: true
    },
    heroic: {
        type: Number,
        enum: [0, 1, 2, 3, 4]
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
        enum: [`TheRiseOfRedSkull`, `TheGalaxysMostWanted`, `TheMadTitansShadow`, `SinisterMotives`, `MutantGenesis`, `NeXtEvolution`, `AgeOfApocalypse`, `AgentsOfSHIELD`]
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
}, {timestamps: true, virtuals: true})

campaignSchema.virtual(`playerNames`).get(function () {
    let playerNames = []
    this.campaignInformation.players.forEach( (player) => {
        playerNames.push(player.playerName)
    })
    return playerNames
})

campaignSchema.virtual(`displayType`).get(function () {
    let type = this.campaignType
    type = type.replace(/([a-z])([A-Z])/g, '$1 $2')
    type = type.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return type
})

const Campaign = mongoose.model(`Campaign`, campaignSchema)

module.exports = Campaign