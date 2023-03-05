const User = require("../models/user.js");
const Org = require("../models/org.js");
const get_location = require("./location.js");

module.exports.register = async function (req, res, next) {
  if (req.body.isOrg == "organization") {
    req.body.isOrg = "true";
  }
  else {
    req.body.isOrg = "false";
  }
  // TODO: password hashing 
  // TODO: check only one user
  
  const location = await get_location(req);
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    isOrg: req.body.isOrg,
    location: location
  });

  console.log(user.location);

  if (req.body.isOrg == "true") {
    const org = await Org.create({
        name: req.body.username,
        user: user._id
    });
    await org.save();
    console.log("org created");
  }

  return res.status(200).json(user);
};
