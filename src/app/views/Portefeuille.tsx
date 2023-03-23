import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import { Icon, IconNames } from "../components/Icon"
import Card from "../components/Card"
import { Line, LineChart } from "recharts"
import DeltaBadge from "../components/DeltaBadge"
import Text from "../components/Text"
import { Avatar } from "antd"
import { stringToHexColor } from "../utils"
import ModalPortefeuille from "../components/ModalPortefeuille"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchPortfolio } from "../redux/actions"
import SitesTable from "../components/Manage/SitesTable"


const data = [
  {
    name: "Assigny",
    uv: 50362,
    pv: 2400,
  },
  {
    name: "Orlu",
    uv: 5000,
    pv: 1398,
  },
  {
    name: "Rivesaltes",
    uv: 2000,
    pv: 6800,
  },
  {
    name: "Salles-Curan",
    uv: 2780,
    pv: 9908,
  },
  {
    name: "Harcanville",
    uv: 1890,
    pv: 14800,
  },
  {
    name: "Orlu",
    uv: 1890,
    pv: 14800,
  },
  {
    name: "Rivesaltes",
    uv: 1890,
    pv: 14800,
  },
  {
    name: "Salles-Curan",
    uv: 1890,
    pv: 14800,
  },
]


export const SiteEncaise = ({ item, width = "1/4" }) => (
  <div className={`flex items-center sm:w-${width} mb-2`}>
    <Avatar
      gap={9}
      style={{
        backgroundColor: stringToHexColor(item.name),
        color: "white",
        marginRight: 9,
      }}
      size={40}
    >
      {item.name.slice(0, 2)}
    </Avatar>
    <div>
      <Text type="16-600" className="text-gray-6f">
        {item.name}
      </Text>
      <br />
      <Text type="16-600" className="text-dark-grey">
        {parseInt(item.portfolio).toLocaleString("fr")} €
      </Text>
    </div>
  </div>
)
export default function Portefeuille() {
  const { data: d, loading } = useSelector(
    (state: RootStateOrAny) => state.portfolio
  )
 

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [])



  const [modalOpen, setmodalOpen] = useState(false)


  

  
  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Portefeuille" />
      <Layout.Header respo={false}>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Portefeuille
        </h1>
        <button
          className="bg-violet-bohr text-white flex items-center justify-center py-2.5 px-4 rounded-lg"
          type="button"
          onClick={() => {
            setmodalOpen(true)
          }}
        >
          <Icon name={IconNames.check} />
          <span className="ml-2.5">Encaisser un solde</span>
        </button>
      </Layout.Header>
      <div className="flex-wrap" style={{ display: "flex" }}>
        <Card
          title="Solde total"
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
            <DeltaBadge delta={d?.portfolio_delta * 100} />
          </div>
          <div>
            <Text type="32-600" className="block mb-1.5">
              {parseInt(d?.total_portfolio).toLocaleString("fr")} €
            </Text>
            <Text type="16-600" className="text-gray-6f">
              {parseInt(d?.last_portfolio).toLocaleString("fr")}€ avec l’ancien contrat
            </Text>
          </div>
        </Card>
        <Card
          title="Répartition par site"
          className="w-full md:w-2/3"
          bodyClassName="flex flex-wrap gap-y-10 gap-x-2"
        >
          {d?.portfolio_by_site.map(item => (
            <SiteEncaise item={item} />
          ))}
        </Card>
        <SitesTable/>
      </div>
      <ModalPortefeuille
        data={d?.portfolio_by_site}
        total={d?.total_portfolio}
        open={modalOpen}
        onClose={() => setmodalOpen(false)}
      />
    </Layout>
  )
}
