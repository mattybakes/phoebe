/**
 * Menu Items Sub-component
 * Stores arrays of links for the navbar component.
 * References: https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 */

import React from "react"
import IconLockOpen from "./lock-open.inline.svg"
import IconLockClosed from "./lock.inline.svg"

/* Links that are used for Authentication. */
export const menuItemsMain = [
  {
    title: "Login",
    url: "/login",
    svg: <IconLockOpen className="navbar-icon" />,
    svgAlt: <IconLockClosed className="navbar-icon" />,
    submenu: [
      {
        title: "Profile",
        url: "profile",
      },
      {
        title: "Settings",
        url: "Settings",
      },
      {
        title: "Log",
        url: "log",
        login: true,
      },
    ],
  },
]
