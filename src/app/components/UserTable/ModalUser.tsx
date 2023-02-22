import React, { useEffect, useState } from "react"
import { Button, Drawer } from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import SelectDropdown from "../SelectDropdown"
import { Colors, Icon, IconNames } from "../Icon"
import ModalCompany from "./ModalCompany"
import { roles } from "../../utils/constants"
import ApiService from "../../services/ApiService"
import { CircularProgress } from "@material-ui/core"
import { errorNotification, successNotification } from "../../utils"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../../redux/actions/users"
import Passcode from "../registerComponents/Passcode"

export const SITES = [
  { key: "Assigny", value: "Assigny" },
  { key: "Orlu", value: "Orlu" },
  { key: "Rivesaltes", value: "Rivesaltes" },
  { key: "Salles-Curan", value: "Salles-Curan" },
  { key: "Harcanville", value: "Harcanville" },
  { key: "Tous les sites", value: "Tous les sites" },
]

export interface ModalProps {
  onClose?: () => void
  open: boolean
  data?: any
  isGestion?: boolean
  isEditing?: boolean
}
const ModalUser = ({
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

  const [modalCompanyOpen, setModalCompanyOpen] = useState(false)
  const [data_, setdata] = useState(data)
  const [loading, setloading] = useState(false)
  const [listSites, setlistSites] = useState([])
  const [showOTP, ShowOTP] = useState(false)

  const dispatch = useDispatch()

  const sendSms = async callbackSuccess => {
    try {
      const resp = await ApiService.SendSmsVerification()
      if (resp.status == 200) {
        successNotification(resp.data.message)
        callbackSuccess && callbackSuccess()
      }
    } catch (error) {
      errorNotification(error.response.data.message)
    }
  }

  const onSubmit = async (body: any) => {
    setloading(true)
    try {
      if (isGestion) {
        ShowOTP(true)
        setdata(body)
        sendSms(() => setloading(false))
        return
      }
      if (!isEditing) {
        // empty form
        const resp = await ApiService.InviteUser(body)
        successNotification("Invitaion avec succès")
      } else {
        // prefilled form
        const resp = await ApiService.ModifyUser(body)
        successNotification("Modificaiton avec succès")
      }
      dispatch(fetchUsers())
      setloading(false)
      reset()
      onClose && onClose()
    } catch (error) {
      setloading(false)
      errorNotification(error?.message)
    }
  }

  const loadSites = async (company: string) => {
    const list_sites = await ApiService.GetSites(company)
    setlistSites(list_sites.data)
  }
  const handleChangeCompany = (com: any) => {
    // if (!companies.length) return
    // let com = companies[0]
    setValue("company", com.public_id)
    loadSites(com.public_id)
    setdata({ ...data_, company: com.public_id })
    //setdata({ ...data_, company: com.public_id, entreprise: com.name })
  }
  const handleChangeRole = (role: any) => {
    // if (!roles.length) return
    // let role = roles[0]
    setValue("role", role?.key)
    setdata({ ...data_, role: role?.key })
  }
  const handleChangeSite = (sites: any) => {
    setValue(
      "sites",
      sites.map(i => i.name)
    )
  }

  const handleSubmitPasscode = async () => {

    try {
      const resp = await ApiService.InviteUser(data_)
      successNotification(resp.data.message)
      if(resp.status==200){
        reset()
        setdata(null)
        ShowOTP(false)
        onClose && onClose()
      }
      
    } catch (error) {
      errorNotification(error.response.data.message)
    }
  }
  useEffect(() => {
    setdata(data)
    if (!!data) {
      setValue("mail", data.email)
    }
  }, [data])

  // useEffect(() => {
  // console.log('hello', data,open)
  // if(open){
  //   setisEditing(!!data)
  // }else{
  //   setdata(null)
  // }
  // }, [open])

  return (
    <>
      <ModalCompany
        onClose={() => {
          setModalCompanyOpen(false)
        }}
        open={modalCompanyOpen}
      />
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 465 : "100vw"}
        title={
          <h1 className="font-semibold text-3xl leading-11 ">
            {showOTP
              ? "Confirmer l’ajout utilisateur"
              : isEditing
              ? "Modifier un utilisateur"
              : "Ajouter un utilisateur"}
          </h1>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={() => {
          reset()
          setdata(null)
          ShowOTP(false)
          onClose && onClose()
        }}
        open={open}
      >
        {showOTP ? (
          <Passcode
            handleSubmit={handleSubmitPasscode}
            handleback={() => ShowOTP(false)}
            handleResend={sendSms}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Entreprise
                </label>
                <SelectDropdown
                  placeholder="Sélectionner une entreprise"
                  width={260}
                  items={companies}
                  keyAttribute="public_id"
                  valueAttribute="name"
                  onSelect={handleChangeCompany}
                  defaultValue={data_ ? data_.company : null}
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
                  type={"radio"}
                  footerClickExitEvent={true}
                />
              </div>
              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Email
                </label>
                <input
                  {...register("mail", { required: "Email is required" })}
                  type="email"
                  placeholder="adresse@exemple.com"
                  defaultValue={data_?.email}
                  className="h-10 w-64 border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                />
                {errors.mail && <ErrorMessage message={errors.mail.message} />}
              </div>
              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Rôle
                </label>
                <SelectDropdown
                  placeholder="Sélectionner un rôle"
                  type="radio"
                  width={260}
                  items={roles}
                  onSelect={handleChangeRole}
                  defaultValue={data_ ? data_.role : null}
                />
              </div>

              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Site
                </label>
                <SelectDropdown
                  placeholder="Sélectionner un site"
                  width={260}
                  items={listSites}
                  keyAttribute="public_id"
                  valueAttribute="name"
                  onSelect={handleChangeSite}
                  defaultValues={
                    isEditing
                      ? data_?.sites?.split(",").map((s: string) => ({
                          key: s.trim(),
                          value: s.trim(),
                        }))
                      : []
                  }
                />
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
        )}
      </Drawer>
    </>
  )
}
export default ModalUser
