import React from "react"
import { ReactKeycloakProvider } from "@react-keycloak/web"

/**
 * Initialization spinner component
 * @returns div containing a loader
 */
const Loading = () => (
  <div className="init">
    <p>Initializing server size rendering...</p>
  </div>
)

/**
 * Wrap a Keycloak provided component around a page Element to bypass gatsby
 * build issues.
 * @returns element wrapped in an empty Key Cloak Provided
 */
export const wrapRootElement = ({ element }) => {
  return (
    <ReactKeycloakProvider
      authClient={{}} //an empty object instead of the keycloak instance for the static HTML pages
      initOptions={{
        onLoad: "login-required",
      }}
      LoadingComponent={<Loading />}
    >
      {element}
    </ReactKeycloakProvider>
  )
}

/**
 * Set HTML lang field to en for accessibility (readers)
 */
const HtmlAttributes = {
  lang: "en",
}

/**
 * Set Adobe Typekit fonts in the Head
 */
const HeadComponents = [
  <link rel="preconnect" href="https://keycloak.mattycakes.ca" />,
]

/**
 * Called after every page Gatsby server renders while building HTML so you can
 * set head and body components to be rendered in your html.js.
 */
export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHeadComponents(HeadComponents)
  setHtmlAttributes(HtmlAttributes)
}
