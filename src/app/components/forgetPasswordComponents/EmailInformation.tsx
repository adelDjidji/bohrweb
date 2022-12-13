import React from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage, isMobileNumber } from "../../../helpers/FormHelpers"
import { Link } from "gatsby"

type FormValues = {
  email: string
}
function EmailInformation(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: "onChange" })

  const onSubmit = (data: any) => {
    console.log(data)
    props.setFormStep(1)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label className="block mt-8 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="adresse@exemple.com"
            className=" border-2 border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <div className="flex mt-8 space-x-4">
          <Link to="/login">
            <button
              type="button"
              className="inline-block px-4 py-3 text-sm font-semibold leading-tight text-violet-bohr bg-transparent border-2 border-violet-bohr rounded-lg shadow-md outline-none focus:shadow-lg focus:ring-0 active:bg-violet-bohr active:shadow-lg"
              onClick={() => props.setFormStep(0)}
            >
              Retour
            </button>
          </Link>

          <button
            type="submit"
            className="inline-block bg-violet-bohr px-4 py-3 text-sm font-semibold leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-bohr active:shadow-lg"
          >
            Valider
          </button>
        </div>
      </div>
    </form>
  )
}

export default EmailInformation
