const User = require("../models/user.js");
const Org = require("../models/org.js");
const get_location = require("./location.js");
const { SITE_URL } = require("../env.js");

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

  res.redirect(SITE_URL + "/login");
};
