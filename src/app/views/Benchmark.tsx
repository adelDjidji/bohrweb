import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import SelectDropdown from "../components/SelectDropdown"
import { DateSelector } from "../components/DateSelector"
import Card from "../components/Card"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchBenchmark, fetchForecast, fetchSitesDetail } from "../redux/actions"
import { Spin } from "antd"
import SyncChart from "../components/Charts/SyncChart"

export default function Benchmark() {
  var start_date = new Date() 
  var today = new Date() 
  start_date.setDate(today.getDate() - 10); 
  var end_date = new Date() 
  end_date.setDate(end_date.getDate()); 
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSitesDetail())
  }, [])

  const sites_ = useSelector((state: RootStateOrAny) => state.sites)
  const { data, loading } = useSelector((state: RootStateOrAny) => state.benchmark)

  const [start_time, setstart_time] = useState(start_date.toISOString().split('T')[0])
  const [end_time, setend_time] = useState(end_date.toISOString().split('T')[0])
  const [xScale, setxScale] = useState({ key: "hour", value: "Heure" })
  const [sites, setSites] = useState(sites_.data)
  const [selectedSites, setSelectedSites] = useState(sites_?.data[0])


  useEffect(() => {
   console.log('fetchBenchmark')
    dispatch(fetchBenchmark(start_time, end_time,selectedSites.public_id))
  }, [start_time, end_time,selectedSites])

  
  const handleSelectSite = val => {
    setSelectedSites(val)
  }

  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Benchmark" />
      <Layout.Header>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Benchmark
        </h1>
        <div className="flex items-center gap-x-5 gap-y-3 flex-wrap">
          <SelectDropdown
            items={sites}
            keyAttribute="public_id"
            valueAttribute="name"
            defaultValues={selectedSites}
            onSelect={handleSelectSite}
            placeholder="Sélectionnez un site"
            defaultValue={selectedSites}
            type={"radio"}
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
      <Spin spinning={loading}>
        <div className="flex-wrap" style={{ display: "flex" }}>
          <Card
            className="w-full"
            title=""
            headerRight={
              <div className="p-3 rounded" style={{ background: "#F5F6FA" }}>
              Comparaison sur la même periode
              </div>
            }
          >
            <SyncChart
              data={data}/>
          </Card>
        </div>
      </Spin>
    </Layout>
  )
}
