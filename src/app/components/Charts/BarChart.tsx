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
import Text from "../Text"

const def_data = [
  {
    name: "Page A",
    total_earning: 4000,
    total_earning_last_contract: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    total_earning: 3000,
    total_earning_last_contract: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    total_earning: 2000,
    total_earning_last_contract: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    total_earning: 2780,
    total_earning_last_contract: 3908,
    amt: 2000,
  },
]

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

function ExampleBarChart({
  customTooltip = false,
  data = def_data,
  dataKey1 = "total_earning_last_contract",
  dataKeyRender1 = "Ancien contrat",
  dataKey2 = "total_earning",
  dataKeyRender2 = "Bohr Energie",
  unit = "€",
  maxTickNumer=undefined
}) {
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
          <div
            className="text-white rounded-lg p-2"
            style={{ background: "#20263D" }}
          >
            {data.map(({ title, data }) => (
              <div className="mb-2">
                <Text type="12-500">{title}</Text> <br />
                <Value value={data} />
              </div>
            ))}
          </div>
        )
      } else {
        return (
          <div
            className="text-white rounded-lg p-2"
            style={{ background: "#20263D" }}
          >
            {payload.map(p => (
              <div>
                <Text type="12-500">{renderLabel(p.name)}</Text> : 
                <Text type="14-600">  {p.value.toLocaleString("fr")} €</Text>
              </div>
            ))}
          </div>
        )
      }
    }

    return null
  }

  const uniqueData = (arr:any[])=>Array.from(new Set(arr.map((item) => item.name)))
  .map((name) => {
    return arr.find((item) => item.name === name);
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={uniqueData(data).slice(0,maxTickNumer)} style={{ background: "white" }}>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis tickLine={false} axisLine={false} dataKey="name" />
        <YAxis
          label={{
            value: " " + unit,
            angle: 0,
            position: "insideTopLeft",
            offset: 10,
          }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={p => <CustomTooltip {...p} />}
          cursor={{ fill: "transparent" }}
        />
        <Legend
          wrapperStyle={{
            marginLeft: 20,
            top: -15,
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
  )
}

export default ExampleBarChart
