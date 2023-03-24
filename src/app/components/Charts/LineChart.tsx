import moment from "moment"
import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { stringToHexColor } from "../../utils"
import Text from "../Text"
import { Xtransformer,tickFormatter } from "./Util"

var Lines = [
  // {
  //   key: "h01",
  //   title: "Tarif contrat H01",
  //   color: "#D3EE66",
  //   hasDot:false,
  //   fill:false
  // },
  // {
  //   key: "h07",
  //   title: "Tarif contrat H07",
  //   color: "#D01E73",
  //   hasDot:false,
  //   fill:false
  // },
  // {
  //   key: "h16",
  //   title: "Tarif contrat H16",
  //   color: "#4BD273",
  //   hasDot:false,
  //   fill:false
  // },
  {
    key: "Prix marché Spot",
    title: "Prix marché Spot France",
    color: "#5819F1",
    hasDot:false,
    fill:true
  },
]



interface P {
 data: any,
 xScale : string
}

const  AreaChartComponent: React.FC<P> = ({ data, xScale='hour'}) => {

  const [lines, setlines] = useState(Lines)
  const [dataChart, setDataChart] = useState(Array())


  useEffect(() => {

    if(data.length){
    //  const keys = Object.keys(data[0]).filter(k=>k!='date' && k !=='Prix marché Spot')
     const keys = ['h01','h07']
     const l = keys.map((i, idx)=>({
        key: i,
        title: "Tarif contrat "+i,
        color: stringToHexColor("Tarif contrat "+i+idx),
        hasDot:false,
        fill:false
      }))
      setlines([...Lines, ...l])
    }

    const x = Xtransformer(data, xScale)
    setDataChart(x)
    
  }, [data])


  const renderLabel = (label: string) => {
    const obj = lines.find(i => i.key == label)
    return obj ? obj.title : label
  }

  const CustomTooltip = ({ xScale, active, payload, label, ...props }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="text-white rounded-lg p-2"
          style={{ background: "#20263D" }}
        >
          {payload.map(p => (
            <div>
              <Text type="12-500">{renderLabel(p.name)}</Text> <br />
              <Text type="14-600">{p.value.toLocaleString("fr")} €</Text>
            </div>
          ))}
        </div>
      )
    }
  
    return null
  }


  return (
          <>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={dataChart}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5819F166" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#5819F103" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis
          tickMargin={30}
          padding={{ left: 20 }}
          tickLine={false}
          axisLine={false}
          dataKey="date"
          tickFormatter={tickFormatter}

        />
        <YAxis 
        unit={" €"} 
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
          content={p => <CustomTooltip xScale={xScale} {...p} />}
          cursor={{ fill: "transparent" }}
        />
        <Legend
          wrapperStyle={{
            marginLeft: 20,
            top: -15,
            // display: "flex",
            // justifyContent: "start",
          }}
          align="left"
          verticalAlign="top"
          iconType="line"
          formatter={(value, entry, index) => renderLabel(value)}
        />

        {lines.map(l => (
          <Area
            dot={l.hasDot ? { stroke: l.color, strokeWidth: 2, fill: "white", r: 4 } : false}
            activeDot={{ stroke: l.color, strokeWidth: 0, fill: l.color }}
            strokeWidth={3}
            type="monotone"
            dataKey={l.key}
            stroke={l.color}
            fillOpacity={l.fill ? 1 :0}
            fill="url(#colorUv)"
            isAnimationActive={false}
          />
        ))}


      </AreaChart>
    </ResponsiveContainer>


          </>
  );

};
export default AreaChartComponent;