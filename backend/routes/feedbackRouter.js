const express = require("express");
const authorization = require("../middleware/Authorization");
const authentication = require("../middleware/Authentication");
const {
  createFeedback,
  deleteFeedback,
  getAllFeedbacks,
  getAllFeedbacksbycourse
} = require("../controllers/feedbackController");
const feedbackRouter = express.Router();
feedbackRouter.delete(
  "/delete/:id",
  authentication,
  authorization("delete_feedback"),
  deleteFeedback
);

feedbackRouter.post(
  "/create/:id",
  authentication,
  authorization("add_feedback"),
  createFeedback
);
feedbackRouter.get("/:id", authentication, getAllFeedbacks);
feedbackRouter.get("/:id",authentication,getAllFeedbacksbycourse)

module.exports = feedbackRouter;
