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
    players: [{
        player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Players`
        },
        identity: String
    }],
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
    notes: String,
}, {timestamps: true, virtuals: true})

const Campaign = mongoose.model(`Campaign`, campaignSchema)

module.exports = Campaign