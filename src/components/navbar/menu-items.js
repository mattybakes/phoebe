/**
 * Menu Items Sub-component
 * Stores arrays of links for the navbar component.
 * References: https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 */

import React from "react"
import IconLockOpen from "./lock-open.inline.svg"
import IconLockClosed from "./lock.inline.svg"

export const menuItemsMain = [
  {
    title: "Home",
    url: "/",
    private: false,
  },
  {
    title: "academic",
    url: "/academic",
    private: true,
  },
  {
    title: "journal",
    url: "/journal",
    private: true,
  },
  {
    title: "personal",
    url: "/personal",
    private: false,
  },
  {
    title: "ramblings",
    url: "/ramblings",
    private: false,
  },
]

/* Links that are used for Authentication. */
export const menuItemsLogin = [
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
