import React, { useState } from "react"
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
import Text from "../Text"
import SelectDropdown from "../SelectDropdown"
import { DateSelector } from "../DateSelector"

const { TextArea } = Input

interface ModalProps {
  onClose?: () => void
  open: boolean
}

const ModalContact = ({ onClose = undefined, open = false }: ModalProps) => {
  

  return (
    <>
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 465 : "100vw"}
        title={
          <span className="font-semibold text-3xl leading-11 ">
            Contactez-nous
          </span>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0, paddingBottom: 110 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col mt-12 gap-16">
          <div className="flex flex-col items-center">
            <img className="mb-3" src="/images/Illustration tel.png" alt="Illustration tel" />
            <Text type="16-600">Par téléphone</Text>
            <Text type="16-500" className="text-center">
              Nos conseillers vous accompagnent au <b className="text-violet-bohr">06.51.11.30.10</b> .
            </Text>
          </div>
          <div className="flex flex-col items-center">
          <img className="mb-3" src="/images/Illustration mail.png" alt="Illustration mail" />
            <Text type="16-600">Par mail</Text>
            <Text type="16-500" className="text-center">
            Envoyer un message à <b className="text-violet-bohr">contact@bohr-energie.fr</b> .
            </Text>
          </div>
        </div>
      </Drawer>
    </>
  )
}
export default ModalContact
