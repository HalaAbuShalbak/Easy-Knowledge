import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../../App";
import axios from "axios";

const InsCourseInfo = () => {

  const { token, role, isLoggedIn, setIsLoggedIn, userId } =
    useContext(userContext);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [cost, setCost] = useState("");
  const [instructorInfo, setInstructorInfo] = useState("");
  const [descriptionDetails, setDescriptionDetails] = useState("");
  const[msg,setMsg]=useState("")

    const updateCourse=()=>{
        
        const update = {
            name: name,
            description: description,
            duration: duration,
            cost: cost,
            instructorInfo: instructorInfo,
            descriptionDetails: descriptionDetails,
          
          };
          axios
            .put(`https://test-yr87.onrender.com/course/update/${id}`, update,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then((result) => {
              setMsg(result.data.message)
            })
            .catch((err) => {
              setMsg(err.err);
            });
        };
  return( 
  <div className="UpdateInfo">
  <div className="Input">
  <input type="text" className="loginContent" placeholder="Updated name" onChange={(e)=>{
    setName(e.target.value)
  }}/>
  
   <input type="text" className="loginContent" placeholder="Updated description" onChange={(e)=>{
    setDescription(e.target.value)
  }}></input>
  
   <input type="text" className="loginContent" placeholder="Updated duration" onChange={(e)=>{
    setDuration(e.target.value)
  }}></input>
   <input type="text" className="loginContent" placeholder="Updated cost" onChange={(e)=>{
    setCost(e.target.value)
  }}></input>
     <textarea placeholder="Updated instructor info"  className="loginContent" rows='5'cols='50' onChange={(e)=>{
    setInstructorInfo(e.target.value)
  }}></textarea>
     <textarea className="loginContent" placeholder="Updated description details" rows='5'cols='50' onChange={(e)=>{
    setDescriptionDetails(e.target.value)
  }}></textarea>
<button className="button"
 onClick={()=>{
    updateCourse()
    
 }
 
 }>Update</button>
        {msg&&<p className="msgs">{msg}</p>}
    
  </div>
  </div>) 
 
};


export default InsCourseInfo;
