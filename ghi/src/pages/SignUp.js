import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/css/SignUp.css";
import { useToken } from "../authApi";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const signup = useToken()[3];


  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      username: username,
      password: password,
    };
    const usersURL = `${process.env.REACT_APP_USERS_API_HOST}/api/users/current`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(usersURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setEmail("");
        setUsername("");
        setPassword("");
      })
      .catch((e) => console.error("Error: ", e));
  };

  return (
    <div>
      <div className="su-container">
        <img src={require("../images/logo-right.png")} />
        <form onSubmit={handleSubmit} action="submit" className="su-form">
          <div className="su-title">Sign Up</div>
          <div>
            <div className="login-input login-username su-input">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                type="text"
                required
              />
            </div>
            <div className="login-input login-username">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div className="login-input login-username">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type="password"
                required
              />
            </div>
            <NavLink to="/">
              <button
                className="fancy-button"
                onClick={(e) => signup(username, password, email)}
              >
                Register
              </button>
            </NavLink>
            <div>
              Already have an account?{" "}
              <NavLink to="/login">Sign in here</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
