import React from "react";
import BaseComponent from "../baseComponent";
import ManageStore from "./ManageStore";
import { CollService, ContentService, RecentCollection } from "../../services";
import Collections from "../collectionsDeatils";
import CreateCollection from "../createCollection";
// import {ContentService} from "../../services";
import {
  apiFailureConstants,
  apiSuccessConstants,
  eventConstants,
  validationsMessages,
} from "../../constants";
import { connect } from "react-redux";
import Utility, { dispatchAction } from "../../utility";
import CommonToasts from "../../common/components/commonToasts";
import contentService from "../../services/contentService";


class ManageStorePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      // collection: [],
      activeTab: "collectionList",
      filterCollection: "",
      skip: 0,
      limit: 10,
      total: 0,
      searchQuery: "",
      find: "",
      sortBy: "Recently Added",
    };
  }

  componentDidMount() {
    let requestData = {
      limit: this.state.limit || 10,
      skip: this.state.skip || 0,
      find: this.state.find || "",
      sortBy: this.state.sortBy,
    };

    this.getRecentlyCollections(requestData);
  }

  // getCollections = async (requestData) => {
  //   this.props.dispatchAction(eventConstants.SHOW_LOADER);
  //   const [error, result] = await Utility.parseResponse(
  //     CollService.getCollections(requestData)
  //   );
  //   this.setState({
  //     total: result,
  //   });
  //   this.props.dispatchAction(eventConstants.HIDE_LOADER);

  //   //TODO WE NEED TO MOVE SORTING FROM BACKEND
  //   let resultFilter =
  //     result &&
  //     result.collections.sort(
  //       (a, b) => parseFloat(a.addedOn) - parseFloat(b.addedOn)
  //     );

  //   if (error || !result) {
  //     return CommonToasts.failureMessageSent(
  //       validationsMessages.UN_GET_COLLECTION_LIST
  //     );
  //     // Utility.apiFailureToast(apiFailureConstants.GET_COLLECTION_LIST);
  //   }
  //   if (result) {
  //     this.setState({
  //       collection: resultFilter,
  //       filterCollection: resultFilter,
  //     });
  //   }
  // };

  deleteNFT = async (data) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let requestData = {
      limit: this.state.limit || 10,
      skip: this.state.skip || 0,
      find: this.state.find || "",
      sortBy: this.state.sortBy,
    };
  let [error, response] = await Utility.parseResponse(
    contentService.deleteNft({
      _id: data || "",
    }),
    this.getRecentlyCollections(requestData)
  ); 
  this.props.dispatchAction(eventConstants.HIDE_LOADER);
  }
  
  getRecentlyCollections = async (data) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    // let item = data === undefined ? "RecentlyAdded" : data;

    // let requestData = { collection: item, limit: 10 };

    const [error, result] = await Utility.parseResponse(
      RecentCollection.getrecentCollections(data)
    );

    this.setState({
      total: result?.totalCount,
    });
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    //TODO WE NEED TO MOVE SORTING FROM BACKEND
    let resultFilter = result?.collections;
    // .sort(
    //     (a, b) => parseFloat(b.addedOn) - parseFloat(a.addedOn)
    //   );

    if (error || !result) {
      return CommonToasts.failureMessageSent(
        validationsMessages.UN_GET_COLLECTION_LIST
      );
      // Utility.apiFailureToast(apiFailureConstants.GET_COLLECTION_LIST);
    }
    if (result) {
      this.setState({
        // collection: resultFilter,
        filterCollection: resultFilter,
      });
    }

    this.props.dispatchAction(eventConstants.HIDE_LOADER);
  };

  removeNft = async (data) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, response] = await Utility.parseResponse(
      ContentService.removeNft({
        _id: data || "",
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error)
      return CommonToasts.failureMessageSent(validationsMessages.UN_REMOVE_NFT);
    // Utility.apiFailureToast(apiFailureConstants.REMOVE_NFT);
    let requestData = {
      limit: this.state.limit || 10,
      skip: this.state.skip || 0,
      find: this.state.find || "",
      sortBy: this.state.sortBy,
    };
    this.getRecentlyCollections(requestData);
  };
  onClickNextPage = () => {
    this.setState({ skip: this.state.skip + this.state.limit });
    let requestData = {
      limit: this.state.limit + this.state.skip + 10,
      skip: this.state.skip + this.state.limit,
      find: this.state.find || "",
      sortBy: this.state.sortBy,
    };
    this.getRecentlyCollections(requestData);
  };
  onClickPreviousPage = () => {
    if (this.state.skip <= 0) return false;

    this.setState({ skip: this.state.skip - this.state.limit });
    let requestData = {
      limit: this.state.limit + this.state.skip - 10,
      skip: this.state.skip - this.state.limit,
      find: this.state.find || "",
      sortBy: this.state.sortBy,
    };

    this.getRecentlyCollections(requestData);
  };

  handleSearchCollection = (param) => {
    this.setState({
      find: param,
    });
    let requestData = {
      limit: 10,
      skip: 0,
      find: param || "",
      sortBy: this.state.sortBy,
    };
    this.getRecentlyCollections(requestData);
  };

  setSortBy = async (sortBy) => {
    await this.setState({ sortBy: sortBy });
    let requestData = {
      limit: this.state.limit || 10,
      skip: this.state.skip || 0,
      find: this.state.find || "",
      sortBy: this.state.sortBy || "",
    };
    this.getRecentlyCollections(requestData);
  };

  changeStateVariable = (key, value) => {
    this.setState({ [key]: value });
  };

  navigateToTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    // console.log(this.state.collection,"this.state.collection")
    return (
      <>
        {this.state.activeTab === "collectionList" && (
          <ManageStore
            data={this.state}
            navigateToTab={this.navigateToTab}
            handleSearchCollection={this.handleSearchCollection}
            changeStateVariable={this.changeStateVariable}
            onClickNextPage={this.onClickNextPage}
            onClickPreviousPage={this.onClickPreviousPage}
            getRecentlyCollections={this.getRecentlyCollections}
            // handleSortBy={this.handleSortBy}
            setSortBy={this.setSortBy}
          />
        )}
        {this.state.activeTab.comp === "collectionDetails" && (
          <Collections
            profileDetail={this.state.filterCollection.find(
              (item) => item._id === this.state.activeTab.id
            )}
            navigateToTab={this.navigateToTab}
            removeNft={this.removeNft}
            deleteNFT={this.deleteNFT}
          />
        )}
        {(this.state.activeTab === "createCollection" ||
          this.state.activeTab.comp === "editCollection") && (
          <CreateCollection
            profileDetail={
              this.state.activeTab.comp === "editCollection" &&
              this.state.filterCollection.find(
                (item) => item._id === this.state.activeTab.id
              )
            }
            activeTab={this.state.activeTab}
            navigateToTab={this.navigateToTab}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(ManageStorePage);
