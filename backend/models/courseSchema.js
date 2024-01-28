const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  cost: { type: String },
  owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Feedback"}],
  descriptionDetails:{type:String},
  instructorInfo:{type:String},
  lectures:[{type:mongoose.Schema.Types.ObjectId, ref:"Lecture"}],
});

module.exports=mongoose.model("Course",courseSchema)