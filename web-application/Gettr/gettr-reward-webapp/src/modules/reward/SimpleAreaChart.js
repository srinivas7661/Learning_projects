import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "Oct",
    uv: 400,
    pv: 2400,
    amt: 1400,
  },

  {
    name: "Nov",
    uv: 800,
    pv: 2400,
    amt: 1400,
  },

  {
    name: "Dec",
    uv: 700,
    pv: 2400,
    amt: 1400,
  },
];

const SimpleAreaChart = () => {
  return (
    //   <ResponsiveContainer >
    <AreaChart
      width={500}
      height={320}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
          <stop offset="20%" stopColor="#FFFFFF" stopOpacity={0.5} />
          <stop offset="95%" stopColor="#54EBA3" stopOpacity={1} />
        </linearGradient>
      </defs>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" dy={10}  />
      <YAxis dx={-20} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#54EBA3"
        fill="url(#colorUv)"
      />
    </AreaChart>
    //   </ResponsiveContainer>
  );
};

export default SimpleAreaChart;
