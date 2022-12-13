import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "gatsby"
import { ErrorMessage, isMobileNumber } from "../../helpers/FormHelpers"
import Seo from "../../components/seo"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

type FormValues = {
  email: string
  password: string
}

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: "onChange" })

  const [show, setShow] = useState(false) // show password

  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div>
      <Seo title="Bohr Energie | Connexion" />
      <div className="flex font-sans sm:static  min-h-screen all-Campton">
        <div className="flex-auto flex flex-col justify-between">
          <div className="flex flex-wrap justify-between m-7">
            <Link to="/">
              <img
                src="/images/bohr_violet.png"
                width="101px"
                height="43px"
              ></img>
            </Link>

            <label className="block float-right mt-3 mb-2 text-sm text-violet-bohr dark:text-white">
              <Link to="/">Revenir au site</Link>
            </label>
          </div>
          <br />
          <br />
          <div className="container grid justify-center align-middle">
            <div className="text-3xl font-semibold text-dark-grey mt-30">
              Connexion
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div>
                  <label className="block mt-8 mb-2 text-sm font-semibold text-dark-grey dark:text-white">
                    Email
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="adresse@exemple.com"
                    className=" border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  />
                  {errors.email && (
                    <ErrorMessage message={errors.email.message} />
                  )}
                </div>
                <div>
                  <label className="block mt-8 mb-2 text-sm font-semibold text-dark-grey dark:text-white">
                    Mot de passe
                  </label>
                  <div className="flex">
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type={show ? "text" : "password"}
                      className="rounded-none rounded-l-lg border-r-0 border-2 text-dark-grey block flex-1 min-w-0 w-60 text-sm border-gray-200 p-2.5  dark:bg-gray-700  focus:outline-none"
                    />
                    <span
                      className="inline-flex items-center px-1 text-sm text-dark-grey bg-transparent border-2 border-l-0 border-gray-200 rounded-r-lg appearance-none w-15 border-l-none focus:outline-none"
                      onClick={() => setShow(!show)}
                    >
                      <div className="mr-1">
                        {!show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </div>
                    </span>
                  </div>
                  {errors.password && (
                    <ErrorMessage message={errors.password.message} />
                  )}
                </div>
                <div>
                  <label className="block mt-3 mb-2 text-sm font-semibold text-violet-bohr dark:text-white underline">
                    <Link to="/app/forget-password">Mot de passe oublié?</Link>
                  </label>
                </div>
                <div className="flex mt-8 space-x-4">
                  <button
                    type="submit"
                    className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
                  >
                    Me connecter
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="bg-gray-bg min-h-44 mt-36 py-10 px-14">
            <div className="flex">
              <div className="w-2/3">
                <b className="block text-dark-grey text-base mb-2 font-bold">
                  Découvrez Bohr Energies
                </b>
                <p className="text-sm text-gray-6f mb-2">
                  Améliorez la rentabilité de vos unités de production en les
                  connectant au marché libre de l’énergie.
                </p>
                <Link className="text-violet-bohr text-sm font-bold" to="">
                  Demander une demo
                </Link>
              </div>
              <div className="w1/3 flex items-center">
                <img
                  src="/images/chat2.jpg"
                  alt="chat icon"
                  width={136}
                  height={72}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ width: "61%" }}
          className="relative flex-none hidden sm:flex md:w-2/3 w-0"
        >
          <img
            src="/images/windFarm_banner.jpg"
            alt=""
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default login
