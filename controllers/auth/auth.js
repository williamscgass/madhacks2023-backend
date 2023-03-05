const { SITE_URL } = require("../../env.js");
const User = require("../../models/user.js");

module.exports.check_logged_in = function(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect(SITE_URL + '/login');
    }
}

/**
 * Checks if user is org. Assumes user is logged in.
 */
module.exports.check_is_org = async function(req, res, next) {
    const user = await User.findById(req.session.userId);
    if (user.isOrg) {
        next();
    }
    else {
        res.send("Sorry! Only organizations can create events.");
    }
}

/**
 * Checks if user is volunteer. Assume user is logged in.
 */
module.exports.check_is_volunteer = async function(req, res, next) {
    const user = await User.findById(req.session.userId);
    if (!user.isOrg) {
        next();
    }
    else {
        res.send("Sorry! Only volunteers can register for events.");
    }
}