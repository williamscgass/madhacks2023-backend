const Event = require("../models/event.js");

class EventList {
  constructor(num_events, user_id) {
    this.num_events = num_events;
    this.user_id = user_id;
    this.body = null;
  }

  async expand(location) {
    const list = await Event.find({})
        .limit(this.num_events)
        .populate("org");
    this.body = list;
  }
}

module.exports = EventList;
