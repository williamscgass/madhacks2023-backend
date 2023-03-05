const express = require('express');
const authController = require("../controllers/auth/auth.js");
const userController = require("../controllers/user.js");

const router = express.Router();

router.get('/', authController.check_logged_in, userController.getCurrentUser)

module.exports = router;