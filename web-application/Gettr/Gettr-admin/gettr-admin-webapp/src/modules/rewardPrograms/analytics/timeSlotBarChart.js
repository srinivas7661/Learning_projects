import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import utility from "../../../utility/index"
const TimeSlotBarChart = ({slotData}) => {
  
  return (
    <ResponsiveContainer height="86%">
      <BarChart
        width={500}
        height={420}
        data={slotData}
        margin={{
          top: 0,
          right: 0,
          left: 30,
          bottom: 5,
        }}
        barGap={0}
      >
        <CartesianGrid vertical={false} stroke="#F0F0F0" />
        <XAxis
          dy={40}
          dataKey="slot"
          angle={-180}
          style={{
            writingMode: "vertical-rl",
            fontSize: "10px",
            color: "#898A8D",
          }}
          tickLine={false}
        />
        <YAxis
          tickLine={false}
          type="number"
          style={{
            fontSize: "10px",
            color: "#898A8D",
          }} 
          tickFormatter={utility.DataFormater}
        />
        {/* <Tooltip /> */}
        <Bar
          dataKey="entries"
          fill="#FFB752"
          barSize={5}
          radius={[20, 20, 0, 0]}
          barGap={0}
        />
        <Bar
          dataKey="rewards"
          fill="#F96D60"
          barSize={5}
          radius={[20, 20, 0, 0]}
          barGap={0}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TimeSlotBarChart;
