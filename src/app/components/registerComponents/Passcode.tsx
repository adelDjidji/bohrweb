import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { ErrorMessage } from "../../../helpers/FormHelpers";

function Passcode(props: any) {
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (OTP: any) => {
    setOTP(OTP);
  };
  const onSubmit = () => {
    if (OTP.length !== 6) {
      setError(!error);
    } else {
      setError(!error);
      console.log(OTP);
      props.setFormStep(2)
    }
  }
  const style = { width: "40px", height: "40px", border: "2px solid rgba(229, 231, 235, var(--tw-border-opacity))", borderRadius: "8px", marginRight: "8px" };
  return (
    <div>
      <div>
        <label className="block mt-8 mb-2 text-base font-semibold text-gray-900 dark:text-white">Saisissez le code reçu par sms</label>
        <OTPInput onChange={handleChange} value={OTP} inputStyle={style} numInputs={6} focusStyle="focus:ring-primary-600 focus:border-primary-600" />
        {error && <ErrorMessage message="OTP is required" />}
      </div>
      <label className="block mt-3 mb-2 text-sm font-semibold text-violet-bohr dark:text-white">Renvoyer le code</label>
      <div className="flex mt-8 space-x-4">
        <button type="button" className="inline-block px-4 py-3 text-sm font-semibold leading-tight text-violet-bohr bg-transparent border-2 border-violet-bohr rounded-lg shadow-md outline-none focus:shadow-lg focus:ring-0 active:bg-violet-bohr active:shadow-lg" onClick={() => props.setFormStep(0)}>
          Retour
        </button>
        <button type="submit" className="inline-block bg-violet-bohr px-4 py-3 text-sm font-semibold leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-bohr active:shadow-lg" onClick={() => onSubmit()}>
          Valider
        </button>
      </div>
    </div>
  );
}

export default Passcode;