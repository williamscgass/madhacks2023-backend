const User = require("../models/user.js");
const Org = require("../models/org.js");


module.exports.register = async function (req, res, next) {
  // TODO: password hashing
  // TODO: check only one user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    isOrg: req.body.isOrg
  });

  if (req.body.isOrg == "true") {
    const org = await Org.create({
        name: req.body.username,
        user: user._id
    })

    await org.save();
    console.log("org created");
  }

  return res.status(200).json(user);
};
