import React from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import millify from "millify";

const BrushGraphContainer = styled.div`
  position: relative;
  margin-top: -30px;
`;

const LineGraphContainer = styled.div`
  position: relative;
  margin-top: -20px;
`;

export default function StatsGraph({ color, id, graphData }) {
  const options = {
    chartOptionsArea: {
      grid: {
        strokeDashArray: [4, 4],
      },

      yaxis: {
        tickAmount: 7,

        labels: {
          style: {
            colors: ["#898A8D"],

            fontSize: "10px",

            fontFamily: "Roboto",

            fontWeight: 400,
          },

          formatter: function (value) {
            return millify(value, { precision: 2, lowercase: false });
          },
        },
      },

      chart: {
        id: id,

        toolbar: {
          autoSelected: "pan",

          show: false,
        },

        zoom: {
          autoScaleYaxis: true,
        },
      },

      colors: [color],

      dataLabels: {
        enabled: false,
      },

      fill: {
        type: "gradient",

        gradient: {
          shadeIntensity: 1,

          opacityFrom: 0.7,

          opacityTo: 0.9,

          stops: [0, 90, 100],
        },
      },

      markers: {
        size: 0,
      },

      xaxis: {
        type: "datetime",
      },
    },

    chartOptionsBrush: {
      chart: {
        height: 500,

        id: "chartBrush",

        brush: {
          target: id,

          enabled: true,
        },

        selection: {
          enabled: true,

          xaxis: {
            min: graphData[0]?.x,

            max: graphData[graphData.length / 2]?.x,
          },
        },
      },

      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },

        yaxis: {
          lines: {
            show: false,
          },
        },
      },

      colors: ["#008FFB"],

      fill: {
        type: "gradient",

        gradient: {
          opacityFrom: 0.91,

          opacityTo: 0.1,
        },
      },

      xaxis: {
        type: "datetime",

        tooltip: {
          enabled: false,
        },
      },

      yaxis: {
        show: false,
      },
    },
  };
  const series = [
    {
      data: graphData,
    },
  ];

  return (
    <div id="charts">
      <LineGraphContainer>
        <Chart
          options={options.chartOptionsArea}
          series={series}
          type="area"
          height="270"
        />
      </LineGraphContainer>
      <BrushGraphContainer>
        <Chart
          options={options.chartOptionsBrush}
          series={series}
          type="area"
          height="115"
        />
      </BrushGraphContainer>
    </div>
  );
}
