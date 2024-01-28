import React from "react";
import "./app.css";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const {
    token,
    count,
    setCount,
    setIsLoggedIn
  } = useContext(userContext);
  const [msg, setMsg] = useState("");
  const [courses, setCourses] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses();
  }, [count]);

  const getAllCourses = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);

    setLoader(true);
    
    if (localStorage.getItem("token")) {
      axios
        .get(`https://test-yr87.onrender.com/course/?limit=3&skip=${count - 3}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setCourses(result.data.courses);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          setMsg(error.response.data.message);
        });
    }
  };

  if (loader) {
    return <div className="loader"></div>;
  } else {
    return (
      <>
        <div className="DashBoard">
          {courses &&
            courses.map((course, i) => {
              return (
                <div className="Course" key={course._id}>
                  <div className="details">
                    <p> Course Name: {course.name} </p>
                    <p>Description:{course.description}</p>
                    <p>Cost: {course.cost}</p>
                    <p>Instructor:{course?.owner?.name}</p>
                  </div>
                  <button
                    className="button"
                    id="button"
                    onClick={() => {
                      setCourseId(course._id);
                      navigate(`/courseInfo/${course._id}`);
                    }}
                  >
                    view details
                  </button>
                </div>
              );
            })}
            {courses.length>3&&<div className="show">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-arrow-left-square"
            viewBox="0 0 16 16"
            onClick={() => {
              setCount(count - 3);
            }}
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-arrow-right-square"
            viewBox="0 0 16 16"
            onClick={() => {
              setCount(count + 3);
            }}
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </div>}
            
        </div>

        
      </>
    );
  }
};

export default Dashboard;
