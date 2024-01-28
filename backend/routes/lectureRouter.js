const express = require("express");
const authorization = require("../middleware/Authorization");
const authentication = require("../middleware/Authentication");
const {
  createLecture,
  getAllLectures,
  updateLectureAdd,
  deleteLecture,
  updateLectureRemove,
  pushNewLecture,
  getLecturesByCourse
} = require("../controllers/lectureController");
const lectureRouter = express.Router();
lectureRouter.get("/:id", authentication, getAllLectures);
lectureRouter.post(
  "/create/:courseId",
  authentication,
  authorization("add_lectures"),
  createLecture
);
lectureRouter.put(
  "/updateAdd/:id",
  authentication,
  authorization("update_lectures"),
  updateLectureAdd
);
lectureRouter.put(
  "/updateRemove/:id",
  authentication,
  authorization("update_lectures"),
  updateLectureRemove
);
lectureRouter.delete(
  "/delete/:id",
  authentication,
  authorization("delete_lectures"),
  deleteLecture
);
lectureRouter.put(
  "/push/:id",
  authentication,
  authorization("update_lectures"),
  pushNewLecture
);
lectureRouter.get(
  "/lecturesbycourse/:id",
  authentication,

  getLecturesByCourse
);
module.exports = lectureRouter;
