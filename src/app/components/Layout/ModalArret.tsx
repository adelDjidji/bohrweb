import React, { useEffect, useState } from "react"
import {
  Input,
  notification,
  Col,
  Drawer,
  Row,
  DatePicker,
  Divider,
} from "antd"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../../../helpers/FormHelpers"
import { Icon } from "../Icon"
import SelectDropdown from "../SelectDropdown"
import { DateSelector } from "../DateSelector"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchTypes } from "../../redux/actions/commun"
import ApiService from "../../services/ApiService"
import { errorNotification, successNotification } from "../../utils"
import { CircularProgress } from "@material-ui/core"

const { TextArea } = Input

interface ModalProps {
  onClose?: () => void
  open: boolean
}

const ModalArret = ({ onClose = undefined, open = false }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" })

  const { sites, types } = useSelector((state: RootStateOrAny) => state.commun)
  const [outage_type, setoutage_type] = useState()
  const [site_public_id, setsite_public_id] = useState()
  const [start_time, setstart_time] = useState("2023-01-01")
  const [end_time, setend_time] = useState("2023-01-02")
  const [comment, setcomment] = useState("")
  const [loading, setloading] = useState(false)

  const onSubmit = async (data: any) => {
    const body = {
      ...data,
      outage_type,
      site_public_id,
      start_time,
      end_time,
      comment,
    }
    try {
      setloading(true)
      const resp = await ApiService.SignalerArret(body)
      
      if (resp.status == 200) successNotification(resp.data.message)
      onClose && onClose()
    } catch (err) {
      errorNotification(err.message)
    }
    setloading(false)
  }
  

  const handleChangeSite = site => {
    setsite_public_id(site.public_id)
  }
  const handleChangeType = type => {
    setoutage_type(type.key)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTypes())
  }, [])

  return (
    <>
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 465 : "100vw"}
        title={
          <span className="font-semibold text-3xl leading-11 ">
            Signaler un arrêt
          </span>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0, paddingBottom: 110 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="flex items-center" gutter={24}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Date de début
              </label>
              <DateSelector
                // defaultValue={start_time}
                onChange={(date: string) => setstart_time(date)}
                format="YYYY-MM-DD"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Date de Fin
              </label>
              <DateSelector
                // defaultValue={end_time}
                onChange={(date: string) => setend_time(date)}
                format="YYYY-MM-DD"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Puissance installé
              </label>
              <input
                {...register("puissance_installe", {
                  required: "Puissance installé is required",
                })}
                type="text"
                className="h-10 w-full border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5  focus:outline-none"
              />
              {errors.puissance_installe && (
                <ErrorMessage message={errors.puissance_installe?.message} />
              )}
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Puissance après outage
              </label>
              <input
                {...register("remaining_power", {
                  required: "Puissance après outage is required",
                })}
                type="text"
                className="h-10 w-full border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5  focus:outline-none"
              />
              {errors.remaining_power && (
                <ErrorMessage message={errors.remaining_power?.message} />
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Site
              </label>
              <SelectDropdown
                placeholder="Sélectionner un site"
                width={260}
                items={sites}
                keyAttribute="public_id"
                valueAttribute="name"
                onSelect={handleChangeSite}
                type="radio"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Type
              </label>
              <SelectDropdown
                placeholder="Sélectionner un type"
                width={260}
                items={types?.map(i => ({ key: i, value: i }))}
                onSelect={handleChangeType}
                type="radio"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Commentaire
              </label>
              <TextArea onChange={e => setcomment(e.target.value)} rows={6} />
            </Col>
          </Row>
          <div
            className="flex mt-8 space-x-4 w-full absolute bottom-0 left-0 pb-4 pt-10 justify-start pl-10"
            style={{
              background: "linear-gradient(0deg, white 54%, transparent)",
            }}
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <button
                type="submit"
                className="bg-violet-bohr inline-block px-4 py-3 text-sm font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
              >
                Signaler
              </button>
            )}
          </div>
        </form>
      </Drawer>
    </>
  )
}
export default ModalArret
