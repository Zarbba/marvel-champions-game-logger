const Game = require(`../models/Game`)

async function isGameOwner(req, res, next) {
    const game = await Game.findById(req.params.gameId)
    if (game.owner != req.session.user._id) {
        res.status(403).render(`errors/error-403`)
        return
    }
    next()
}
module.exports = isGameOwner