import React, { useEffect, useState } from "react"
import { Button, Drawer } from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../helpers/FormHelpers"
import SelectDropdown from "./SelectDropdown"
import Text from "./Text"
import { Colors, Icon, IconNames } from "./Icon"
import { roles } from "../utils/constants"
import ApiService from "../services/ApiService"
import { CircularProgress } from "@material-ui/core"
import { errorNotification, successNotification } from "../utils"
import { SiteEncaise } from "../views/Portefeuille"
import Passcode from "./registerComponents/Passcode"

export const SITES = [
  { public_id: "Assigny", name: "Assigny" },
  { public_id: "Orlu", name: "Orlu" },
  { public_id: "Rivesaltes", name: "Rivesaltes" },
  { public_id: "Salles-Curan", name: "Salles-Curan" },
  { public_id: "Harcanville", name: "Harcanville" },
  { public_id: "Tous les sites", name: "Tous les sites" },
]

interface ModalProps {
  onClose?: () => void
  open: boolean
  data?: any
  total?: number
}
const ModalPortefeuille = ({
  onClose = undefined,
  open = false,
  data = null,
  total = 0,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({ mode: "onChange", defaultValues: data })
  const [data_, setdata] = useState(data)
  const [loading, setloading] = useState(false)
  const [listSites, setlistSites] = useState([])
  const [confirmation, setconfirmation] = useState(false)

  const onSubmit = async () => {
    setloading(true)
    try {
      const resp = await ApiService.Withdraw({site_ids:listSites.map(i=>i.public_id||'')})
    if(resp.status==200) successNotification(resp.data.message)
    } catch (error) {
      errorNotification(error.response.data.message)
    }
    setloading(false)
    reset()
    onClose && onClose()
  }
  const sendSms = async ()=>{
    try {
      const resp = await ApiService.SendSmsVerification()
    if (resp.status == 200) {
      successNotification(resp.data.message)
      setconfirmation(true)
    }
    } catch (error) {
      errorNotification(error.response.data.message)
    }
    
  }
  const onNext = async (body: any) => {
    setdata(body)
    sendSms()
  }

  const handleChangeSite = (sites: any) => {
    setlistSites(sites)
  }

  return (
    <>
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 465 : "100vw"}
        title={
          <h1 className="font-semibold text-3xl leading-11 ">
            Encaisser un solde
          </h1>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={onClose}
        open={open}
      >
        {confirmation ? (
          <div className="flex items-center justify-center h-screen text-center">
            <div>
              <h1>
                <Text type="32-600">Confirmer l’encaissement</Text>
              </h1>
              <Passcode
                center
                handleSubmit={onSubmit}
                handleback={() => {
                  setconfirmation(false)
                }}
                handleResend={sendSms}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onNext)}>
            <div>
              <div>
                <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                  Site
                </label>
                <SelectDropdown
                  placeholder="Sélectionner un site"
                  width={260}
                  items={data}
                  keyAttribute="name"
                  valueAttribute="name"
                  onSelect={handleChangeSite}
                  withSlectAll
                  // defaultValues={
                  //   data_
                  //     ? data_.sites?.split(",").map((s: string) => ({
                  //         key: s.trim(),
                  //         value: s.trim(),
                  //       }))
                  //     : []
                  // }
                />
              </div>
              <div className="my-12">
                <Text type="16-600" className="block mb-2">
                  Soldes à encaisser
                </Text>
                <div className="flex flex-wrap gap-y-5 mt-2">
                  {listSites.map(site => (
                    <SiteEncaise item={site} width="1/2" />
                  ))}
                </div>
              </div>
              <div className="my-12">
                <Text type="16-600" className="block mb-2">
                  Total à encaisser
                </Text>
                <Text
                  type="32-600"
                  className="block py-6 px-4 rounded-lg bg-gray-bg"
                >
                  {listSites
                    .reduce((acc, site) => acc + site.portfolio, 0)
                    .toLocaleString("fr")}{" "}
                  €
                </Text>
              </div>

              <div className="my-12">
                <Text type="16-600" className="block mb-2">
                  Solde Total après encaissement
                </Text>
                <Text
                  type="32-600"
                  className="block py-6 px-4 rounded-lg bg-gray-bg"
                >
                  {(
                    total -
                    listSites.reduce((acc, site) => acc + site.portfolio, 0)
                  ).toLocaleString("fr")}{" "}
                  €
                </Text>
              </div>

              <div className="flex mt-8 space-x-4">
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <button
                    type="submit"
                    className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
                  >
                    Encaisser
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
export default ModalPortefeuille
