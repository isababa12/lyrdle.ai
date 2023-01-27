import { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../styles/css/Navbar.css";
import { IconContext } from "react-icons";
import { useAuthContext } from "../authApi";

function Navbar() {
  const { token } = useAuthContext();
  const [loggedIn, setLoggedIn] = useState(false);

  const getUserInfo = useCallback(async () => {
    const userURL = `${process.env.REACT_APP_USERS_API_HOST}/api/users/current`;
    const fetchConfig = {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userURL, fetchConfig);
    if (response.ok) {
      setLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getUserInfo();
    } else {
      setLoggedIn(false);
    }
  }, [token, getUserInfo, loggedIn]);

  const locationLogIn = useLocation();
  if (
    locationLogIn.pathname === "/login" ||
    locationLogIn.pathname === "/signup"
  ) {
    return null;
  }

  let logInDependent = "nav-link d-none";
  let logOutDependent = "nav-link";

  if (loggedIn === true) {
    logInDependent = "nav-link";
    logOutDependent = "nav-link d-none";
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar navbar-expand-lg static-top">
          <div className="container">
            <nav className="navbar-container" href="#">
              <ul className="nav-top-bar" id="nav-top-bar">
                <Link to="/">
                  <li id="nav-home">Home</li>
                </Link>
                <li>
                  <NavLink
                    to="/profile"
                    className={`${logInDependent} nav-profile`}
                    aria-current="page"
                    href="#"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/logout"
                    className={`${logInDependent} nav-logout`}
                    aria-current="page"
                    href="#"
                  >
                    Log Out
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="fixed-bottom bd-highlight">
                <li className="nav-item" key="login">
                  <NavLink
                    to="/create"
                    className={`${logInDependent} bottom-nav`}
                    aria-current="page"
                    href="#"
                  >
                    create.
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={`${logOutDependent} bottom-nav`}
                    aria-current="page"
                    href="#"
                  >
                    log in.
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
