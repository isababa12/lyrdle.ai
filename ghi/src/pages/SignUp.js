import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/css/SignUp.css";
import { useToken } from "../authApi";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const signup = useToken()[3];

  // Code from Isaiah
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      username: username,
      password: password,
    };
    // const usersURL = "http://localhost:8000/api/users/current";
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
        // setSubmitted(true);
        console.log(`Created new user: ${username}`);
      })
      .catch((e) => console.error("Error: ", e));
  };

  return (
    <div>
      <div className="reg-page">
        <div className="reg-head">
          <NavLink to="/"> Welcome to Lyrdle Ai </NavLink>
        </div>
        <form onSubmit={handleSubmit} action="submit" className="reg-form">
          <div>
            <div className="reg-input">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                type="text"
                required
              />
            </div>
            <div className="reg-input">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div className="reg-input">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type="password"
                required
              />
            </div>
            <NavLink to="/">
              <button onClick={(e) => signup(username, password, email)}>
                Register
              </button>
            </NavLink>
            <NavLink to="/login">
              <button>I already have an account</button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
