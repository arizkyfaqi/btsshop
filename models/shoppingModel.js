const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill name"],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
