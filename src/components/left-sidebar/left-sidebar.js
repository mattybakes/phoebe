import React from "react"
import { links } from "./links"
import { Link } from "gatsby"
import Xmark from "./xmark.inline.svg"
import "./left-sidebar.scss"

export const LeftSidebar = props => {
  const { isNavExpanded, setIsNavExpanded } = props
  const { closeNav } = props

  return (
    <nav className="left-sidebar-nav">
      <div className="left-sidebar-header">
        <button
          aria-label="Close Sidebar Menu"
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}
        >
          <Xmark className="navbar-icon" />
        </button>
      </div>
      <ul className="left-sidebar-list">
        {links.map((link, index) => {
          return (
            <li className="left-sidebar-items" key={index} onClick={closeNav}>
              <Link to={link.url}>{link.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default LeftSidebar
