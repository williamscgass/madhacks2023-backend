const Event = require("../models/event.js");
const Org = require("../models/org.js");
const User = require("../models/user.js");
const EventList = require("../responses/events.js");

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
  const event = new Event(req.body);
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
