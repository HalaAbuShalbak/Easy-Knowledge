const mongoose = require("mongoose");
// schema for creating questions related to a specific lecture
const questionSchema = new mongoose.Schema({
  question: { type: String },
  answers: [{ type: String }],
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },

});
module.exports = mongoose.model("Question", questionSchema);

