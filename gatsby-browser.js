/**
 * Lets you respond to client side Gatsby-specific events within the browser,
 * and wrap your page components in additional global components.
 */

import React from "react"
import { ReactKeycloakProvider } from "@react-keycloak/web"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import keycloak from "./src/components/keycloak"

// custom typefaces
import "@fontsource/inter/variable.css"
import "@fontsource/ibm-plex-mono"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"
// @font face definitions for local fonts Bely
import "./src/typography.css"
// Highlighting for code blocks
import("./src/prismjs/nord-light.scss")
import("./src/prismjs/nord-dark.scss")

/**
 * Initialization spinner component
 * @returns div containing a loader
 */
const Loading = () => (
  <div className="init">
    <p>
      <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
    </p>
    <p>Loading Keycloak...</p>
  </div>
)

/**
 * Wrap a Keycloak provided component around a page Element for authentication.
 * @returns element wrapped in an Keycloak provider
 */
export const wrapRootElement = ({ element }) => {
  return (
    <ReactKeycloakProvider authClient={keycloak} LoadingComponent={<Loading />}>
      {element}
    </ReactKeycloakProvider>
  )
}
