import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { stringToHexColor } from "../../utils"
import Text from "../Text"
import { Xtransformer } from "./LineChart"

const default_Data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="text-white rounded-lg p-2"
        style={{ background: "#20263D" }}
      >
        {payload.map(p => (
          <div>
            <Text type="12-500">{p.name}</Text> <br />
            <Text type="14-600">{p.value.toLocaleString("fr")} €</Text>
          </div>
        ))}
      </div>
    )
  }

  return null
}

type Iprops = {
  data: any[],
  xScale:string
}
function MixBarChart({ data, xScale='hour' }: Iprops) {
  const [transData, settransData] = useState<any>([])
  const [sites, setsites] = useState()

  // useEffect(() => {
  //   // const new_Arr = transform(data)
  //   // settransData(new_Arr)
  //   // setsites(Object.keys(new_Arr[0]).filter(k=>k!='date'))
  // }, [data])

  function calculateRadius(
    total: number,
    index: number
  ): [number, number, number, number] | 0 {
    if (total == 0) return 0
    if (index == 0) return [0, 0, 20, 20]
    if (index == total) return [20, 20, 0, 0]
    else return 0
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={Xtransformer(data, xScale)} style={{ background: "white" }}>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis tickLine={false} axisLine={false} dataKey="date" />
        <YAxis
          label={{
            value: " K€",
            angle: 0,
            position: "insideTopLeft",
            offset: 10,
          }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val)=>(val/1000).toLocaleString('fr')}
        />
        <Tooltip
          content={p => <CustomTooltip {...p} />}
          cursor={{ fill: "transparent" }}
        />
        <Legend
          wrapperStyle={{
            marginLeft: 20,
            top: -15,
          }}
          iconType="circle"
          align="left"
          verticalAlign="top"
        />
        {data?.length &&
          Object.keys(data[0])
            .filter(k => k != "date")
            .map((key, index) => {
              return (
                <Bar
                  dataKey={key}
                  stackId="a"
                  fill={stringToHexColor(key)}
                  barSize={12}
                  radius={calculateRadius(Object.keys(data[0])?.length-2, index)}
                />
              )
            })}
        {/* <Bar
          dataKey="pv"
          stackId="a"
          fill="#8884d8"
          barSize={12}
          radius={[0, 0, 20, 20]}
        />
        <Bar
          dataKey="uv"
          stackId="a"
          fill="#FFD300"
          barSize={12}
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="uv"
          stackId="a"
          fill="#82ca9d"
          barSize={12}
          radius={[20, 20, 0, 0]}
        /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MixBarChart
