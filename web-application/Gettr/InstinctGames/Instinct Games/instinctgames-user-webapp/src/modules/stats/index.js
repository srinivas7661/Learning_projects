import React, { Component } from "react";
import Stats from "./stats";
import { sellAndPurchaseService } from "../../services/index";
import Utils, { dispatchAction } from "../../utility";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import { connect } from "react-redux";

import GetCategory from "../../services/adminConfigMicroservices";
import { eventConstants } from "../../constants";

class StatsPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyers: [],
      topSellers: [],
      topCollection: [],
      duration: "weekly",
      currencyForStats: "BNB",
      currentState: [],
      currencyList: [],
      type: "All",
      priceFilter: {
        selectedToken: "",
        minTokenValue: "",
        maxTokenValue: "",
      },
    };
  }
  async componentDidMount() {
    let requestData = {
      duration: "weekly",
      currency: "BNB",
    };
    await this.getTopBuyers(requestData);
    await this.getTopSellers(requestData);
    await this.getTopCollection(requestData);
    await this.getApproveToken();
  }

  DurationChangeOnStats = (value) => {
    this.setState({ duration: value });
    let requestData = {
      duration: value,
      currency: this.state.currencyForStats,
    };
    this.getTopBuyers(requestData);
    this.getTopSellers(requestData);
    this.getTopCollection(requestData);
  };

  CurrencyChangeOnStats = (value, type) => {
    this.setState({ currencyForStats: value });
    let requestData = {
      duration: this.state.duration,
      currency: value,
    };
    this.getTopBuyers(requestData);
    this.getTopSellers(requestData);
    this.getTopCollection(requestData);
  };
  getTopSellers = async (requestData) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [err, res] = await Utils.parseResponse(
      sellAndPurchaseService.getTopSellers(requestData)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    this.setState({ topSellers: res });
  };

  getTopBuyers = async (requestData) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, nftBuyers] = await Utils.parseResponse(
      sellAndPurchaseService.getTopBuyers(requestData)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({ buyers: nftBuyers });

    if (error || !nftBuyers) return;
  };
  getTopCollection = async (requestData) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [err, response] = await Utils.parseResponse(
      sellAndPurchaseService.getTopCollection(requestData)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({ topCollection: response });
    if (err || !response) return;
  };
  getApproveToken = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const response = await GetCategory.getApproveToken();
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    return this.setState({ currencyList: response.approvedTokensContent });
  };

  render() {
    return (
      <>
        <HeaderComponent />
        <Stats
          state={this.state}
          DurationChangeOnStats={this.DurationChangeOnStats}
          CurrencyChangeOnStats={this.CurrencyChangeOnStats}
          gettopSellers={this.getTopSellers}
          getTopBuyers={this.getTopBuyers}
          currencyList={this.getApproveToken}
          getTopCollection={this.getTopCollection}
        />
        <FooterComponent />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user, currencies: state.currency, wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(StatsPageComponent);
