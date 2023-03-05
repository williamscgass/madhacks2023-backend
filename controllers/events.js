const Event = require("../models/event.js");
const Org = require("../models/org.js");
const EventList = require("../responses/events.js");

module.exports.getEventsList = async function (req, res, next) {
  const num_events = req.params.num_events ? req.params.num_events : 10;
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
