import React, { useEffect } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { setCurrentUser } from "../redux/actions/auth"
import Card from "../components/Card"
import Text from "../components/Text"
import { Icon } from "../components/Icon"
import BarChart from "../components/Charts/BarChart"
import PieChart from "../components/Charts/PieChart"
import DeltaBadge from "../components/DeltaBadge"
import { Spin, Table } from "antd"
import { fetchDashboard } from "../redux/actions"

const columns = [
  {
    title: "Année",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Certifiées",
    dataIndex: "certified",
    key: "certified",
    responsive: ["lg"],
    render: (_, { certified }) => certified?.toLocaleString("fr"),
  },
  {
    title: "Vendues",
    dataIndex: "sold",
    key: "sold",
    responsive: ["lg"],
    render: (_, { sold }) => sold?.toLocaleString("fr"),
  },
  {
    title: "Restantes",
    dataIndex: "remaining",
    key: "remaining",
    responsive: ["lg"],
    render: (_, { remaining }) => remaining.toLocaleString("fr"),
  },
  {
    title: "Gain",
    dataIndex: "earning",
    key: "earning",
    render: (_, { earning }) => earning.toLocaleString("fr"),
  },
]

export default function Dashboard() {
  const auth = useSelector((state: RootStateOrAny) => state.auth)
  const dashboard = useSelector((state: RootStateOrAny) => state.dashboard)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [])

  const d = dashboard?.data

  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Tableau de bord" />
      <Layout.Header>
        <div>
          <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-2">
            Bonjour {auth.currentUser?.name.split(" ")[0]},
          </h1>
          <p className="text-gray-6f font-medium text-xl">
            Voici le résumé de l’activité de vos sites.
          </p>
        </div>
      </Layout.Header>
      <Spin spinning={dashboard.loading}>
        {dashboard?.loading || !d ? null : (
          <div className="flex-wrap" style={{ display: "flex" }}>
            <img
              src="/images/accueil.png"
              alt="dashboard"
              style={{ width: 167, position: "absolute", right: 66, top: 14 }}
              className="hidden md:block"
            />
            <Card
              className="w-full md:w-1/2"
              title="Mon gain global annuel"
              voirPlus
              details={
                <>
                  <div className="flex items-center gap-x-4 mb-1.5">
                    <Text type="32-600">
                      {parseInt(d?.total_earning).toLocaleString("fr")} €
                    </Text>
                    <DeltaBadge delta={d?.total_earning_delta * 100} />
                  </div>
                  <Text type="16-600" className="text-gray-6f">
                    <span>
                      {parseInt(d?.total_earning_last_contract).toLocaleString("fr")}
                    </span>{" "}
                    € avec l’ancien contrat
                  </Text>
                  <BarChart
                    unit="K€"
                    maxTickNumer={undefined}
                    customTooltip={true}
                    data={d?.earning_by_station}
                    dataKey1="total_earning_last_contract"
                    dataKey2="total_earning"
                  />
                </>
              }
            >
              <div className="flex items-center gap-x-4 mb-1.5">
                <Text type="32-600">
                  {parseInt(d?.total_earning).toLocaleString("fr")} €
                </Text>
                <DeltaBadge delta={d?.total_earning_delta * 100} />
              </div>
              <Text type="16-600" className="text-gray-6f">
                <span>{parseInt(d?.total_earning_last_contract).toLocaleString("fr")}</span>{" "}
                € avec l’ancien contrat
              </Text>
              <BarChart
                unit="€"
                maxTickNumer={5}
                customTooltip={true}
                data={d?.earning_by_station}
                dataKey1="total_earning_last_contract"
                dataKey2="total_earning"
              />
            </Card>
            <Card
              className="w-full md:w-1/2"
              title="Ma production globale annuelle"
              voirPlus
              details={
                <>
                  <div className="flex items-center gap-x-4  mb-1.5">
                    <Text type="32-600">
                      {parseInt(d?.total_volume).toLocaleString("fr")} Kwh
                    </Text>
                    <DeltaBadge delta={d?.total_volume_delta * 100} />
                  </div>
                  <Text type="16-600" className="text-gray-6f">
                    {parseInt(d?.total_volume_last_year).toLocaleString("fr")} Kwh en{" "}
                    {d?.reference_year - 1}
                  </Text>
                  <BarChart
                    unit="Kwh"
                    maxTickNumer={5}
                    data={d?.volume_by_station}
                    dataKey1="total_volume_last_year"
                    dataKeyRender1={`${d?.reference_year - 1}`}
                    dataKey2="total_volume"
                    dataKeyRender2={`${d?.reference_year}`}
                  />
                </>
              }
            >
              <div className="flex items-center gap-x-4  mb-1.5">
                <Text type="32-600">
                  {parseInt(d?.total_volume).toLocaleString("fr")} Kwh
                </Text>
                <DeltaBadge delta={d?.total_volume_delta * 100} />
              </div>
              <Text type="16-600" className="text-gray-6f">
                {parseInt(d?.total_volume_last_year).toLocaleString("fr")} Kwh en{" "}
                {d?.reference_year - 1}
              </Text>
              <BarChart
                unit="Kwh"
                maxTickNumer={5}
                data={d?.volume_by_station}
                dataKey1="total_volume_last_year"
                dataKeyRender1={`${d?.reference_year - 1}`}
                dataKey2="total_volume"
                dataKeyRender2={`${d?.reference_year}`}
              />
            </Card>
            <Card
              className="w-full md:w-1/3"
              title="Mon portefeuille (solde à retirer)"
            >
              <div className="flex items-center gap-x-4  mb-1.5">
                <Text type="32-600">
                  {parseInt(d?.current_portfolio.total_portfolio).toLocaleString("fr")} €
                </Text>
                <DeltaBadge delta={d?.current_portfolio.portfolio_delta * 100} />
              </div>
              <Text type="16-600" className="text-gray-6f">
                {parseInt(d?.current_portfolio.last_portfolio).toLocaleString("fr")} € avec
                l’ancien contrat
              </Text>

              <PieChart values={d?.current_portfolio} />
            </Card>
            <Card className="w-full md:w-2/3" title="Mes mécansimes de capacité ">
              <Table
                pagination={false}
                dataSource={d?.mecapa_portfolio}
                columns={columns}
              />
            </Card>
          </div>
        )}
      </Spin>
      
    </Layout>
  )
}
