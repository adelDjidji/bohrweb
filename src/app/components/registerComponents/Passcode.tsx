import { CircularProgress } from "@material-ui/core"
import React, { useState } from "react"
import OTPInput from "react-otp-input"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import ApiService from "../../services/ApiService"
import { errorNotification } from "../../utils"

function Passcode(props: any) {
  const [OTP, setOTP] = useState("")
  const { handleSubmit, handleback, data, token, phone='' } = props
  const [error, setError] = useState(false)
  const [loading, setloading] = useState(false)

  const handleChange = (OTP: any) => {
    setOTP(OTP)
  }
  const onSubmit = () => {
    if (OTP.length !== 6) {
      setError(true)
    } else {
      setError(false)
      if (data) {
        setloading(true)
        ApiService.Subscribe({ ...data, token, sms_code: OTP })
          .then(res => {
            //res.message
            setloading(false)
            handleSubmit ? handleSubmit() : props.setFormStep(2)
            props.settoken && props.settoken(res.data.token)
          })
          .catch(err => {
            setloading(false)
            console.log(err)
            errorNotification('SMS code invalid')
          })
      }else{
        handleSubmit ? handleSubmit(OTP) : props.setFormStep(2)
      }
    }
  }

  const handleResend = () => {
    setloading(true)
    ApiService.SendSmsAuth(token, phone)
      .then(res => {
        //res.message
        setloading(false)
      })
      .catch(err => {
        setloading(false)
      })
  }

  const style = {
    width: "40px",
    height: "40px",
    border: "2px solid rgba(229, 231, 235, var(--tw-border-opacity))",
    borderRadius: "8px",
    marginRight: "8px",
  }
  return (
    <div>
      <div>
        <label className="block mt-8 mb-2 text-base font-semibold text-gray-900 dark:text-white">
          Saisissez le code reçu par sms
        </label>
        <OTPInput
          onChange={handleChange}
          value={OTP}
          inputStyle={style}
          numInputs={6}
          containerStyle={{justifyContent: props.center ? 'center' : 'left'}}
          focusStyle="focus:ring-primary-600 focus:border-primary-600"
        />
        {error && <ErrorMessage message="OTP is required" />}
      </div>
      <label
        onClick={props.handleResend ? props.handleResend : handleResend}
        className="cursor-pointer block mt-3 mb-2 text-sm font-semibold text-violet-bohr dark:text-white"
      >
        Renvoyer le code
      </label>
      <div className={`flex mt-8 space-x-4 ${props.center ? 'justify-center' : ''}`}>
        <button
          type="button"
          className="inline-block px-4 py-3 text-sm font-semibold leading-tight text-violet-bohr bg-transparent border-2 border-violet-bohr rounded-lg shadow-md outline-none focus:shadow-lg focus:ring-0 active:bg-violet-bohr active:shadow-lg"
          onClick={() => (handleback ? handleback() : props.setFormStep(0))}
        >
          Retour
        </button>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <button
            type="submit"
            className="inline-block bg-violet-bohr px-4 py-3 text-sm font-semibold leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-bohr active:shadow-lg"
            onClick={() => onSubmit()}
          >
            Valider
          </button>
        )}
      </div>
    </div>
  )
}

export default Passcode
