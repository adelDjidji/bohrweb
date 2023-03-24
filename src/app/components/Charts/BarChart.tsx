import React from "react";
import {
  Area,
  XAxis,
  BarChart,
  Legend,
  YAxis,
  Bar,
  ComposedChart,
  Text as TextR,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Text from "../Text"



interface P {
  unit : any, 
  maxTickNumber : any,
  customTooltip: any, data: any, dataKey1: any, dataKey2: any,dataKeyRender1:any,dataKeyRender2:any
}

const  BarChartComponent: React.FC<P> = ({ unit, maxTickNumber,customTooltip, data, dataKey1, dataKey2,dataKeyRender1,dataKeyRender2 }) => {

  const [chartdata, setChartData] = React.useState(data);

  React.useEffect(() => {
    const data_int = chartdata.map( item => { return {...item, [dataKey1] : parseInt(item[dataKey1]),[dataKey2] : parseInt(item[dataKey2]) } })

    setChartData(data_int)
  }, []);
  
  const payloadMapper = payload => {
    const power = payload[0].payload.power_earning
    const gos = payload[0].payload.gos_earning
    const mecapa = payload[0].payload.mecapa_earning
     return [
      {
        title: "Production électrique",
        data: power,
      },
      {
        title: "Garanties d’origines",
        data: gos,
      },
      {
        title: "Mécanisme de capacité",
        data: mecapa,
      },
    ]
  }

  const renderLabel = (label: string) => {
    if (label == dataKey1) return dataKeyRender1
    if (label == dataKey2) return dataKeyRender2
    return label
  }

  const Value = ({ value = 0, desc = "" }) => (
    <div>
      {" "}
      <small>{renderLabel(desc)}</small>{" "}
      <Text type="14-600" className="mr-2">
        {value.toLocaleString("fr")} €
      </Text>
    </div>
  )

  const CustomTooltip = ({ active, payload, label }) => {
    

    if (active && payload && payload.length) {

      if (customTooltip) {
        const data = payloadMapper(payload)
        return (
          <>
          
          <div
            className="text-white rounded-lg p-2"
            style={{ background: "#20263D" }}
          >
            <div><Text type="14-600">{payload[0]['payload']['name']}</Text> </div><br />
            {data.map(({ title, data }) => (
              <div className="mb-2">
                <Text type="12-500">{title}</Text> <br />
                <Value value={parseInt(data).toLocaleString("fr")} />
              </div>
            ))}
          </div>
          </>
        )
      } else {
        return (
        
          <div
            className="text-white rounded-lg p-2"
            style={{ background: "#20263D" }}
          >
            <div><Text type="14-600">{payload[0]['payload']['name']}</Text> </div><br />
            {payload.map(p => (
              <div>
                <Text type="12-500">{renderLabel(p.name)}</Text> : 
                <Text type="14-600">  {parseInt(p.value).toLocaleString("fr")} Mwh</Text>
              </div>
            ))}
          </div>
        )
      }
    }

    return null
  }


  const CustomizedAxisTick = ({x, y, payload}) => {
       return   (  
                <g transform={`translate(${x},${y})`}>
                  <TextR x={0} y={0} dy={16} width={90} height={70} textAnchor="middle" verticalAnchor="start"  fill="#666">
                    {payload.value}
                  </TextR>
                </g>
              )  
    }


  return (

    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={730} height={250} data={chartdata}  style={{ background: "white" }}
       margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis tickLine={false} axisLine={false} height={78} minTickGap={0} interval={0} tick={<CustomizedAxisTick />} dataKey="name" />


        <YAxis
          width={70}
          unit = {unit}
          tickLine={false}
          axisLine={false}
          domain={['auto', 'auto']}
          tickFormatter={(value) =>
            new Intl.NumberFormat("fr", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value)
          }
        />
        <Tooltip
          content={p => <CustomTooltip {...p} />}
          cursor={{ fill: "transparent" }}
        />
         <Legend
           wrapperStyle={{
             marginLeft: 20,
             top: -35,
             display: "flex",
             justifyContent: "end",
           }}
           iconType="circle"
           verticalAlign="top"
           formatter={(value, entry, index) => renderLabel(value)}
         />
         <Bar
           dataKey={dataKey1}
           enableBackground={"x"}
           fill="#82ca9d"
           barSize={12}
           radius={[20, 20, 20, 20]}
         />
         <Bar
           dataKey={dataKey2}
           enableBackground={"x"}
           fill="#8884d8"
           barSize={12}
           radius={[20, 20, 20, 20]}
         />
      </BarChart>
    </ResponsiveContainer>

  );
};

export default BarChartComponent;