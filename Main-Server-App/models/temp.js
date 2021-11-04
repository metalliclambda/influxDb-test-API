const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  avgTemp: {
    type: Number,
    required: true,
  },
  nodeNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Temp", userSchema);
