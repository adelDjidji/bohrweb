import React, { useState } from "react"
import { Colors, Icon, IconNames } from "../Icon"
import { Transition } from "@headlessui/react"
import { Link } from "gatsby"
import { Collapse } from "antd"

const { Panel } = Collapse

import "./Sidebar.css"
import ModalArret from "./ModalArret"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { setCurrentUser } from "../../redux/actions/auth"
import { navigate } from "@reach/router"
import ModalContact from "./ModalContact"
import ApiService from "../../services/ApiService"
import { successMessage } from "../../redux/actions"
import { persistor } from "../.."

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
    title: "Tableau de bohr",
    icon: { name: IconNames.dashboard },
    link: "/app/",
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
interface Sidebarprops {
  showSignlerArret?: boolean
  showContactUs?: boolean
  isDashboard?: boolean
}
export default function Sidebar({
  isDashboard = false,
  showSignlerArret = false,
  showContactUs = false,
}: Sidebarprops) {
  const [toggle, setToggle] = useState(false)
  const [modalArretOpen, setModalArretOpen] = useState(false)
  const [modalContactOpen, setModalContactOpen] = useState(false)
  
  const { currentUser } = useSelector((state: RootStateOrAny) => state.auth)
  const dispatch = useDispatch()

  const NavMenu = isDashboard ? DashboardMenu : ManageusersMenu

  const roles:any={
    'admin':'Administrateur'
  }
  const UserAvatar = (
    <div className="flex items-center">
      <img
        src="/images/Profil picture.png"
        className="w-8 h-8"
        alt="user avatar"
      />
      <div className="ml-3">
        <span className="text-sm font-semibold block">
          {currentUser?.name || ""}
        </span>
        <span className="text-xs font-medium">{Object.keys(roles).includes(currentUser?.role)? roles[currentUser?.role]: currentUser?.role}</span>
      </div>
    </div>
  )

  const handlUserLogin = (res: any, user) => {
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify({...res.data.userInfo, user_id:user.root_id}))
    dispatch(successMessage("Vous etes a present connecté en tant que "+res.data.userInfo.name))
    dispatch(setCurrentUser({...res.data.userInfo, user_id:user.root_id}))
    persistor.flush()
    if (res.data.userInfo.role === "superadmin") navigate("/app/users")
    else navigate("/app/")
  }

  const logedAsUser =  currentUser && currentUser?.name.indexOf(' as ')>0
  const logout =async () => {
    if(logedAsUser){
      const resp = await ApiService.LogoutAsUser()
      handlUserLogin(resp,currentUser)
      window.location.reload()
    }else{
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      dispatch(setCurrentUser(null))
      navigate("/app/")
    }
    
  }
  return (
    <div
      className={`fixed ${toggle ? 'bg-white' :'bg-transparent'} top-0 z-40 h-full ${
        !toggle ? "" : "w-screen"
      }`}
    >
      <ModalArret
        open={modalArretOpen}
        onClose={() => setModalArretOpen(false)}
      />
      <ModalContact
        open={modalContactOpen}
        onClose={() => setModalContactOpen(false)}
      />
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
            className="w-60 bg-white md:flex hidden fixed flex-col justify-between fixed top-0 left-0 h-full  pt-8 pb-0"
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
                        <span className="flex items-center w-4 h-4 justify-center">
                          <Icon name={item.icon.name} />
                        </span>
                        <span className="ml-3 text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </div>

            <div className="sidebar-footer p-4 flex flex-col items-center justify-around gap-5">
              {showSignlerArret && (
                <button
                  className="bg-white border-violet-bohr text-violet-bohr border-2 flex items-center justify-center py-2.5 px-4 rounded-lg"
                  type="button"
                  onClick={() => setModalArretOpen(true)}
                >
                  <Icon color={Colors.primary} name={IconNames.alertCircle} />
                  <span className="ml-2.5 font-semibold text-sm">
                    Signaler un arrtêt
                  </span>
                </button>
              )}
              {showContactUs && (
                <button
                  className="bg-violet-bohr border-none text-white flex items-center justify-center py-2.5 rounded-lg px-4"
                  type="button"
                  onClick={()=>setModalContactOpen(true)}
                >
                  <Icon color="white" name={IconNames.chat} />
                  <span className="ml-2.5 font-semibold text-sm">
                    Contactez-nous
                  </span>
                </button>
              )}

              <Collapse
                accordion
                ghost
                expandIconPosition="end"
                className="side"
                expandIcon={props =>
                  props.isActive ? (
                    <Icon name="arrow-up" />
                  ) : (
                    <Icon name="arrow-down" />
                  )
                }
              >
                <Panel header={UserAvatar} key="1">
                  <p
                    className="py-2 m-0 text-violet-bohr font-semibold cursor-pointer"
                    onClick={logout}
                  >
                    Déconnecter {!!logedAsUser ? ' en tant que '+currentUser.name.split('as')[1] : ''}
                  </p>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      )}

      <Transition
        show={toggle}
        enter="transition duration-250 ease-in-out"
        enterFrom="transform -translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition duration-250 ease-in-out"
        leaveFrom="transform translate-x-0"
        leaveTo="transform -translate-x-full"
        className="bg-violet-menu  text-white flex flex-col items-left sm:text-3xl text-2xl justify-left hover:text-gray-300 absolute z-50 w-full min-h-screen"
        style={{ backgroundColor: "white", color: "black" }}
      >
        <Link
          className="mt-16 mb-16 w-full items-center content-center justify-center"
          to="/"
        >
          <img
            src="/images/bohr_violet.png"
            alt="bohr energie"
            className="md:w-30 md:h-12 sm:w-30 sm:h-12 w-30 h-12 cursor-pointer mx-auto "
          />
        </Link>
        {NavMenu.map(item => (
          <Link
            className="mx-12 mb-8 hover:text-gray-800 text-center"
            to={item.link}
          >
            {item.title}
          </Link>
        ))}

        <p
          className="py-2 m-0 text-violet-bohr font-semibold cursor-pointer text-center md:text-left"
          onClick={logout}
        >
          Déconnecter {!!logedAsUser ? ' en tant que '+currentUser.name.split('as')[1] : ''}
        </p>

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
  )
}
