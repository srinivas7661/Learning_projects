import BaseComponent from "../baseComponent";
import React from "react";
import ReportNftTable from "./reportNftTable";
import { ContentService } from "../../services";
import Utility, { dispatchAction } from "../../utility";
import {
  apiFailureConstants,
  apiSuccessConstants,
  eventConstants,
  validationsMessages,
} from "../../constants";
import { connect } from "react-redux";
import moment from "moment";
import ReviewNftPage from "./reviewNftPage";
import CommonToasts from "../../common/components/commonToasts";

let flag = true;
let timer = 0;

class ReportedNftList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      reportedNftList: [],
      skip: 0,
      limit: 10,
      total: 1,
      selectedDaysFilter: "oneDay",
      searchField: "",
      searchKeys: ["name"],
      activeTab: "reported-nft",
      selectedReport: "",
      searchValue: "",
    };
  }

  componentDidMount() {
    let requestData = {
      limit: this.state.limit || 10,
      skip: this.state.skip || 0,
      searchValue: this.state.searchValue || "",
      // addedOn: {
      //   $gt:
      //     moment().subtract(this.state.selectedDaysFilter, "days").unix() *
      //     1000,
      // },
      duration: "oneDay",
    };
    this.getReportedNftList(requestData);
  }

  getReportedNftList = async (requestData) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, reportedNftListResponse] = await Utility.parseResponse(
      ContentService.getReportedNftList(requestData)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error || !reportedNftListResponse)
      return CommonToasts.failureMessageSent(
        validationsMessages.GET_REPORTED_NFT_LIST
      );
    // Utility.apiFailureToast(apiFailureConstants.TGET_BLOCKED_USER_LIS);

    if (reportedNftListResponse) {
      this.setState({
        reportedNftList: reportedNftListResponse.response,
        total: reportedNftListResponse.totalCount,
      });
    }
  };
  onSelectDaysFilter = (event) => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value, skip: 0 });
    let requestData = {
      limit: this.state.limit,
      skip: 0,
      duration: event.target.value,
      searchValue: this.state.searchValue || "",

    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getReportedNftList(requestData);
  };
  onClickPreviousPage = () => {
    if (this.state.skip <= 0) return false;
    this.setState({ skip: this.state.skip - this.state.limit });

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip - this.state.limit,
      duration: this.state.selectedDaysFilter,
      searchValue: this.state.searchValue || "",

    };

    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getReportedNftList(requestData);
  };
  onClickNextPage = () => {
    if (this.state.reportedNftList <= this.state.limit) return false;

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip + this.state.limit,
      duration: this.state.selectedDaysFilter,
      searchValue: this.state.searchValue || "",


    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.setState({ skip: this.state.skip + this.state.limit });
    this.getReportedNftList(requestData);
  };
  onChangeSearchField = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, skip: 0 });

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip || 0,
      // addedOn: {
      //   $gt:
      //     moment().subtract(this.state.selectedDaysFilter, "days").unix() *
      //     1000,
      // },
      searchValue: this.state.searchValue || "",
      duration: this.state.selectedDaysFilter,
    };
    if (event.target.value) {
      var text = event.target.value;
      var searchHash = text.replace(/\s/g, "");
      requestData["searchValue"] = searchHash;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.throttling(this.getReportedNftList, 2000)(requestData);
    this.debouncing(this.getReportedNftList, 2000)(requestData);
  };

  debouncing = (callback, limit) => {
    return function (requestData) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(requestData);
      }, limit);
    };
  };

  throttling = (callback, limit) => {
    return function (requestData) {
      if (flag) {
        flag = false;
        callback(requestData);
        setTimeout(() => {
          flag = true;
        }, limit);
      }
    };
  };

  removeNft = async (data, isBlockUser) => {
    // console.log(data, "remove");
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, response] = await Utility.parseResponse(
      ContentService.removeNft({
        _id: data?._id || "",
        reportId: "6243e9c5ec403b00350ba596",
        isBlockUser: false,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error)
      return CommonToasts.failureMessageSent(validationsMessages.UN_REMOVE_NFT);
    // Utility.apiFailureToast(apiFailureConstants.REMOVE_NFT);

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip,
      searchValue: this.state.searchValue || "",
      duration: this.state.selectedDaysFilter,
    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getReportedNftList(requestData);
    CommonToasts.successfullySent(
      isBlockUser
        ? validationsMessages.REMOVE_NFT_AND_BLOCK_USER
        : validationsMessages.REMOVE_NFT
    );
  };

  removeNftAndBlockUser = async (data, inputId, isBlockUser) => {
    // console.log(data, "remove");
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, response] = await Utility.parseResponse(
      ContentService.removeNft({
        _id: data?._id || "",
        reportId: inputId,
        isBlockUser: true,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error)
      return CommonToasts.failureMessageSent(validationsMessages.UN_REMOVE_NFT);
    // Utility.apiFailureToast(apiFailureConstants.REMOVE_NFT);

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip,
      searchValue: this.state.searchValue || "",
      duration: this.state.selectedDaysFilter,
    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getReportedNftList(requestData);
    CommonToasts.successfullySent(
      isBlockUser
        ? validationsMessages.REMOVE_NFT_AND_BLOCK_USER
        : validationsMessages.REMOVE_NFT
    );
  };

  deleteReportedNft = async (row) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, response] = await Utility.parseResponse(
      ContentService.deleteReportedNft({
        _id: row || "",
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !response)
      return CommonToasts.failureMessageSent(
        validationsMessages.UN_REMOVE_NFT_REPORT
      );

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip,
      searchValue: this.state.searchValue || "",
      duration: this.state.selectedDaysFilter,
    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getReportedNftList(requestData);
    CommonToasts.successfullySent(validationsMessages.REMOVE_NFT_REPORT);
  };

  navigateToTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    // console.log("duration", this.state);

    return (
      <>
        {this.state.activeTab === "reported-nft" && (
          <ReportNftTable
            state={this.state}
            onSelectDaysFilter={this.onSelectDaysFilter}
            onClickNextPage={this.onClickNextPage}
            onClickPreviousPage={this.onClickPreviousPage}
            onChangeSearchField={this.onChangeSearchField}
            removeNft={this.removeNft}
            deleteReportedNft={this.deleteReportedNft}
            navigateToTab={this.navigateToTab}
            removeNftAndBlockUser={this.removeNftAndBlockUser}
          />
        )}
        {/* {this.state.activeTab === "review-nft" && (
             <ReviewNftPage 
             state={this.state}
                               removeNft={this.removeNft}
                               deleteReportedNft={this.deleteReportedNft}
             navigateToTab={this.navigateToTab}
             />
             )} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(ReportedNftList);
