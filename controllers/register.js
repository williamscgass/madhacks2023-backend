const User = require("../models/user.js");

module.exports.register = async function (req, res, next) {
  // TODO: password hashing
  // TODO: check only one user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    isOrg: req.body.isOrg
  });

  return res.status(200).json(user);
};
