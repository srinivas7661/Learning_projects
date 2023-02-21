import React from "react";
import BaseComponent from "../../../../modules/baseComponent";
import { TotalSalesService } from "../../../../services/index";
import Utils from "../../../../utility";
import moment from "moment";
import NftBarGraph from "./graph.js";

class NftSoldGraph extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      graphForOneDays: [],
      graphForOneMonths: [],
      graphForOneYear: [],
      oneDaysData: [],
      oneMonthData: [],
      oneYearData: [],
    };
  }

  async componentDidMount() {
    await this.soldNftGraphData();
  }

  async soldNftGraphData() {
    let [error, nftSoldGraph] = await Utils.parseResponse(
      TotalSalesService.nftSoldGraph()
    );

    this.setState({ graphForOneDays: nftSoldGraph?.lastOneDaysData });
    this.setState({ graphForOneMonths: nftSoldGraph?.lastOneMonthData });
    this.setState({ graphForOneYear: nftSoldGraph?.lastOneYearData });

    // -----------three months--------------

    var arrLastOneDays = [];

    var resMap = new Map();
    var result = [];

    let newOneDaysData = this.state.graphForOneDays.sort(
      (a, b) => a?._id?.addedOn - b?._id?.addedOn
    );

    newOneDaysData.map((x) => {
      if (!resMap.has(moment(x._id.addedOn).format("MMM-YYYY")))
        resMap.set(moment(x._id.addedOn).format("MMM-YYYY"), x.totalCount);
      else
        resMap.set(
          moment(x._id.addedOn).format("MMM-YYYY"),
          x.totalCount + resMap.get(moment(x._id.addedOn).format("MMM-YYYY"))
        );
    });
    resMap.forEach((value, key) => {
      result.push({
        x: key,
        y: value,
      });
    });

    // console.log('he---',result);

    arrLastOneDays = result;
    this.setState({ oneDaysData: arrLastOneDays });

    // -----------One months--------------

    var arrLastOneMonths = [];

    var resMap = new Map();
    var result = [];

    let newOneMonthData = this.state.graphForOneMonths.sort(
      (a, b) => a?._id?.addedOn - b?._id?.addedOn
    );

    newOneMonthData.map((x) => {
      if (!resMap.has(moment(x._id.addedOn).format("MMM-YYYY")))
        resMap.set(moment(x._id.addedOn).format("MMM-YYYY"), x.totalCount);
      else
        resMap.set(
          moment(x._id.addedOn).format("MMM-YYYY"),
          x.totalCount + resMap.get(moment(x._id.addedOn).format("MMM-YYYY"))
        );
    });
    resMap.forEach((value, key) => {
      result.push({
        x: key,
        y: value,
      });
    });

    // console.log('he---',result);

    arrLastOneMonths = result;
    this.setState({ oneMonthData: arrLastOneMonths });

    // -----------One Year--------------

    var arrLastOneYear = [];

    var resMap = new Map();
    var result = [];

    let newOneYearData = this.state.graphForOneYear.sort(
      (a, b) => a?._id?.addedOn - b?._id?.addedOn
    );

    newOneYearData.map((x) => {
      if (!resMap.has(moment(x._id.addedOn).format("MMM-YYYY")))
        resMap.set(moment(x._id.addedOn).format("MMM-YYYY"), x.totalCount);
      else
        resMap.set(
          moment(x._id.addedOn).format("MMM-YYYY"),
          x.totalCount + resMap.get(moment(x._id.addedOn).format("MMM-YYYY"))
        );
    });
    resMap.forEach((value, key) => {
      result.push({
        x: key,
        y: value,
      });
    });

    // console.log('he---',result);

    arrLastOneYear = result;
    this.setState({ oneYearData: arrLastOneYear });
  }

  render() {
    return (
      <>
        <NftBarGraph
          oneDaysData={this.state.oneDaysData}
          oneMonthData={this.state.oneMonthData}
          oneYearData={this.state.oneYearData}
        />
      </>
    );
  }
}

export default NftSoldGraph;
