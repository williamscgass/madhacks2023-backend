const User = require("../models/user.js");

module.exports.getCurrentUser = async function(req, res, next) {
    let user;
    if (req.query.full == "true") {
        user = await User.findById(req.session.userId).populate("groupList").populate("currentCommitments").populate("orgRef");
    }
    else {
        user = await User.findById(req.session.userId);
    }
    res.send(user);
}