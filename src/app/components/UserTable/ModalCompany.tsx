import React, { useState } from "react"
import { Button, Drawer } from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import SelectDropdown from "../SelectDropdown"
import { Icon, IconNames } from "../Icon"
import { ModalProps } from "./ModalUser"


const ModalCompany = ({ onClose, open = false }:ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" })

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const handleChangeGroupe = (val:any) => {}

  return (
    <>
      <Drawer
        className="user-drawer"
        width={465}
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
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.siren && <ErrorMessage message={errors.siren.message} />}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Adresse
              </label>
              <input
                {...register("adresse", { required: "Adresse is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.adresse && (
                <ErrorMessage message={errors.adresse.message} />
              )}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                TVA
              </label>
              <input
                {...register("tva", { required: "TVA is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.tva && <ErrorMessage message={errors.tva.message} />}
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Raison sociale
              </label>
              <input
                {...register("raison_sociale", {
                  required: "Raison sociale is required",
                })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.raison_sociale && (
                <ErrorMessage message={errors.raison_sociale.message} />
              )}
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Nom représentant légal
              </label>
              <input
                {...register("representant_nom", {
                  required: "Nom représentant légal is required",
                })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.representant_nom && (
                <ErrorMessage message={errors.representant_nom.message} />
              )}
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Prénom représentant légal
              </label>
              <input
                {...register("representant_prenom", {
                  required: "Prénom représentant légal is required",
                })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.representant_prenom && (
                <ErrorMessage message={errors.representant_prenom.message} />
              )}
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Groupe
              </label>
              <SelectDropdown
                placeholder="Sélectionner une entreprise"
                type="radio"
                width={260}
                items={[
                  { key: "Group1", value: "Group1" },
                  { key: "Group2", value: "Group2" },
                ]}
                onSelect={handleChangeGroupe}
                FooterComponent={<FormAddGroup submit={()=>{}} />}
                footerClickExitEvent={false}
              />
            </div>

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" })

  const onSubmit = (data: any) => {
    console.log(data)
    setformOpen(false)
    submit && submit(data) 
  }
  return (
    <div>
      {formOpen ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex space-x-4 items-end">
              <div>
                <label className="block mt-2 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Nom du groupe
                </label>
                <input
                  {...register("group_name", {
                    required: "Nom du groupe is required",
                  })}
                  type="text"
                  className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                />
                {errors.group_name && (
                  <ErrorMessage message={errors.group_name.message} />
                )}
              </div>
              <button
                type="submit"
                className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
              >
                Ajouter
              </button>
            </div>
          </div>
        </form>
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
