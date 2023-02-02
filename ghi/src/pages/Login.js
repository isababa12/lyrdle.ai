import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "../authApi";
import "../styles/css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [, login] = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginError = await login(username, password);
    if (loginError) {
      setError("Incorrect username or password")
    }
    return;
  };

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


  return (
    <>
      <div className="login-container">
        <img alt="logo" src={require("../images/logo-down.png")} />
        <form onSubmit={handleSubmit} action="submit" className="login-form">
          <div className="login-head">
          <p className="login-slogan">Log in to Lyrdle AI</p>
            <div className="login-body">
              {loginInput}
              {loginPassword}
              <div>
                <button
                className="fancy-button"
                type="submit"
              >
                log in
              </button>
              </div>
              Don't have an account? <NavLink to="/signup">Sign up!</NavLink>
            </div>
          </div>
          </form>
          {error && <div className="alert alert-warning">{error}</div>}
        </div>
    </>
  );
}

export default Login;
