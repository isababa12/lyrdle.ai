import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Create",
    path: "/signup",
    icon: <IoIcons.IoIosCreate />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <IoIcons.IoIosAlbums />,
    cName: "nav-text",
  },
  {
    title: "Setting",
    path: "/setting",
    icon: <IoIcons.IoIosSettings />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/login",
    icon: <IoIcons.IoIosLogIn />,
    cName: "nav-text",
  },
//   {
//     title: "logout",
//     path: "/logout",
//     icon: <IoIcons.IoIosLogOut />,
//     cName: "nav-text",
//   },
];
