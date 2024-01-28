import "./App.css";
import React from "react";
import { createContext, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Welcoming from "./components/welcoming/Welcoming";
import RegisterIns from "./components/Register/Instructor/RegisterIns";
import RegisterLearner from "./components/Register/Instructor/RegisterLearner";
import Login from "./components/login/Login";
import Dashboard from "./components/Main page/Dashboard";
import Courseinfo from "./components/CourseInfo/Courseinfo";
import NavBar from "./components/Navbar/NavBar";
import Lecture from "./components/Lecture/Lecture";
import Enrolled from "./components/enrolled/Enrolled";
import MyCourses from "./components/MyCourses/MyCourses";
import InsCourseInfo from "./components/CourseInfo/instructor course info/InsCourseInfo";
import MyLectures from "./components/MyLectures/MyLectues";
import AddCourse from "./components/addCourse/AddCourse";
import "bootstrap/dist/css/bootstrap.min.css";

export const userContext = createContext();
function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [show, setShow] = useState(localStorage.getItem("show"));
  const [count, setCount] = useState(3);

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <>
      <userContext.Provider
        value={{
          role,
          setRole,
          isLoggedIn,
          setIsLoggedIn,
          token,
          setToken,
          show,
          setShow,
          userId,
          setUserId,
          count,
          setCount,
        }}
      >
        {show && <NavBar />}

        <Routes>
          <Route path="/" element={<Welcoming />} />

          <Route path="/registerIns" element={<RegisterIns />} />
          <Route path="/registerLearner" element={<RegisterLearner />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courseInfo/:id" element={<Courseinfo />} />
          <Route path="/Lecture/:id" element={<Lecture />} />
          <Route path="/Enrolled" element={<Enrolled />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/editCourse/:id" element={<InsCourseInfo />} />
          <Route path="/MyLectures" element={<MyLectures />} />
          <Route path="/addCourse" element={<AddCourse />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;


