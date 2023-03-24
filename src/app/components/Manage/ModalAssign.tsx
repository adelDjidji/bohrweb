import React, { useEffect, useState } from "react"
import { Avatar, notification, Col, Drawer, Row } from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import { Icon } from "../Icon"
import Passcode from "../registerComponents/Passcode"
import ApiService from "../../services/ApiService"
import { errorNotification, stringToHexColor, successNotification } from "../../utils"
import { fetchCompanies, fetchCompaniesDetails, fetchSites } from "../../redux/actions/commun"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchSitesDetail } from "../../redux/actions"
export interface ModalProps {
  onClose?: () => void
  open: boolean
  panelData?: object,
  data?:object
}



const ModalAssign = ({
  onClose = undefined,
  open = false,
  panelData = {},
  data = {},
}: ModalProps) => {

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" })


  const [step, setStep] = useState(0)
  const [def, setDef] = useState({})
  const [panelData2, setPanelData2] = useState(panelData)

  useEffect(() => {
      if (open) {

        setDef(data)
      } else {
        setDef({})
      }
      setPanelData2(panelData)
  }, [open,panelData])


  const updateforms = (key,value) => { 
    setDef({...def, [key] : value})
}


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

  const onSubmit = (data: any) => {
    sendSms(() => setStep(1))
  }
  const handleSubmitAssign = async (code: any) => {

    if ("siren" in def) {
      console.log('updating spv')
      // Handling SPV
      try {
        const resp = await ApiService.ModifyCompany(def)
        if (resp.status == 200) successNotification(resp.data.message)
        setStep(0)
        dispatch(fetchCompanies())
        onClose && onClose()
      } catch (error) {
        errorNotification(error.response.data.message)
      }
    } else {
      console.log('updating site',def)
      // Handling sites
      try {
        const resp = await ApiService.ModifySite(def)
        if (resp.status == 200) successNotification(resp.data.message)
        setStep(0)
        dispatch(fetchSitesDetail())
        onClose && onClose()
      } catch (error) {
        errorNotification(error.response.data.message)
      }

    }

  }

  if(!open) return null

  return (
    <>
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 624 : "100vw"}
        title={
          <div className="flex items-center">
            <Avatar
              gap={9}
              style={{
                backgroundColor: stringToHexColor(data?.name),
                color: "white",
                marginRight: 19,
              }}
              size={40}
            >
              {data?.name.toUpperCase().slice(0, 2)}
            </Avatar>
            <span className="font-semibold text-3xl leading-11 " style={{textTransform: 'capitalize'}}>{data?.name}</span>
          </div>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0, paddingBottom: 110 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={onClose}
        open={open}
      >
        {step === 0 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="flex items-center" gutter={24}>
              {Object.keys(panelData2).map(key => (
                <Col xs={24} sm={12} md={12} lg={12}>
                  <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                    {key}
                  </label>
                  <input
                    // {...register(key, { required: key + " is required" })}
                    type="text"
                    value={def[panelData2[key]]}
                    onChange = {(e) => updateforms(panelData2[key],e.target.value)}
                    className="h-10 w-full border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5  focus:outline-none"
                  />
                  {errors[key] && (
                    <ErrorMessage message={errors[key]?.message} />
                  )}
                </Col>
              ))}
            </Row>
            <div
              className="flex mt-8 space-x-4 w-full absolute bottom-0 right-0 pb-4 pt-10 justify-end pr-10"
              style={{
                background: "linear-gradient(0deg, white 54%, transparent)",
              }}
            >
              <button
                type="submit"
                className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
              >
                Valider
              </button>
            </div>
          </form>
        )}
        {step === 1 && (
          <div className="mt-16">
            <h1 className="font-semibold text-3xl leading-11 ">
              Confirmer la modification
            </h1>
            <Passcode
              handleSubmit={handleSubmitAssign}
              handleback={() => setStep(0)}
              handleResend={sendSms}
            />
          </div>
        )}
      </Drawer>
    </>
  )
}
export default ModalAssign
