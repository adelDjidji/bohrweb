import * as d3 from "d3";
import "./App.css";
import { useEffect } from "react";
import { LineChart } from "./chart/func";
import { data } from "./unemployment";
export default function App() {
  useEffect(() => {
    LineChart(data, {
      x: (d) => d.date,
      y: (d) => d.unemployment,
      z: (d) => d.division,
      yLabel: "↑ Unemployment (%)",
      width: 500,
      height: 500,
      color: "steelblue",
    });
  }, []);

  return (
    <div className="App">
      <div id="chart"></div>
    </div>
  );
}
