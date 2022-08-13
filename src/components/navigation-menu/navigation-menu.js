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
import {
  faUserAstronaut,
  faLock,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import Logo from "./logo.inline.svg"
import ChineseLogo from "./logo.chinese.inline.svg"
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
            <div className="inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="mobile-nav-button inline-flex items-center justify-center rounded-md h-14">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <FontAwesomeIcon icon={faXmark} size="s" aria-hidden="true" />
                ) : (
                  <FontAwesomeIcon icon={faBars} size="s" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex">
                  <Logo
                    className={
                      "logo hidden sm:block my-auto " +
                      (isShrunk ? "scale-down-h-top" : "scale-up-h-top")
                    }
                  />
                  <ChineseLogo
                    className={
                      "chinese-logo hidden md:block my-auto pt-[0.25rem] ml-7 " +
                      (isShrunk ? "scale-down-logo" : "scale-up-logo")
                    }
                  />
                </Link>
              </div>
              <div className="hidden sm:flex sm:ml-7 items-center">
                <div className="flex space-x-7">
                  {keycloak &&
                    keycloak.hasResourceRole("viewers") &&
                    navigationPrivate.map(item => (
                      <span
                        className={
                          isShrunk ? "scale-down-font" : "scale-up-font"
                        }
                      >
                        <Link
                          to={item.href}
                          className={classNames(
                            "nav-item",
                            "rounded-md font-medium color-change-text hover:color-change-text-hover "
                          )}
                          activeClassName="active-nav-item"
                        >
                          {item.name}
                        </Link>
                      </span>
                    ))}
                  {keycloak &&
                    !keycloak.authenticated &&
                    navigationPublic.map(item => (
                      <span
                        className={
                          isShrunk ? "scale-down-font" : "scale-up-font"
                        }
                      >
                        <Link
                          to={item.href}
                          className={classNames(
                            "nav-item",
                            "rounded-md font-medium color-change-text hover:color-change-text-hover "
                          )}
                          activeClassName="active-nav-item"
                        >
                          {item.name}
                        </Link>
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 space-x-7 flex items-center">
              {/* Dark Mode Toggle */}
              <DarkToggle
                sunColor="var(--color-text)"
                moonColor="var(--color-text)"
                size="1rem"
              />
              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="rounded-md text-regular font-medium">
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-3.5 w-48 py-3.5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-3.5 text-sm text-gray-700"
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
                              "block px-3.5 text-sm text-gray-700"
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
                              "block px-3.5 text-sm text-gray-700"
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
            <div className="space-y-3.5">
              {keycloak &&
                keycloak.hasResourceRole("viewers") &&
                navigationPrivate.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white color-change-text hover:color-change-text-hover"
                        : "mobile-nav-item color-change-text hover:color-change-text-hover",
                      "block rounded-md font-medium"
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
                        ? "bg-gray-900 text-white color-change-text hover:color-change-text-hover"
                        : "mobile-nav-item color-change-text hover:color-change-text-hover",
                      "block rounded-md font-medium"
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
