const mongoose = require("../helpers/mongo");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  geoLocation: Object,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
