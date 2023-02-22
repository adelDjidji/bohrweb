import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import Text from "../Text"
import { Xformater, Xtransformer } from "./LineChart"
const series = [
  {
    name: "Series 1",
    data: [
      { category: "B", value: 23 },
      { category: "C", value: 15 },
      { category: "D", value: 15 },
    ],
  },
  {
    name: "Series 2",
    data: [
      { category: "B", value: 23 },
      { category: "C", value: 40 },
      { category: "D", value: 89 },
    ],
  },
]

const data = [
  { category: "A", value: 10 },
  { category: "B", value: 23 },
]
const CustomTooltip = ({ active, payload, label, ...props }) => {
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


function DashLine({ dataReal = [], dataPrediction = [], xScale='hour' }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis
          tickLine={false}
          axisLine={false}
          dataKey="start_time"
          type="category"
          allowDuplicatedCategory={false}
          // tickFormatter={val => Xformater(xScale, val)}
        />
        <YAxis unit={" K€"} tickLine={false} axisLine={false} />
        <Tooltip
          content={p => <CustomTooltip {...p} />}
          cursor={{ fill: "transparent" }}
        />
        <Legend
          wrapperStyle={{
            marginLeft: 20,
            top: -15,
          }}
          align="right"
          verticalAlign="top"
          iconType="plainline"
          formatter={(value, entry, index) => {
            if (value == "spot") return "Prix marché actuel"
            else return "Prévisions"
          }}
        />
        <Line dataKey="spot" data={Xtransformer(dataReal, xScale, 'start_time')} connectNulls />
        {!!dataPrediction.length && (
          <Line
            dataKey={Object.keys(dataPrediction[0])[1]}
            connectNulls
            data={Xtransformer(dataPrediction, xScale, 'start_time')}
            name={"Prevision"}
            key={"Prevision"}
            strokeDasharray="5 5"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default DashLine
