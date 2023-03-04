const express = require('express');
const authController = require("../controllers/auth/auth.js");
const eventsController = require("../controllers/events.js");

const router = express.Router();
router.get('/', authController.check_logged_in, eventsController.getEvents)
router.post('/', authController.check_logged_in, eventsController.getEvents);

module.exports = router;