// This file is for the mongo database connection
const mongoose = require("mongoose");
const DB_URL= process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/myDatabase"
mongoose.connect(DB_URL).then(
  () => {
    console.log("DB Ready To Use");
  
  },
  (err) => {
    console.log(err);
  }
);
