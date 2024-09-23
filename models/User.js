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
    }]
}, {timestamps: true, virtuals: true})

//TODO - Add validation for empty strings

const User = mongoose.model(`User`, userSchema)

module.exports = User