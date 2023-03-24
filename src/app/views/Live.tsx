import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import SelectDropdown from "../components/SelectDropdown"
import { DateSelector } from "../components/DateSelector"
import Card from "../components/Card"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchBenchmark, fetchForecast, fetchLive, fetchSitesDetail } from "../redux/actions"
import { Spin } from "antd"
import SyncChart from "../components/Charts/SyncChart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Title } from 'recharts';
import Text from "../components/Text"
import moment from "moment"

export default function Live() {


  var start_date = new Date() 
  var today = new Date() 
  start_date.setDate(today.getDate() -0); 
  var end_date = new Date() 
  end_date.setDate(end_date.getDate()); 
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSitesDetail())
  }, [])

  const sites_ = useSelector((state: RootStateOrAny) => state.sites)
  const { data, loading } = useSelector((state: RootStateOrAny) => state.live)

  const [start_time, setstart_time] = useState(start_date.toISOString().split('T')[0])
  const [end_time, setend_time] = useState(end_date.toISOString().split('T')[0])


  const [sites, setSites] = useState(sites_.data)
  const [selectedSites, setSelectedSites] = useState(sites_?.data[0])


   useEffect(() => {
    console.log('fetchLive')
     dispatch(fetchLive(start_time, end_time,selectedSites.public_id))
   }, [start_time, end_time,selectedSites])
 
   const [type, setType] = useState([])
   const [turbine, setTurbine] = useState([])
   const [dataTurbine, setDataTurbine] = useState([])
   const [indexPuissance, setIndexPuissance] = useState([])


   useEffect(() => {
    const x = data?.wit.map(item => item.type).filter((value, index, self) => self.indexOf(value) === index)
    setType(x)
    setTurbine(x.filter((i) => i.startsWith("p_active_g")))
    setIndexPuissance(x.filter((i) => i.startsWith("idx_p_")))
   }, [data])

   console.log('data type',type)
   console.log('data turbine',turbine)
   console.log('data dataturbine',dataTurbine)
   

   const handleSelectSite = val => {
     setSelectedSites(val)
   }

   
  //  const handleSelectSite = val => {
  //    setSelectedSites(val)
  //  }
  
  // const handleSelectSite = val => {
  //   setSelectedSites(val)
  // }


  const data2 = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
              return (
                <div
                  className="text-white rounded-lg p-2"
                  style={{ background: "#20263D" }}
                >
                  <div><Text type="14-600">{moment(payload[0]['payload']['start_time']).format("HH:mm")}</Text> </div><br />
                  {payload.map(p => (
                    <div>
                      <Text type="12-500"> Measure : 
                      { p.payload.measure ? ' ' + parseInt(p.payload.measure).toLocaleString("fr") + ' '  + p.payload.unit : ''}
                      </Text> 
                    </div>
                  ))}
                </div>
              )
          }
    else {
      return null
    }
}

  const dateFormatter = date => {
    // return moment(date).unix();
    return moment(date).format("HH:mm");
  };

  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Benchmark" />
      <Layout.Header>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Live
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

        </div>
      </Layout.Header>
      <Spin spinning={loading}>
        <div className="flex-wrap" style={{ display: "flex" }}>
          <Card
            className="w-full"
            title="Observation en temps réel"
          >

        <div className="flex-wrap" style={{ display: "flex", flexDirection:'row', justifyContent:'space-between' }}>
        { turbine.map((i) =>{
          return (


          <div style={{textAlign:'center'}}>
          <Text type="16-600" style={{margin:'20px'}}>{i} currently at  {parseInt(data?.wit.filter((j)=> j.type == i ).slice(-1)[0].measure) + ' KwH'} </Text>
            <AreaChart
              width={400}
              height={400}
              data={data?.wit.filter((j)=> j.type == i )}
              margin={{
                top: 40,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <XAxis dataKey="start_time" interval={240}
                      tickFormatter={dateFormatter}/>
              <YAxis />
              <Tooltip
                content={p => <CustomTooltip {...p} />}
                cursor={{ fill: "transparent" }}
                />
              <Area type="monotone" dataKey="measure" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </div>
    
          

          )

        })
        }
        </div>




        <div className="flex-wrap" style={{ display: "flex", flexDirection:'row', justifyContent:'space-between' }}>
        { indexPuissance.map((i) =>{
          return (
            <div style={{textAlign:'center'}}>
            <Text type="16-600" style={{margin:'20px'}}>{i}</Text>
              <AreaChart
                width={400}
                height={400}
                data={data?.wit.filter((j)=> j.type == i )}
                margin={{
                  top: 40,
                  right: 10,
                  left: 0,
                  bottom: 20,
                }}
              >
                <XAxis dataKey="start_time" interval={480}
                      tickFormatter={dateFormatter}/>
                <YAxis  domain={['dataMin', 'dataMax']}/>
                <Tooltip
                content={p => <CustomTooltip {...p} />}
                cursor={{ fill: "transparent" }}
                />
                <Area type="monotone" dataKey="measure" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </div>
          )
        })
        }

        </div>


          </Card>
        </div>
      </Spin>
    </Layout>
  )
}
