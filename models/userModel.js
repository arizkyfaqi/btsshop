const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    select: false,
  },
  phone: {
    type: Number,
    required: [true, "Please provide phone number"],
  },
  country: {
    type: String,
    required: [true, "Please provide coutry"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
  },
  postcode: {
    type: Number,
    required: [true, "Please provide post code"],
  },
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
