import React from "react";
import "../../styles/perfil.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Ventas",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Reclutamiento",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
];

export default function App() {
  return (
    <BarChart
      width={300}
      height={400}
      data={data}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={50}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 40 }} />
      <YAxis color={{ color: "white" }} />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
}
