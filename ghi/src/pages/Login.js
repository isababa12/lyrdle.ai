import React, { useState } from "react";
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import { useToken } from "../authApi";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, login] = useToken();
  const navigate = useNavigate();


  const loginInput = (
    <div className="login-input login-username">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            type="text"
            required
          />
        </div>
    );

  const loginPassword = (
    <div className="login-input login-password">
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        type="password"
        required
      />
    </div>
  );

  const loginRedirect = async () => {
    try {
      const login_response = await login(username, password);
      if (!login_response) {
        navigate('/');
      } else{
        alert("Invalid username and/or password")
      }
      return <Navigate to ="/"/>
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <video src="/login/login-vid.mp4" autoPlay muted loop />
      <div className="login-page">
        <div className="login-form">
          <div className="login-head">
            <p className="login-slogan"><NavLink to="/">Welcome to Lyrdle Ai</NavLink></p>
              <div className="login-body">
                {loginInput}
                {loginPassword}
                <div>
                    <button
                      onClick={() => loginRedirect()}
                      type="button"
                      className="log-btn"
                    >
                      Log In
                    </button>
                  <NavLink to="/signup">
                    <button>I don't have an account</button>
                  </NavLink>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
