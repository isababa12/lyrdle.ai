import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthContext, useToken } from "../authApi";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("")
  // const [submit, setSubmitted] = useState("")
  const [token, login] = useToken();
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const userData = {
  //     email: email,
  //     username: username,
  //     password: password,
  //   };
  //   const usersURL = "http://localhost:8000/api/users/current";
  //   const fetchConfig = {
  //     method: "put",
  //     body: JSON.stringify(userData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   fetch(usersURL, fetchConfig)
  //     .then((response) => response.json())
  //     .then(() => {
  //       setEmail("");
  //       setUsername("");
  //       setPassword("");
  //       setSubmitted(true);
  //     })
  //     .catch((e) => console.error("Error: ", e));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await login(username, password);
    if (error) {
      isLoggedIn(false);
    } else {
      navigate('/');
    }
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

  const loginRedirect = async () => {
    try {
      const login_response = await login(username, password);
      if (!login_response) {
        navigate('/');
      } else {
        // SET A STATE
        alert("Please Sign Up")
      }
      // navigate('/');
      // console.log(login_response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <video className ="background-video" src="/login/login-vid.mp4" autoPlay muted loop />
      <div className="login-page">
        <div className="login-form">
          <div className="login-head">
            <p className="login-slogan">Welcome to Lyrdle Ai</p>
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
