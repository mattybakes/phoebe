/**
 * Grid Lines Component
 * A component to display a typography grid depending on the line-height set.
 * References: Myself...
 */

import React from "react"
import "./grid-lines.scss"

const GridLines = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="grid">
        <div className="gridlines"></div>
      </div>
    </div>
  )
}
export default GridLines
