import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import './index.css'
import { RewardsService } from "../../services";
import Utils from "../../utility/index";

const TimeSlotBarChart = (props) => {
  const graphData = props.slotData.data;

  return (
    <BarChart
      width={500}
      height={420}
      data={graphData}
      margin={{
        top: 0,
        right: 0,
        left: 30,
        bottom: 5,
      }}
      barGap={0}
    >
      <XAxis
        dy={60}
        dataKey="slot"
        angle={-180}
        style={{ writingMode: "vertical-rl" }}
        axisLine={false}
        tickLine={false}
      />
      {/* <Tooltip /> */}
      <Bar
        dataKey="entries"
        fill="#FFB752"
        barSize={9}
        radius={[20, 20, 0, 0]}
        barGap={0}
      />
      <Bar
        dataKey="rewards"
        fill="#F96D60"
        barSize={9}
        radius={[20, 20, 0, 0]}
        barGap={0}
      />
    </BarChart>
  );
};

export default TimeSlotBarChart;
