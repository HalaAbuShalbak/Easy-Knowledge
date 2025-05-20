const mongoose = require("mongoose");
const enrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enrollmentDate: { type: Date, default: Date.now() },
});
// Ensure unique enrollment per course-user
enrollmentSchema.index({ course: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Enroll", enrollmentSchema);
