const express = require('express');
const registerController = require("../controllers/register.js");
const router = express.Router();

router.post('/', registerController.register);

module.exports = router;
