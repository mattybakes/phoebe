import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Navbar from "../navbar"
import LeftSidebar from "../left-sidebar"
import { Link } from "gatsby"
import "./layout.scss"

const Layout = ({ location, title, children }) => {
  const [isLeftSideExpanded, setLeftSideExpanded] = useState(false)
  const closeLeftSide = () => {
    isLeftSideExpanded && setLeftSideExpanded(false)
  }

  /* Detect mouse click outside of dropdown menu */
  let ref = useRef()
  useEffect(() => {
    const handler = event => {
      if (
        isLeftSideExpanded &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setLeftSideExpanded(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [isLeftSideExpanded])
  return (
    <div className="global-wrapper">
      <div
        className={"layout-cover " + (isLeftSideExpanded ? "show" : "")}
      ></div>
      <div className={"layout " + (isLeftSideExpanded ? "show" : "")}>
        <div className="header">
          <Navbar
            isNavExpanded={isLeftSideExpanded}
            setIsNavExpanded={setLeftSideExpanded}
          />
        </div>
        <div
          className={"left-sidebar " + (isLeftSideExpanded ? "show" : "")}
          ref={ref}
        >
          <LeftSidebar
            isNavExpanded={isLeftSideExpanded}
            setIsNavExpanded={setLeftSideExpanded}
            closeNav={closeLeftSide}
          />
        </div>
        <div className="main">
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
        <div className="right-sidebar"></div>
        <div className="footer">
        </div>
      </div>
    </div>
  )
}

export default Layout
