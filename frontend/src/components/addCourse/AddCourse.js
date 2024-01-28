import React from 'react'
import { useState, useContext  } from "react";
import { userContext } from "../../App";
import axios from "axios";
import "./app.css";
import { useNavigate } from 'react-router-dom';
const AddCourse = () => {
    const{token}=useContext(userContext)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [cost, setCost] = useState("");
    const [instructorInfo, setInstructorInfo] = useState("");
    const [descriptionDetails, setDescriptionDetails] = useState("");
    const navigate=useNavigate()
  return (
    <div className='UpdateInfo'>
    <div className='Input'>
 <input type="text" className='loginContent' placeholder="Course name" onChange={(e)=>{
    setName(e.target.value)
  }}/>
  
   <input type="text" className='loginContent' placeholder="Course description" onChange={(e)=>{
    setDescription(e.target.value)
  }}></input>
  
   <input type="text" className='loginContent' placeholder="Course duration" onChange={(e)=>{
    setDuration(e.target.value)
  }}></input>
   <input type="text" className='loginContent' placeholder="Course cost" onChange={(e)=>{
    setCost(e.target.value)
  }}></input>
     <textarea className='loginContent' placeholder="Course instructor info" rows='4' cols='40' onChange={(e)=>{
    setInstructorInfo(e.target.value)
  }}></textarea>
     <textarea  className='loginContent' placeholder="Course description details" rows='4' cols='40' onChange={(e)=>{
    setDescriptionDetails(e.target.value)
  }}></textarea>
<button className='button' onClick={()=>{
    const obj={
        name:name,
        description:description,
        duration:duration,
        cost:cost,
        instructorInfo:instructorInfo,
        descriptionDetails:descriptionDetails,
    }
    axios.post("https://test-yr87.onrender.com/course/create",obj,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res=>{
      })
      .catch(err=>{
        console.log(err);
      })
      navigate("/MyCourses")
}}>ADD</button>
    </div>
    </div>
  )
}

export default AddCourse