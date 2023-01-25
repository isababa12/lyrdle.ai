import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
// import * as IoIcons from "react-icons/io";
import { useAuthContext, useToken } from "../authApi";
import {
  IoIosSettings,
  IoIosLogIn,
  IoIosAlbums,
  // AiFillHome,
  IoIosAddCircle,
  IoIosLogOut,
} from "react-icons/io";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { token } = useToken();
  // const [ token, login, logout]= useToken();
  const { cookie } = useAuthContext();
  // const { cookie, isLoggedIn } = useAuthContext();

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

                {token
                  ?
                    <>
                      <li key="token" style={{color: "white"}} className="nav-text">
                        Welcome, {cookie?.user.username}
                      </li>
                    </>
                  :
                  "" }
            <li key="Home" className="nav-text">
              <Link to="/">
                <AiIcons.AiFillHome></AiIcons.AiFillHome>
                Home
              </Link>
            </li>
            <li key="Settings" className="nav-text">
              <Link to="/settings">
                <IoIosSettings></IoIosSettings>
                Settings
              </Link>
            </li>
            <li key="Profile" className="nav-text">
              <Link to="/Profile">
                <IoIosAlbums></IoIosAlbums>
                Profile
              </Link>
            </li>
            <li key="Sign Up" class="nav-text">
              {!token && (
                <NavLink to="/signup">
                  <IoIosAddCircle></IoIosAddCircle>
                  Sign Up
                </NavLink>
              )}
            </li>
            <li key="Login" className="nav-text">
              {!token && <NavLink to="/login">
              <IoIosLogIn></IoIosLogIn>
              Log In</NavLink>}
            </li>
            <li key="Logout" className="nav-text">
              {token && <NavLink to="/logout">
              <IoIosLogOut></IoIosLogOut>
              Logout</NavLink>}
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
