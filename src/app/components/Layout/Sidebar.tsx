import React, { useState } from "react"
import { Colors, Icon, IconNames } from "../Icon"
import { Transition } from "@headlessui/react"
import { Link } from "gatsby"
import { Collapse } from "antd"

const { Panel } = Collapse

import "./Sidebar.css"

const ManageusersMenu = [
  {
    title: "Espace client",
    icon: { name: "users" },
    link: "/app/clients",
  },
  {
    title: "Gestion utilisateur",
    icon: { name: "manage" },
    link: "/app/users",
  },
]
const DashboardMenu = [
  {
    title: "Tableau de bord",
    icon: { name: IconNames.dashboard },
    link: "/app/dashboard",
  },
  {
    title: "Marché",
    icon: { name: IconNames.coin },
    link: "/app/marche",
  },
  {
    title: "Analyses",
    icon: { name: IconNames.chart },
    link: "/app/analyses",
  },
  {
    title: "Prévisions",
    icon: { name: IconNames.predict },
    link: "/app/previsions",
  },
  {
    title: "Portefeuille",
    icon: { name: IconNames.card },
    link: "/app/portefeuille",
  },
  {
    title: "Historique des arrêts",
    icon: { name: IconNames.list },
    link: "/app/historique",
  },
  {
    title: "Gestion",
    icon: { name: IconNames.manage },
    link: "/app/manage",
  },
]
interface Sidebarprops{
  showSignlerArret?: boolean,
  isDashboard?:boolean
}
export default function Sidebar({ isDashboard = false, showSignlerArret= false }:Sidebarprops) {
  const [toggle, setToggle] = useState(false)

  const NavMenu = isDashboard ? DashboardMenu : ManageusersMenu

  const UserAvatar = (
    <div className="flex items-center">
      <img src="/images/Profil picture.png" className="w-8 h-8" alt="user avatar" />
      <div className="ml-3">
        <span className="text-sm font-semibold block">Luis Urday</span>
        <span className="text-xs font-medium">Administrateur</span>
      </div>
    </div>
  )
  return (
    <div className="md:bg-white bg-gray-bg absolute">
      {!toggle && (
        <div>
          <div className="block md:hidden">
            <label
              htmlFor="open__menu"
              className="text-white md:hidden block m-4 mt-9 ml-7"
            >
              <svg
                className="fill-current h-6 w-6 h-4 w-4"
                id="dots-vertical-icon--even"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                  fill="black"
                />
              </svg>
            </label>

            <input
              type="checkbox"
              id="open__menu"
              className="hidden"
              onClick={() => setToggle(!toggle)}
            />
          </div>
          <div
            className="w-60 bg-white md:flex hidden fixed flex-col justify-between fixed top-0 left-0 h-full  pt-8 pb-9"
            style={{ boxShadow: "6px 6px 54px rgba(0, 0, 0, 0.05)" }}
          >
            <div>
              <div className="flex items-center gap-1 pl-8">
                <img
                  src="/images/bohr_violet.png"
                  alt="bohr logo"
                  className="h-10"
                />
              </div>
              <ul className="space-y-2 mt-6 font-semibold leading-3.5 text-3.5">
                {NavMenu.map(item => (
                  <div className="relative sidebar-link-container-parent">
                    <li className="pl-8 sidebar-link-container ">
                      <Link
                        to={item.link}
                        activeClassName="active-link"
                        className="flex items-center py-2.5 text-base  text-gray-900 rounded-lg dark:text-white hover:text-violet-bohr sidebar-link"
                      >
                        <Icon name={item.icon.name} />
                        <span className="ml-3 text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </div>

            <div className="sidebar-footer p-4">
              {
                showSignlerArret && <button
                className="bg-white border-violet-bohr text-violet-bohr border-2 flex items-center justify-center py-2.5 px-4 rounded-lg mb-10"
                type="button"
                //onClick={()=>setModalUserOpen(true)}
              >
                <Icon color={Colors.primary} name={IconNames.alertCircle} />
                <span className="ml-2.5 font-semibold text-sm">Signaler un arrtêt</span>
              </button>
              }
            
              <Collapse accordion ghost expandIconPosition="end" expandIcon={(props)=> props.isActive ?  <Icon name="arrow-up"/> :  <Icon name="arrow-down"/>}>
                <Panel header={UserAvatar} key="1">
                  <p>here is test</p>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bg-transparent top-0 z-40 w-full">
        <Transition
          show={toggle}
          enter="transition duration-250 ease-in-out"
          enterFrom="transform -translate-x-full"
          enterTo="transform translate-x-0"
          leave="transition duration-250 ease-in-out"
          leaveFrom="transform translate-x-0"
          leaveTo="transform -translate-x-full"
          className="bg-white flex flex-col items-left md:text-3xl text-2xl justify-left hover:text-gray-300 absolute z-50 w-full h-screen"
        >
          <Link
            className="mt-16 w-full items-center content-center justify-center"
            to="/"
          >
            <img
              src="/images/bohr_violet.png"
              alt="bohr energie"
              className="md:w-30 md:h-12 md:w-30 md:h-12 w-30 h-12 cursor-pointer mx-auto "
            />
          </Link>

          {NavMenu.map(item => (
            <Link className="mx-12 my-6 hover:text-gray-800" to={item.link}>
              {item.title}
            </Link>
          ))}

          <label htmlFor="close__menu" className="absolute top-0 right-0 m-5">
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>

          <input
            type="checkbox"
            id="close__menu"
            className="hidden"
            onClick={() => setToggle(!toggle)}
          />
        </Transition>
      </div>
    </div>
  )
  
}
