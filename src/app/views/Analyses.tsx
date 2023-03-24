import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import { DateSelector } from "../components/DateSelector"
import Card from "../components/Card"
import Text from "../components/Text"
import DeltaBadge from "../components/DeltaBadge"
import SelectDropdown from "../components/SelectDropdown"
import { Avatar, Spin, Table, Tag ,Collapse, Col, Row,} from "antd"
import { Line, LineChart } from "recharts"
import MixBarChart from "../components/Charts/MixBarChart"
import { stringToHexColor } from "../utils"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchAnalysis, fetchSitesDetail } from "../redux/actions"
import moment from "moment"
import ModalAssign from "../components/Manage/ModalAssign"
import { Icon } from "../components/Icon"
import { BorderBottom } from "@material-ui/icons"
import { fetchCompanies } from "../redux/actions/commun"
import { Switch, Space } from 'antd';


function transform(oldData) {
  if (!oldData) return []
  let newData1 = oldData?.reduce((acc, item) => {
    if (!acc[item.start_date]) {
      acc[item.start_date] = {}
    }
    acc[item.start_date][item.name] = item.portfolio
    return acc
  }, {})
  var arr: any[] = []
  Object.entries(newData1).forEach(([key, value]) =>
    arr.push({ date: key, ...value })
  )
  return arr
}

export default function Analyses() {
  
  var start_date = new Date() 
  var end_date = new Date() 
  end_date.setDate(end_date.getDate()); 
  var firstDayOfYear = new Date(start_date.getFullYear(), 0, 1);

  const analyse = useSelector((state: RootStateOrAny) => state.analyse)
  const commun = useSelector((state: RootStateOrAny) => state.commun)

  useEffect(() => {
    dispatch(fetchSitesDetail())
    dispatch(fetchCompanies())

    const companies = commun.companies?.map( item => { return {...item, name : item.name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())} })
    setSPV(companies)


  }, [])




  const [SPV, setSPV] = useState(commun.companies)
  const [selectedSPV, setSelectedSPV] = useState(Array())
  const [showSite, setShowSite] = React.useState(true)



  const { data: sitesDetails } = useSelector(
    (state: RootStateOrAny) => state.sites
  )

  // const { companies } = useSelector((state: RootStateOrAny) => state.companies)

  const [xScale, setxScale] = useState({ key: "day", value: "Jour" })
  const [xScale2, setxScale2] = useState({ key: "day", value: "Jour" })
  const [start_time, setstart_time] = useState(firstDayOfYear.toLocaleString("sv", { timeZone: "Europe/Paris"}).split(' ')[0])
  const [end_time, setend_time] = useState(end_date.toISOString().split('T')[0])
  const [selectedSites, setselectedSites] = useState()


  useEffect(() => {

    console.log(start_time, end_time)
    dispatch(fetchAnalysis(start_time, end_time, selectedSPV,showSite))
  }, [start_time, end_time, selectedSPV, showSite])




  const handleSlectHour = val => {
    setxScale(val)
  }
  const handleSlectHour2 = val => {
    setxScale2(val)
  }
  const handleSlectSite = val => {
    setselectedSites(val.map(i => i.public_id))
  }
  const handleUnslectSite = val => {
    setselectedSites(selectedSites.filter(i => i!=val))
  }

  const handleSelectSPV = val => {
    setSelectedSPV(val.map(i => i.public_id))
  }
  const handleUnselectSPV = val => {
    setSelectedSPV(selectedSPV.filter(i => i!=val))
  }
  const d = analyse.data

  const [gain, setGain] = useState(transform(d?.portfolio))
  const [volume, setVolume] = useState(transform(d?.volumes))

  useEffect(() => {
    setGain(transform(d?.portfolio))
    setVolume(transform(d?.volumes))
    }, [d])


  const columns = [
    {
      title: "Site",
      dataIndex: "name",
      key: "name",
      render: (_, { name }) => (
        <>
          <Avatar
            gap={9}
            style={{
              backgroundColor: stringToHexColor(name),
              color: "white",
              marginRight: 19,
            }}
            size={40}
          >
            {name.slice(0, 2)}
          </Avatar>
          {name}
        </>
      ),
    },
    {
      title: "CA Global",
      dataIndex: "total_earning",
      key: "total_earning",
      responsive: ["lg"],
      render: (_, { total_earning, total_earning_last_contract }) => (
        <div>
          <Text type="16-600">{parseInt(total_earning).toLocaleString("fr")} €</Text>{" "}
          <br />
          <Text type="16-600" className="text-gray-6f">
            {parseInt(total_earning_last_contract).toLocaleString("fr")}€ ancien contrat
          </Text>
        </div>
      ),
    },
    // {
    //   title: "Evolution %",
    //   dataIndex: "total_earning_delta",
    //   key: "total_earning_delta",
    //   responsive: ["lg"],
    //   render: (_, { total_earning_delta }) => (
    //     <DeltaBadge
    //       background={false}
    //       delta={Math.round(total_earning_delta * 100)}
    //     />
    //   ),
    // },
    // {
    //   title: "Portefeuille",
    //   dataIndex: "portfolio_earning",
    //   key: "portfolio_earning",
    //   responsive: ["lg"],
    //   render: (_, { portfolio_earning, portfolio_earning_last_contract }) => (
    //     <div>
    //       <Text type="16-600">{parseInt(portfolio_earning).toLocaleString("fr")} €</Text>{" "}
    //       <br />
    //       <Text type="16-600" className="text-gray-6f">
    //         {parseInt(portfolio_earning_last_contract).toLocaleString("fr")}€ ancien
    //         contrat
    //       </Text>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Evolution %",
    //   dataIndex: "portfolio_earning_delta",
    //   key: "portfolio_earning_delta",
    //   responsive: ["lg"],
    //   render: (_, { portfolio_earning_delta }) => (
    //     <DeltaBadge
    //       background={false}
    //       delta={Math.round(portfolio_earning_delta * 100)}
    //     />
    //   ),
    // },
    // {
    //   title: "Volumes totaux vendus",
    //   dataIndex: "volumes_traded",
    //   key: "volumes_traded",
    //   render: (_, { volumes_traded, volumes_traded_last_year }) => (
    //     <div>
    //       <Text type="16-600">{parseInt(volumes_traded).toLocaleString("fr")} Mwh</Text>{" "}
    //       <br />
    //       <Text type="16-600" className="text-gray-6f">
    //         {parseInt(volumes_traded_last_year).toLocaleString("fr")} Mwh en{" "}
    //         {d?.reference_year - 1}
    //       </Text>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Evolution %",
    //   dataIndex: "volumes_traded_delta",
    //   key: "volumes_traded_delta",
    //   responsive: ["lg"],
    //   render: (_, { volumes_traded_delta }) => (
    //     <DeltaBadge
    //       background={false}
    //       delta={Math.round(volumes_traded_delta * 100)}
    //     />
    //   ),
    // },
    {
      title: "Energie",
      dataIndex: "portfolio_earning_delta",
      key: "power_earning",
      responsive: ["lg"],
      render: (_, { power_earning }) => (
        <Text type="12-500">{parseInt(power_earning).toLocaleString("fr")} €</Text>
      ),
    },

    {
      title: "Mecanisme de capacité",
      dataIndex: "portfolio_earning_delta",
      key: "mecapa_earning",
      responsive: ["lg"],
      render: (_, { mecapa_earning }) => (
        <Text type="12-500">{parseInt(mecapa_earning).toLocaleString("fr")} €</Text>
      ),
    },

    {
      title: "Garantie d'origine",
      dataIndex: "portfolio_earning_delta",
      key: "gos_earning",
      responsive: ["lg"],
      render: (_, { gos_earning }) => (
        <Text type="12-500">{parseInt(gos_earning).toLocaleString("fr")} €</Text>
      ),
    },
  ]


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
      <Col xs={24} sm={12} md={8} lg={8}>
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
      <Col xs={24} sm={12} md={8} lg={4}>
        <Text className="text-black-6f" type="14-600">
          CA Global
        </Text>
        <Text className="block" type="14-500" >
        {parseInt(data.total_gain).toLocaleString('fr')}  {" "}€
        </Text>
        {/* <DeltaBadge
          background={false}
          delta={Math.round(data.total_gain_evol* 100) }
        /> */}
      </Col>

      <Col xs={24} sm={12} md={8} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Energie
        </Text>
        <Text className="block" type="14-500">
        {parseInt(data.power_gain).toLocaleString('fr')}  {" "}€
        </Text>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Mecanisme de capacité
        </Text>
        <Text className="block" type="14-500">
        {parseInt(data.mecapa_gain).toLocaleString('fr')}  {" "}€
        </Text>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Garantie d'origine
        </Text>
        <Text className="block" type="14-500">
        {parseInt(data.gos_gain).toLocaleString('fr')}  {" "}€
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
      <Table
      style={{ margin: 0, padding:0 }}
      dataSource={data}
      pagination={false}
      columns={columns}
    />
  )
  const [modalOpen, setModalOpen] = useState(false)

  const { Panel } = Collapse


  
  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 5000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 6800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 9908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 14800,
    },
  ]

  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Analyses" />
      <Layout.Header>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Analyses
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-x-5 gap-y-4">
          <div className="flex items-center gap-2">
          <Space direction="vertical">
            <Switch style={{backgroundColor: '#5819F1'}} checkedChildren="Sites" unCheckedChildren="SPV" defaultChecked onChange={() => setShowSite(!showSite)}/>
          </Space>
          </div>
          <SelectDropdown
            items={SPV}
            keyAttribute="public_id"
            valueAttribute="name"
            defaultValues={selectedSPV}
            onSelect={handleSelectSPV}
            placeholder="Sélectionnez un SPV / Société"
          />
          <div className="flex items-center gap-2">
          <DateSelector
              defaultValue={start_time}
              onChange={(date: string) => setstart_time(date)}
              format="YYYY-MM-DD"
              showHours={false}
            />
            au
            <DateSelector
              defaultValue={end_time}
              onChange={(date: string) => setend_time(date)}
              format="YYYY-MM-DD"
              showHours={false}
            />
          </div>
        </div>
      </Layout.Header>
      <div className="flex flex-wrap gap-3">
        {SPV?.filter(
            spv => selectedSPV && selectedSPV.includes(spv.public_id)
          )
          .map(spv => (
            <Tag closable onClose={()=>handleUnselectSPV(spv.public_id)}>{spv.name}</Tag>
          ))}
      </div>
      <Spin spinning={analyse.loading}>
        <div className="flex-wrap" style={{ display: "flex" }}>

        <Card
            title="Mon CA global"
            className="w-full md:w-1/3"
            bodyClassName="flex"
          >
            <div className="flex flex-col gap-4 pr-4">
              <LineChart width={65} height={40} data={data2}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#19753C"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
              <DeltaBadge delta={d?.current_portfolio.portfolio_delta * 100} />
            </div>
            <div>
              <Text type="32-600" className="block mb-1.5">
                {parseInt(d?.current_portfolio.total_portfolio).toLocaleString("fr")} €
              </Text>
              <Text type="16-600" className="text-gray-6f">
                {parseInt(d?.current_portfolio.last_portfolio).toLocaleString("fr")}€ avec
                l’ancien contrat
              </Text>
            </div>
          </Card>

          <Card
            className="w-full md:w-1/3"
            title="Ma production totale vendue"
            bodyClassName="flex"
          >
            <div className="flex flex-col gap-4 pr-4">
              <LineChart width={65} height={40} data={data2}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#19753C"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
              <DeltaBadge delta={d?.total_volume_delta * 100} />
            </div>
            <div>
              <Text type="32-600" className="block mb-1.5">
                {parseInt(d?.total_volume).toLocaleString("fr")} Mwh
              </Text>
              <Text type="16-600" className="text-gray-6f">
                {parseInt(d?.total_volume_last_year).toLocaleString("fr")} Mwh en{" "}
                {d?.reference_year - 1}
              </Text>
            </div>
          </Card>

          <Card
            className="w-full md:w-1/3"
            title="Mon Solde"
            bodyClassName="flex"
          >
            <div className="flex flex-col gap-4 pr-4">
              <LineChart width={65} height={40} data={data2}>

                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#19753C"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
              <DeltaBadge delta={d?.total_earning_delta * 100} />
            </div>
            <div>
              <Text type="32-600" className="block mb-1.5">
                {parseInt(d?.total_earning).toLocaleString("fr")} €
              </Text>
              <Text type="16-600" className="text-gray-6f">
                {parseInt(d?.total_earning_last_contract).toLocaleString("fr")}€ avec
                l’ancien contrat
              </Text>
            </div>
          </Card>

          {/* <Card className="w-full" title="Mes sites">
            <Table
              style={{ marginTop: -50 }}
              pagination={{
                position: ["topRight"],
              }}
              dataSource={d?.earning_by_station}
              columns={columns}
            />
          </Card> */}

          <Card className="w-full" title="Mes SPV / Sociétés" >

            <Spin spinning={loading} style={{padding:'0px'}}>
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
                  style={{padding:'0px'}}
                  defaultActiveKey={[]}
                  onChange={onChange}
                  expandIconPosition="end"
                  ghost
                  collapsible="icon"
                  expandIcon={({ isActive }) => (
                    <Icon name={isActive ? "arrow-up" : "arrow-down"} />
                  )}
                >
                  {d?.earning_by_station?.map((site: any, index: number) => (
                    <Panel
                      style={{marginBottom:'10px', borderBottom:'1px #f1f1f1 solid'}}
                      header={<PanelHeader data={site} />}
                      key={index + ""}
                    >
                      <PanelBody data={site.sites} />
                    </Panel>
                  ))}
                </Collapse>
              </Spin>

          </Card>


          <Card
            className="w-full"
            title="Mon CA energie"
            headerRight={
              <SelectDropdown
                items={[
                  { key: "hour", value: "Heure" },
                  { key: "day", value: "Jour" },
                  { key: "week", value: "Semaine" },
                  { key: "month", value: "Mois" },
                ]}
                type="none"
                onSelect={handleSlectHour}
                placeholder="Select"
                defaultValue={xScale}
                width={112}
              />
            }
          >
            <MixBarChart 
            xScale={xScale.key} 
            data={transform(d?.portfolio)} 
            unit={"€"} />
          </Card>
          <Card
            className="w-full"
            title="Ma production"
            headerRight={
              <SelectDropdown
                items={[
                  { key: "hour", value: "Heure" },
                  { key: "day", value: "Jour" },
                  { key: "week", value: "Semaine" },
                  { key: "month", value: "Mois" },
                ]}
                type="none"
                onSelect={handleSlectHour2}
                placeholder="Select"
                defaultValue={xScale2}
                width={112}
              />
            }
          >
            <MixBarChart 
            xScale={xScale2.key} 
            data={transform(d?.volumes)} 
            unit={"Mwh"} />
          </Card>
        </div>
      </Spin>
    </Layout>
  )
}
