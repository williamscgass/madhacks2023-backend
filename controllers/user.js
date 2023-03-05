const User = require("../models/user.js");

module.exports.getCurrentUser = async function(req, res, next) {
    const user = await User.findById(req.session.userId);
    res.send(user);
}