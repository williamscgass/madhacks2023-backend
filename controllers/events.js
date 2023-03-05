const Event = require("../models/event.js");
const Org = require("../models/org.js");
const User = require("../models/user.js");
const EventList = require("../responses/events.js");
const get_location = require("./location.js");
const sendEmailEventSignUP = require("./twilio/sendEmailEventSignUP.js")

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
  const el = new EventList(null, null);
  await el.loadById(req.params.event_id);
  res.send(el.body);
};

module.exports.createEvent = async function (req, res, next) {
  const user = await User.findById(req.session.userId);
  const body = req.body;
  const location = await get_location(req);
  const time = {
    start: req.body.startTime,
    end: req.body.endTime
  }
  const event = new Event({
    name: req.body.name,
    numVolunteersNeeded: req.body.numVolunteersNeeded,
    description: req.body.description,
    time: time,
    org: user.orgRef,
    location: location,
  });
  const org = await Org.findById(user.orgRef);
  org.eventList.push(event._id);
  await event.save();
  await org.save();
  res.send("event created.");
};

/**
 * Allows user to register for event. Assumes user logged in and is user, not org.
 */
module.exports.registerForEvent = async function (req, res, next) {
  const event = await Event.findById(req.params.event_id);
  const user = await User.findById(req.session.userId);
  if ((event.numVolunteersNeeded <= event.numVolunteersCurrently) | !event) {
    res.send({ success: false, description: "event full, or doesn't exist" });
    return
  }
  if (event.currentVolunteers.includes(user._id)) {
    res.send({ success: false, description: "already signed up for the event" });
    return
  }
  event.numVolunteersCurrently += 1;
  event.currentVolunteers.push(req.session.userId);
  user.currentCommitments.push(req.params.event_id);
  await user.save();
  await sendEmailEventSignUP(req, event, user)

  await Promise.allSettled([event.save(), user.save()]);
  res.send({
    success: true,
    description: "registered for event, see in my events"
  });
};

/**
 * Allows user to unregister for event. Assumes user logged in and is user, not org.
 */
module.exports.unregisterForEvent = async function (req, res, next) {
  const event_id = req.params.event_id;
  const event = await Event.findById(event_id);
  const user_id = req.session.userId
  const user = await User.findById(user_id);
  console.log(event_id);
  console.log(user_id);
  if (!event.currentVolunteers.includes(user_id)) {
    res.send({ success: false, description: "not signed up for the event" });
    return
  }
  event.numVolunteersCurrently -= 1;
  event.currentVolunteers = event.currentVolunteers.filter((id) => id != user_id);
  user.currentCommitments = user.currentCommitments.filter((id) => id != event_id);
  await Promise.allSettled([event.save(), user.save()]);
  res.send({
    success: true,
    description: "unregistered for event"
  });
};