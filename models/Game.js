const mongoose = require(`mongoose`)

const playerSchema = new mongoose.Schema ({
    playerName: {
        type: String,
        required: true
    },
    identity: `String`,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    }
})

const gameSchema = new mongoose.Schema ({
    gameName: {
        type: String,
        required: true
    },
    datePlayed: {
        type: Date,
        required: true
    },
    players: [playerSchema],
    scenario: {
        type: String,
        required: true
    },
    wonGame: Boolean,
    notes: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    }
}, {timestamps: true, virtuals: true})

gameSchema.virtual(`playerNames`).get(function () {
    let playerNames = []
    this.players.forEach( (player) => {
        playerNames.push(player.playerName)
    })
    return playerNames
})

gameSchema.virtual(`htmlDate`).get(function () {
    return this.datePlayed.toISOString().slice(0,10)
})

const Game = mongoose.model(`Game`, gameSchema)

module.exports = Game