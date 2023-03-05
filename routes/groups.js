const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth/auth.js");


const groupController = require("../controllers/group.js");

router.post("/", authController.check_logged_in, groupController.createNewGroup);
router.patch("/:group_id", authController.check_logged_in, groupController.joinGroup);

module.exports = router;