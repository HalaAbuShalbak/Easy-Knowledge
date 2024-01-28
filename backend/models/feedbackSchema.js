const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  comment: { type: String },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Feedback", feedbackSchema);
