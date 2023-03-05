const Group = require("../models/group.js");
const User = require("../models/user.js");

module.exports.createGroup = async function(req, res, next) {
    const user = await User.findById(req.session.userId);
    const group = await Group.create({
        name: req.body.name,
        leader: user.name,
        description: req.body.description
    })
    user.groupList.push(group._id);
    await user.save();
    res.send("group created");
}

module.exports.joinGroup = async function(req, res, next) {
    const user = await User.findById(req.session.userId);
    const group = await Group.findById(req.params.group_id);
    if (group.members.includes(user._id)) {
        res.send("already in group");
        return;
    }
    group.members.push(user._id);
    user.groupList.push(group._id);
    await group.save();
    await user.save();
    res.send("group joined");
}