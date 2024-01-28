const feedbackModel = require("../models/feedbackSchema");
const courseModel = require("../models/courseSchema");

const createFeedback = (req, res) => {
  const course_id = req.params.id;
  const commenter = req.token.userId;
  const { comment } = req.body;
  const newFeedback = new feedbackModel({
    course:course_id,
    comment,
    commenter,
  });
  newFeedback
    .save()
    .then((result) => {
      courseModel
        .findByIdAndUpdate(
          course_id,
          { $push: { comments: result._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `feedback added`,
            feedback: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// delete
const deleteFeedback = (req, res) => {
  const id = req.params.id;
  const{ course_id }= req.query;
  feedbackModel
    .findOneAndDelete({ _id: id }, { __v: 0, user: 0 })
    .populate("commenter", "-password-__v -role -password")
    .then((result) => {
      if (result) {
        courseModel
        .findByIdAndUpdate(
          course_id,
          { $pull: { comments: result._id } },
          { new: true }
        )
        res.status(200).json({
          success: true,
          message: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Feedback not found ",
        });
      }
    })
    .catch((err) => {

      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const getAllFeedbacks = (req, res) => {
  feedbackModel
    .find({}, { _id: 0, __v: 0 })
    .populate("commenter", "-_id -password-__v -role -password")
    .populate("course")

    .then((result) => {
      res.status(201).json({
        success: true,
        message: "all feedbacks",
        feedbacks: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getAllFeedbacksbycourse = (req, res) => {
  const id = req.params.id;
  feedbackModel
    .find({course:id}, { _id: 0, __v: 0 }).limit(5)
    .populate("commenter", "-_id -password-__v -role -password")

    .then((result) => {
      res.status(201).json({
        success: true,
        message: "all feedbacks",
        feedbacks: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};


module.exports = {
  createFeedback,
  deleteFeedback,
  getAllFeedbacks,
  getAllFeedbacksbycourse
};
