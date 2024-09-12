const Campaign = require(`../models/Campaign`)

async function isCampaignOwner(req, res, next) {
    try {
        const campaign = await Campaign.findById(req.params.gameId)
        if (campaign.owner != req.session.user._id) {
            res.status(403).render(`errors/error-403`)
            return
        }
        next()    
    } catch(err) {
        console.log(err)
        res.render(`errors/error-500`)
    }
}
module.exports = isCampaignOwner