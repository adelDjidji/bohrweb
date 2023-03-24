import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from "react"
import moment from "moment"
import Text from '../Text';

interface P {
 data: any,
}

const  SyncChart: React.FC<P> = ({data}) => {

  const [dataChart,setDataChart] = useState([])
  const [dataChartMeteo,setDataChartMeteo] = useState([])
  const [dataChartRiver,setDataChartRiver] = useState([])
  const [dataChartProd,setDataChartProd] = useState([])
  const [axisData,setAxisData] = useState([])

  const transformRiver = (data) => {

    const groupedData = {};
    const axisData2 = {'axis':[]}

      Object.keys(data).map((key, index) => {
        for (const item of  data[key]) {
          if (!groupedData[key.substring(0,4)]) {
            groupedData[key.substring(0,4)] = [];
          }
          // const formatted = item.map( i => { return {...i, start_time : moment(i.start_time).format("DD MMM")} })
          axisData2['axis'].push({"start_time" : moment(item.start_time).format("MM/DD HH:mm")});
          groupedData[key.substring(0,4)].push({...item, start_time : moment(item.start_time).format("MM/DD HH:mm"), [key.substring(0,4)] : parseInt(item['flow_rate'])});
        }
      })

    const axisData3 = axisData2.axis.filter((v,i,a)=>a.findIndex(v2=>(v2.start_time===v.start_time))===i)
    const axisData4 = axisData3.sort(compare)
    setDataChartRiver(groupedData)
    setAxisData(axisData4)

  }

  const transformMeteo = (data) => {

    const groupedData = {};
    const axisData2 = {'axis':[]}

      Object.keys(data).map((key, index) => {
        for (const item of  data[key]) {
          if (!groupedData[key.substring(0,4)]) {
            groupedData[key.substring(0,4)] = [];
          }
          // const formatted = item.map( i => { return {...i, start_time : moment(i.start_time).format("DD MMM")} })
          axisData2['axis'].push({"start_time" : moment(item.start_time).format("MM/DD HH:mm")});
          groupedData[key.substring(0,4)].push({...item, start_time : moment(item.start_time).format("MM/DD HH:mm"), [key.substring(0,4)] : parseInt(item['precipitation'])});
        }
      })

    const axisData3 = axisData2.axis.filter((v,i,a)=>a.findIndex(v2=>(v2.start_time===v.start_time))===i)
    const axisData4 = axisData3.sort(compare)
    setDataChartMeteo(groupedData)
    setAxisData(axisData4)

  }

  
  const transformProd = (data) => {

    const groupedData = {};
    const axisData2 = {'axis':[]}

      Object.keys(data).map((key, index) => {
        for (const item of  data[key]) {
          if (!groupedData[key.substring(0,4)]) {
            groupedData[key.substring(0,4)] = [];
          }
          // const formatted = item.map( i => { return {...i, start_time : moment(i.start_time).format("DD MMM")} })
          axisData2['axis'].push({"start_time" : moment(item.start_time).format("MM/DD HH:mm")});
          groupedData[key.substring(0,4)].push({...item, start_time : moment(item.start_time).format("MM/DD HH:mm"), [key.substring(0,4)] : parseInt(item['volume'])});
        }
      })

    const axisData3 = axisData2.axis.filter((v,i,a)=>a.findIndex(v2=>(v2.start_time===v.start_time))===i)
    const axisData4 = axisData3.sort(compare)
    setDataChartProd(groupedData)
    setAxisData(axisData4)

  }




  function compare( a, b ) {
    if ( a.start_time < b.start_time ){
      return -1;
    }
    if ( a.start_time > b.start_time ){
      return 1;
    }
    return 0;
  }
  
 


  useEffect(() => {
    if (data) {
      if (data.meteo) {

        transformRiver(data.meteo.riverFlow)
        transformMeteo(data.meteo.meteo)
      }
      if (data.production) {
        transformProd(data.production)
      }
      
    }
   }, []);



const color = { 2020: "purple",
                2021 : "blue",
                2022 : "red",
                2023 : "green",
                2024 : "yellow",
                2025 : "grey",
              }


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
              return (
                <div
                  className="text-white rounded-lg p-2"
                  style={{ background: "#20263D" }}
                >
                  <div><Text type="14-600">{moment(payload[0]['payload']['start_time'],"MM/DD HH:mm").format("DD MMM HH:mm")}</Text> </div><br />
                  {payload.map(p => (
                    <div>
                      <Text type="12-500"> {Object.keys(p.payload)[0]} : 
                      { p.payload.volume ? ' ' + parseInt(p.payload.volume).toLocaleString("fr") + ' KwH'
                          : p.payload.flow_rate ? ' ' + parseInt(p.payload.flow_rate).toLocaleString("fr") + ' m3/s'
                            : ' ' + parseInt(p.payload.precipitation).toLocaleString("fr") + ' mm/h'
                      } </Text> 
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
  return moment(date,"MM/DD HH:mm").format("DD MMM HH:mm");
};

  return (
<>
<Text type="16-600" style={{marginBottom:'20px'}}>Production (Enedis)</Text>

<ResponsiveContainer width="100%" height={400}>
    <LineChart
      data={data}
      syncId="anyId"
      margin={{
        top: 30,
        right: 30,
        left: 0,
        bottom: 30,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
            dataKey="start_time"
            type="category"
            allowDuplicatedCategory={false}
            interval={24}
            tickFormatter={dateFormatter}
          />
          <YAxis />
          <Tooltip
          content={p => <CustomTooltip {...p} />}
          cursor={{ fill: "transparent" }}
          />
          <Legend verticalAlign="top" height={36}/>

          <Line data={axisData} />


        {
          Object.keys(dataChartProd).map((key, index) => {
            return (
              <Line type="monotone" data={dataChartProd[key.substring(0,4)]} stroke={color[key.substring(0,4)]} strokeWidth={2} dataKey={key.substring(0,4)} dot={false}/>
            )
          })
                
        }
    </LineChart>

  </ResponsiveContainer>

  <Text type="16-600" style={{marginBottom:'20px'}}>Débit (m3/s)</Text>

    <ResponsiveContainer width="100%" height={300}>
    <LineChart
          syncId="anyId"
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="start_time"
            type="category"
            allowDuplicatedCategory={false}
            interval={24}
            tickFormatter={dateFormatter}
          />
          <YAxis />
          <Tooltip
          content={p => <CustomTooltip {...p} />}
          cursor={{ fill: "transparent" }}
          />


          <Line data={axisData} />


        {
          Object.keys(dataChartRiver).map((key, index) => {
            return (
              <Line type="monotone" data={dataChartRiver[key.substring(0,4)]} connectNulls={true} stroke={color[key.substring(0,4)]} strokeWidth={2} dataKey={key.substring(0,4)} dot={false}/>
            )
          })
                
        }
        <Brush />
        </LineChart>
  </ResponsiveContainer>

  <Text type="16-600" style={{marginBottom:'20px'}}>Précipitations (mm/h)</Text>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={data}
      syncId="anyId"
      margin={{
        top: 30,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
            dataKey="start_time"
            type="category"
            allowDuplicatedCategory={false}
            interval={24}
            tickFormatter={dateFormatter}
          />
          <YAxis />
          <Tooltip
          content={p => <CustomTooltip {...p} />}
          cursor={{ fill: "transparent" }}
          />

          <Line data={axisData} />


        {
          Object.keys(dataChartMeteo).map((key, index) => {
            return (
              <Line type="basis" data={dataChartMeteo[key.substring(0,4)]} stroke={color[key.substring(0,4)]} strokeWidth={2} dataKey={key.substring(0,4)} dot={false}/>
            )
          })
                
        }
    </LineChart>
  </ResponsiveContainer>


  </>
  );

};
export default SyncChart;