import React, { useEffect, useState } from "react"
import Passcode from "../components/registerComponents/Passcode"
import Password from "../components/registerComponents/Password"
import PersonalInformation from "../components/registerComponents/PersonalInformation"
import { Link } from "gatsby"
import Seo from "../../components/seo"
import ApiService from "../services/ApiService"
import { errMessage } from "../redux/actions"
import { useDispatch } from "react-redux"

function register(props) {
  const [formStep, setFormStep] = useState(0)
  const [tokenValide, setTokenValide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, settoken] = useState(props.token)
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

  const [values, setValues] = useState({})
  const handleValues = (val: any) => {
    setValues(v => ({ ...v, ...val }))
  }

  return (
    <div>
      <Seo title="Bohr Energie | Inscription" />
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
            {formStep === 2 && (
              <label className="block float-right mt-3 mb-2 text-sm text-violet-bohr dark:text-white">
                <Link to="/">Revenir au site</Link>
              </label>
            )}
          </div>
          <br />
          <br />
          <div className="container grid justify-center align-middle">
            <div className="text-3xl font-semibold text-gray-900 mt-30">
              Créez votre compte
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-screen">Loading ..</div>
            ) : !token || !tokenValide ? (
              <div className="flex items-center justify-center mt-4">
                <div className="text-center">
                  <h1 className="text-red-600 text-xl font-bold">
                    Token invalide
                  </h1>
                  <p>Veuillez ressayer avec un nouveau token</p>
                </div>
              </div>
            ) : (
              <div>
                {formStep === 0 && (
                  <PersonalInformation
                    token={token}
                    phone={values?.phone}
                    setValues={handleValues}
                    setFormStep={setFormStep}
                  />
                )}
                {formStep === 1 && (
                  <Passcode
                    token={token}
                    phone={values?.phone}
                    data={values}
                    setFormStep={setFormStep}
                    settoken={(t)=>settoken(t)}
                  />
                )}
                {formStep === 2 && (
                  <Password token={token} setFormStep={setFormStep} />
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="relative flex-none hidden h-screen sm:flex"
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

export default register
