const User = require("../../models/user.js");

module.exports.check_logged_in = function(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/');
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
        res.send("oops not org, but you are someone");
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
        res.send("yeah you can't be doing this bud (org trying to sign up fir evnt)");
    }
}