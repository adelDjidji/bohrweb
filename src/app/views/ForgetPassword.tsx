import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "gatsby"
import Seo from "../../components/seo"
import Password from "../components/forgetPasswordComponents/Password";
import EmailInformation from "../components/forgetPasswordComponents/EmailInformation";

type FormValues = {
  email: string
  password: string
}

function forgetPassword() {
  const [formStep, setFormStep] = useState(0);

  return (
    <div>
      <Seo title="Bohr Energie | Mot de passe oublié"/>
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
            {formStep === 0 && <EmailInformation setFormStep = {setFormStep} />}
            {formStep === 1 && <Password setFormStep = {setFormStep} />}
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

export default forgetPassword
