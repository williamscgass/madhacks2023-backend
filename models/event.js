const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    },
    location: {
        lat: Number,
        lon: Number
    },
    numVolunteers: {
        type: Number,
        required: true
    },
    img: String,
    org: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Org"
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Event", eventSchema);