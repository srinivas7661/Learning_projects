import React from "react";
import { ResponsiveLine } from '@nivo/line'
import moment from "moment";


function PriceGraph(props) {
const arr=props.data;
const first6 = arr.slice(0, 8);
  let graphData = [
    {
      "id": "price",
      "color": "hsl(70, 70%, 50%)",
      "data": props?.data ? first6 : []

    }
  ]

  return (
    MyResponsiveLine({ graphData })
  )
}

const MyResponsiveLine = ({ graphData /* see data tab */ }) => (
  <ResponsiveLine
    data={graphData}
    colors={['#3C60FD']}
    theme={{
      textColor: "#C3C3C3",
      axis: {
        domain: {
          line: {
            stroke: '#C3C3C3',
            strokeWidth: 1
          }
        }
      }
    }}
    margin={{ top: 35, right: 40, bottom: 25, left: 55 }}
    lineWidth={3}
    xScale={{ type: 'point' ,min: 'auto',
    max: 'auto',}}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false
    }}
    axisLeft={{
      orient: "left",
      tickSize: 0,
      tickPadding: 10,
      tickValues: 4,
    }}
    gridYValues={4}
    axisBottom={{
      tickSize: 0,
      tickPadding: 10,
      format: function (value) {
        return moment(value).format("D/M")
      }
    }}
    curve="basis"
    axisTop={null}
    axisRight={null}
    enableGridX={false}
    enableGridY={true}
    enablePoints={false}
    pointLabelYOffset={-12}
    enablePointLabel={false}
    useMesh={false}
  />
)

export default PriceGraph;
