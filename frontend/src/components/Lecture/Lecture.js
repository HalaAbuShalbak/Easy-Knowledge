import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import("./app.css");
const Lecture = () => {
  const { token } = useContext(userContext);
  const [lectures, setLectures] = useState("");
  const [msg, setMsg] = useState("");
  const [fb, setFb] = useState("");
  const [loader, setLoader] = useState(false);
  const [cmntId, setCmntId] = useState("");
  const { id } = useParams();
  const [CID, setCId] = useState("");
  useEffect(() => {
    getLectures();
  }, []);
  const getLectures = () => {
    setLoader(true);

    axios
      .get(`https://test-yr87.onrender.com/lecture/lecturesbycourse/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setLectures(result.data.courses);
        setLoader(false);
      })
      .catch((err) => {
        setMsg(err.err);
      });
  };
  if (loader) {
    return <div className=".loader"></div>;
  } else {
    return (
      <>
        {lectures &&
          lectures.map((course, i) => {
            return (
              <div className="lectureContainer">
                <div className="Article">
                  <p className="Instructor">Article:</p>
                  {course?.article}
                </div>
                <div className="videos">
                  <p className="Instructor">Videos:</p>
                  {course?.lecture?.map((vid, i) => {
                    return (
                      <div key={i} className="lecture">
                        <iframe
                          src={vid}
                          key={i + 1}
                          allowFullScreen
                          on="true"
                        ></iframe>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        <div className="userFeedback">
          <p className="Instructor">Your Opinion matters</p>
          <textarea
            rows="3"
            cols="50"
            placeholder="Add your feedback here"
            onChange={(e) => {
              setFb(e.target.value);
            }}
          ></textarea>
          <div className="add-delete">
            <button
              className="button"
              id="button"
              onClick={() => {
                axios
                  .post(
                    `https://test-yr87.onrender.com/feedback/create/${id}`,
                    { comment: fb },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    setCmntId(res.data.feedback._id);
                    setCId(res.data.feedback.course);
                    setMsg({
                      msg:"Thank you for your feedback",
                    success:true});
                  })
                  .catch((err) => {
                    setMsg({success:false,
                      msg:err.response?.data?.message});
                  });
              }}
            >
              Post
            </button>
            <button
              className="button"
              id="button"
              onClick={() => {

                axios
                  .delete(
                    `https://test-yr87.onrender.com/feedback/delete/${cmntId}?course_id=${CID}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    setMsg({success:true,
                      msg:"Your feedback was deleted"});
                  })
                  .catch((err) => {
                    setMsg({success:false,
                      msg:err.response?.data?.message});
                  });
              }}
            >
              Delete
            </button>
             
          </div>
          <p className={`${msg.success ? "pass" : "fail"}`}>{msg.msg}</p>
        </div>
      </>
    );
  }
};

export default Lecture;
