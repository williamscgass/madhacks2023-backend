const Event = require("../models/event.js");
const Org = require("../models/org.js");
const User = require("../models/user.js");
const EventList = require("../responses/events.js");
const get_location = require("./location.js");

module.exports.getEventsList = async function (req, res, next) {
  const num_events = req.params.num_events ? req.params.num_events : 100;
  const el = new EventList(num_events, null);
  await el.expand();
  res.send(el.body);
};

module.exports.getEventsMap = async function (req, res, next) {
  res.send("hi");
};

module.exports.getOneEvent = async function (req, res, next) {
  res.send("hi");
};


module.exports.createEvent = async function (req, res, next) {    
  const body = req.body;
  const location = await get_location(req);
  const event = new Event({
    name: req.body.name,
    time: req.body.time,
    numVolunteersNeeded: req.body.numVolunteersNeeded,
    description: req.body.description,
    org: req.body.org,
    location: location
  });
  await event.save();
  const org = await Org.findById(body.org);
  console.log(org);
  org.eventList.push(event._id);
  await org.save();
  res.send("event created.");
};

/**
 * Allows user to sign up for event. Assumes user logged in and is user, not org.
 */
module.exports.signUpForEvent = async function (req, res, next) {
  const event = await Event.findById(req.params.event_id);
  const user = await User.findById(req.session.userId);
  if (event.numVolunteersNeeded <= event.numVolunteersCurrently | !event ) {
    res.send("the event is full :(");
  }
  if ( event.currentVolunteers.includes(user._id)) {
    res.send("you've already signed up");
  }
  event.numVolunteersCurrently += 1;
  event.currentVolunteers.push(req.session.userId);
  await event.save();
  user.currentCommitments.push(req.params.event_id);
  await user.save();
  res.send("you've signed up for an event :) see it in your commitments");
};
