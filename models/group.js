const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    leader: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userList: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Group", groupSchema);