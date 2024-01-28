import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import axios from "axios";
import "./app.css";

const Courseinfo = () => {
  const { token, setIsLoggedIn, userId } =
    useContext(userContext);
  const { id } = useParams();
  const [info, setInfo] = useState("");
  const [msg, setMsg] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = () => {
    setIsLoggedIn(true);
    setCourseId(id);
    setLoader(true);
    axios
      .get(`https://test-yr87.onrender.com/course/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setInfo(result.data.course);
        setLoader(false);
      })
      .catch((err) => {
        setMsg(err.err);
      });
  };

  return (
    <>
      {loader ? (
        <div className=".loader"></div>
      ) : (
        <div>
          {info &&
            info.map((course, i) => {
              return (
                <div className="Info_container" key={course._id}>
                  <div className="CourseInfo">
                    <p className="Instructor"> Course Name: {course?.name} </p>
                    </div>
                    <div className="middle">
                    <div className="description">
                     <p  className="Instructor"> What you will learn in this course:</p>
                      <p className="detail_p">{course.descriptionDetails}</p>
                    </div>
                  
                  <div className="Ins_info">
                  <p className="Instructor">  Instructor Info:</p>
                    
                    <div className="insinfocontainer">
                    <div  className="Insinfoimg">
                    <img  className=" Insinfoimg"src= {course?.owner?.img} 
                
                    />
                    </div>
                    <div className="Insinfotext">
                    <div className="detail_p"><p className="Instructor">Name:</p>{course.owner?.name}</div>
                    <div className="detail_p"> <p className="Instructor">Email:</p>{course.owner?.email}</div>
                    </div>
                   
                    </div>
                    <p  className="detail_p">{course?.instructorInfo}</p>
                    
                  </div>
                  </div>
                  <div className="feedback">
                  <p  className="Instructor"> Feedback:</p>
                    {course&&
                    course.comments.length<=5?course.comments.slice(0,5).map((cmnt, i) => {
                        return (
                          <div   key={cmnt._id} className="Comments">
                            <div className="commentshape"><img src={cmnt?.commenter?.img} width="50px" height="40px"/><p className="detail_p">{cmnt.commenter.userName}:{cmnt.comment}</p></div>
                          </div>
                        )
                      }):course.comments.slice(-6,-1).map((cmnt, i) => {
                        return (
                          <div   key={cmnt._id} className="Comments">
                            <div className="commentshape"><img src={cmnt?.commenter?.img} width="50px" height="40px"/><p className="detail_p">{cmnt?.commenter?.userName}:{cmnt?.comment}</p></div>
                          </div>
                        )})}
                  </div>

                  <button className="enroll"
                    onClick={(e) => {
                  
                      const post = {
                        user: userId,
                        course: id,
                      };
                      axios
                        .post("https://test-yr87.onrender.com/enroll/create", post, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                        .then((res) => {
                          setMsg(res.data.message);
                          navigate(`/Lecture/${id}`);
                        })
                        .catch((err) => {
                          setMsg(err.response.data.message);
                        });
                        e.target.disabled=true
                    }}
                  >
                    Enroll
                  </button>
                  <p></p>
                  {msg&&<p className="loginmsg">{msg}</p>}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Courseinfo;
