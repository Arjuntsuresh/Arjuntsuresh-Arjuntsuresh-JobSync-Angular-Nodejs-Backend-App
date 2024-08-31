const mongoose = require("mongoose");
//This is the schema for creating a new user.
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
