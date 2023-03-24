import React, { useEffect, useState } from "react"
import { Button, Drawer } from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import SelectDropdown from "../SelectDropdown"
import { Colors, Icon, IconNames } from "../Icon"
import { roles } from "../../utils/constants"
import ApiService from "../../services/ApiService"
import { CircularProgress } from "@material-ui/core"
import { errorNotification, successNotification } from "../../utils"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../../redux/actions/users"
import Passcode from "../registerComponents/Passcode"
import { fetchProducts } from "../../redux/actions/commun"

export interface ModalProps {
  onClose?: () => void
  open: boolean
  data?: any
  isGestion?: boolean
  isEditing?: boolean
}

const ModalProduct = ({
  onClose = undefined,
  open = false,
  data = null,
  isGestion = false,
  isEditing,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({ mode: "onChange", defaultValues: data })
  const { roles, companies } = useSelector(
    (state: RootStateOrAny) => state.commun
  )

  const [loading, setloading] = useState(false)

  const dispatch = useDispatch()

  const onSubmit = async (body: any) => {
    setloading(true)
    try {
      const resp = await ApiService.CreateProduct(body)
      successNotification("Product Saved")
      dispatch(fetchProducts())
      setloading(false)
      reset()
      onClose && onClose()
    } catch (error) {
      setloading(false)
      errorNotification(error?.message)
    }
  }

  return (
    <>
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 465 : "100vw"}
        title={
          <h1 className="font-semibold text-3xl leading-11 ">
              Ajouter un Produit
          </h1>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={() => {
          reset()
          onClose && onClose()
        }}
        open={open}
      >

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>

              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Label
                </label>
                <input
                  {...register("label", { required: "Label is required" })}
                  type="text"
                  placeholder="production"
                  className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                />
                {errors.mail && <ErrorMessage message={errors.mail.message} />}
              </div>

              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Description
                </label>
                <input
                  {...register("description", { required: "Description is required" })}
                  type="text"
                  placeholder="Production Mensuelle"
                  className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                />
                {errors.mail && <ErrorMessage message={errors.mail.message} />}
              </div>

              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Unit
                </label>
                <input
                  {...register("unit", { required: "Unit is required" })}
                  type="text"
                  placeholder="Mwh"
                  className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                />
                {errors.mail && <ErrorMessage message={errors.mail.message} />}
              </div>


              <div className="flex mt-8 space-x-4">
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <button
                    type="submit"
                    className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
                  >
                    {isEditing ? "Modifier" : "Ajouter"}
                  </button>
                )}
              </div>
            </div>
          </form>
        
      </Drawer>
    </>
  )
}
export default ModalProduct
