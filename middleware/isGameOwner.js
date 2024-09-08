const Game = require(`../models/Game`)

async function isGameOwner(req, res, next) {
    try {
        const game = await Game.findById(req.params.gameId)
        if (game.owner != req.session.user._id) {
            res.status(403).render(`errors/error-403`)
            return
        }
        next()    
    } catch(err) {
        console.log(err)
        res.render(`errors/error-500`)
    }
}
module.exports = isGameOwner