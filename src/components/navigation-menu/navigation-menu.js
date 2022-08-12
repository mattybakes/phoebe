/**
 * Navigation Menu Component
 * Returns a responsive navigation menu to be used in layout.js
 * References: https://tailwindui.com/,
 */

import React from "react"
import { useState, useEffect, Fragment } from "react"
import { Link } from "gatsby"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { useKeycloak } from "@react-keycloak/web"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faLock } from "@fortawesome/free-solid-svg-icons"
import Logo from "./logo.inline.svg"
import DarkToggle from "../darkmode-toggle"
import { debounce } from "../../helpers/debounce"
import "./navigation-menu.scss"
import "../../animations/color-change-text.scss"

// Links that are available to unauthenticated users
const navigationPublic = [
  { name: "personal", href: "/personal", current: false },
  { name: "ramblings", href: "/ramblings", current: false },
]

// Links that are available ONLY to authenticated users
const navigationPrivate = [
  { name: "academic", href: "/academic", current: false },
  { name: "journal", href: "/journal", current: false },
  { name: "personal", href: "/personal", current: false },
  { name: "ramblings", href: "/ramblings", current: false },
]

// Function to join class names (unsure if this is redundant?)
function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

/**
 * Navigation Menu Function
 */

export default function Navbar() {
  /* Autoshrink Nav Menu Feature */
  const [isShrunk, setShrunk] = useState(false)
  // useEffect function to handle document event
  useEffect(() => {
    const handler = debounce(() => {
      setShrunk(isShrunk => {
        // logic implementation
        if (
          !isShrunk &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        ) {
          return true
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false
        }

        return isShrunk
      })
    }, 25)
    // cleanup
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  /* Required Keycloak client object to check authenticaiton */
  const { keycloak, initialized } = useKeycloak()

  return (
    <Disclosure
      as="nav"
      className={
        "navigation-menu sticky top-0 z-10 w-full " +
        (isShrunk ? "scale-down-p-top" : "scale-up-p-top")
      }
    >
      {({ open }) => (
        <>
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="mobile-nav-button inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex">
                  <Logo
                    className={
                      "hidden sm:block my-auto " +
                      (isShrunk ? "scale-down-h-top" : "scale-up-h-top")
                    }
                  />
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {keycloak &&
                    keycloak.hasResourceRole("viewers") &&
                    navigationPrivate.map(item => (
                      <Link
                        to={item.href}
                        className={classNames(
                          "nav-item",
                          "rounded-md text-sm font-medium font-color-normal"
                        )}
                        activeClassName="active-nav-item"
                      >
                        {item.name}
                      </Link>
                    ))}
                  {keycloak &&
                    !keycloak.authenticated &&
                    navigationPublic.map(item => (
                      <Link
                        to={item.href}
                        className={classNames(
                          "nav-item",
                          "rounded-md text-sm font-medium color-change-text hover:color-change-text-hover"
                        )}
                        activeClassName="active-nav-item"
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>
              {/* Dark Mode Toggle */}
              <DarkToggle />
              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="px-2 py-2 rounded-md text-regular font-medium">
                    <span className="sr-only">Open user menu</span>
                    {keycloak && keycloak.authenticated ? (
                      <FontAwesomeIcon icon={faUserAstronaut} size="s" />
                    ) : (
                      <FontAwesomeIcon icon={faLock} size="s" />
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Profile
                        </a>
                      )}
                    </Menu.Item>
                    {keycloak && keycloak.authenticated ? (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => keycloak.logout()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => keycloak.login()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign in
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {keycloak &&
                keycloak.hasResourceRole("viewers") &&
                navigationPrivate.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white mobile-nav-item-active"
                        : "mobile-nav-item hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              {keycloak &&
                !keycloak.authenticated &&
                navigationPublic.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white mobile-nav-item-active"
                        : "mobile-nav-item hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
