const mongoose = require(`mongoose`)

const gameSchema = new mongoose.Schema ({
    gameName: {
        type: String,
        required: true
    },
    datePlayed: {
        type: Date,
        required: true
    },
    players: [{
        player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Player`
        },
        identity: String
    }],
    scenario: {
        type: String,
        required: true
    },
    wonGame: Boolean,
    notes: String,
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Campaign`
    },
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