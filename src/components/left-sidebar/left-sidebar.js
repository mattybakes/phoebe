import React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import { links } from "./links"
import Xmark from "./xmark.inline.svg"
import Shuffle from "../../animations/word-shuffle"
import Darkmode from "../../components/darkmode"
import "./left-sidebar.scss"

export const LeftSidebar = props => {
  const { isNavExpanded, setIsNavExpanded } = props
  const { closeNav } = props
  const [isHover, setIsHover] = useState(false)

  /* Detect mouse hover for resolution > 768 */
  const onMouseEnter = () => {
    window.innerWidth > 768 && setIsHover(true)
  }
  const onMouseLeave = () => {
    window.innerWidth > 768 && setIsHover(false)
  }

  return (
    <nav className="left-sidebar-nav">
      <div className={"left-sidebar-header " + (isHover ? "test" : "")}>
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
              <Link to={link.url}>
                <Shuffle text={link.title} />
              </Link>
            </li>
          )
        })}
      </ul>
      <div>
        <Darkmode />
      </div>
    </nav>
  )
}

export default LeftSidebar
