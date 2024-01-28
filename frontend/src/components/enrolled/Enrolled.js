import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./app.css";
const Enrolled = () => {
  const [loader, setLoader] = useState(false);
  const { token } = useContext(userContext);
  const [msg, setMsg] = useState("");
  const [courses, setCourses] = useState("");
  const [courseId, setCourseId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const getEnrolledCourses = () => {
    setLoader(true);
    axios
      .get(`https://test-yr87.onrender.com/enroll/enrolled `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setCourses(result.data.message);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        {loader ? (
          <div className="loader"></div>
        ) : (
          <div className="DashBoard">
            {courses &&
              courses?.map((course, i) => {
                return (
                  <div
                    className="Course"
                    key={course.course._id + i}
                  >
                    <p>Enrollment Date:{course.enrollmentDate}</p>
                    <p> Course Name: {course?.course?.name} </p>

                    <p>Cost: {course?.course?.cost}</p>

                    <button
                      className="button" id="button"
                      onClick={() => {
                          setCourseId(course.course_id)
                          navigate(`/Lecture/${course.course._id}`)
                      }}
                    >
                      view Lectures
                    </button>
                    
                    <button className="button" id="button"
                     onClick={()=>{
                      axios.delete(`https://test-yr87.onrender.com/enroll/withdraw/${course.course._id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((res)=>{
                        setMsg({success:true,
                          msg:res.data.message})
                      })
                      .catch(err=>{
                        setMsg({success:true,
                          msg:err.response?.data?.message})
                      })
                     }}
                     >Withdraw Course</button>
                     {/* <button className="button">Buy Course</button> */}
                  </div>
                );
              })}
          </div>
        )}
         
       
        
      </div>
      <p className={`${msg.success ? "pass" : "fail"}`}>{msg.msg}</p>
    </>
  );
};

export default Enrolled;
