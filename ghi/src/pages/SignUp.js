import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/css/SignUp.css";
import { useToken } from "../authApi";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const signup = useToken()[3];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFetching(true);
    const signupError = await signup(username, password, email);
    if (signupError) {
      setError("Email or username already taken");
      setFetching(false);
    }
    return;
  };

  let spinner = "spinner-border d-none";
  let button = "fancy-button";

  if (fetching === true) {
    button = "fancy-button d-none";
    spinner = "spinner-border";
  }

  return (
    <div>
      <div className="su-container">
        <img src={require("../images/logo-right.png")} alt="Lyrdle AI logo" />
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
            <button className={button} type="submit">
              Register
            </button>
            <div className={spinner} role="status"></div>
            <div>
              Already have an account?{" "}
              <NavLink to="/login">Sign in here</NavLink>
            </div>
          </div>
        </form>
        {error && <div className="alert alert-warning">{error}</div>}
      </div>
    </div>
  );
}

export default SignUp;
