/**
 * Dropdown Sub-component
 * Helper component that helps recursively build a dropdown menu list with the
 * menu sub-component.
 * References: https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 */

import React from "react"
import Menu from "./menu"

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : ""
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <Menu items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  )
}

export default Dropdown
