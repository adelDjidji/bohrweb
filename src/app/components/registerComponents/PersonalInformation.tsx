import { CircularProgress } from "@material-ui/core"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage, isMobileNumber } from "../../../helpers/FormHelpers"
import { PhoneCodes } from "../../../helpers/PhoneCodes"
import ApiService from "../../services/ApiService"

type FormValues = {
  name: string
  lastname: string
  phone: string
}
function PersonalInformation(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: "onChange" })

  const { token } = props
  const [phoneCode, setphoneCode] = useState("+33")
  const [loading, setloading] = useState(false)

  const isValidPhoneNumber = (e: any) => {
    if (!e || isMobileNumber(e)) {
      return true
    }
    return "Phone Number is invalid"
  }

  const handlePhoneCodeChange = e => {
    let val = e.target.value
    setphoneCode(val)
  }
  const onSubmit = (data: any) => {
    let values = { ...data, phone: phoneCode + data.phone }
    props.setFormStep(1)
    props.setValues(values)
    setloading(true)
    ApiService.SendSmsAuth(token, values.phone)
      .then(res => {
        const message = res.data.message
        setloading(false)
      })
      .catch(err => {
        console.log(err)
        setloading(false)
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label className="block mt-8 mb-2 text-base font-semibold text-gray-900 dark:text-white">
            Nom
          </label>
          <input
            {...register("name", { required: "First Name is required" })}
            type="text"
            className=" border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
          />
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </div>
        <div>
          <label className="block mt-8 mb-2 text-base font-semibold text-gray-900 dark:text-white">
            Prénom
          </label>
          <input
            {...register("lastname", { required: "Last Name is required" })}
            type="text"
            className=" border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
          />
          {errors.lastname && (
            <ErrorMessage message={errors.lastname.message} />
          )}
        </div>
        <div>
          <label className="block mt-8 mb-2 text-base font-semibold text-gray-900 dark:text-white">
            Téléphone
          </label>
          <div className="flex">
            <select
              defaultValue={"+33"}
              onChange={handlePhoneCodeChange}
              className="inline-flex items-center px-1 text-sm text-gray-900 bg-transparent border-2 border-r-0 border-gray-200 appearance-none w-15 border-r-none rounded-l-md focus:outline-none"
            >
              {PhoneCodes.map(code => (
                <option value={code.dial_code}>
                  &nbsp;&nbsp;{code.flag}&nbsp;{code.dial_code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone Number is required",
                validate: isValidPhoneNumber,
              })}
              className="rounded-none rounded-r-lg border-l-0 border-2 text-gray-900 block flex-1 min-w-0 w-60 text-sm border-gray-200 p-2.5  dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
            />
          </div>
          {errors.phone && <ErrorMessage message={errors.phone.message} />}
        </div>
        <div className="flex mt-8 space-x-4">
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <button
              type="submit"
              className="inline-block bg-violet-bohr px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default PersonalInformation
