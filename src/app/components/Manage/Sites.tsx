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

  // const { data, loading } = useSelector((state: RootStateOrAny) => state.sites)

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchSitesDetail())
  // }, [])



//////



const sites = useSelector((state: RootStateOrAny) => state.sites)

const dispatch = useDispatch()
useEffect(() => {
  dispatch(fetchSitesDetail())
  if (sites) {
    setData(sites.data)
    setLoading(false)
  }
}, [])


const [data, setData] = useState(Array())
const [loading, setLoading] = useState(true)
const [currentSite, setcurrentSite] = useState()
const [modalOpen, setModalOpen] = useState(false)


useEffect(() => {
  if (sites.data) {
    setData(sites.data)
    setLoading(false)
  }
}, [sites.data])




//////////

  const onChange = key => {
  }
 
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


  const panelDataType = (site) => {
  
    if (site?.site_type == 'hydro') {
      return (
        {
          "N. Card": "card_number",
          "Ancien contrat": "last_contract",
          "Puissance d’injection max": "installed_capacity",
          "Latitude": "latitude",
          "Longitude": "longitude",
          "Puissance installé": "installed_capacity",
          "Type Turbine": "turbine_type",
          "Riviere de Reference": "reference_river",
          'Mail Responsable': 'contact_mail',
          'Telephone Responsable':'contact_phone',
          'Adresse' :'address',
          // 'Ville' :'city',
          'Code Postal' :'postal_code',
          'Pays' :'country',

        }
      )
    } else {
      return (
        {

          "N. Card": "card_number",
          "Ancien contrat": "last_contract",
          "Puissance d’injection max": "installed_capacity",
          "Latitude": "latitude",
          "Longitude": "longitude",
          "Puissance installé": "installed_capacity",
          "Tracker": "tracker",
          "Inclinaison": "inclination",
          "Azimut": "azimut",
          "Orientation": "orientation",
          'Mail Responsable': 'contact_mail',
          'Telephone Responsable':'contact_phone',
          'Adresse' :'address',
          // 'Ville' :'city',
          'Code Postal' :'postal_code',
          'Pays' :'country',

        }
      )
    }
  }



  const keyMapping = {
    'commisionning_date' : "Date de mise en service",
    'card_number': "Numéro Card",
    'grid': "Grid",
    'turbine_type': "Type de Turbine",
    'city': "Ville",
    'reference_river': "Rivière de référence",
    'legal_representative_name' : "Représentant Legal",
    'address': "Adresse",
    'postal_code': "Code Postal",
    'country': "Pays",
    'last_contract': "Ancien Contrat",
    "installed_capacity" : "Capacité Installé",
    'tracker' : "Tracker",
    'inclination' : "Inclinaison",
    'azimut' : "Azimut",
    'orientation' : "Orientation",
    'height' : "Altitude",
    'latitude':'Latitude',
    'longitude':'Longitude',
    'contact_mail':'Mail Responsable',
    'contact_phone':'Telephone Responsable',
  }


  const panelData = {
    "N. Card": "card_number",
    "Ancien contrat": "last_contract",
    "Puissance d’injection max": "installed_capacity",
    "Latitude": "latitude",
    "Longitude": "longitude",
    "Puissance installé": "installed_capacity",
    "Type Turbine": "turbine_type",
    "Riviere de Reference": "reference_river",
    'Mail Responsable': 'contact_mail',
    'Telephone Responsable':'contact_phone',
    'Adresse' :'address',
    // 'Ville' : 'city',
    'Code Postal' :'postal_code',
    'Pays' :'country',
  }



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
          Type
        </Text>
        <Text className="block" type="14-500">
          {data.site_type || "-"}
        </Text>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          N.PRM
        </Text>
        <Text className="block" type="14-500">
          {data.prm_number || "-"}
        </Text>
      </Col>
    </Row>
  )
  





  const PanelBody = ({ data }) => {

    if (data.site_type=='hydro') {

        return(    
                <Row className="flex items-center">
                  {Object.keys(data).filter(i=>!['prm_number','name', 'site_type','related_company_id','public_id','tracker','inclination','azimut','orientation','height'].includes(i)).map(key => (
                    <Col className="mt-6" xs={24} sm={12} md={4} lg={4}>
                      <Text className="text-gray-6f" type="12-500">
                        {keyMapping[key]} 
                      </Text>
                      <Text className="block" type="14-500">
                        {key == "commisionning_date" ? moment(data[key]).format('YYYY/MM/DD') : null}
                        { ['card_number','grid','turbine_type','reference_river','address','postal_code','country','last_contract','contact_mail','contact_phone','city'].includes(key) ? data[key] : null}
                        { ['latitude','longitude'].includes(key) && data[key] ? parseFloat(data[key]).toFixed(3) : null }
                        {key == "installed_capacity" && data[key] + " KwC"}
                      </Text>
                    </Col>
                  ))}
                </Row>
              )

    } else {
        return( 
          <Row className="flex items-center">
          {Object.keys(data).filter(i=>!['prm_number','name','related_company_id', 'site_type','turbine_type','reference_river','public_id'].includes(i)).map(key => (
            <Col className="mt-6" xs={24} sm={12} md={4} lg={4}>
              <Text className="text-gray-6f" type="12-500">
                {key}
              </Text>
              <Text className="block" type="14-500">
                {key == "commisionning_date" ? moment(data[key]).format('YYYY/MM/DD') : null}
                { ['card_number','grid','address','postal_code','country','last_contract','tracker','inclination','azimut','orientation','height','city'].includes(key) ? data[key] : null}
                { ['latitude','longitude'].includes(key) && data[key] ? parseFloat(data[key]).toFixed(3) : null }
                {key == "installed_capacity" && data[key] + " KwC"}
                
              </Text>
            </Col>
          ))}
        </Row>
        )


    }
  }


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
