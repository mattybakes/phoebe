/**
 * Menu Sub-component
 * Helper component that helps recursively build a dropdown menu list with the
 * dropdown sub-component.
 * References: https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 */

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useKeycloak } from "@react-keycloak/web"
import Dropdown from "./dropdown"

const Menu = ({ items, depthLevel }) => {
  const { keycloak, initialized } = useKeycloak()
  /* Stores dropdown menu state */
  const [dropdown, setDropdown] = useState(false)

  const closeDropdown = () => {
    dropdown && setDropdown(false)
  }

  /* Detect mouse click outside of dropdown menu */
  let ref = useRef()
  useEffect(() => {
    const handler = event => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown])

  /* Detect mouse hover for resolution > 768 */
  const onMouseEnter = () => {
    window.innerWidth > 768 && setDropdown(true)
  }
  const onMouseLeave = () => {
    window.innerWidth > 768 && setDropdown(false)
  }

  return (
    <div className="menu-wrapper">
      {(items.private && keycloak && keycloak.authenticated) ||
      !items.private ? (
        <li
          className="menu-items"
          ref={ref}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={closeDropdown}
        >
          {items.submenu && items.url ? (
            <>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdown ? "true" : "false"}
                onClick={() => setDropdown(prev => !prev)}
              >
                {window.innerWidth < 768 && depthLevel === 0 ? (
                  items.title
                ) : (
                  <Link to={items.url}>
                    {items.svg || items.svgAlt
                      ? keycloak && keycloak.authenticated
                        ? items.svg
                        : items.svgAlt
                      : items.title}
                  </Link>
                )}
                {depthLevel > 0 && window.innerWidth < 768 ? null : depthLevel >
                    0 && window.innerWidth > 768 ? (
                  <span>&raquo;</span>
                ) : (
                  <span className="arrow" />
                )}
              </button>
              <Dropdown
                depthLevel={depthLevel}
                submenus={items.submenu}
                dropdown={dropdown}
              />
            </>
          ) : !items.url && items.submenu ? (
            <>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdown ? "true" : "false"}
                onClick={() => setDropdown(prev => !prev)}
              >
                {items.title}{" "}
                {depthLevel > 0 ? (
                  <span>&raquo;</span>
                ) : (
                  <span className="arrow" />
                )}
              </button>
              <Dropdown
                depthLevel={depthLevel}
                submenus={items.submenu}
                dropdown={dropdown}
              />
            </>
          ) : items.login ? (
            keycloak && keycloak.authenticated ? (
              <a onClick={() => keycloak.logout()} className="login">
                Logout
              </a>
            ) : (
              <a onClick={() => keycloak.login()} className="login">
                Login
              </a>
            )
          ) : (
            <Link to={items.url}>
              {items.svg || items.svgAlt
                ? keycloak && keycloak.authenticated
                  ? items.svg
                  : items.svgAlt
                : items.title}
            </Link>
          )}
        </li>
      ) : null}
    </div>
  )
}

export default Menu
