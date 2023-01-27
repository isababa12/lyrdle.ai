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
            <nav className="navbar-brand" href="#">
              <Link to="/">
                <button type="button" className="btn btn-dark">
                  Home
                </button>
              </Link>
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
                    <button type="button" className="btn btn-dark">
                      Log In
                    </button>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/create"
                    className={logInDependent}
                    aria-current="page"
                    href="#"
                  >
                    <button type="button" className="btn btn-dark">
                      Create Lyrics!
                    </button>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/profile"
                    className={logInDependent}
                    aria-current="page"
                    href="#"
                  >
                    <button type="button" className="btn btn-dark">
                      Profile
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
                    <button type="button" className="btn btn-dark">
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
