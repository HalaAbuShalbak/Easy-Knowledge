const express = require("express");
const authorization = require("../middleware/Authorization");
const authentication = require("../middleware/Authentication");
const {
  createCourse,
  getAllCourses,
  deleteCourseById,
  updateCourse,
  getCourseByName,
  getCourseById,
  getCourseByOwnerId
} = require("../controllers/courseController");

const courseRouter = express.Router();
courseRouter.post(
  "/create",
  authentication,
  authorization("add_course"),
  createCourse
);
courseRouter.get("/", authentication, getAllCourses);
courseRouter.delete(
  "/delete/:id",
  authentication,
  authorization("delete_course"),
  deleteCourseById
);
courseRouter.put(
  "/update/:id",
  authentication,
  authorization("update_course"),
  updateCourse
);
courseRouter.get("/name/:name",authentication,getCourseByName)
courseRouter.get("/id/:id",authentication,getCourseById)
courseRouter.get("/owner/:id",authentication,getCourseByOwnerId)


module.exports = courseRouter;
