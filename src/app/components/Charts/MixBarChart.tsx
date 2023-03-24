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
import moment from "moment"
import { XtransformerSum } from "./Util"

interface P {
  data: any,
  xScale : string,
  unit : any,
 }
 
 const  MixBarChartComponent: React.FC<P> = ({ data, xScale='hour',unit}) => {
 
  const [transData, settransData] = useState<any>([])
  const [sites, setsites] = useState()
  const [dataChart, setDataChart] = useState([])



  // useEffect(() => {
  //   // const new_Arr = transform(data)
  //   // settransData(new_Arr)
  //   // setsites(Object.keys(new_Arr[0]).filter(k=>k!='date'))
  // }, [data])

  useEffect(() => {

    const x = XtransformerSum(data, xScale)
    setDataChart(x)
    
  }, [data])



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
              <Text type="14-600">{p.value.toLocaleString("fr")} {unit}</Text>
            </div>
          ))}
        </div>
      )
    }
  
    return null
  }


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
      <BarChart data={dataChart} style={{ background: "white" }}>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis tickLine={false} axisLine={false} dataKey="date" />
        <YAxis
          unit ={unit}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(val)=>(val).toLocaleString('fr')}
          tickFormatter={(value) =>
            new Intl.NumberFormat("fr", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value)
          }
          domain={['0', 'dataMax']}
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

      </BarChart>
    </ResponsiveContainer>
  )
 
 };
 export default MixBarChartComponent;

