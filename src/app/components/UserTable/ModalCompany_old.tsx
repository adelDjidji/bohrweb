import React, { useEffect, useState } from "react"
import { Button, Drawer } from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import SelectDropdown from "../SelectDropdown"
import { Icon, IconNames } from "../Icon"
import { ModalProps } from "./ModalUser"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import ApiService from "../../services/ApiService"
import { errorNotification, successNotification } from "../../utils"
import { fetchCompanies, loadGroups } from "../../redux/actions/commun"

const ModalCompany = ({ onClose, open = false }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ mode: "onChange" })

  const { groups } = useSelector((state: RootStateOrAny) => state.commun)
  const { currentUser } = useSelector((state: RootStateOrAny) => state.auth)
  const dispatch = useDispatch()

  const [selectedGroup, setselectedGroup] = useState()
  const onSubmit = async (data: any) => {
    try {
      const resp = await ApiService.CreateCompany(data)
      successNotification(resp.data.message)
      dispatch(fetchCompanies())
      reset()
      onClose && onClose()
    } catch (error) {
      errorNotification(error.response.data.message)
    }
  }

  const handleChangeGroupe = (val: any) => {
    setValue("group", val.public_id)
    setselectedGroup(val)
  }
  const handleNewGroup = async (name: string) => {
    try {
      const resp = await ApiService.CreateGroup({ name })
      dispatch(loadGroups())
    } catch (error) {
      console.log(error)
      errorNotification(error.response.data.message)
    }
  }



  return (
    <>
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 465 : "100vw"}
        title={
          <h1 className="font-semibold text-3xl leading-11 ">
            Ajouter une entreprise
          </h1>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                SIREN
              </label>
              <input
                {...register("siren", { required: "SIREN is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"

              />
              {errors.siren && <ErrorMessage message={errors.siren.message} />}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Adresse
              </label>
              <input
                {...register("address", { required: "Adresse is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.address && (
                <ErrorMessage message={errors.address.message} />
              )}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Ville
              </label>
              <input
                {...register("city", { required: "Ville is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.city && <ErrorMessage message={errors.city.message} />}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Code postal
              </label>
              <input
                {...register("postal_code", { required: "Ville is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.postal_code && (
                <ErrorMessage message={errors.postal_code.message} />
              )}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Pays
              </label>
              <input
                {...register("country", { required: "Pays is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.country && (
                <ErrorMessage message={errors.country.message} />
              )}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                TVA
              </label>
              <input
                {...register("tva", { required: "TVA is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.tva && <ErrorMessage message={errors.tva.message} />}
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Raison sociale
              </label>
              <input
                {...register("name", {
                  required: "Raison sociale is required",
                })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Nom représentant légal
              </label>
              <input
                {...register("legal_representative_name", {
                  required: "Nom représentant légal is required",
                })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.legal_representative_name && (
                <ErrorMessage
                  message={errors.legal_representative_name.message}
                />
              )}
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Prénom représentant légal
              </label>
              <input
                {...register("legal_representative_lastname", {
                  required: "Prénom représentant légal is required",
                })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.legal_representative_lastname && (
                <ErrorMessage
                  message={errors.legal_representative_lastname.message}
                />
              )}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Contact mail
              </label>
              <input
                {...register("contact_mail", {
                  required: "Contact mail is required",
                })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.contact_mail && (
                <ErrorMessage message={errors.contact_mail.message} />
              )}
            </div>
            {currentUser?.role == "superadmin" && (
              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Groupe
                </label>
                <SelectDropdown
                  placeholder="Sélectionner un groupe"
                  type="radio"
                  width={260}
                  keyAttribute="public_id"
                  valueAttribute="name"
                  items={groups}
                  defaultValue={selectedGroup}
                  onSelect={handleChangeGroupe}
                  FooterComponent={<FormAddGroup submit={handleNewGroup} />}
                  footerClickExitEvent={false}
                />
              </div>
            )}

            <div className="flex mt-8 space-x-4">
              <button
                type="submit"
                className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
              >
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </Drawer>
    </>
  )
}
export default ModalCompany

const FormAddGroup = ({ submit }) => {
  const [formOpen, setformOpen] = useState(false)
  const [name, setname] = useState("")

  const onSubmit = () => {
    if (name.trim() !== "") {
      setformOpen(false)
      submit && submit(name)
      setname("")
    }
  }

  return (
    <div>
      {formOpen ? (
        <div>
          <div className="flex space-x-4 items-end">
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Nom du groupe
              </label>
              <input
                type="text"
                onChange={e => setname(e.target.value)}
                value={name}
                className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>
            <button
              onClick={onSubmit}
              className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
            >
              Ajouter
            </button>
          </div>
        </div>
      ) : (
        <Button
          className="flex items-center gap-2.5 px-1"
          type="link"
          icon={<Icon color="#5819F1" name={IconNames.plusCircle} />}
          onClick={() => setformOpen(true)}
        >
          <span className="text-violet-bohr font-semibold	">
            Ajouter un groupe
          </span>
        </Button>
      )}
    </div>
  )
}
