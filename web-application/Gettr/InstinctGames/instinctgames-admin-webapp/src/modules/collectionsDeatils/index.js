import React, { useEffect, useState } from "react";
import BaseComponent from "../baseComponent";
import Collections from "./collections";
import contentService from "../../services/contentService";
import Utility, { dispatchAction } from "../../utility";
import {
  apiFailureConstants,
  apiSuccessConstants,
  eventConstants,
  validationsMessages,
} from "../../constants";
import { connect } from "react-redux";
import { ContentService } from "../../services";
import {
  handleBNBCurrencyConversion,
  handleSacredCurrencyConversion,
  handleInstinctCurrencyConversion,
} from "../../actions";
class Collection extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.convertBNBToUSD();
    this.convertSacredTailsToUSD();
    this.convertInstinctToUSD();
  }

  convertBNBToUSD = async () => {
    try {
      const convertedData = await ContentService.bnbConversionToDollar();
      this.props.handleBNBCurrencyConversion(
        convertedData?.quote[0]?.price || 0
      );
    } catch (e) {
      console.log(e);
    }
  };

  convertSacredTailsToUSD = async () => {
    try {
      const convertedData =
        await ContentService.sacredTailsConversionToDollar();
      this.props.handleSacredCurrencyConversion(
        convertedData?.quote[0]?.price || 0
      );
    } catch (e) {
      console.log(e);
    }
  };

  convertInstinctToUSD = async () => {
    try {
      const convertedData = await ContentService.instinctConversionToDollar();
      this.props.handleInstinctCurrencyConversion(
        convertedData?.quote[0]?.price || 0
      );
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Collections
        navigateToTab={this.props.navigateToTab}
        particularUserData={this.props.profileDetail}
        removeNft={this.props.removeNft}
        deleteNFT={this.props.deleteNFT}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  handleBNBCurrencyConversion: (data) => {
    dispatch(handleBNBCurrencyConversion(data));
  },
  handleSacredCurrencyConversion: (data) => {
    dispatch(handleSacredCurrencyConversion(data));
  },
  handleInstinctCurrencyConversion: (data) => {
    dispatch(handleInstinctCurrencyConversion(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
