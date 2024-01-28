const courseModel = require("../models/courseSchema");
const enrollmodel=require("../models/enrollmentSchema")
// create
const createCourse = (req, res) => {
  const owner = req.token.userId;
  const {
    name,
    description,
    duration,
    cost,
    instructorInfo,
    descriptionDetails,
  } = req.body;
  const newCourse = new courseModel({
    name,
    description,
    duration,
    cost,
    owner,
    descriptionDetails,
    instructorInfo,

  });
  newCourse
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Course Created Successfully",
        course: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

// get all courses
const getAllCourses = (req, res) => {
  const skip= req.query.skip
const limit= req.query.limit
  courseModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({path:"comments" , options: { limit: 5 }})
    .populate("owner", "-_id -__v -role -password")
    .populate("lectures")
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "all courses",
        courses: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
// delete
const deleteCourseById = (req, res) => {
  const id = req.params.id;
  courseModel
    .findByIdAndDelete({_id:id})
    .then(async(courseId) => {
      if (courseId) {
      await  enrollmodel.deleteMany({_id:id})
        res.status(200).json({
          success: true,
          message: "course deleted",
          course: courseId,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "course not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
// update
const updateCourse = (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    duration,
    cost,
    instructorInfo,
    descriptionDetails,

  } = req.body;
  courseModel
    .findOneAndUpdate(
      { _id:id },
      {
        name: name,
        description: description,
        duration: duration,
        cost: cost,
        instructorInfo:instructorInfo,
        descriptionDetails:descriptionDetails,
      
      },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "course not found",
          updatedLecture: result,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Course updated",
          updatedCourse: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

// get by name
const getCourseByName = (req, res) => {
  const name = req.params.name;
  courseModel
    .find({ name: name })
    .populate("comments", "-_Id -__v ")
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "course not found",
        });
      }
      res.status(201).json({
        success: true,
        message: "course found",
        course: result,
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
// get by id
const getCourseById = (req, res) => {
  const id = req.params.id;
  courseModel
    .find({ _id: id })
    .populate({
      path:"comments",
    
    populate:{path:"commenter",select:"-_Id -__v ",   perDocumentLimit: 5},})
    .populate("owner", "-_id -__v -role -password")
    .populate("lectures")
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "course not found",
        });
      }
      res.status(201).json({
        success: true,
        message: "course found",
        course: result,
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
// get course by owner id
const getCourseByOwnerId = (req, res) => {
  const id = req.token.userId;
  courseModel
    .find({ owner: id })
    .populate("comments", "-_Id -__v ")
    .populate("owner", "-_id -__v -role -password")
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "course not found",
        });
      }
      res.status(201).json({
        success: true,
        message: "course found",
        course: result,
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
  createCourse,
  getAllCourses,
  deleteCourseById,
  updateCourse,
  getCourseByName,
  getCourseById,
  getCourseByOwnerId,
};
