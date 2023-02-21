import React, { Component } from "react";
import HomePage from "./homePageComponent";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import Utils, { dispatchAction } from "../../utility";
import { useSelector } from "react-redux";
import { ContentService } from "../../services";
import {
  CURRENCIES,
  eventConstants,
  transactionConstants,
  validationsMessages,
} from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import { connect } from "react-redux";

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nftDetails: null,
      isLoggedInOwner: false,
    };
  }
  componentDidMount() {}

  handleLikeNft = async (isLiked, id, _id) => {
    if (!_id) {
      CommonToasts.errorToast(validationsMessages.WALLET_CONNECT);
      return;
    }
    const data = {
      contentId: id,
      addedBy: _id,
    };
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, result] = await Utils.parseResponse(
      ContentService.likeNft(data)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !result) {
      return CommonToasts.errorToast(
        error || validationsMessages.UNABLE_TO_LIKE
      );
    }
    CommonToasts.successToast(
      isLiked
        ? validationsMessages.UNLIKED_NFT_SUCCESSFULLY
        : validationsMessages.LIKED_NFT_SUCCESSFULLY
    );
    this.setState({ nftDetails: result });
  };
  render() {
    return (
      <div className="overflow-hidden main">
        <HeaderComponent />
        <HomePage
          state={this.state}
          userDetails={this.props?.user?.userDetails}
          isLoggedInOwner={this.isLoggedInOwner}
          handleLikeNft={this.handleLikeNft}
          nftDetails={this.nftDetails}
        />
        <FooterComponent />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(HomePageComponent);
