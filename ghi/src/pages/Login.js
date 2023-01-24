import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useToken } from "../authApi";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, login] = useToken();


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
      type="text"
      required
      />
    </div>
  )

  const SignUp = (
    <div className="login-btn">
      <button
        onClick={() => login(username, password)}
        type="button"
        className="log-btn"
      >
      Log In
      </button>
      <NavLink to="/signup">
        <button>I don't have an account</button>
      </NavLink>
    </div>
  )

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-head">
          <p className="login-slogan">Login</p>
        </div>
        <div className="login-body">
        {loginInput}
        {loginPassword}
        {SignUp}
        </div>
      </div>
    </div>
  );
}

export default Login;
