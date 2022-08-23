import React from "react"
import { useState } from "react"
import { RandomReveal } from "react-random-reveal"
import "./word-shuffle.scss"

export default function WordShuffle(props) {
  /* Detect mouse hover for resolution > 768 */
  const [isHover, setIsHover] = useState(false)
  const onMouseEnter = () => {
    window.innerWidth > 768 && setIsHover(true)
  }
  const onMouseLeave = () => {
    window.innerWidth > 768 && setIsHover(false)
  }

  /* Delay used to trigger caret */
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  /* Custom Defaults for react-random-reveal */
  const { isPlaying = true } = props
  const { text = "Default" } = props
  const { duration = 0.4 } = props
  const { updateInterval = 0 } = props
  const { revealDuration = 1 } = props
  const { revealEasing = "linear" } = props
  const {
    characterSet = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "~",
      "`",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "{",
      "[",
      "}",
      "]",
      "|",
      "\\",
      ":",
      ";",
      '"',
      "'",
      "<",
      ",",
      ">",
      ".",
      "?",
      "/",
    ],
  } = props
  const { ignoreCharacterSet } = props

  /* Extra Options Added */
  const { className } = props
  return (
    <span
      className={isHover ? "slide " + `${className}` : `${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHover ? (
        <RandomReveal
          isPlaying={isPlaying}
          characters={text}
          duration={duration}
          updateInterval={updateInterval}
          revealDuration={revealDuration}
          revealEasing={revealEasing}
          characterSet={characterSet}
          ignoreCharacterSet={ignoreCharacterSet}
          onComplete={() => ({ shouldRepeat: false, delay: 0 })}
        />
      ) : (
        `${text}`
      )}
    </span>
  )
}
