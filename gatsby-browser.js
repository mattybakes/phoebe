import React from "react"
import { ReactKeycloakProvider } from "@react-keycloak/web"
import keycloak from "./src/components/keycloak"

// Fontsource typefaces
import "@fontsource/poppins/latin-ext.css"
import "@fontsource/ubuntu-mono/latin-ext.css"
// @font face definitions for local fonts
import "./src/typography.css"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"
// Highlighting for code blocks
import "prismjs/themes/prism.css"

/**
 * Initialization spinner component
 * @returns div containing a loader
 */
const Loading = () => (
  <div className="init">
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
