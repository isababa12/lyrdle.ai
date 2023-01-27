import React, { useState } from "react";
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import { useToken } from "../authApi";
// import { useAuthContext, useToken } from "../authApi";
import "../styles/css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, login] = useToken();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const error = await login(username, password);
  //   if (error) {
  //     isLoggedIn(false);
  //   } else {
  //     navigate('/');
  //   }
  // };

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
        navigate("/");
      } else {
        alert("Invalid username and/or password");
      }
      return <Navigate to="/" />;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-container">
        <img src={require("../images/logo-down.png")} />
        <div className="login-form">
          <div className="login-head">
            <p className="login-slogan">Log in to Lyrdle AI</p>
            <div className="login-body">
              {loginInput}
              {loginPassword}
              <div>
                <button
                  onClick={() => loginRedirect()}
                  type="button"
                  className="fancy-button"
                >
                  Log In
                </button>
              </div>
              Don't have an account? <NavLink to="/signup">Sign up!</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
