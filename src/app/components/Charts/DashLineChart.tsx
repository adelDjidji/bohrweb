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
import moment from "moment"
import { Xtransformer } from "./Util"


interface P {
  dataReal: any,
  dataPrediction : any,
  unit : any,
 }
 
 const  DashLineChartComponent: React.FC<P> = ({ dataReal = [], dataPrediction = [], xScale='hour'}) => {

  var _name = ""
  var _unit = ""

  if (dataReal.length > 0){
    _name = dataReal[0].name
    _unit = dataReal[0].unit
  }
 
  // const [dataChart, setDataChart] = useState([])

  // useEffect(() => {

  //   const x = Xtransformer(data, xScale)
  //   setDataChart(x)
    
  // }, [data])

  const CustomTooltip = ({ active, payload, label, ...props }) => {

    if (active && payload && payload.length) {
      return (
        <div
          className="text-white rounded-lg p-2"
          style={{ background: "#20263D" }}
        >
          <div><Text type="14-600">{payload[0]['payload']['start_time']}</Text> </div><br />
          {payload.map(p => (
            <div>
              <Text type="12-500">{p.name}</Text> <br />
              <Text type="14-600">{p.value.toLocaleString("fr")}</Text>
            </div>
          ))}
        </div>
      )
    }
  
    return null
  }

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
        <YAxis unit={_unit } tickLine={false} axisLine={false} />
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
            else if (value == "volume") return "Volume actuel"
            else if (value == "portfolio") return "Portefuille actuel"
            else if (value == "gain") return "Gain actuel"
            else return "Prévisions"
          }}
        />
        <Line dataKey="value" 
              name={_name}
              data={Xtransformer(dataReal, xScale, 'start_time')} connectNulls />
        {!!dataPrediction.length && (
          <Line
            dataKey={Object.keys(dataPrediction[0])[1]}
            connectNulls
            data={Xtransformer(dataPrediction, xScale, 'start_time')}
            name={"Prevision"}
            key={"Prevision"}
            stroke="red"
            strokeDasharray="1 1"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
 
 };
 export default DashLineChartComponent;

