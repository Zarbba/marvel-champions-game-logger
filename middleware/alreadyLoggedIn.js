function alreadyLoggedIn(req, res, next) {
    if (!req.session.user) {
        next()
    } else {
        res.redirect(`/`)
        return
    }  
}

module.exports = alreadyLoggedIn