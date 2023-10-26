const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  cv: {
    type: Array,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
