const mongoose = require(`mongoose`)

const playerSchema = new mongoose.Schema ({
    playerName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    }

    }, {timestamps: true, virtuals: true})

const Player = mongoose.model(`Player`, playerSchema)

module.exports = Player