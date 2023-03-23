import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "gatsby"
import Seo from "../../components/seo"
import Password from "../components/registerComponents/Password"
import ApiService from "../services/ApiService"
import { useDispatch } from "react-redux"
import { errMessage } from "../redux/actions"

function PasswordRecovery(props: { token: string }) {
  const { token } = props
  const [tokenValide, setTokenValide] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    !!token &&
      ApiService.ValidateToken(token)
        .then(res => {
          setLoading(false)
          setTokenValide(!!res)
        })
        .catch(err => {
          console.log("error : ", err)
          setLoading(false)
          dispatch(errMessage("Token non valide"))
        })
  }, [token])

  return (
    <div>
      <Seo title="Bohr Energie | Mot de passe oublié" />
      <div className="flex font-sans sm:static all-Campton">
        <div className="flex-auto">
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
              Mot de passe oublié
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-screen">Loading ..</div>
            ) : !token || !tokenValide ? (
              <div className="flex items-center justify-center mt-4">
                <div className="text-center">
                  <h1 className="text-red-600 text-xl font-bold">Token invalide</h1>
                  <p>Veuillez ressayer avec un nouveau token</p>
                </div>
              </div>
            ) : (
              <Password token={token} />
            )}
          </div>
        </div>
        <div
          className="relative flex-none hidden min-h-screen sm:flex md:w-2/3 w-0"
          style={{ width: "61%" }}
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

export default PasswordRecovery
