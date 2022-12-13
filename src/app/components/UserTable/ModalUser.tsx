import React, { useState } from "react"
import { Button, Drawer } from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import SelectDropdown from "../SelectDropdown"
import { Colors, Icon, IconNames } from "../Icon"
import ModalCompany from "./ModalCompany"

export interface ModalProps {
  onClose?: () => void
  open: boolean
}
const ModalUser = ({ onClose = undefined, open = false }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" })
  const [modalCompanyOpen, setModalCompanyOpen] = useState(false)

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const handleChangeCompany = (companies: any) => {}
  const handleChangeRole = (roles: any) => {}
  const handleChangeSite = (sites: any) => {}

  return (
    <>
      <ModalCompany
        onClose={() => setModalCompanyOpen(false)}
        open={modalCompanyOpen}
      />
      <Drawer
        className="user-drawer"
        width={465}
        title={
          <h1 className="font-semibold text-3xl leading-11 ">
            Ajouter un utilisateur
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
                Entreprise
              </label>
              <SelectDropdown
                placeholder="Sélectionner une entreprise"
                width={260}
                items={[{ key: "Acme", value: "Acme" }]}
                onSelect={handleChangeCompany}
                FooterComponent={
                  <Button
                    className="flex items-center gap-2.5 px-1"
                    type="link"
                    icon={
                      <Icon
                        color={Colors.primary}
                        name={IconNames.plusCircle}
                      />
                    }
                    onClick={() => setModalCompanyOpen(true)}
                  >
                    <span className="text-violet-bohr font-semibold	">
                      Ajouter une entreprise
                    </span>
                  </Button>
                }
                type={"checkbox"}
                footerClickExitEvent={true}
              />
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Nom
              </label>
              <input
                {...register("nom", { required: "Nom is required" })}
                type="text"
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.nom && <ErrorMessage message={errors.nom.message} />}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="adresse@exemple.com"
                className="h-10 w-64 border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Rôle
              </label>
              <SelectDropdown
                placeholder="Sélectionner un rôle"
                width={260}
                items={[
                  { key: "Admin", value: "Admin" },
                  { key: "Editeur", value: "Editeur" },
                  { key: "Visiteur", value: "Visiteur" },
                ]}
                onSelect={handleChangeRole}
              />
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Site
              </label>
              <SelectDropdown
                placeholder="Sélectionner un site"
                width={260}
                items={[
                  { key: "Site01", value: "Site 01" },
                  { key: "Site02", value: "Site 02" },
                  { key: "Site03", value: "Site 03" },
                ]}
                onSelect={handleChangeSite}
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
export default ModalUser
