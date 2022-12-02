import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Passcode from "../components/registerComponents/Passcode";
import Password from "../components/registerComponents/Password";
import PersonalInformation from "../components/registerComponents/PersonalInformation";
import { ErrorMessage, isMobileNumber } from "../helpers/FormHelpers";
import { PhoneCodes } from "../helpers/PhoneCodes";

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  code: string;
};
function register() {
  const [formStep, setFormStep] = useState(0);

  return (
    <div>
      <div className="flex font-sans sm:static">
        <div className="flex-auto">
          <div className="flex flex-wrap justify-between m-7">
            <img src="./bohr.png" width="101px" height="43px"></img>
            {formStep === 2 && <label className="block float-right mt-3 mb-2 text-xs font-semibold text-blue-600 dark:text-white">Renvoyer le code</label>}
          </div>
          <br />
          <br />
          <div className="container grid justify-center align-middle">
            <div className="text-3xl font-semibold text-gray-900 mt-30">Créez votre compte</div>
            {formStep === 0 && <PersonalInformation setFormStep = {setFormStep} />}
            {formStep === 1 && <Passcode setFormStep = {setFormStep} />}
            {formStep === 2 && <Password setFormStep = {setFormStep} />}
          </div>
        </div>
        <div className="relative flex-none hidden h-screen sm:flex" style={{ width: "61%" }}>
          <img src="./images/windFarm_banner.jpg" alt="" className="absolute inset-0 object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default register;
