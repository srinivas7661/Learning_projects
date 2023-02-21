import React from "react";
import styled from "styled-components";
import BaseComponent from "../../../baseComponent";
import { TotalSalesService } from "../../../../services/index";
import Utils from "../../../../utility";
import moment from "moment";
import CollectionTable from "./collectionTable";
import Paper from "@mui/material/Paper";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

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
class TopCollection extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      opt: "1",
      changeIcon: true,
    };
  }

  async componentDidMount() {
    await this.collectionTableData();
  }

  collectionTableData = async () => {
    let [error, response] = await Utils.parseResponse(
      TotalSalesService.topCollectionTable()
    );
    if (error) {
      return this.setState({ loading: true });
    } else {
      this.setState({ data: response || "" });
      this.setState({ loading: false });
    }
  };

  render() {
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

    const opt = this.state.opt;
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const exportToCSV = (infoData, fileName) => {
      const data = { results: [] };
      data.results = infoData;
      
      
      const csvData = data.results.map((obj) => {
        // obj.Month = obj.x;
        // obj.Count = obj.y;
        obj["Owner"] = obj.ownerCount;
        obj["Items"] = obj.items;
        obj["Id"] = obj._id;
        obj["Collection Name"] = obj.collectionName;
        obj["Volume"] = obj.volume;
        delete obj.ownerCount
        delete obj.items
        delete obj._id
        delete obj.collectionName
        delete obj.volume
        delete obj.imageUrl
        delete obj.coverUrl
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

    return (
      <>
        <div className="display-flex justify-content-between">
          <span className="nft-sold">Top Collections</span>
          <div className="display-flex align-items-baseline">
            {(() => {
              switch (this.state.opt) {
                case "1":
                  return (
                    <button
                      className="export-btn"
                      onClick={() =>
                        exportToCSV(
                          this.state?.data?.lastOneDays,
                          "Top Collections of Last 1 Day"
                        )
                      }
                    >
                      Export
                    </button>
                  );
                case "2":
                  return (
                    <button
                      className="export-btn"
                      onClick={() =>
                        exportToCSV(
                          this.state?.data?.lastOneMonth,
                          "Top Collections of Last 1 Month"
                        )
                      }
                    >
                      Export
                    </button>
                  );
                case "3":
                  return (
                    <button
                      className="export-btn"
                      onClick={() =>
                        exportToCSV(
                          this.state?.data?.lastOneYear,
                          "Top Collections of Last 1 Year"
                        )
                      }
                    >
                      Export
                    </button>
                  );
                default:
                  return;
              }
            })()}

            <Paper className="select-opt" elevation={0}>
              <Select onClick={()=>this.setState({changeIcon:!this.state.changeIcon})} 
              className={this.state.changeIcon?'select-arrow-dn':'select-arrow-up'}
                onChange={(e) => this.setState({ opt: e.target.value })}
              >
                {options.map((data) => {
                  return (
                    <>
                      <Options value={data.id}>{data.type}</Options>
                    </>
                  );
                })}
              </Select>
            </Paper>
          </div>
        </div>
        {(() => {
          switch (opt) {
            case "1":
              return (
                <>
                  <CollectionTable
                    opt={this.state.opt}
                    oneDaysData={this.state?.data?.lastOneDays}
                    loading={this.state.loading}
                  />
                </>
              );
            case "2":
              return (
                <>
                  <CollectionTable
                    opt={this.state.opt}
                    oneMonthData={this.state?.data?.lastOneMonth}
                    loading={this.state.loading}
                  />
                </>
              );
            case "3":
              return (
                <>
                  <CollectionTable
                    opt={this.state.opt}
                    oneYearData={this.state?.data?.lastOneYear}
                    loading={this.state.loading}
                  />
                </>
              );
            default:
              return;
          }
        })()}
      </>
    );
  }
}

export default TopCollection;
