const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  isOrg: { type: Boolean, required: true },
  orgRef: { type: Schema.Types.ObjectId, ref: 'Org'},
  currentCommitments: [
    {
        type: Schema.Types.ObjectId,
        ref: "Event"
    }
  ],
  description: String,
  location: {
    lat: Number,
    lon: Number,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
