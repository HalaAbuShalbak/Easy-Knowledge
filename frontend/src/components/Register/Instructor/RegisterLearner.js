import React from "react";
import "./app.css";
import { useState, useContext } from "react";
import { userContext } from "../../../App";
import axios from "axios";
import { Link } from "react-router-dom";
const RegisterLearner = () => {
  const { role, setRole } = useContext(userContext);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const register = (urlFile) => {
        axios
          .post("https://test-yr87.onrender.com/user/create", {
            name,
            userName,
            email,
            role,
            img: urlFile || "",
            password,
          })
          .then((result) => {
            setMsg({
              success: true,
              msg: result.data?.message,
            });
          })
          .catch((error) => {
            setMsg({
              success: false,
              msg: error?.response?.data.message,
            });
          });
      };
      const uploadImage = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "g9fkkaot");
        data.append("cloud_name", "drzcyo3sv");
        axios
          .post(" https://api.cloudinary.com/v1_1/drzcyo3sv/image/upload", data)
          .then((res) => {
            register(res.data.url);
            setUrl(res.data.url);
          })
          .catch((err) => console.log(err));
      };
  return (
    <>
    <div className="RegisterInfo_2">
      <img className="instructorImage" src="./images\Education-rafiki.png" />
      <div className="InstructorInfo_2">
        <input
          type="text"
          className="loginContent"
          placeholder=" Enter your name"
          onChange={(e) => {
            setName(e.target.value);
            setRole("64e281dfbfab148ae42369cf");
          }}
        />
        <input
          type="text"
          className="loginContent"
          placeholder=" Enter your username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="email"
          className="loginContent"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="loginContent"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label className="insert">
            Insert your image
            <input
              type="file"
              className="insert"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </label>
          <p className={`${msg.success ? "pass" : "fail"}`}>{msg.msg}</p>
        <button
            className="button"
            onClick={() => {
              if (image) {
                uploadImage();
              } else {
                register();
              }
            }}
          >
            Register
          </button>
          <p className={`${msg.success ? "pass" : "fail"}`}>
            {msg.success && (
              <label>
                Start your journey!<Link to="/Login">Login</Link>
              </label>
            )}
          </p>
        </div>
        {/* <div className="regMsg">
          <p className={`${msg.success ? "pass" : "fail"}`}>{msg.msg}</p>
          <p className={`${msg.success ? "pass" : "fail"}`}>
            {msg.success && (
              <label>
                Start your journey!<Link to="/Login">Login</Link>
              </label>
            )}
          </p>
        </div> */}
      </div>
    </>
  );
};

export default RegisterLearner;
