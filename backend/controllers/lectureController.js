const lectureModel = require("../models/lectureSchema");
const courseModel=require("../models/courseSchema")
// create
const createLecture = (req, res) => {
  const courseId=req.params.courseId
  const { article, lecture,
     question, answers 
    } = req.body;
  const newLec = new lectureModel({
    course:courseId,
    article,
    lecture,
    question ,
    answers,
  });
  newLec
    .save()
    .then((lecture) => {
      res.status(200).json({
        success: true,
        message: "Lecture added Successfully",
        lecture: lecture,
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


const pushNewLecture = (req, res) => {
  const course_id = req.params.id;
  const {course, lecture } = req.body;
  const newLecture = new lectureModel({
    course,
    lecture
   
  });
  newLecture
    .save()
    .then((lecture) => {
      courseModel
        .findByIdAndUpdate(
          course_id,
          { $push: { lectures: lecture._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `lecture added`,
            lecture: lecture,
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
// getAllLectures
const getAllLectures = (req, res) => {
  const id = req.params.userId
  lectureModel
    .find({ owner: id })
    .populate("lecture")
    .populate({
      path: "course",
      populate: { path: "owner", select: "-_id -__v -password -role" },
    })
    .then((result) => {

      res.status(201).json({
        success: true,
        message: "all lectures",
        courses: result,
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

// update
const updateLectureAdd = (req, res) => {
  const id = req.params.id;
  const { lecture, answers } = req.body;
  lectureModel
    .findByIdAndUpdate(id, {
      $push: { lecture: lecture, answers: answers },
    } ,{ new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "lecture not found",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "lecture updated",
          updatedLecture: result,
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
//

const updateLectureRemove = (req, res) => {
  const id = req.params.id;
  const { lecture, answers } = req.body;
  lectureModel
    .findByIdAndUpdate(id, {
      $pull: { lecture: lecture, answers: answers },
    },{ new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "lecture not found",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "lecture updated",
          updatedLecture: result,
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

// delete
const deleteLecture = (req, res) => {
  const id = req.params.id;
  lectureModel
    .findOneAndDelete({ _id: id }, { __v: 0, user: 0 })
    .populate({
      path: "course",
      populate: { path: "owner", select: " -__v -password -role" },
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message:"Lecture deleted successfully",
          deletedLecture: result,
        });
      } else {
        res.status(404).json({
          success: false,
          deletedLecture: "lecture not found ",
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
const getLecturesByCourse = (req, res) => {
  const id = req.params.id
  lectureModel
    .find({ course: id })
    .populate("lecture")
    .populate({
      path: "course",
      populate: { path: "owner", select: "-_id -__v -password -role" },
    })
    .then((result) => {

      res.status(201).json({
        success: true,
        message: "all lectures",
        courses: result,
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
  createLecture,
  getAllLectures,
  updateLectureAdd,
  deleteLecture,
  updateLectureRemove,
  pushNewLecture,
  getLecturesByCourse
};

