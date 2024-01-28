import React from "react";
import "./app.css";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import axios from "axios";
import Edit from "./Edit";
const MyLectures = () => {
  const { token, userId} = useContext(userContext);
  const [msg, setMsg] = useState("");
  const [lectures, setLectures] = useState("");
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    getLecturesOfIns();
  }, []);

  const getLecturesOfIns = () => {
    setLoader(true);
    axios
      .get(`https://test-yr87.onrender.com/lecture/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLectures(res.data.courses);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setMsg(err.response.data.message);
      });
  };
  if (loader) {
    return <div className="loader"></div>;
  } else {
    return (
      <>
        <div>
          <div>
            {lectures &&
              lectures?.map((e, i) => {
               
                return (
                <>
                <div className="Border">
                <p className="Instructor" >Course Name :{e?.course?.name}</p>
                  <div key={e._id} className="lectureContainer" >
                    
                    
                    <div className="detail_p"> <p className="Instructor">Article:</p>{e?.article}</div>
                   
                    <div className="feedback">
                      
                     <p className="Instructor"> Videos:</p>
                      {e?.lecture?.map((vid, i) => {
                        return (
                          <div key={i} className="feedback">
                            <iframe src={vid} allowFullScreen></iframe>

                            <button className="button"
                              onClick={() => {
                                axios
                                  .put(
                                    `https://test-yr87.onrender.com/lecture/updateRemove/${e._id}`,
                                    { lecture: vid },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                  .then((res) => {
                                    setMsg({success:true,
                                      msg:res.data.message})
                                  })
                                  .catch((err) => {
                                    setMsg({success:false,
                                      msg:err?.response?.data?.message})
                                    
                                  });
                                  window.location.reload(false);
                              }}
                            >
                              Delete video
                            </button>
                           
                             
                          </div>
                          
                        );
                       
                      })}
                    </div>
                   
                 <div className="add-delete">
                   
                   <button className="delete_lec_button"
                      onClick={() => {
                        axios
                          .delete(
                            `https://test-yr87.onrender.com/lecture/delete/${e._id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((res) => {
                            setMsg({success:true,
                              msg:res.data.message})
                          })
                          .catch((err) => {
                            setMsg({success:false,
                              msg:err?.response?.data?.message})
                          });
                          window.location.reload(false);
                      }}
                    >
                      Delete Lecture
                    </button>
                    <Edit id={e._id} /> 
                    <p className={`${msg.success ? "pass" : "fail"}`}>{msg.msg}</p>
                    </div>
                  </div>
                  </div>
               </> );
              })}
          </div>
       
        </div>
      </>
    );
  }
};
export default MyLectures;
