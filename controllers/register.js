const User = require("../models/user.js");
const Org = require("../models/org.js");
const get_location = require("./location.js");
const sendEmail = require("./twilio/sendEmailSignUP.js")
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
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    isOrg: req.body.isOrg,
    location: location
  });

  // await sendEmail(req, user.username);

  if (req.body.isOrg == "true") {
    const org = await Org.create({
        name: req.body.username,
        user: user._id
    });
    user.orgRef = org._id;
    await user.save();
  }

  res.redirect(SITE_URL + "/login");
};
