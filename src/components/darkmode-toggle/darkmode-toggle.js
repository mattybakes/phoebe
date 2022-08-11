/**
 * Dark Mode Toggle Component
 * Returns a toggle to switch between dark and light mode using use-dark-mode.
 * References: https://github.com/JoseRFelix/react-toggle-dark-mode,
 *             https://github.com/donavon/use-dark-mode#parameters,
 *             https://www.gatsbyjs.com/plugins/gatsby-plugin-use-dark-mode/
 */

import React from "react"
import useDarkMode from "use-dark-mode"
import { DarkModeSwitch } from "react-toggle-dark-mode"

/**
 * Wraps a const to store/morph/persist darkMode state, and a toggle to change
 * it.
 */
const DarkModeToggle = () => {
  const darkMode = useDarkMode(false, {
    element: "document.documentElement",
  })

  return (
    <div className="">
      <DarkModeSwitch
        checked={darkMode.value}
        onChange={darkMode.toggle}
        size="1rem"
        sunColor="var(--text-light)"
        moonColor="var(--text-dark)"
      />
    </div>
  )
}

export default DarkModeToggle
