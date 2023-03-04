const express = require('express');
const loginController = require("../controllers/login.js");
const router = express.Router();

router.post('/', loginController.login);

module.exports = router;