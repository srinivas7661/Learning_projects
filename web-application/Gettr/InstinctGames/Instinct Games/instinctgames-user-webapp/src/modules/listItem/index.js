import React, { Component } from "react";
import ListItem from "./listItem";
import { sellAndPurchaseService } from "../../services/index";
import Utils, { dispatchAction } from "../../utility";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import { connect } from "react-redux";
import { getApproveToken } from "../../services/adminConfigMicroservices";
import ContentService from "../../services/contentMicroservice";
import { BlockchainService } from "../../services";
import GetCategory from "../../services/adminConfigMicroservices";
import {
  CURRENCIES,
  eventConstants,
  transactionConstants,
  validationsMessages,
} from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import { history } from "../../managers/history";

class ListItemComponent extends Component {
  constructor(props) {
    super(props);
    const { match, location, history } = this.props;
    let nftData = location.state.detail;
    let nftObj = JSON.parse(nftData);
    this.state = {
      approvedTokens: [],
      nftDetails: nftObj,
    };
  }
  async componentDidMount() {
    this.getTokens();
  }

  getTokens = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [err, response] = await Utils.parseResponse(getApproveToken());
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({ approvedTokens: response?.approvedTokensContent });
  };
  filterToken = (tokenName) => {
    let tokenDetails = {};
    this.state.approvedTokens.map((token) => {
      if (token.tokenName === tokenName) tokenDetails = token;
      return token;
    });
    return tokenDetails;
  };
  // getCurrencyName = async (tokenAddress) => {
  //   switch (tokenAddress) {
  //     case "0x0000000000000000000000000000000000000000":
  //       return CURRENCIES.BNB;
  //     case process.env.REACT_APP_SACRED_TAIL_CONTRACT_ADDRESS:
  //       return CURRENCIES.SACRED_TAILS;
  //     case process.env.REACT_APP_INSTINCT_CONTRACT_ADDRESS:
  //       return CURRENCIES.INSTINCT;
  //     default: {
  //       return await BlockchainService.getTokenSymbol(tokenAddress);
  //     }
  //   }
  // };

  sellNowNft = async (data) => {
    if (!data || !data.price || !data.token) return;
    const tokenDetails = this.filterToken(data.token);
    let [tokenDecimalsError, tokenDecimalsRes] = [null, 18];
    this.props.dispatchAction(eventConstants.SHOW_LOADER);

    if (data.token !== CURRENCIES.BNB) {
      [tokenDecimalsError, tokenDecimalsRes] = await Utils.parseResponse(
        BlockchainService.getTokenDecimals(
          tokenDetails?.tokenAddress,
          tokenDetails?.tokenAbi,
          this.state?.nftDetails?.collectionDetails?.collectionAddress,
          data.price || " "
        )
      );
      if (tokenDecimalsError) {
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        return CommonToasts.errorToast(
          tokenDecimalsRes?.data?.message ||
            validationsMessages.UNABLE_TO_FETCH_CONTRACT
        );
      }
    }

    //give approval to marketplace to trade this nft
    const [blockchainErrorForApproval, approvalRes] = await Utils.parseResponse(
      BlockchainService.setApprovalForAll(
        this.state?.nftDetails?.collectionDetails?.collectionAddress
      )
    );
    if (blockchainErrorForApproval || !approvalRes) {
      // this.setState({ isOpen: false });
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        blockchainErrorForApproval.message ||
          validationsMessages.UNABLE_TO_MINT_NFT_ON_BLOCKCHAIN
      );
    }
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.sellNft({
        tokenType: 1,
        tokenId: this.state?.nftDetails?.tokenId,
        price: data.price || "",
        currency: data.token,
        collectionAddress:
          this.state?.nftDetails?.collectionDetails?.collectionAddress,
        decimals: tokenDecimalsRes,
        erc20CurrencyAddress:
          data.token !== CURRENCIES.BNB
            ? tokenDetails?.tokenAddress
            : "0x0000000000000000000000000000000000000000",
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (blockchainError || !blockchainRes) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
          validationsMessages.UNABLE_TO_SELL_NFT_ON_BLOCKCHAIN
      );
    }
    let requestData = {
      type: transactionConstants.SELL,
      transaction: blockchainRes?.transactionHash || "",
      seller: this.props?.wallet?.walletConnect?._id || "",
      //this is dummy buyer
      buyer:"634514fb0443a3003582f7ee",
      type: transactionConstants.SELL,
      ownedBy: {
        _id: this.props?.wallet?.walletConnect?._id || "",
      },
      // _id: this.state?.nftDetails?._id || "",
      tokenId: this.state?.nftDetails?.tokenId,
      ipfsUrl: this.state?.nftDetails?.metaDataJsonUri,
      cdnUrl: this.state?.nftDetails?.cdnUrl,
      name: this.state?.nftDetails?.name,
      ownerAddress: this.props?.wallet?.walletConnect?.userId || "",
      collectionDetails: {
        collectionAddress:
          this.state?.nftDetails?.collectionDetails?.collectionAddress,
        collectionName:
          this.state?.nftDetails?.collectionDetails?.collectionName,
      },
      saleData: {
        ...this.state?.nftDetails?.saleData,
        price: data.price,
        currency: data.token,
        isOpenForSale: true,
      },
    };
    this.updateNftDataInDb(requestData, transactionConstants.SELL);
  };
  updateNftDataInDb = async (requestData, type) => {
    if (!requestData) return;
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, result] = await Utils.parseResponse(
      ContentService.updateNftContent(requestData)
    );

    if (error || !result) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        error || validationsMessages.UNABLE_TO_UPDATE_NFT_CONTENT
      );
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    let message = "NFT updated successfully.";
    if (type === transactionConstants.SELL)
      message = "NFT updated for sale successfully.";
    CommonToasts.successToast(message);
    history.push(
      "/nft?id=" +
        result._id +
        "&collectionAddress=" +
        this.state?.nftDetails?.collectionDetails?.collectionAddress +
        "&tokenId=" +
        this.state?.nftDetails.tokenId
    );
    window.location.reload();
  };
  render() {
    return (
      <>
        <HeaderComponent />
        <ListItem
          state={this.state}
          approvedTokens={this.getTokens}
          sellNowNft={this.sellNowNft}
        />
        <FooterComponent />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user, currencies: state.currency, wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(ListItemComponent);
