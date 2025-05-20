const express = require("express");
const authorization = require("../middleware/Authorization");
const authentication = require("../middleware/Authentication");
const enrollmentRouter = express.Router();

const {
  createEnrollModel,
  getEnrolled,
  withdraw,
} = require("../controllers/enrollmentController");
enrollmentRouter.post(
  "/create",
  authentication,
  // authorization("enroll_to_course"),
  createEnrollModel
);
enrollmentRouter.get("/enrolled", authentication, getEnrolled);
enrollmentRouter.delete(
  "/withdraw/:id",
  authentication,
  // authorization("withdraw_course"),
  withdraw
);

module.exports = enrollmentRouter;
