import React from "react";
import "./app.css"
import { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Login from "../../components/login/Login";
const Welcoming = () => {
  const {setRole,setShow,show } = useContext(userContext)
  const navigate=useNavigate()
  return (
    <>
    <div className="Welcome">

        <img className="Welcoming_img" src="./images/Online learning-amico.png" />
      
      <div  className="Welcome_content">
       
        <p >Have an account?</p>
         <Link to="/Login" onClick={()=>{
          setShow(false)
         navigate("/Login")
         }}>Login</Link>
        <p >
          Interested in learning new things
          </p>
          <Link to="/registerLearner" 
   
        
        >Register as a Learner</Link>
          <p >or</p>
          <p >
          you have knowledge to share with others?
        </p>
         <Link to="/registerIns" 
   
        >
          Register as an instructor</Link>
      </div >
     
    </div>
</>
    
  )
}

export default Welcoming;
