const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orgSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    founded: Date,
    eventList: [
        {
            type: Schema.Type.ObjectId,
            ref: 'Event'
        }
    ],
    description: String,
    location: {
        lat: Number,
        lon: Number
    },
    img: String
})

module.exports = mongoose.model("Org", orgSchema);