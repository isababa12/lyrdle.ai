// import React, { Component } from "react";


// export default class Create extends Component{

//   render(){
//     return (
//       <form>
//         <h3>Sign Up</h3>
//         <div class="form-group">
//           <label>username</label>
//           <input type="text" className="form-control" placeholder="username" />
//         </div>

//         <div class="form-group">
//           <label>email</label>
//           <input type="text" className="form-control" placeholder="email" />
//         </div>

//         <div class="form-group">
//           <label>password</label>
//           <input type="text" className="form-control" placeholder="password" />
//         </div>

//       </form>
//     );
//   }

// }

import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import { useEffect } from "react";

const baseURL = "http://localhost:8000";

function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();
  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeConfirmPass = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      password === "" ||
      confirmPass === "" ||
      email === "" ||
      username === ""
    ) {
      alert("You need to give us your information");
      return false;
    }
    if (password !== confirmPass) {
      alert("password doesn't match!");
      return false;
    }
    try {
      const resp = await axios.post(`${baseURL}/user`, {
        email: email,
        password: password,
      });
      const user = resp.data["user"];
      if (user === null) {
        alert("email already used");
        return false;
      } else {
        navigate("/profile", { state: { id: user["id"] } });
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div>
      <div className="reg-page">
        <div className="reg-head">Signup test</div>
        <form action="submit" className="reg-form">
          <div className="reg-input">
            <input
              type="text"
              placeholder="username"
              onChange={changeUsername}
            />
            <input type="text" placeholder="email" onChange={changeEmail} />
            <input
              type="password"
              placeholder="Password"
              onChange={changePassword}
            />
          </div>
          <button onClick={handleRegister} className="reg-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
