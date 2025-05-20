const mongoose = require("mongoose");
// includes the course reference , the attached article , and the array of videos for the lecture
const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  article: { type: String },
  lecture: [{ type: String }],
  views: { type: Number },
});
module.exports = mongoose.model("Lecture", lectureSchema);
