/**
 * Navbar Component
 * Creates a navbar function to be used in the global layout.
 * References: https://blog.logrocket.com/create-responsive-navbar-react-css/,
 *             https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 */

import React from "react"
import { menuItemsMain } from "./menu-items"
import Menu from "./menu"
import Bars from "./bars.inline.svg"
import BarsStaggered from "./bars-staggered.inline.svg"
import Logo from "./logo.inline.svg"
import "./navbar.scss"

export default function Navbar(props) {
  const { isNavExpanded, setIsNavExpanded } = props
  /* Required Keycloak client object to check authenticaiton */
  return (
    <nav className="navigation">
      <button
        aria-label="Open Sidebar Menu"
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {isNavExpanded ? (
          <BarsStaggered className="navbar-icon" />
        ) : (
          <Bars className="navbar-icon" />
        )}
      </button>
      <a href="/" className="brand-name">
        <Logo />
      </a>
      <div className="navigation-menu">
        <ul className="menus">
          {menuItemsMain.map((menu, index) => {
            const depthLevel = 0
            return <Menu items={menu} key={index} depthLevel={depthLevel} />
          })}
        </ul>
      </div>
    </nav>
  )
}
