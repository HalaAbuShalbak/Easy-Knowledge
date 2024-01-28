const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./models/db")
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// routers 
const userRouter=require("./routes/userRouter")
const roleRouter=require("./routes/roleRouter")
const courseRouter=require("./routes/courseRouter")
const lectureRouter=require("./routes/lectureRouter")
const enrollmentRouter=require("./routes/enrollmentRouter")
const feedbackRouter=require("./routes/feedbackRouter")



// endpoints

// admin endpoint 
app.use("/user",userRouter)


// role endpoint
app.use("/role",roleRouter)


// course endpoint 
app.use("/course",courseRouter)


// lecture endpoint 
app.use("/lecture",lectureRouter)

// enrollment endpoint 
app.use("/enroll",enrollmentRouter)

// feedbackRouter endpoint
app.use("/feedback",feedbackRouter)



app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  
});
