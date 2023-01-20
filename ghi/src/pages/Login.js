import { React } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    const baseURL = "http://localhost:8000";
    e.preventDefault();
    if (username !== "" && password !== "") {
      try {
        const resp = await axios.post(`${baseURL}/user/validate`, {
          username: username,
          password: password,
        });
        if (resp.data["verification"]) {
          navigate("/profile", { state: { id: resp.data["id"] } });
        } else {
          alert("incorrect username or password");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You need to input your username and password");
    }
  };

  const handleRegister = () => {
    navigate("/registration");
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-form">
          <div className="login-head">
            <p className="login-slogan">Login</p>
          </div>
          <div className="login-body">
            <div className="login-input login-username">

              <input
                type="text"
                onChange={changeUsername}
                required
                placeholder="username"
              />
            </div>
            <div className="login-input login-password">

              <input
                type="password"
                onChange={changePassword}
                required
                placeholder="password"
              />
            </div>
            <div className="login-btn">
              <button onClick={handleLogin} className="log-btn">
                Log In
              </button>
              <button onClick={handleRegister} className="reg-btn">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
