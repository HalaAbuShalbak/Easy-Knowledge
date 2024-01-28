const enrollmentModel = require("../models/enrollmentSchema");
// create model for every course
const createEnrollModel = (req, res) => {

  const { course, user } = req.body;
  enrollmentModel.findOne({ course: course,user:user }).then((found) => {
    if (!found) {
      const enrolled = new enrollmentModel({
        user,
        course,
      });
      enrolled
        .save()
        .then(async (result) => {
          try {
            const x = await result.populate("course");
            res.status(200).json({
              success: true,
              message: `The user ${req.token.name} is now enrolled to the course `,
              course: x,
            });
          } catch (error) {
          }
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            error: err.message,
          });
        });
    } else {
      res.status(400).json({
        success: true,
        message: `The user ${req.token.name} is  already enrolled to the course`,
   
      });
    }
  });
};
// get all enrolled courses
const getEnrolled = (req, res) => {
  enrollmentModel
    .find({}, { _id: 0, __v: 0, user: 0 })
    .populate({
      path: "course",
      populate: { path: "owner", select: "-_id -__v -password -role" },
    })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: result,
       
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
// withdraw course:
const withdraw = (req, res) => {
  const id = req.params.id;
  enrollmentModel
    .findOneAndDelete({ course: id }, { __v: 0, user: 0 })
    .populate("course", "-_id -__v")
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "Course widthdawn",
          withdrawn: result,
        });
      } else {
        res.status(404).json({
          success: false,
          withdrawn: "course not found ",
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
module.exports = { createEnrollModel, getEnrolled, withdraw };
