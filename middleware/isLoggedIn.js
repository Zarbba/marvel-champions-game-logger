function isLoggedIn (req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect(`/auth/login?redirect=1`)
    }
}

module.exports = isLoggedIn