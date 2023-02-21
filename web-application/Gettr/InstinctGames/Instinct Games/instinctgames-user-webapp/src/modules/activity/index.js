import React, { Component } from "react";
import ActivityComponent from "./activityComponent";
import { priceGraph } from "../../services";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { eventConstants, genericConstants } from "../../constants";
import Header from "../common/header";

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: true,
      openFilter: true,
      priceFilter: {
        selectedToken: "",
        minTokenValue: "",
        maxTokenValue: "",
      },
      collectionId: "",
      table: [],
      totalNftsCount: 0,
      limit: 10,
      usdPrice: "",
      type: "",
      origin: false,
      tabId: "",
    };
  }

  componentDidMount() {
    let reqData = {
      skip: 0,
      limit: this.state.limit,
    };
    if (this.props.wallet.isMetamask) {
      reqData = { ...reqData, addedBy: this.props.wallet.walletConnect._id };
    }
    this.getActivity(reqData);
  }

  getTabId = (id) => {
    this.setState({
      tabId: id,
    });
  };

  getActivity = async (reqData) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const response = await priceGraph(reqData);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    this.setState({
      table: response,
    });
  };

  //this function will use to toggle the filter sidebar
  toggleSideBar = () => {
    this.setState((preState) => ({ isSideBarOpen: !preState.isSideBarOpen }));
  };

  //this function will be use to expand one specific filter

  changeOpenFilter = (value) => {
    switch (value) {
      case "sale":
        this.setState({
          type: "SELL",
        });
        break;
      case "listings":
        this.setState({
          type: "MINT",
        });
        break;
      case "offer":
        this.setState({
          type: "BUY",
        });
        break;
      default:
        this.setState({
          openFilter: value,
        });
        break;
    }
  };

  changePriceFilter = (priceFilter, value) => {
    const _priceFilter = { ...this.state.priceFilter, [priceFilter]: value };
    this.setState({ priceFilter: _priceFilter });
  };

  filterTable = async (isLoadMore) => {
    // if (isLoadMore) {
    //   this.state.limit = this.state.limit + 10;
    // }
    let reqData = { skip: this.state.skip, limit: this.state.limit };
    if (this.props.wallet.isMetamask) {
      reqData = { ...reqData, addedBy: this.props.wallet.walletConnect._id };
    }
    if (this.state.collectionId)
      reqData = { ...reqData, collectionId: { _id: this.state.collectionId } };
    if (this.state.type) reqData = { ...reqData, type: this.state.type };
    if (this.state.priceFilter && this.state.priceFilter.selectedToken)
      reqData = { ...reqData, currency: this.state.priceFilter.selectedToken };
    if (
      this.state.priceFilter &&
      (this.state.priceFilter.minTokenValue ||
        this.state.priceFilter.minTokenValue === 0) &&
      this.state.priceFilter.maxTokenValue
    )
      reqData = {
        ...reqData,
        minPrice: Number(this.state.priceFilter.minTokenValue),
        maxPrice: Number(this.state.priceFilter.maxTokenValue),
      };
    const tableResponse = await priceGraph(reqData);
    this.setState({
      table: tableResponse,
    });
  };

  filterNftByPrice = async () => {
    this.state.skip = 0;
    this.state.limit = 10;
    this.filterTable();
  };

  clearPriceFilter = () => {
    this.setState(
      {
        priceFilter: {
          selectedToken: "",
          minTokenValue: "",
          maxTokenValue: "",
        },
      },
      () => this.filterTable()
    );
  };

  filterNftByCollection = async (collectionId) => {
    this.state.collectionId = collectionId;
    this.state.skip = 0;
    this.state.limit = 10;
    this.filterTable();
  };

  filterTableByType = async (value) => {
    this.state.limit = 10;
    this.state.type = value;
    this.filterTable();
  };

  render() {
    return (
      <>
        <ActivityComponent
          state={this.state}
          toggleSideBar={this.toggleSideBar}
          changeOpenFilter={this.changeOpenFilter}
          changePriceFilter={this.changePriceFilter}
          filterNftByPrice={this.filterNftByPrice}
          filterNftByCollection={this.filterNftByCollection}
          filterTableByType={this.filterTableByType}
          findCurrencyUSDPrice={this.findCurrencyUSDPrice}
          filterTable={this.filterTable}
          getTabId={this.getTabId}
          clearPriceFilter={this.clearPriceFilter}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { currency: state.currency, wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(Activity);
