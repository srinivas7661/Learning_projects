import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "Oct",
    // TotalRewards: 4000,
    // pv: [2400,2400,2400,2400,2400],
    TotalEntries: 500,
  },
  {
    name: "Nov",
    // TotalRewards: 3000,
    // pv:[ 1398,2400,2400,2400],
    TotalEntries: 700,
  },
  {
    name: "Dec",
    // TotalRewards: 2000,
    // pv: [9800,2400,2400,2400],
    TotalEntries: 900,
  },
];
const NoOfBars = Array.from(Array(12).keys());

const TotalEntriesBarChart = () => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
      barCategoryGap={0}
    >
      <defs>
        <linearGradient id="colorDiv" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.5} />
          <stop offset="30%" stopColor="#298FFF" stopOpacity={0.8} />
        </linearGradient>
      </defs>
      <YAxis dy={2} dx={-18} />
      <XAxis dataKey="name" dy={15} />
      {/* <Tooltip /> */}

      {NoOfBars.map((data) => {
        return (
          <Bar
            dataKey="TotalEntries"
            fill="url(#colorDiv)"
            // fill="#298FFF"
          />
        );
      })}
    </BarChart>
  );
};

export default TotalEntriesBarChart;
