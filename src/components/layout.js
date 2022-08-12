import * as React from "react"
import NavigationMenu from "./navigation-menu"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <NavigationMenu />
      <main>
        <div className="">{children}</div>
      </main>
      {/* each page style is responsible for their own footer placement*/}
    </div>
  )
}

export default Layout
