import React from "react";
import "./app.css";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
 import Add from "./Add"


const MyCourses = () => {
  const { token,setIsLoggedIn,userId} = useContext(userContext);
  const [msg, setMsg] = useState("");
  const [courses, setCourses] = useState("");
  const[courseId,setCourseId]=useState("")
  const [loader, setLoader] = useState(false);
  const navigate=useNavigate()
  useEffect(()=>{
  
    getCoursesOfIns()
  },[])

 
   const getCoursesOfIns = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn",true)

    setLoader(true);
      axios
        .get(`https://test-yr87.onrender.com/course/owner/${userId} `, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setCourses(result.data.course)
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          setMsg(error.response.data.message);
        });
  }
  if(loader){ 
    return <div className="loader"></div>
  }
  else{
  return (
    <>
    <div className="addbtn">
     <Link to="/addCourse" ><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="navy" className="bi bi-file-plus" viewBox="0 0 16 16">
  <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
</svg></Link></div>
    
     
          <div className="DashBoard">
            
            {courses &&
              courses.map((course, i) => {
                return (
                  <>  
                  
                  <div className="Course" key={course._id}>
                  
                 <p> Course Name: {course.name} </p>
               <p>Description:{course.description}</p> 
                 <p>Cost: {course.cost}</p>
                 <p>Instructor:{course?.owner?.name}</p>
                 <button className="button" onClick={()=>{
                  setCourseId(course._id)
                  navigate(`/editCourse/${course._id}`)
                 }}>Edit Course</button>
                 <button   className="button" onClick={()=>{
                  axios.delete(`https://test-yr87.onrender.com/course/delete/${course._id}`,{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }).then(result=>{
                    setMsg({success:true,
                      msg:result.data.message})  
                     
                  })
                  .catch(err=>{
                    setMsg({success:false,
                      msg:err.response.data})
                  })
                  window.location.reload(false);
                 }}>Delete Course</button>
                 
                 <Add id={course._id}/>

                  </div>
                
                   </>
                );               
               

              })
              
              
              }
                <div>
                   <p  className={`${msg.success ? "pass" : "fail"}`}>{msg.msg}</p>
                   </div>
          </div>
     
        

     
    </>
  )
}
}
export default MyCourses