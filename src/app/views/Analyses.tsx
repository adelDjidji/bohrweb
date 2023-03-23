import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import { DateSelector } from "../components/DateSelector"
import Card from "../components/Card"
import Text from "../components/Text"
import DeltaBadge from "../components/DeltaBadge"
import SelectDropdown from "../components/SelectDropdown"
import { Avatar, Spin, Table, Tag } from "antd"
import { Line, LineChart } from "recharts"
import MixBarChart from "../components/Charts/MixBarChart"
import { stringToHexColor } from "../utils"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchAnalysis, fetchSitesDetail } from "../redux/actions"
import moment from "moment"

const data = [
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
  const { sites } = useSelector((state: RootStateOrAny) => state.commun)
  const { data: sitesDetails } = useSelector(
    (state: RootStateOrAny) => state.sites
  )
  const [xScale, setxScale] = useState({ key: "day", value: "Jour" })
  const [xScale2, setxScale2] = useState({ key: "day", value: "Jour" })
  const [start_time, setstart_time] = useState(firstDayOfYear.toLocaleString("sv", { timeZone: "Europe/Paris"}).split(' ')[0])
  const [end_time, setend_time] = useState(end_date.toISOString().split('T')[0])
  const [selectedSites, setselectedSites] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnalysis(start_time, end_time, selectedSites))
  }, [start_time, end_time, selectedSites])

  useEffect(() => {
    dispatch(fetchSitesDetail())
  }, [])

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

  const d = analyse.data

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
      title: "Gain global annuel",
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
    {
      title: "Evolution %",
      dataIndex: "total_earning_delta",
      key: "total_earning_delta",
      responsive: ["lg"],
      render: (_, { total_earning_delta }) => (
        <DeltaBadge
          background={false}
          delta={Math.round(total_earning_delta * 100)}
        />
      ),
    },
    {
      title: "Portefeuille",
      dataIndex: "portfolio_earning",
      key: "portfolio_earning",
      responsive: ["lg"],
      render: (_, { portfolio_earning, portfolio_earning_last_contract }) => (
        <div>
          <Text type="16-600">{portfolio_earning.toLocaleString("fr")} €</Text>{" "}
          <br />
          <Text type="16-600" className="text-gray-6f">
            {parseInt(portfolio_earning_last_contract).toLocaleString("fr")}€ ancien
            contrat
          </Text>
        </div>
      ),
    },
    {
      title: "Evolution %",
      dataIndex: "portfolio_earning_delta",
      key: "portfolio_earning_delta",
      responsive: ["lg"],
      render: (_, { portfolio_earning_delta }) => (
        <DeltaBadge
          background={false}
          delta={Math.round(portfolio_earning_delta * 100)}
        />
      ),
    },
    {
      title: "Volumes totaux vendus",
      dataIndex: "volumes_traded",
      key: "volumes_traded",
      render: (_, { volumes_traded, volumes_traded_last_year }) => (
        <div>
          <Text type="16-600">{volumes_traded} Kwh</Text>{" "}
          <br />
          <Text type="16-600" className="text-gray-6f">
            {parseInt(volumes_traded_last_year)}Kwh en{" "}
            {d?.reference_year - 1}
          </Text>
        </div>
      ),
    },
    {
      title: "Evolution %",
      dataIndex: "volumes_traded_delta",
      key: "volumes_traded_delta",
      responsive: ["lg"],
      render: (_, { volumes_traded_delta }) => (
        <DeltaBadge
          background={false}
          delta={Math.round(volumes_traded_delta * 100)}
        />
      ),
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
          <SelectDropdown
            items={sitesDetails}
            keyAttribute="public_id"
            valueAttribute="name"
            defaultValues={selectedSites}
            onSelect={handleSlectSite}
            placeholder="Sélectionnez un site"
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
        {sitesDetails?.filter(
            site => selectedSites && selectedSites.includes(site.public_id)
          )
          .map(site => (
            <Tag closable onClose={()=>handleUnslectSite(site.public_id)}>{site.name}</Tag>
          ))}
      </div>
      <Spin spinning={analyse.loading}>
        <div className="flex-wrap" style={{ display: "flex" }}>
          <Card
            className="w-full md:w-1/3"
            title="Mon portefeuille (solde à retirer)"
            bodyClassName="flex"
          >
            <div className="flex flex-col gap-4 pr-4">
              <LineChart width={65} height={40} data={data}>
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
                {d?.total_earning.toLocaleString("fr")} €
              </Text>
              <Text type="16-600" className="text-gray-6f">
                {d?.total_earning_last_contract.toLocaleString("fr")}€ avec
                l’ancien contrat
              </Text>
            </div>
          </Card>
          <Card
            className="w-full md:w-1/3"
            title="Mes volumes totaux vendus"
            bodyClassName="flex"
          >
            <div className="flex flex-col gap-4 pr-4">
              <LineChart width={65} height={40} data={data}>
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
                {d?.total_volume.toLocaleString("fr")} Kwh
              </Text>
              <Text type="16-600" className="text-gray-6f">
                {d?.total_volume_last_year.toLocaleString("fr")} Kwh en{" "}
                {d?.reference_year - 1}
              </Text>
            </div>
          </Card>
          <Card
            title="Mon portefeuille"
            className="w-full md:w-1/3"
            bodyClassName="flex"
          >
            <div className="flex flex-col gap-4 pr-4">
              <LineChart width={65} height={40} data={data}>
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
                {d?.current_portfolio.total_portfolio} €
              </Text>
              <Text type="16-600" className="text-gray-6f">
                {d?.current_portfolio.last_portfolio}€ avec
                l’ancien contrat
              </Text>
            </div>
          </Card>

          <Card className="w-full" title="Mes sites">
            <Table
              style={{ marginTop: -50 }}
              pagination={{
                position: ["topRight"],
              }}
              dataSource={d?.earning_by_station}
              columns={columns}
            />
          </Card>
          <Card
            className="w-full"
            title="Mon gain"
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
            <MixBarChart xScale={xScale.key} data={transform(d?.portfolio)} />
          </Card>
          <Card
            className="w-full"
            title="Mes volumes"
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
            <MixBarChart xScale={xScale2.key} data={transform(d?.volumes)} />
          </Card>
        </div>
      </Spin>
    </Layout>
  )
}
