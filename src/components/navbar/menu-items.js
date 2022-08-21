/**
 * Menu Items Sub-component
 * Stores arrays of links for the navbar component.
 * References: https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 */

/* Public links that are available without authentication.*/
export const menuItemsPublic = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "academic",
    url: "/academic",
  },
  {
    title: "personal",
    url: "/personal",
  },
]

/* Private links that are available with authentication.*/
export const menuItemsPrivate = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "academic",
    url: "/academic",
  },
  {
    title: "journal",
    url: "/journal",
  },
  {
    title: "personal",
    url: "/personal",
  },
  {
    title: "ramblings",
    url: "/ramblings",
  },
]

/* Links that are used for Authentication. */
export const menuItemsLogin = [
  {
    title: "Login",
    url: "/login",
    submenu: [
      {
        title: "Profile",
        url: "profile",
      },
      {
        title: "Settings",
        url: "Settings",
      },
      {
        title: "Logout",
        url: "Logout",
      },
    ],
  },
]
