import React, { useEffect } from "react";
import styled from "styled-components";
import { ResponsiveBar } from "@nivo/bar";
import Paper from "@mui/material/Paper";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import NoRecordPlaceholderComponent from "../../../../common/components/NoRecordPlaceholderComponent";

const Select = styled.select`
  width: 132px;
  height: 34px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  border: none;
  outline: none;
  cursor: pointer;
  padding-left: 6px !important;
`;
const Options = styled.option`
  text-align: left;
  font: normal normal 14px/17px Barlow !important;
  color: #151e58;
  opacity: 1;
`;

const toolTipElement = (props) => {
  return (
    <div>
      <div className="Tooltip-graph">
        <p className="Tooltip-graph-date">{props.data?.y || 0}</p>
      </div>
    </div>
  );
};

export default function Graph(props) {
  const [opt, setOpt] = React.useState("1");
  const [mainData, setMainData] = React.useState(props?.oneDaysData);
  const [exportStatement, setExportStatement] = React.useState("NFT's Sold");

  useEffect(() => {
    if (opt === "1") {
      setMainData(props?.oneDaysData);
      setExportStatement("NFT's Sold in 1 Day");
    } else if (opt === "2") {
      setMainData(props?.oneMonthData);
      setExportStatement("NFT's Sold in 1 Month");
    } else if (opt === "3") {
      setMainData(props?.oneYearData);
      setExportStatement("NFT's Sold in 1 Year");
    }
  }, [opt, props]);

  const [iconShow, setIconShow] = React.useState(false);

  const MyResponsiveBar = () => (
    <ResponsiveBar
      data={mainData?.length > 0 ? mainData : props?.oneDaysData}
      tooltip={toolTipElement}
      keys={["y"]}
      indexBy="x"
      margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
      padding={0.8}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors="#6874E8"
      fontSize="14px"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderRadius={4.5}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 0,
        fontSize: 14,
        tickPadding: 9,
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 14,
        tickRotation: 0,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
      theme={{
        fontSize: 14,
        fontWeight: 500,
        axis: {
          ticks: {
            text: {
              fill: "#535877",
              fontFamily: "barlow",
              color: "#535877",
              fontWeight: 500,
            },
          },
        },
      }}
    />
  );

  const options = [
    {
      id: "1",
      type: "Last 1 Day",
    },
    {
      id: "2",
      type: "Last 1 Month",
    },
    {
      id: "3",
      type: "Last 1 Year",
    },
  ];

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (infoData, fileName) => {
    const data = { results: [] };
    data.results = infoData;

    const csvData = data.results?.map((obj) => {
      // obj.Month = obj.x;
      // obj.Count = obj.y;
      obj["Date"] = obj.x;
      obj["No. of NFT's Sold"] = obj.y;
      delete obj.x;
      delete obj.y;
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const finaldata = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(finaldata, fileName + fileExtension);
  };

  const iconChange = () => {
    setIconShow(!iconShow);
  };

  return (
    <>
      <div className="nft-div">
        <span className="nft-sold">NFTs Sold</span>
        <div className="display-flex">
          <button
            className="export-btn"
            onClick={() => exportToCSV(mainData, exportStatement)}
          >
            Export
          </button>

          <Paper elevation={0} className="w-132">
          {!iconShow ? (<Select
              onChange={(e) => setOpt(e.target.value)} 
              onClick={iconChange}
              className='select-arrow-dn'
            >
              {options.map((data) => {
                return (
                  <>
                    <Options value={data.id}>{data.type}</Options>
                  </>
                );
              })}
            </Select>):(<Select
              onChange={(e) => setOpt(e.target.value)} 
              onClick={iconChange}
              className='select-arrow-up'
            >
              {options.map((data) => {
                return (
                  <>
                    <Options value={data.id}>{data.type}</Options>
                  </>
                );
              })}
            </Select>)}
            {/* <Select
              onChange={(e) => setOpt(e.target.value)} 
              onClick={iconChange}
              className='select-arrow-up'
            >
              {options.map((data) => {
                return (
                  <>
                    <Options value={data.id}>{data.type}</Options>
                  </>
                );
              })}
            </Select> */}
          </Paper>
        </div>
      </div>
      <br />
      <div className="responsive-graph">
        {!mainData || mainData.length < 1 ? (
          <NoRecordPlaceholderComponent text="No sold Nft found" />
        ) : (
          <MyResponsiveBar />
        )}
      </div>
    </>
  );
}
