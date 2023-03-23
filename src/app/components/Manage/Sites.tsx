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

const { Panel } = Collapse

const Sites = () => {
  const { data, loading } = useSelector((state: RootStateOrAny) => state.sites)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSitesDetail())
  }, [])

  const onChange = key => {
  }
  const [currentSite, setcurrentSite] = useState()
  const genExtra = site => (
    <span>
      <Icon
        name="edit"
        onClick={event => {
          //event.stopPropagation()
          setcurrentSite(site)
          setModalOpen(true)
        }}
        style={{ right: 25, position: "relative" }}
        className="cursor-pointer"
      />
    </span>
  )

  const PanelHeader = ({ data }) => (
    <Row className="flex items-center">
      <Col xs={24} sm={12} md={8} lg={6}>
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
          Type
        </Text>
        <Text className="block" type="14-500">
          {data.site_type || "-"}
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
      <Col xs={24} sm={12} md={8} lg={10}>
        <Text className="text-gray-6f" type="12-500">
          N.PRM
        </Text>
        <Text className="block" type="14-500">
          {data.prm_number || "-"}
        </Text>
      </Col>
    </Row>
  )
  const panelData = {
    TVA: "tva",
    "N. Card": "card_number",
    "N.PRM": "prm_number",
    Type: "site_type",
    "Ancien contrat": "last_contract",
    "Puissance d’injection max": "installed_capacity",
    "Coordonnées site": "20.1, 54.0.98",
    "Puissance installé": "installed_capacity",
    Tracker: "tracker",
    Inclinaison: "inclination",
    Azimut: "azimut",
    Orientation: "orientation",
    "Titulaire du compte": "tutilaire",
    "Adresse du titulaire": "address",
    Banque: "banc",
    "Adresse banque": "address",
    IBAN: "iban",
    BIC: "bic",
  }
  const PanelBody = ({ data }) => (
    <Row className="flex items-center">
      {Object.keys(data).filter(i=>!['prm_number','name', 'site_type'].includes(i)).map(key => (
        <Col className="mt-6" xs={24} sm={12} md={4} lg={4}>
          <Text className="text-gray-6f" type="12-500">
            {key}
          </Text>
          <Text className="block" type="14-500">
            {key !== "commisionning_date"
              ? data[key]
              : moment(data[key]).format('lll')}
            {key == "installed_capacity" && " KwC"}
          </Text>
        </Col>
      ))}
    </Row>
  )
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Spin spinning={loading}>
        <ModalAssign
          panelData={panelData}
          data={currentSite}
          open={modalOpen && !!currentSite}
          onClose={() => {
            setcurrentSite(null)
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
          {data?.map((site: any, index: number) => (
            <Panel
              header={<PanelHeader data={site} />}
              key={index + ""}
              extra={genExtra(site)}
            >
              <PanelBody data={site} />
            </Panel>
          ))}
        </Collapse>
      </Spin>
    </>
  )
}
export default Sites
