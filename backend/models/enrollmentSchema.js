const mongoose = require("mongoose");
const enrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  enrollmentDate: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Enroll", enrollmentSchema);
