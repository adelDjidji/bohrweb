import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import SelectDropdown from "../components/SelectDropdown"
import { DateSelector } from "../components/DateSelector"
import Text from "../components/Text"
import Card from "../components/Card"
import DeltaBadge from "../components/DeltaBadge"
import DashLine from "../components/Charts/DashLineChart"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchForecast } from "../redux/actions"
import moment from "moment"
import { Spin } from "antd"

export default function Previsions() {
  const { sites } = useSelector((state: RootStateOrAny) => state.commun)
  const { data, loading } = useSelector(
    (state: RootStateOrAny) => state.forecast
  )
  const [start_time, setstart_time] = useState("2023-01-01")
  const [end_time, setend_time] = useState("2023-01-02")
  const [xScale, setxScale] = useState({ key: "hour", value: "Heure" })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchForecast(start_time, end_time))
  }, [start_time, end_time])

  const handleSlectHour = val => {
    setxScale(val)
  }
  const handleSlectSite = val => {}

  return (
    <Layout isDashboard={true}>
      <Seo title="Bohr Energie | Prévisions" />
      <Layout.Header>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Prévisions
        </h1>
        <div className="flex items-center gap-x-5 gap-y-3 flex-wrap">
          <SelectDropdown
            items={sites}
            keyAttribute="public_id"
            valueAttribute="name"
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

          <SelectDropdown
            items={[
              { key: "hour", value: "Heure" },
              { key: "day", value: "Jour" },
              { key: "week", value: "Semaine" },
              { key: "month", value: "Mois" },
            ]}
            onSelect={handleSlectHour}
            placeholder="Hour"
            type="none"
            width={112}
          />
        </div>
      </Layout.Header>
      <Spin spinning={loading}>
        <div className="flex-wrap" style={{ display: "flex" }}>
          <Card
            className="w-full"
            title="Prévision du prix marché"
            headerRight={
              <div className="p-3 rounded" style={{ background: "#F5F6FA" }}>
                <Text type="16-600" className="text-gray-6f">
                  Actualisé le{" "}
                  {moment(data?.refresh_datetime).format("DD MMM YYYY à HH:mm")}
                </Text>
              </div>
            }
          >
            <div className="flex items-center gap-x-4 mb-1.5">
              <Text type="32-600">4,56€/MWh</Text>
            </div>
            <DashLine
              xScale={xScale.key}
              dataReal={data?.spotRealised}
              dataPrediction={data?.spotForecast}
            />
          </Card>
          <Card
            className="w-full"
            title="Prévision du production"
            headerRight={
              <div className="p-3 rounded" style={{ background: "#F5F6FA" }}>
                <Text type="16-600" className="text-gray-6f">
                  Actualisé le{" "}
                  {moment(data?.refresh_datetime).format("DD MMM YYYY à HH:mm")}
                </Text>
              </div>
            }
          >
            <div className="flex items-center gap-x-4 mb-1.5">
              <Text type="32-600">250 Kwh</Text>
            </div>
            <DashLine
              xScale={xScale.key}
              dataReal={data?.productionRealised}
              dataPrediction={data?.productionForecast}
            />
          </Card>
          <Card
            className="w-full"
            title="Prévision du portefeuille"
            headerRight={
              <div className="p-3 rounded" style={{ background: "#F5F6FA" }}>
                <Text type="16-600" className="text-gray-6f">
                  Actualisé le{" "}
                  {moment(data?.refresh_datetime).format("DD MMM YYYY à HH:mm")}
                </Text>
              </div>
            }
          >
            <div className="flex items-center gap-x-4 mb-1.5">
              <Text type="32-600">1 250 362 €</Text>
            </div>
            <DashLine
              xScale={xScale.key}
              dataReal={data?.portfolioRealised}
              dataPrediction={data?.portfolioForecast}
            />
          </Card>
          <Card
            className="w-full"
            title="Prévision de gains"
            headerRight={
              <div className="p-3 rounded" style={{ background: "#F5F6FA" }}>
                <Text type="16-600" className="text-gray-6f">
                  Actualisé le{" "}
                  {moment(data?.refresh_datetime).format("DD MMM YYYY à HH:mm")}
                </Text>
              </div>
            }
          >
            <div className="flex items-center gap-x-4 mb-1.5">
              <Text type="32-600">250 362 €</Text>
            </div>
            <DashLine
              xScale={xScale.key}
              dataReal={data?.gainRealised}
              dataPrediction={data?.gainForecast}
            />
          </Card>
        </div>
      </Spin>
    </Layout>
  )
}
