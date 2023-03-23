import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import Card from "../components/Card"
import Text from "../components/Text"
import { Spin, Table } from "antd"
import AreaChart from "../components/Charts/LineChart"
import { DateSelector } from "../components/DateSelector"
import SelectDropdown from "../components/SelectDropdown"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchMarche } from "../redux/actions"

const columns = [
  {
    title: "Année",
    dataIndex: "Année",
    key: "Année",
    render: (_, record) => <b>{record["Année"]}</b>,

  },
  {
    title: "Cal Base",
    dataIndex: "Cal Base",
    key: "Cal Base",
    responsive: ["lg"],
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["Cal Base"]}</Text>,
  },
  {
    title: "Cal Pointe",
    dataIndex: "Cal Pointe",
    key: "Cal Pointe",
    responsive: ["lg"],
    render: (_, rec) => <Text type="16-600" className="text-gray-6f">{rec["Cal Pointe"]}</Text>,
  },
]
const columnsmecapa = [
  {
    title: "Date de l'enchère",
    dataIndex: "trading_date",
    key: "trading_date",
    render: (_, record) => <b>{record["trading_date"]}</b>,

  },
  {
    title: "Année",
    dataIndex: "start_time",
    key: "start_time",
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["start_time"]}</Text>,

  },
  {
    title: "Prix",
    dataIndex: "price",
    key: "price",
    responsive: ["lg"],
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["price"]}</Text>,
  },
]
const columnsgos = [
  {
    title: "Date de l'enchère",
    dataIndex: "publication_time",
    key: "publication_time",
    render: (_, record) => <b>{record["publication_time"].toLocaleString("fr")}</b>,

  },
  {
    title: "Date",
    dataIndex: "start_time",
    key: "start_time",
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["start_time"].toLocaleString("fr")}</Text>,

  },
  {
    title: "Technolgy",
    dataIndex: "technology",
    key: "technology",
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["technology"]}</Text>,

  },
  {
    title: "Prix",
    dataIndex: "price",
    key: "price",
    responsive: ["lg"],
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["price"].toLocaleString("fr")}</Text>,
  },
]
const columnsoa = [
  {
    title: "Date",
    dataIndex: "start_time",
    key: "start_time",
    render: (_, record) => <b>{record["start_time"].toLocaleString("fr")}</b>,

  },
  {
    title: "Contract Type",
    dataIndex: "contract_type",
    key: "contract_type",
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["contract_type"].toLocaleString("fr")}</Text>,

  },
  {
    title: "Prix",
    dataIndex: "contract_value",
    key: "contract_value",
    responsive: ["lg"],
    render: (_, record) => <Text type="16-600" className="text-gray-6f">{record["contract_value"].toLocaleString("fr")}</Text>,
  },
]

export default function Marche() {
  var start_date = new Date() 
  var today = new Date() 
  start_date.setDate(today.getDate() - 7); 
  
  const marche = useSelector((state: RootStateOrAny) => state.marche)
  const [xScale, setxScale] = useState({ key: "hour", value: "Heure" })
  const [start_time, setstart_time] = useState(start_date.toISOString().split('T')[0])
  const [end_time, setend_time] = useState(today.toISOString().split('T')[0])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMarche(start_time, end_time))
  }, [start_time, end_time])

  function transform(oldData, spotMarketPrice) {

    if (!oldData) return []
    let newData1 = oldData?.reduce((acc, item) => {
      if (!acc[item.start_time]) {
        acc[item.start_time] = {}
      }
      acc[item.start_time][item.contract_type] = item.contract_value
      return acc
    }, {})
    let newData2 = spotMarketPrice?.reduce((acc, item) => {
      if (!acc[item.start_time]) {
        acc[item.start_time] = {}
      }
      acc[item.start_time]["Prix marché Spot"] = item["Prix marché Spot"]
      return acc
    }, newData1)
    var arr: any[] = []
    Object.entries(newData2).forEach(([key, value]) =>
      arr.push({ date: key, ...value })
    )
    return arr
  }

  const handleSlectHour = val => {
    setxScale(val)
  }



  const d = marche.data
  console.log('uuu',d?.spotMarketPrice)
  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Marché" />
      <Layout.Header>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Marché
        </h1>
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
      </Layout.Header>
      <Spin spinning={marche.loading}>
        <div className="flex-wrap" style={{ display: "flex" }}>
          <Card
            className="w-full"
            title="Prix marché"
            help="Prix marché help"
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
            <AreaChart
              xScale={xScale.key}
              data={transform(d?.OAcontract, d?.spotMarketPrice)}
            />
          </Card>
          <Card className="w-full md:w-1/3" title="Prix futur"  help="futur help">
            <Table
              pagination={false}
              dataSource={d?.futuresMarketPrice}
              columns={columns}
            />
          </Card>
          <div className="w-full md:w-1/3">
            <Card title="Prix marché Spot (€/MWh)" help="Prix Spot help">
              <div className="flex">
                <div className="w-1/3">
                  <Text type="16-600">Date</Text> <br />
                  <Text type="16-600" className="text-gray-6f">
                    {d?.spotPrices.Date}
                  </Text>
                </div>
                <div className="w-1/3">
                  <Text type="16-600">Spot Base</Text> <br />
                  <Text type="16-600" className="text-gray-6f">
                    {d?.spotPrices["Spot Base"].toLocaleString("fr")}
                  </Text>
                </div>
                <div className="w-1/3">
                  <Text type="16-600">Spot Pointe</Text> <br />
                  <Text type="16-600" className="text-gray-6f">
                    {d?.spotPrices["Spot Pointe"].toLocaleString("fr")}
                  </Text>
                </div>
              </div>
            </Card>
            <Card title="Prix Garanties d’origine" help="Gos help">
              <Table
                pagination={false}
                dataSource={d?.GOs}
                columns={columnsgos}
              />
            </Card>
          </div>
          <div className="w-full md:w-1/3">
            <Card title="Prix Mécanisme de capacité"  help="Mécanisme help">
              <Table
                pagination={false}
                dataSource={d?.MecaCapa}
                columns={columnsmecapa}
              />
            </Card>
            <Card title="Prix Ancien contrat"  help="contrat help">
            
              <Table
                pagination={false}
                dataSource={d?.OAContractBase}
                columns={columnsoa}
              />
            </Card>
          </div>
        </div>
      </Spin>
    </Layout>
  )
}
