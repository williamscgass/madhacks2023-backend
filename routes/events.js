const express = require('express');
const authController = require("../controllers/auth/auth.js");
const eventsController = require("../controllers/events.js");

const router = express.Router();
router.get('/', authController.check_logged_in, eventsController.getEventsList);
router.post('/', authController.check_logged_in, authController.check_is_org, eventsController.createEvent);
router.get('/:event_id', authController.check_logged_in, eventsController.getOneEvent);
router.patch('/:event_id', authController.check_logged_in, authController.check_is_volunteer, eventsController.signUpForEvent);


module.exports = router;