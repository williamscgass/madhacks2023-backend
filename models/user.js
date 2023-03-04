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
  org: { type: Boolean, required: true },
  org_ref: { type: Schema.Types.ObjectId, ref: 'Org'},
  description: String,
  location: {
    lat: Number,
    lon: Number,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
