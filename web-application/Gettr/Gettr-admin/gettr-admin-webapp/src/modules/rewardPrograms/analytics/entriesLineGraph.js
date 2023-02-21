import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { entriesLineGraphData } from "../../../constants";

const LineGraphContainer = styled.div`
  position: relative;
  margin-top: -20px;
  border: 1px solid #f0f0f0;
  border-radius: 15px;
  height: 362px;
  width: 507px;
`;
const Heading = styled.div`
  font: normal 700 20px/22px var(--root-font);
  font-style: normal;
  letter-spacing: -0.408px;
  color: #1e1e1e;
  margin-bottom: 47px;
`;

function EntriesLineGraph() {
  function DataFormater(number) {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number >= 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  }
  return (
    <div>
      <Heading>Entries</Heading>
      <LineGraphContainer>
        <ResponsiveContainer height="99%">
          <div className="area_chart">
            <AreaChart
              width={600}
              height={362}
              data={entriesLineGraphData}
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
              <XAxis
                dataKey="name"
                dy={10}
                tickLine={false}
                style={{
                  fontSize: "10px",
                  color: "#898A8D",
                }}
                interval={1}
              />
              <YAxis
                dx={-10}
                tickLine={false}
                style={{
                  fontSize: "10px",
                  color: "#898A8D",
                }}
                tickFormatter={DataFormater}
              />
              <CartesianGrid vertical={false} stroke="#F0F0F0" />
              <Tooltip />
              <Area
                // type="monotone"
                dataKey="uv"
                stroke="#03BD64"
                fill="url(#colorUv)"
                strokeWidth={2}
              />
            </AreaChart>
          </div>
        </ResponsiveContainer>
      </LineGraphContainer>
    </div>
  );
}

export default EntriesLineGraph;
