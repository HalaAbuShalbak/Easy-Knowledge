const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  article: { type: String },
  lecture:[{ type: String }],
  question: { type: String },
  answers: [{ type: String }],
});
module.exports = mongoose.model("Lecture", lectureSchema);

