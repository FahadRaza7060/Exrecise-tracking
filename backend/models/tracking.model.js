const mongoose = require("mongoose");

const exerciseScema = mongoose.Schema({
  userName: String,
  timeDuration: Number,
  date: Date,
  comments: String,
});

module.exports = mongoose.model("ExerciseInfo", exerciseScema);
