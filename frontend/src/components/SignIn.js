import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (password.length < 8) {
      return toast.error("Password should be at least 8 characters!");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter valid email");
    }

    axios
      .post("http://localhost:8081/login", {
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        if (data) {
          toast.success("you have loggedin successfully");
          navigate("/profile");
          // console.log(data.accessToken,'asdfghjk');
          localStorage.setItem("accessToken", data.accessToken);
          //   toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <br />
      <h1 className="display-3 text-center mb-3 fw-bold">Login Page</h1>
      <div className="card w-50 m-auto shadow border-0 aa">
        <div className="card-body bb">
          <label className="text-center fw-bold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label className="text-center fw-bold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <br />
      <br />
      <button className="btn btn-primary" type="button" onClick={register}>
        Login
      </button>
    </>
  );
}
export default SignIn;
