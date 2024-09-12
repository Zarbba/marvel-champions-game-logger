const User = require(`../models/User`)

async function isCurrentUser(req, res, next) {
    try {
        const user = await User.findById(req.params.userId)
        if (user._id != req.session.user._id) {
            res.status(403).render(`errors/error-403`)
            return
        }
        next()    
    } catch(err) {
        console.log(err)
        res.render(`errors/error-500`)
    }
}
module.exports = isCurrentUser