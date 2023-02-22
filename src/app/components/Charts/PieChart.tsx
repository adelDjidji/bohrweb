import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts"
import Text from "../Text"



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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

function ExamplePieChart({values}) {
  const data0 = [
    { name: "Production électrique", value: values.power_portfolio_YTD },
    { name: "Garanties d’origines", value: values.gos_portfolio_YTD },
    { name: "Mécanisme de capacité", value: values.mecapa_portfolio_YTD },
  ]
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <PieChart width={400} height={200}>
      <Tooltip
        content={p => <CustomTooltip {...p} />}
        cursor={{ fill: "transparent" }}
      />
      <Legend
        wrapperStyle={{
          left: "40%",
          fontSize: 12,
        }}
        iconType="circle"
        layout="vertical"
        verticalAlign='middle'
        align="right"
      />
      <Pie
        data={data0}
        dataKey="value"
        cx="30%"
        cy="50%"
        innerRadius={40}
        outerRadius={60}
      >
        {data0.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    // </ResponsiveContainer>
  )
}

export default ExamplePieChart
