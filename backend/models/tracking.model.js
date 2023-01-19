const mongoose = require("mongoose");

const exerciseScema = mongoose.Schema({
  userName: String,
  timeDuration: Number,
  date: Date,
  description: String,
});

module.exports = mongoose.model("ExerciseInfo", exerciseScema);
