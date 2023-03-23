import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "gatsby"
import { ErrorMessage, isMobileNumber } from "../../helpers/FormHelpers"
import Seo from "../../components/seo"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import formValidation, { fieldsValidation } from "../utils/formValidation"
import ApiService from "../services/ApiService"
import { errMessage, successMessage } from "../redux/actions"
import { CircularProgress } from "@material-ui/core"
import { setCurrentUser } from "../redux/actions/auth"
import { navigate } from "@reach/router"
import { persistor } from ".."
// import { redirect } from "react-router-dom";

type FormValues = {
  username: string
  password: string
}

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({ mode: "onChange" })

  const [show, setShow] = useState(false) // show password
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const {currentUser} = useSelector((state: RootStateOrAny) => state.auth)

  useEffect(() => {
    // if(!!currentUser) navigate('/app/') 
  }, [currentUser])
  

  const handleValidation = () => {
    const username = getValues("username")
    const password = getValues("password")
    return (
      username.length > 0 &&
      !formValidation("email", username, fieldsValidation) &&
      password.length >= 6
    )
  }
  const handleKeyPress = (e: any) => {
    if (/enter/gi.test(e.key) && handleValidation()) {
      onSubmit(getValues())
    }
  }

  const handlUserLogin = (res:any)=>{
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.userInfo))
    dispatch(successMessage("Vous etes a present connecté"))
    dispatch(setCurrentUser(res.data.userInfo))
    persistor.flush()
    setIsLoading(false)
    if(res.data.userInfo.role==='superadmin') navigate("/users")
    else navigate("/")
  }

  const onSubmit = (data: any) => {
    const { username, password } = data
    setIsLoading(true)
    ApiService.Login({ username, password })
      .then(res => {
        if (res.data.token !== undefined) {
          handlUserLogin(res)
        } else {
          dispatch(errMessage(res.data.info.message))
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log("error : ", err)
        dispatch(errMessage(err.response.data.message))
        setIsLoading(false)
      })
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
                    {...register("username", { required: "Email is required" })}
                    type="email"
                    placeholder="adresse@exemple.com"
                    className=" border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  />
                  {errors.username && (
                    <ErrorMessage message={errors.username.message} />
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
                      className="rounded-none rounded-l-lg border-r-0 border-2 text-dark-grey block flex-1 min-w-0 w-60 text-sm border-gray-200 hover:border-violet-bohr p-2.5  dark:bg-gray-700  focus:outline-none"
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
                    <Link to="/forget-password">Mot de passe oublié?</Link>
                  </label>
                </div>
                <div className="flex mt-8 space-x-4">
                  {isLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <button
                      type="submit"
                      className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
                    >
                      Me connecter
                    </button>
                  )}
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
