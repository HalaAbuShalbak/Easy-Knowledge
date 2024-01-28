import React from "react";

import "./app.css";
import { useState, useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    setRole,
    setIsLoggedIn,
    setUserId,
    setShow,
    setToken,
  } = useContext(userContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const handellogin = (obj) => {
    console.log("login function");
    axios
      .post("https://test-yr87.onrender.com/user/login", obj)

      .then((result) => {
        console.log(result.data)
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        setRole(result.data.role);
        localStorage.setItem("role", result.data.role);
        setUserId(result.data.userId);
        localStorage.setItem("userId", result.data.userId);
        setShow(true);
        localStorage.setItem("show", true);

        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        if (result.data.role === "learner") {
          navigate("/dashboard");
        } else {
          navigate("/MyCourses");
        }
      })
      .catch((error) => {
        setMsg(error.response.data.message);
      });
  };

  return (
    <>
      <div className="LoginContainer">
        <img
          className="instructorImage"
          src="./images/Certification-cuate.png"
        />
        <div className="Login">
          <input
            className="loginContent"
            id="loginContent"
            type="text"
            placeholder=" Enter Username OR Email"
            onChange={(e) => {
              setData(e.target.value);
            }}
          />

          <input
            className="loginContent"
            id="loginContent"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
              if (data.includes("@") && data.includes(".com")) {
                setEmail(data);
              } else {
                setUserName(data);
              }
            }}
          />

          <button
            className="button"
            onClick={() => {
              const obj = {
                email: email,
                password: password,
                userName: userName,
              };
              handellogin(obj);
            }}
          >
            Login
          </button>
          <div className="loginmsg">{msg && <div>{msg}</div>}</div>
        </div>
      </div>
    </>
  );
};

export default Login;
