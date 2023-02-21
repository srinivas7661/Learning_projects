import BaseComponent from "../baseComponent";
import React from "react";
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
import RemovedNFT from "./removedNFT";
import ReviewRemovedNftPage from "./reviewRemovedNft";
import CommonToasts from "../../common/components/commonToasts";

let flag = true;
let timer = 0;

class RemovedNftList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      removedNftList: [],
      skip: 0,
      limit: 10,
      total: 1,
      selectedDaysFilter: "oneDay",
      searchField: "",
      searchKeys: ["name"],
      activeTab: "removed-nft",
    };
  }

  componentDidMount() {
    let requestData = {
      limit: this.state.limit || 10,
      skip: this.state.skip || 0,
      duration: "oneDay",
      // addedOn: {'$gt': moment().subtract(this.state.selectedDaysFilter, 'days').unix() * 1000}
    };
    this.getRemovedNftList(requestData);
  }

  getRemovedNftList = async (requestData) => {
    console.warn("requestData=getRemovedNftList===", requestData);
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, removedNftListResponse] = await Utility.parseResponse(
      ContentService.getRemovedNftList(requestData)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error || !removedNftListResponse)
      return CommonToasts.failureMessageSent(
        validationsMessages.UN_GET_REMOVED_NFT_LIST
      );
    // Utility.apiFailureToast(apiFailureConstants.GET_REPORTED_NFT_LIST);

    if (removedNftListResponse) {
      this.setState({
        removedNftList: removedNftListResponse.response,
        total: removedNftListResponse.totalCount,
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
      // addedOn: {'$gt': moment().subtract(event.target.value, 'days').unix() * 1000}
    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getRemovedNftList(requestData);
  };
  onClickPreviousPage = () => {
    if (this.state.skip <= 0) return false;
    this.setState({ skip: this.state.skip - this.state.limit });

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip - this.state.limit,
      duration: this.state.selectedDaysFilter,
      // addedOn: {'$gt': moment().subtract(this.state.selectedDaysFilter, 'days').unix() * 1000}
    };

    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getRemovedNftList(requestData);
  };
  onClickNextPage = () => {
    if (this.state.removedNftList <= this.state.limit) return false;

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip + this.state.limit,
      duration: this.state.selectedDaysFilter,
      // addedOn: {'$gt': moment().subtract(this.state.selectedDaysFilter, 'days').unix() * 1000}
    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.setState({ skip: this.state.skip + this.state.limit });
    this.getRemovedNftList(requestData);
  };
  onChangeSearchField = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, skip: 0 });

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip || 0,
      // addedOn: {'$gt': moment().subtract(this.state.selectedDaysFilter, 'days').unix() * 1000}
    };
    if (event.target.value) {
      requestData["searchValue"] = event.target.value;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.throttling(this.getRemovedNftList, 2000)(requestData);
    this.debouncing(this.getRemovedNftList, 2000)(requestData);
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

  unRemoveNft = async (data) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, response] = await Utility.parseResponse(
      ContentService.unRemoveNft({
        _id: data?._id || "",
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error || !response)
      return CommonToasts.failureMessageSent(apiFailureConstants.UN_REMOVE_NFT);
    // Utility.apiFailureToast(apiFailureConstants.UN_REMOVE_NFT);

    let requestData = {
      limit: this.state.limit,
      skip: this.state.skip,
      duration: this.state.selectedDaysFilter,
      // addedOn: {'$gt': moment().subtract(this.state.selectedDaysFilter, 'days').unix() * 1000}
    };
    if (this.state.searchField) {
      requestData["searchValue"] = this.state.searchField;
      requestData["searchKeys"] = this.state.searchKeys;
    }
    this.getRemovedNftList(requestData);
    CommonToasts.successfullySent(
      apiSuccessConstants.UN_REMOVE_NFT_AND_UN_BLOCK_USER
    );
  };

  navigateToTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    return (
      <>
        {this.state.activeTab === "removed-nft" && (
          <RemovedNFT
            state={this.state}
            onSelectDaysFilter={this.onSelectDaysFilter}
            onClickNextPage={this.onClickNextPage}
            onClickPreviousPage={this.onClickPreviousPage}
            onChangeSearchField={this.onChangeSearchField}
            unRemoveNft={this.unRemoveNft}
            navigateToTab={this.navigateToTab}
          />
        )}
        {/* {this.state.activeTab === "review-removed-nft" && (
            <ReviewRemovedNftPage navigateToTab={this.navigateToTab}
            state={this.state}
            unRemoveNft={this.unRemoveNft}/>
            )} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(RemovedNftList);
