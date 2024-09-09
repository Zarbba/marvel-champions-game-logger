const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ownedGames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Game`
    }],
    ownedCampaigns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Campaign`
    }]
}, {timestamps: true, virtuals: true})

const User = mongoose.model(`User`, userSchema)

module.exports = User