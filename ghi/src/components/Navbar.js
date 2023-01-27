import { useEffect, useState, useCallback } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../styles/css/Navbar.css";
import { IconContext } from "react-icons";
// import * as IoIcons from "react-icons/io";
import { useToken } from "../authApi";
// import { useAuthContext, useToken } from "../authApi";

// import {
//   IoIosSettings,
//   IoIosLogIn,
//   IoIosAlbums,
//   // AiFillHome,
//   IoIosAddCircle,
//   IoIosLogOut,
// } from "react-icons/io";

function Navbar() {
  const { token } = useToken();
  // const { cookie, isLoggedIn } = useAuthContext();
  const [loggedIn, setLoggedIn] = useState(false);

  const getUserInfo = useCallback(async () => {
    // const userURL = `http://localhost:8000/api/users/current`;
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
    }
  }, [token, getUserInfo]);

  useEffect(() => {
    if (!token) {
      setLoggedIn(false);
    }
  }, [token]);

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
    logInDependent = "nav-link ";
    logOutDependent = "nav-link d-none";
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar sticky-top navbar-light">
          <div className="container">
            <nav className="navbar-brand" href="#">
              {/* <Link to="/">
                <img
                  src="https://placeholder.pics/svg/150x50/888888/EEE/Logo"
                  alt="..."
                  height="36"
                />
              </Link> */}
            </nav>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item" key="login">
                  <NavLink
                    to="/login"
                    className={logOutDependent}
                    aria-current="page"
                    href="#"
                  >
                    <button type="button" className="btn btn-success">
                      Log In
                    </button>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create"
                    className={logInDependent}
                    aria-current="page"
                    href="#"
                  >
                    <button type="button" className="btn btn-success">
                      Create Lyrics!
                    </button>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={logInDependent}
                    aria-current="page"
                    href="#"
                  >
                    <button type="button" className="btn btn-primary">
                      Profile
                    </button>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={logInDependent}
                    aria-current="page"
                    href="#"
                  >
                    <button type="button" className="btn btn-primary">
                      Settings
                    </button>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/logout"
                    className={logInDependent}
                    aria-current="page"
                    href="#"
                  >
                    <button type="button" className="btn btn-danger">
                      Log Out
                    </button>
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
