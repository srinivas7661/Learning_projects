import React, { Component } from "react";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import TransferNft from "./transferNft";
import { BlockchainService } from "../../services";
import {
  CURRENCIES,
  eventConstants,
  transactionConstants,
  validationsMessages,
} from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import { history } from "../../managers/history";
import Utils, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import ContentService from "../../services/contentMicroservice";

class TransferNftComponent extends Component {
  constructor(props) {
    super(props);
    const { match, location, history } = this.props;
    let nftData = location.state.detail;
    let nftObj = JSON.parse(nftData);
    this.state = {
      nftDetails: nftObj,
    };
  }

  async componentDidMount() {}

  transferNft = async (data) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.transferNft({
        _contractAddress:
          this.state?.nftDetails?.collectionDetails?.collectionAddress,
        _fromAddress: this.props?.wallet?.walletConnect?.userId,
        _transferAddress: data.address,
        tokenId: this.state?.nftDetails?.tokenId,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (blockchainError || !blockchainRes) {
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
          validationsMessages.UNABLE_TO_TRANSFER_NFT
      );
    }
    //TODO we need to store nft in DB after transfer to manage the flow of collected tab
    //   let nftId=this.state?.nftDetails?._id;
    //   console.log("NftID",nftId)
    //  if(nftId.length==0){
    //   this.props.dispatchAction(eventConstants.HIDE_LOADER);
    //   let message = "NFT updated successfully.";
    //   CommonToasts.successToast(message);
    //  }

    let requestData = {
      transaction: blockchainRes.transactionHash || "",
      seller: this.props?.wallet?.walletConnect?._id || "",
      buyer:"634514fb0443a3003582f7ee",
      type: transactionConstants.TRANSFER,
      // _id: this.state?.nftDetails?._id || "",
      collectionDetails: {
        collectionAddress:
          this.state?.nftDetails?.collectionDetails?.collectionAddress,
        collectionName:
          this.state?.nftDetails?.collectionDetails?.collectionName,
      },
      tokenId: this.state?.nftDetails?.tokenId,
      ipfsUrl: this.state?.nftDetails?.metaDataJsonUri,
      name: this.state?.nftDetails?.name,
      cdnUrl: this.state?.nftDetails?.cdnUrl,
      ownerAddress: data.address || "",
      saleData: {
        currency: this.state?.nftDetails?.saleData?.currency||"",
        price: this.state?.nftDetails?.saleData?.price||"",
        isOpenForSale: false,
      },
    };
    this.updateNftDataInDb(requestData, transactionConstants.TRANSFER);
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
    CommonToasts.successToast(message);
    history.push("/profile");
  };

  render() {
    console.log("nftDetails",this.state.nftDetails)
    return (
      <>
        <HeaderComponent />
        <TransferNft state={this.state} transferNft={this.transferNft} />
        <FooterComponent />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user, currencies: state.currency, wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(
  TransferNftComponent
);
