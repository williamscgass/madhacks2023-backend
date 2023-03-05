const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orgSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    founded: Date,
    eventList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    description: String,
    location: {
        address: String,
        lat: Number,
        lon: Number
    },
    img: String
})

module.exports = mongoose.model("Org", orgSchema);