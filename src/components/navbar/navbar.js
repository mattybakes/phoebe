/**
 * Navbar Component
 * Creates a navbar function to be used in the global layout.
 * References: https://blog.logrocket.com/create-responsive-navbar-react-css/
 */

import React from "react"
import { useState } from "react"
import { menuItemsPrivate, menuItemsPublic, menuItemsLogin } from "./menu-items"
import Menu from "./menu"
import "./navbar.scss"

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const depthLevel = 0
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Mattycake's Digital Garden
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul className="menus">
          {menuItemsLogin.map((menu, index) => {
            const depthLevel = 0
            return <Menu items={menu} key={index} depthLevel={depthLevel} />
          })}
        </ul>
      </div>
    </nav>
  )
}
