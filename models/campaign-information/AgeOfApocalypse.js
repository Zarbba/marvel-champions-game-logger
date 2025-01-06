const mongoose = require(`mongoose`)

const playerSchema = new mongoose.Schema({
	playerName: {
		type: String,
		required: true,
	},
	identity: String,
	remainingHitPoints: Number,
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `User`,
	},
})

const ageOfApocalypseSchema = new mongoose.Schema(
	{
		defeatedSideMissions: [
			{
				type: String,
				enum: [
					`Liberate the Seattle Core`,
					`Evacuate Survivors`,
					`Sabotage the Sea Wall`,
					`Find Lost Mutants`,
				],
			},
		],
		defeatedOverseerMinions: [
			{
				type: String,
				enum: [
					`Mister Sinister`,
					`The Shadow King`,
					`Abyss`,
					`Sugar Man`,
					`Mikhail Rasputin`,
				],
			},
		],
		players: [playerSchema],
	},
	{timestamps: true, virtuals: true}
)

// sinisterMotivesSchema.virtual(`playerNames`).get(function () {
//     let playerNames = []
//     this.players.forEach( (player) => {
//         playerNames.push(player.playerName)
//     })
//     return playerNames
// })

const AgeOfApocalypse = mongoose.model(`AgeOfApocalypse`, ageOfApocalypseSchema)

module.exports = AgeOfApocalypse
//REVIEW - Remove empty string enums and apply ternaries/conditionals in appropriate places
