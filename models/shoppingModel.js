const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
