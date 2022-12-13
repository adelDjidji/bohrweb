import { useState, useEffect } from "react"
import { Transition } from "@headlessui/react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const { t, i18n } = useTranslation()

  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="absolute bg-transparent top-0 z-40 w-full">
      {!toggle && (
        <nav className="bg-transparent flex items-center justify-between w-full py-5 lg:px-20 md:px-2 px-4"  style={{paddingRight:'1em'}}>
          
          {/*<div className="md:flex hidden">
            <div className="dropdown inline-block relative">
              <button className="text-white font-semibold py-2 px-2 rounded inline-flex items-center">
                <span className="mr-1">{i18n.language}</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul
                className="dropdown-menu absolute hidden text-gray-700 pt-1 bg-white"
                style={{ padding: "3pt 8pt", borderRadius: "5pt" }}
              >
                <li className="">
                  <button
                    onClick={() => changeLanguageHandler("fr")}
                    className="rounded-full bg-contain border w-10 h-10 border-black hover:bg-gray-400 mr-10 md:mr-5"
                  >
                    Fr
                  </button>
                </li>
                <li className="">
                  <button
                    onClick={() => changeLanguageHandler("en")}
                    className="rounded-full bg-cover bg-no-repeat border w-10 h-10 border-black hover:bg-gray-400"
                  >
                    En
                  </button>
                </li>
              </ul>
            </div>
          </div>*/}
          
          <label htmlFor="open__menu" className="text-white md:hidden block sm:ml-8">
            <svg className="fill-current sm:h-6 sm:w-6 h-4 w-4" id="dots-vertical-icon--even" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </label>
          
          <input type="checkbox" id="open__menu" className="hidden" onClick={() => setToggle(!toggle)}/>

          <Link className="sm:mr-8" to="/">
            <img
              src="./bohr.png"
              alt="bohr energie"
              className="md:w-30 md:h-12 sm:w-28 sm:h-12 w-20 h-8 cursor-pointer"
            />
          </Link>
         
          <div className={"text-sm md:flex hidden"} style={{ position: "absolute", right: "5em" }}>
            <ul className="flex items-center hover:text-gray-300">
              <li className="text-white hover:text-gray-800">
                <Link to="/key-benefits">{t("navBar.keyBenefits")}</Link>
              </li>
              <li className="ml-8 text-white hover:text-gray-800">
                <Link to="/beliefs">{t("navBar.beliefs")}</Link>
              </li>
              <li className="ml-8 text-white hover:text-gray-800">
                <Link to="/our-services">{t("navBar.contactUs")}</Link>
              </li>
              <li className="ml-8 text-white hover:text-gray-800">
                |
              </li>
              <li className="ml-8 text-white hover:text-gray-800">
                <Link to="/beliefs">{t("navBar.clientSpace")}</Link>
              </li>
            </ul>
            
          </div>
        </nav>
      )}
      
      <Transition
        show={toggle}
        enter="transition duration-250 ease-in-out"
        enterFrom="transform -translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition duration-250 ease-in-out"
        leaveFrom="transform translate-x-0"
        leaveTo="transform -translate-x-full"
        className="bg-violet-menu  text-white flex flex-col items-left sm:text-3xl text-2xl justify-left hover:text-gray-300 absolute z-50 w-full h-screen"
      >
       
        <Link className="mt-16 w-full items-center content-center justify-center" to="/">
            <img
              src="./bohr.png"
              alt="bohr energie"
              className="md:w-30 md:h-12 sm:w-30 sm:h-12 w-30 h-12 cursor-pointer mx-auto "
            />
        </Link>

        <Link className="mx-12 mt-24 mb-8 hover:text-gray-800" to="/key-benefits">
          {t("navBar.keyBenefits")}
        </Link>

        <Link className="mx-12 my-6 hover:text-gray-800" to="/beliefs">
          {t("navBar.beliefs")}
        </Link>
        
        <Link className="mx-12 my-6 hover:text-gray-800" to="/our-services">
          {t("navBar.contactUs")}
        </Link>

        <div className=" mx-8 my-8 border border-gray-6f"></div>

        <Link className="mx-12 my-6 hover:text-gray-800" to="/app">
          {t("navBar.clientSpace")}
        </Link>
        
        
        {/*<div
              className="p-10"
              // style={{ position: "absolute", top: -8, right: "-2em" }}
            >
              <div className="dropdown inline-block relative">
                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                  <span className="mr-1">{i18n.language}</span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                  </svg>
                </button>
                <ul
                  className="dropdown-menu absolute hidden text-gray-700 pt-1 bg-white"
                  // style={{ padding: "3pt 8pt", borderRadius: "5pt" }}
                >
                  <li className="">
                    <button
                      onClick={() => changeLanguageHandler("fr")}
                      className="rounded-full bg-contain border w-10 h-10 border-black hover:bg-gray-400 mr-10 md:mr-5"
                    >
                      Fr
                    </button>
                  </li>
                  <li className="">
                    <button
                      onClick={() => changeLanguageHandler("en")}
                      className="rounded-full bg-cover bg-no-repeat border w-10 h-10 border-black hover:bg-gray-400"
                    >
                      En
                    </button>
                  </li>
                </ul>
              </div>
        </div>*/}

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
export default Navbar
