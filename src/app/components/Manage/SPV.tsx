import React, { useEffect, useState } from "react"
import { Collapse, Col, Row, Avatar, Spin } from "antd"
import Text from "../Text"
import { Icon } from "../Icon"
import "./customStyle.css"
import ModalAssign from "./ModalAssign"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchSitesDetail } from "../../redux/actions"
import { stringToHexColor } from "../../utils"
import moment from "moment"
import { fetchCompanies } from "../../redux/actions/commun"

const { Panel } = Collapse

const SPV = () => {
  
  const commun = useSelector((state: RootStateOrAny) => state.commun)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCompanies())
    if (commun.companies) {
      setData(commun.companies)
      setLoading(false)
    }
  }, [])


  const [data, setData] = useState(Array())
  const [loading, setLoading] = useState(true)
  const [currentSPV, setcurrentSPV] = useState()
  const [modalOpen, setModalOpen] = useState(false)


  useEffect(() => {
    if (commun.companies) {
      setData(commun.companies)
      setLoading(false)
    }
  }, [commun.companies])

  const onChange = key => {
  }

  const genExtra = spv => (
    <span>
      <Icon
        name="edit"
        onClick={event => {
          //event.stopPropagation()
          setcurrentSPV(spv)
          setModalOpen(true)
        }}
        style={{ right: 25, position: "relative" }}
        className="cursor-pointer"
      />
    </span>
  )

  const PanelHeader = ({ data }) => (
    <Row className="flex items-center">
      <Col xs={24} sm={12} md={8} lg={16}>
        <Avatar
          gap={9}
          style={{
            backgroundColor: stringToHexColor(data.name),
            color: "white",
            marginRight: 19,
          }}
          size={40}
        >
          {data.name.toUpperCase().slice(0, 2)}
        </Avatar>
        <Text type="16-600" style={{textTransform: 'capitalize'}}>{data.name}</Text>
      </Col>
      <Col xs={24} sm={12} md={4} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Siren
        </Text>
        <Text className="block" type="14-500">
          {data.siren || "-"}
        </Text>
      </Col>
      {/* <Col xs={24} sm={12} md={4} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Raison sociale
        </Text>
        <Text className="block" type="14-500">
          {data.raison_social || "-"}
        </Text>
      </Col> */}
      <Col xs={24} sm={12} md={8} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          TVA
        </Text>
        <Text className="block" type="14-500">
          {data.tva_number || "-"}
        </Text>
      </Col>
    </Row>
  )
  
  // const panelData = {
  //   "Siren": "Siren",
  //   TVA: "tva",
  //   "Address" : "Adress",
  //   "Postal Code" : "Postal Code",
  //   "Country" : "country",
  //   "Représentant Legal" : "Représentant Legal",
  //   Banque: "banc",
  //   "Adresse banque": "address",
  //   IBAN: "iban",
  //   BIC: "bic",
  // }

  const keyMapping = {
    'commisionning_date' : "date de mise en service",
    'card_number': "Numéro Card",
    'grid': "Grid",
    'turbine_type': "Type de Turbine",
    'city': "Ville",
    'reference_river': "Rivière de référence",
    'legal_representative_lastname' : "Représentant Legal",
    'address': "Adresse",
    'postal_code': "Code Postal",
    'country': "Pays",
    'last_contract': "Ancien Contrat",
    'contact_mail':'Mail Responsable',
    'contact_phone':'Telephone Responsable',
  }


  const panelData = {

    "Adresse" : 'address',
    'Ville': "city",
    'Code Postal': "postal_code",
    'Pays' : 'country',
    "Représentant Legal" : 'legal_representative_lastname',
    "Téléphone Responsable" : 'contact_phone',
    "Mail Responsable" : 'contact_mail',
    
  }



  const PanelBody = ({ data }) => {
      return(    
              <Row className="flex items-center">
                {Object.keys(data).filter(i=>!['name','public_id','siren','tva_number','legal_representative_name'].includes(i)).map(key => (
                  <Col className="mt-6" xs={24} sm={12} md={4} lg={4}>
                    <Text className="text-gray-6f" type="12-500">
                      {keyMapping[key]}
                    </Text>
                    <Text className="block" type="14-500" style={{paddingRight:'10px'}}>
                      { ['legal_representative_lastname','address','postal_code','country','contact_mail','contact_phone','city'].includes(key) ? data[key] : ''}
                    </Text>
                  </Col>
                ))}
              </Row>
            )

  }


  return (
    <>
      <Spin spinning={loading}>
        <ModalAssign
          panelData={panelData}
          data={currentSPV}
          open={modalOpen && !!currentSPV}
          onClose={() => {
            setcurrentSPV(null)
            setModalOpen(false)
          }}
        />
        <Collapse
          defaultActiveKey={["0"]}
          onChange={onChange}
          expandIconPosition="end"
          ghost
          collapsible="icon"
          expandIcon={({ isActive }) => (
            <Icon name={isActive ? "arrow-up" : "arrow-down"} />
          )}
        >
          {data?.map((spv: any, index: number) => (
            <Panel
              header={<PanelHeader data={spv} />}
              key={index + ""}
              extra={genExtra(spv)}
            >
              <PanelBody data={spv} />
            </Panel>
          ))}
        </Collapse>
      </Spin>
    </>
  )
}
export default SPV
