import React, { Component } from "react";
import NFTDetailsComponent from "./nftDetailsComponent";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import ContentService, { nftDetails } from "../../services/contentMicroservice";
import { addUser } from "../../services/userMicroservice";
import { getNfts } from "../../services/contentMicroservice";
import utility, { dispatchAction } from "../../utility";
import Utils from "../../utility";
import { connect } from "react-redux";
import { genericConstants, stringConstants } from "../../constants";
import moment from "moment";
import { likeNft } from "../../services/contentMicroservice";
import { useSelector } from "react-redux";
import { BlockchainService, TopBuyersService } from "../../services";
import { history } from "../../managers/history";
import Moralis from "moralis";

import {
  CURRENCIES,
  eventConstants,
  transactionConstants,
  validationsMessages,
} from "../../constants";
import { getApproveToken } from "../../services/adminConfigMicroservices";
import { getOffer } from "../../services/contentMicroservice";
import CommonToasts from "../../common/components/commonToasts";
import { ThirtyFpsRounded, WindowSharp } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";
import Utility from "../../utility";

class NFTDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      steps: 1,
      content: [],
      id: this.props.match.params.id,
      nftDetails: {},
      usdPrice: "",
      priceGraphData: [],
      listing: [],
      itemActivities: [],
      approvedTokens: [],
      offersList: [],
      propertiesAccordian: true,
      listingAccordian: true,
      offerAccordian: false,
      nfts: [],
      currencyForStats: "BNB",
      reportDialog: false,
      selectedReason: "",
      reportConfirmDialog: false,
      openFullImageView: false,
      isLiked: false,
      sharePopup: false,
      descriptionAccordian: false,
      collectionDetailsAccordian: false,
      avgPrice: 0,
      selectedTime: 365,
      nftDetailsFromDb: {},
      specificSingleOffer: {},
      itemActivitiesOptions: [],
      ownerDetails: {},
      saleProcessSuccessMessage: false,
      saleProcessMessage: "Your sale is processing..",
      contractType: ""
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let collectionAddress = params.get("collectionAddress");
    let tokenId = params.get("tokenId");
    if (!collectionAddress && !tokenId) history.push("/");
    this.getContractType(collectionAddress)

    if (id) {
      this.setState({ id });
      await this.getNFTDetails(id);
      await this.getPriceGraphData(id);
      this.offerList();
      this.getListing(id);
      this.getItemActivityData("", id);
    }
    // const nftDetails = await this.getDataFromMoralis(collectionAddress, tokenId);
    const nftDetails = await this.getNftInfoFromContract(
      collectionAddress,
      tokenId,
      id
    );
    this.getTokens();
  }

  getContractType = async (collectionAddress) => {
    try {
      const options = {
        chain: process.env.REACT_APP_NETWORK_NAME,
        address: collectionAddress
      }
      await Moralis.start({
        serverUrl: process.env.REACT_APP_MORALIS_URL,
        appId: process.env.REACT_APP_MORALIS_APP_ID
      });

      const response = await Moralis.Web3API.token.getNFTMetadata(options);
      this.setState({ contractType: response?.contract_type })
    } catch (e) {
      console.error(e);
    }
  }

  getNftInfoFromContract = async (collectionAddress, tokenId, _id) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let price = 0;
    let currency = "";
    let isListed = true;
    const listingDetails = await BlockchainService.getListingInfo(
      collectionAddress,
      tokenId
    ).catch((err) => {
      isListed = false;
    });
    if (isListed) {
      currency = await this.getCurrencyName(listingDetails["tokenAddress"]);
      const decimals = await this.getTokenDecimals(
        listingDetails["tokenAddress"]
      );
      price = listingDetails["price"] / Math.pow(10, Number(decimals));
    }
    const tokenType = this.state.nftDetailsFromDb?.collectionId?.tokenType
      ? this.state.nftDetailsFromDb?.collectionId?.tokenType
      : this.state?.contractType
    const metaDataJsonUri = await BlockchainService.getNftMetaData(
      collectionAddress,
      tokenId,
      tokenType
    );
    let resJson = await fetch(metaDataJsonUri).catch((err) => {
      CommonToasts.errorToast("Unable to fetch Nft metadata");
    });
    if (!resJson) return;
    const metaDataJson = await resJson.json().catch((err) => {
      CommonToasts.errorToast("Unable to fetch Nft metadata");
    });
    if (!metaDataJson) return;
    const collectionName = await BlockchainService.getERC721TokenName(
      collectionAddress
    );
    const ownerAddress = await BlockchainService.getERC721TokenOwnerAddress(
      collectionAddress,
      tokenId
    );
    this.state.ownerDetails = await this.getOwnerDetails(ownerAddress);
    const structuredData = {
      ...metaDataJson,
      currency,
      price,
      collectionName,
      ownerAddress,
      collectionAddress,
      isListed,
      metaDataJsonUri,
      _id,
    };

    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.parseDataFromBlockchain(collectionAddress, tokenId, structuredData);
    this.findCurrencyUSDPrice(structuredData.currency);

    return structuredData;
  };

  getOwnerDetails = async (ownerAddress) => {
    const [error, addUserResponse] = await Utility.parseResponse(
      addUser({
        userId: ownerAddress,
        password: process.env.REACT_APP_ADD_IG_MEMBER_PASSWORD,
      })
    );
    return addUserResponse;
  };

  getTokenDecimals = async (tokenAddress) => {
    switch (tokenAddress) {
      case "0x0000000000000000000000000000000000000000":
        return 18;
      case process.env.REACT_APP_SACRED_TAIL_CONTRACT_ADDRESS:
        return 18;
      case process.env.REACT_APP_INSTINCT_CONTRACT_ADDRESS:
        return 18;
      default: {
        return await BlockchainService.getERC20TokenDecimals(tokenAddress);
      }
    }
  };

  getCurrencyName = async (tokenAddress) => {
    switch (tokenAddress) {
      case "0x0000000000000000000000000000000000000000":
        return CURRENCIES.BNB;
      case process.env.REACT_APP_SACRED_TAIL_CONTRACT_ADDRESS:
        return CURRENCIES.SACRED_TAILS;
      case process.env.REACT_APP_INSTINCT_CONTRACT_ADDRESS:
        return CURRENCIES.INSTINCT;
      default: {
        return await BlockchainService.getTokenSymbol(tokenAddress);
      }
    }
  };

  parseDataFromBlockchain = async (
    collectionAddress,
    tokenId,
    nftDataFromBlockchain
  ) => {
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let updatedNftDetails = {};
    const totalCount = await this.getTotalNftsCountInCollection(
      collectionAddress
    );
    if (nftDataFromBlockchain) {
      updatedNftDetails = this.parseNftDataFromDbAndBlockchain(
        nftDataFromBlockchain,
        this.state.nftDetailsFromDb,
        tokenId
      );
      updatedNftDetails.attributes = await this.getTraitsPercentage(
        updatedNftDetails.attributes,
        totalCount,
        collectionAddress
      );
      await this.setState({ nftDetails: updatedNftDetails });
      // this.props.dispatchAction(eventConstants.HIDE_LOADER);
      this.getNFTs(updatedNftDetails, collectionAddress);
      return updatedNftDetails;
    }
  };

  getTraitsPercentage = async (attributes, totalCount, collectionAddress) => {
    if (!attributes) return [];
    for (let index = 0; index < attributes.length; index++) {
      if (!attributes[index].value) continue;
      if (typeof attributes[index].value === "number")
        attributes[index].value = attributes[index].value.toString();
      if (
        attributes[index].value.length < 3 &&
        attributes[index].value.length > 0
      ) {
        if (attributes[index].value.length === 1)
          attributes[index].value = "  " + attributes[index].value;
        if (attributes[index].value.length === 2)
          attributes[index].value = " " + attributes[index].value;
      }
      const options = {
        q: attributes[index].value,
        chain: process.env.REACT_APP_NETWORK_NAME || "bsc Testnet",
        filter: "attributes",
        token_address: collectionAddress,
      };
      let nftData = await Moralis.Web3API.token
        .searchNFTs(options)
        .catch((err) => { });
      if (nftData && nftData.total && totalCount)
        attributes[index].percentage =
          (Number(nftData.total) * 100) / Number(totalCount);
    }
    return attributes;
  };

  getTotalNftsCountInCollection = async (collectionAddress) => {
    const options = {
      chain: process.env.REACT_APP_NETWORK_NAME || "bsc Testnet",
      address: collectionAddress,
    };
    let nftData = await Moralis.Web3API.token
      .getAllTokenIds(options)
      .catch((err) => { });
    if (nftData && nftData.total) return nftData.total;
    return 1;
  };

  getNFTDetails = async (id) => {
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(
      ContentService.nftDetails(id)
    );
    if (error || !response) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return;
    }
    this.state.nftDetailsFromDb = response;

    if (response?.saleData?.currency)
      this.findCurrencyUSDPrice(response?.saleData?.currency);
    response &&
      response?.likedBy?.length &&
      response.likedBy.map((like) => {
        if (like.userId === this?.props?.wallet?.walletConnect?._id)
          this.setState({ isLiked: true });
      });
  };

  offerList = async () => {
    let reqData = {
      ownerAddress: this.props?.wallet?.walletConnect?.userId,
      contentId: this.state.id,
    };
    const response = await getOffer(reqData);
    this.setState({ offersList: response });
  };

  onClickNFT = async (nft) => {
    window.location.href = `/nft?id=${nft?._id}&collectionAddress=${nft?.collectionDetails?.collectionAddress}&tokenId=${nft?.tokenId}`;
  };
  openSharePopup = (event) => {
    this.setState({ sharePopup: event.target });
  };
  closeSharePopup = () => {
    this.setState({ sharePopup: false });
  };

  getPriceGraphData = async (id, noOfDays) => {
    let req = {
      contentId: id,
      day: noOfDays ? Number(noOfDays) : this.state.selectedTime,
      type: "SELL",
    };
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(
      ContentService.priceGraph(req)
    );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !response) return;
    let graphData = [],
      totalPrice = 0;
    response.map((item) => {
      if (item.price && item.addedOn) {
        graphData.push({
          x: item.addedOn,
          y: item.price,
        });
        totalPrice = totalPrice + Number(item.price);
      }
    });
    const avgPrice = totalPrice / response.length;
    this.setState({ priceGraphData: graphData, avgPrice });
  };

  getListing = async (id) => {
    let req = {
      contentId: id,
      type: "SELL",
    };
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(
      ContentService.priceGraph(req)
    );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !response) return;
    const parsedData = this.parseListingData(response);
    this.setState({ listing: parsedData });
  };

  parseListingData = (response) => {
    let parsedData = [];
    response.map((data) => {
      parsedData.push({
        price: data?.price,
        usdPrice: data?.price
          ? (this.state.usdPrice * data.price).toFixed(4)
          : "",
        from: data?.buyer?.firstName,
        currency: data?.currency,
      });
    });
    return parsedData;
  };
  getItemActivityData = async (type, id) => {
    let req = {
      contentId: id || this.state.id,
    };
    if (type && type !== "All") {
      req = {
        contentId: id,
        type: type,
      };
    }
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(
      ContentService.priceGraph(req)
    );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !response) return;
    const parsedData = this.parseItemActivityData(response);
    if (!type)
      this.setState({
        itemActivities: parsedData.parsedData,
        itemActivitiesOptions: parsedData.options,
      });
    else this.setState({ itemActivities: parsedData.parsedData });
  };
  parseItemActivityData = (response) => {
    let parsedData = [],
      options = [];
    response.map((data) => {
      parsedData.push({
        event: utility.sentenceCase(data?.type),
        currency: data?.currency,
        price: data?.price,
        from:
          data?.seller?.firstName ? data?.seller?.firstName ||
            utility.shortenAddress(data?.seller?.userId, 5, 5, 2) : "",
        to:
          data?.buyer?.firstName ? data?.buyer?.firstName ||
            utility.shortenAddress(data?.seller?.userId, 5, 5, 2) : "",
        fromAddress: data?.seller?.userId,
        toAddress: data?.buyer?.userId,
        date: data?.addedOn ? moment(data.addedOn).fromNow() : "",
      });
      if (!options.includes(data?.type)) options.push(data?.type);
    });
    return { parsedData, options };
  };

  getNFTs = async (nftDetails, collectionAddress) => {
    let req = {
      skip: 0,
      limit: 10,
      "collectionDetails.collectionAddress": nftDetails?.collectionAddress,
    };
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(getNfts(req));
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !response || !response?.nftContent?.length) return;
    let filteredNFTs = response.nftContent.filter((nft) => {
      if (nft._id !== this.state.nftDetails?._id) {
        return nft;
      }
    });
    // let filteredNFTs = await Promise.all(
    //     response.nftContent.map(async (nft) => {
    //         if (nft._id === nftDetails?._id) {
    //             return null;
    //         }
    //         const options = {
    //             token_id: nft.tokenId,
    //             chain: process.env.REACT_APP_NETWORK_NAME || "bsc Testnet",
    //             address: collectionAddress,
    //         };
    //         let nftData = await Moralis.Web3API.token
    //             .getTokenIdMetadata(options)
    //             .catch((err) => {
    //                 return err;
    //             });
    //         if (nftData && nftData.metadata) {
    //             return this.parseNftDataFromDbAndMoralis(nftData, nft);
    //         }
    //     })
    // );
    filteredNFTs = filteredNFTs?.filter((nft) => {
      if (nft) {
        return nft;
      }
    });
    this.setState({ nfts: filteredNFTs });
  };

  parseNftDataFromDbAndBlockchain = (blockchainData, dbNft, tokenId) => {
    if (!blockchainData && !dbNft) return {};
    if (!blockchainData || !blockchainData.name) {
      return {
        ...dbNft,
        collectionName: blockchainData.collectionName,
        collectionAddress: blockchainData.collectionAddress,
        price: blockchainData.price,
        currency: blockchainData.currency,
        tokenId,
        ownerAddress: blockchainData.ownerAddress || dbNft?.ownerAddress,
        isListed: blockchainData.isListed,
      };
    }

    if (!blockchainData.image && blockchainData.animation_url) {
      blockchainData.image = blockchainData.animation_url;
    }
    if (blockchainData.image.includes("ipfs://"))
      blockchainData.image = blockchainData.image.replace(
        "ipfs://",
        "https://hoardable.infura-ipfs.io/ipfs/"
      );

    return {
      ...dbNft,
      name: blockchainData.name,
      description: blockchainData.description,
      cdnUrl: blockchainData.image || dbNft.cdnUrl,
      collectionName: blockchainData.collectionName || dbNft.collectionDetails?.collectionName,
      collectionAddress: blockchainData.collectionAddress,
      saleData: {
        price: blockchainData.price,
        currency: blockchainData.currency,
        isOpenForSale: dbNft?.saleData?.isOpenForSale,
      },
      price: blockchainData.price,
      currency: blockchainData.currency,
      tokenId,
      attributes: blockchainData.attributes,
      ownerAddress: blockchainData.ownerAddress || dbNft.ownerAddress,
      isListed: blockchainData.isListed,
      metaDataJsonUri: blockchainData.metaDataJsonUri,
      _id: blockchainData._id,
    };
  };

  parseNftDataFromDbAndMoralis = (moralisData, dbNft) => {
    if (!moralisData && !dbNft) return {};
    let nftMetaData = JSON.parse(moralisData.metadata);
    return {
      ...dbNft,
      name: nftMetaData.name,
      description: nftMetaData.description,
      cdnUrl: nftMetaData.image || dbNft.cdnUrl,
      collectionId: {
        ...dbNft?.collectionId,
        name: moralisData.name,
      },
      tokenId: moralisData.token_id,
      attributes: nftMetaData.attributes,
      // ownerAddress: moralisData.owner_of,
    };
  };

  findCurrencyUSDPrice = (currency) => {
    if (genericConstants.CURRENCIES.includes(currency)) {
      switch (currency) {
        case genericConstants.CURRENCY_SYMBOL.BNB:
          this.setState({ usdPrice: this.props.currency.priceBNBToUSD });
          break;
        case genericConstants.CURRENCY_SYMBOL.SACREDTALES:
          this.setState({ usdPrice: this.props.currency.priceSacredToUSD });
          break;
        case genericConstants.CURRENCY_SYMBOL.INSTINCT:
          this.setState({ usdPrice: this.props.currency.priceInstinctToUSD });
          break;
        default:
          break;
      }
    }
  };

  getUSDEquivalentValue = (currency, value) => {
    if (genericConstants.CURRENCIES.includes(currency)) {
      switch (currency) {
        case genericConstants.CURRENCY_SYMBOL.BNB:
          return this.props.currency.priceBNBToUSD * Number(value);
        case genericConstants.CURRENCY_SYMBOL.SACREDTALES:
          return this.props.currency.priceSacredToUSD * Number(value);
        case genericConstants.CURRENCY_SYMBOL.INSTINCT:
          return this.props.currency.priceInstinctToUSD * Number(value);
        default:
          return 0;
      }
    }
  };

  toggleAccordian = (name) => {
    this.setState({ [name]: !this.state[name] });
  };
  toggleReportDialog = () => {
    this.setState({ reportDialog: !this.state.reportDialog });
  };
  selectReason = (event) => {
    this.setState({ selectedReason: event.target.value });
  };
  onReportNFT = async () => {
    let req = {
      content: this.state?.id,
      addedBy: this?.props?.wallet?.walletConnect?._id,
      reason: this.state?.selectedReason,
    };
    if (!req.addedBy) {
      CommonToasts.errorToast("Please Connect Wallet");
      return;
    }
    if (!req.reason) {
      CommonToasts.errorToast("Please Select Reason");
      return;
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(
      ContentService.onReportNFT(req)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !response) {
      CommonToasts.errorToast(error?.message || error || "Cannot Report");
      return;
    }
    this.setState({ reportConfirmDialog: true });
  };
  toggleFullImageView = () => {
    this.setState({ openFullImageView: !this.state.openFullImageView });
  };

  likeUnlikeNFT = async () => {
    const data = {
      contentId: this.state.id,
      addedBy: this?.props?.wallet?.walletConnect?._id,
    };
    if (!data.addedBy) {
      CommonToasts.errorToast("Please Connect Wallet");
      return;
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(likeNft(data));
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (error || !response) {
      CommonToasts.errorToast(
        error?.message || error || validationsMessages.UNABLE_TO_LIKE
      );
      return;
    }
    CommonToasts.successToast(
      this.state.isLiked
        ? validationsMessages.UNLIKED_NFT_SUCCESSFULLY
        : validationsMessages.LIKED_NFT_SUCCESSFULLY
    );
    this.setState({ isLiked: !this.state.isLiked });
  };

  getTokens = async () => {
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
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
  approveAndBuy = async () => {
    //call approve method
    const tokenDetails = this.filterToken(
      this.state?.nftDetails?.saleData?.currency
    );
    this.setState({ isOpen: true });
    const [tokenDecimalsError, tokenDecimalsRes] = await Utils.parseResponse(
      BlockchainService.getTokenDecimals(
        tokenDetails?.tokenAddress,
        tokenDetails?.tokenAbi,
        this.state?.nftDetails?.collectionAddress,
        this.state?.nftDetails?.saleData?.price
      )
    );

    if (tokenDecimalsError) {
      this.setState({ isOpen: false });
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        tokenDecimalsRes?.data?.message ||
        validationsMessages.UNABLE_TO_FETCH_CONTRACT
      );
    }
    const nftPrice =
      this.state?.nftDetails?.saleData?.price * 10 ** Number(tokenDecimalsRes);

    const [tokenApproveError, tokenApproveRes] = await Utils.parseResponse(
      BlockchainService.approveToken(
        tokenDetails?.tokenAddress,
        tokenDetails?.tokenAbi,
        process.env.REACT_APP_MASTER_CONTRACT_ADDRESS,
        nftPrice
      )
    );

    if (tokenApproveError || !tokenApproveRes) {
      this.setState({ isOpen: false });
      // this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        tokenApproveError?.data?.message ||
        validationsMessages.UNABLE_TO_APPROVE_TOKEN
      );
    }
    this.setState({ steps: 2 });
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.buyNFTWithToken(
        1,
        this.state?.nftDetails?.collectionAddress,
        tokenDetails?.tokenAddress,
        this.state?.nftDetails?.tokenId
      )
    );
    this.setState({ steps: 3 });
    if (blockchainError || !blockchainRes) {
      this.setState({ isOpen: false });
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.ERROR_IN_BLOCKCHAIN
      );
    }
    this.updateNftInDB(blockchainRes);
  };

  BuyNowNft = async () => {
    if (this.state?.nftDetails?.saleData?.currency !== CURRENCIES.BNB) {
      await this.approveAndBuy();
      return;
    }
    const token = this.state?.nftDetailsFromDb?.collectionId?.tokenType
      ? this.state?.nftDetailsFromDb?.collectionId?.tokenType 
      : this.state?.contractType
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.buyNFT({
        tokenType: token === "ERC721" ? 1 : 2,
        contractAddress: this.state?.nftDetails?.collectionAddress,
        tokenId: this.state?.nftDetails?.tokenId,
        price: this.state?.nftDetails?.saleData?.price,
      })
    )
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (blockchainError || !blockchainRes) {
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.UNABLE_TO_BUY_NFT_ON_BLOCKCHAIN
      );
    }
    this.updateNftInDB(blockchainRes);
  };
  updateNftInDB = async (blockchainRes) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let requestData = {
      type: transactionConstants.BUY,
      transaction: blockchainRes?.transactionHash || "",
      seller:
        this.state?.ownerDetails?._id ||
        this.state?.nftDetails?.ownedBy?._id ||
        this.state?.nftDetails?.ownedBy ||
        "",
      buyer: this.props?.wallet?.walletConnect?._id || "",
      ownedBy: this.props?.wallet?.walletConnect?._id || "",
      ownerAddress: this.props?.wallet?.walletConnect?.userId || "",
      updatedBy: this.props?.wallet?.walletConnect?._id || "",
      collectionDetails: {
        collectionAddress: this.state?.nftDetails?.collectionAddress,
        collectionName: this.state?.nftDetails?.collectionName,
      },
      tokenId: this.state?.nftDetails?.tokenId,
      _id: this.state?.nftDetails?._id || "",
      saleData: {
        ...this.state?.nftDetails?.saleData,
        isOpenForSale: false,
      },
    };
    this.updateNftDataInDb(requestData, transactionConstants.BUY);
  };
  getSpecificOffer = (specificOffer) => {
    this.setState({ specificSingleOffer: specificOffer });
  };
  // ------approveOffer-------
  approveOffer = async () => {
    //call approve method
    const tokenDetails = this.filterToken(
      this.state.specificSingleOffer.offers.currency
    );

    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [tokenDecimalsError, tokenDecimalsRes] = await Utils.parseResponse(
      BlockchainService.getTokenDecimals(
        tokenDetails?.tokenAddress,
        tokenDetails?.tokenAbi,
        this.state?.specificSingleOffer?.offers?.userAddress,
        this.state?.specificSingleOffer?.saleData?.price
      )
    );

    if (tokenDecimalsError) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        tokenDecimalsRes?.data?.message ||
        validationsMessages.UNABLE_TO_FETCH_CONTRACT
      );
    }
    const nftPrice =
      this.state?.specificSingleOffer?.saleData?.price *
      10 ** Number(tokenDecimalsRes);

    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.acceptOfferToken({
        tokenType: 1,
        contractAddress: this.state?.nftDetails?.collectionAddress,
        tokenId: this.state?.nftDetails?.tokenId,
        offererAddress: this.state?.specificSingleOffer?.offers?.userAddress,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (blockchainError || !blockchainRes) {
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.ERROR_IN_BLOCKCHAIN
      );
    }

    this.updateOfferInDB(blockchainRes);
  };
  AcceptOfferNft = async () => {
    if (this.state?.specificSingleOffer?.offers?.currency !== CURRENCIES.BNB) {
      await this.approveOffer();
      return;
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.acceptOffer({
        tokenType: 1,
        contractAddress: this.state?.nftDetails?.collectionAddress,
        tokenId: this.state?.specificSingleOffer?.tokenId,
        offererAddress: this.state?.specificSingleOffer?.offers?.userAddress,
      })
    );

    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (blockchainError || !blockchainRes) {
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.UNABLE_TO_ACCEPT_OFFER_ON_BLOCKCHAIN
      );
    }
    this.updateOfferInDB(blockchainRes);
  };
  updateOfferInDB = async (blockchainRes) => {
    let requestData = {
      _id: this.state?.specificSingleOffer?._id || "",
      type: transactionConstants.BUY,
      buyer: this.state?.specificSingleOffer?.offers?.userId || "",
      transaction: blockchainRes?.transactionHash || "",
      transactionHash: blockchainRes?.transactionHash || "",
      ownerAddress: this.state?.specificSingleOffer?.offers?.userAddress || "",
      ownedBy: this.state?.specificSingleOffer?.offers?.userId || "",
      updatedBy: this.props?.wallet?.walletConnect?._id || "",
      seller: this.props?.wallet?.walletConnect?._id || "",
      saleData: {
        price: this.state?.specificSingleOffer?.offers?.amount,
        currency: this.state?.specificSingleOffer?.offers?.currency,
        isOpenForSale: false,
      },
    };
    this.updateOfferDataInDb(requestData);
  };
  updateOfferDataInDb = async (requestData, type) => {
    if (!requestData || !requestData._id) return;
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, result] = await Utils.parseResponse(
      ContentService.acceptOffer(requestData)
    );
    if (error || !result) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        error || validationsMessages.UNABLE_TO_UPDATE_NFT_CONTENT
      );
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    CommonToasts.successToast("Offer accepted successfully");
    this.setState({ saleProcessMessage: "Your sale is successful" })
    window.location.reload();

  };

  //---------rejectOffer---------
  rejectOffer = async () => {
    //call approve method
    const tokenDetails = this.filterToken(
      this.state.specificSingleOffer.offers.currency
    );
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [tokenDecimalsError, tokenDecimalsRes] = await Utils.parseResponse(
      BlockchainService.getTokenDecimals(
        tokenDetails?.tokenAddress,
        tokenDetails?.tokenAbi,
        this.state?.specificSingleOffer?.offers?.userAddress,
        this.state?.specificSingleOffer?.saleData?.price
      )
    );

    if (tokenDecimalsError) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);

      return CommonToasts.errorToast(
        tokenDecimalsRes?.data?.message ||
        validationsMessages.UNABLE_TO_FETCH_CONTRACT
      );
    }
    const nftPrice =
      this.state?.specificSingleOffer?.saleData?.price *
      10 ** Number(tokenDecimalsRes);

    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.rejectOfferToken({
        contractAddress: this.state?.nftDetails?.collectionAddress,
        tokenId: this.state?.nftDetails?.tokenId,
        offererAddress: this.state?.specificSingleOffer?.offers?.userAddress,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (blockchainError || !blockchainRes) {
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.ERROR_IN_BLOCKCHAIN
      );
    }

    this.updateRejectOfferInDB(blockchainRes);
  };
  RejectOfferNft = async () => {
    if (
      this.state?.specificSingleOffer?.saleData?.currency !== CURRENCIES.BNB
    ) {
      await this.rejectOffer();
      return;
    }

    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.rejectOffer({
        contractAddress: this.state?.nftDetails?.collectionAddress,
        tokenId: this.state?.specificSingleOffer?.tokenId,
        offererAddress: this.state?.specificSingleOffer?.offers?.userAddress,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (blockchainError || !blockchainRes) {
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.UNABLE_TO_REJECT_OFFER_ON_BLOCKCHAIN
      );
    }
    this.updateRejectOfferInDB(blockchainRes);
  };
  updateRejectOfferInDB = async (blockchainRes) => {
    let requestData = {
      _id: this.state?.specificSingleOffer?._id || "",
      userAddress: this.state?.specificSingleOffer?.offers?.userAddress || "",
    };
    this.updateRejectOfferDataInDb(requestData);
  };
  updateRejectOfferDataInDb = async (requestData) => {
    if (!requestData || !requestData._id) return;
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let [error, result] = await Utils.parseResponse(
      ContentService.acceptOffer(requestData)
    );
    if (error || !result) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return window.alert("Unable to update in db");
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    CommonToasts.successToast("Offer rejected successfully");
    window.location.reload();
  };

  sellNowNft = async (data) => {
    if (!data || !data.price || !data.token) return;
    const tokenDetails = this.filterToken(data.token);
    let [tokenDecimalsError, tokenDecimalsRes] = [null, 18];
    this.props.dispatchAction(eventConstants.SHOW_LOADER);

    //use constant instead of string
    if (data.token !== CURRENCIES.BNB) {
      [tokenDecimalsError, tokenDecimalsRes] = await Utils.parseResponse(
        BlockchainService.getTokenDecimals(
          tokenDetails?.tokenAddress,
          tokenDetails?.tokenAbi,
          this.state?.nftDetails.collectionAddress,
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

    const token = this.state.nftDetailsFromDb?.collectionId?.tokenType
      ? this.state.nftDetailsFromDb?.collectionId?.tokenType 
      : this.state?.contractType

    //give approval to marketplace to trade this nft
    const [blockchainErrorForApproval, approvalRes] = await Utils.parseResponse(
      BlockchainService.setApprovalForAll(
        this.state?.nftDetails.collectionAddress,
        token
      )
    );
    if (blockchainErrorForApproval || !approvalRes) {
      this.setState({ isOpen: false });
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        blockchainErrorForApproval.message ||
        validationsMessages.UNABLE_TO_MINT_NFT_ON_BLOCKCHAIN
      );
    }

    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.sellNft({
        tokenType: token === "ERC721" ? 1 : 2,
        tokenId: this.state?.nftDetails?.tokenId,
        price: data.price || "",
        currency: data.token,
        collectionAddress: this.state?.nftDetails?.collectionAddress,
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
      buyer: stringConstants.BUYER,
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
        collectionAddress: this.state?.nftDetails.collectionAddress,
        collectionName: this.state?.nftDetails?.collectionName,
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

  removeNftFromSale = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.removeFromSaleNft({
        contractAddress: this.state?.nftDetails?.collectionAddress,
        tokenId: this.state?.nftDetails?.tokenId,
      })
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (blockchainError || !blockchainRes) {
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.UNABLE_TO_REMOVE_NFT_FROM_SALE
      );
    }
    let requestData = {
      type: transactionConstants.REMOVE_FROM_SALE,
      transaction: blockchainRes.transactionHash || "",
      seller: this.props?.wallet?.walletConnect?._id || "",
      buyer: stringConstants.BUYER,

      // buyer:"",
      // _id: this.state?.nftDetails?._id || "",
      collectionDetails: {
        collectionAddress: this.state?.nftDetails.collectionAddress,
        collectionName: this.state?.nftDetails?.collectionName,
      },
      tokenId: this.state?.nftDetails?.tokenId,
      ipfsUrl: this.state?.nftDetails?.metaDataJsonUri,
      name: this.state?.nftDetails?.name,
      cdnUrl: this.state?.nftDetails?.cdnUrl,
      saleData: {
        currency: this.state?.nftDetails?.currency,
        price: this.state?.nftDetails?.price,
        isOpenForSale: false,
      },
    };
    this.updateNftDataInDb(requestData, transactionConstants.REMOVE_FROM_SALE);
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
    this.setState({
      saleProcessSuccessMessage: true,
    });
    let message = "NFT updated successfully.";
    if (type === transactionConstants.BUY)
      message = "This NFT has been bought successfully.";
    else if (type === transactionConstants.SELL)
      message = "NFT updated for sale successfully.";
    else if (type === transactionConstants.REMOVE_FROM_SALE)
      message = "NFT removed from sale successfully.";
    CommonToasts.successToast(message);
    history.push(
      "/nft?id=" +
      result._id +
      "&collectionAddress=" +
      this.state?.nftDetails.collectionAddress +
      "&tokenId=" +
      this.state?.nftDetails.tokenId
    );
    window.location.reload();
  };
  makeOffer = async (data) => {
    if (data.token !== CURRENCIES.BNB) {
      this.transferToken(data);
      return;
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.makeOffer({
        contractAddress: this.state?.nftDetails?.collectionAddress,
        tokenId: this.state?.nftDetails?.tokenId,
        amount: data.amount,
      })
    );
    if (blockchainError || !blockchainRes) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.ERROR_IN_BLOCKCHAIN
      );
    }
    let requestData = {
      _id: this.state?.nftDetails?._id || "",
      amount: data.amount,
      currency: data.token,
      expTime: data.epochDate,
      userAddress: this.props?.wallet?.walletConnect?.userId,
      userId: this.props?.wallet?.walletConnect?._id,
      type: transactionConstants.OFFER,
      transaction: blockchainRes.transactionHash || "",
      seller:
        this.state?.ownerDetails?._id ||
        this.state?.ownerDetails?.ownedBy?._id ||
        this.state?.nftDetails?.ownedBy ||
        "",
      buyer: this.props?.wallet?.walletConnect?._id,
    };
    this.addOffer(requestData);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
  };
  addOffer = async (requestData) => {
    if (!requestData || !requestData._id) return;
    let [error, result] = await Utils.parseResponse(
      ContentService.addOffer(requestData)
    );

    if (error || !result) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast("Unable to add in db");
    }
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    CommonToasts.successToast("Your offer has been sent");
    window.location.reload();
  };
  transferToken = async (data) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const tokenDetails = this.filterToken(data.token);
    const [tokenDecimalsError, tokenDecimalsRes] = await Utils.parseResponse(
      BlockchainService.getTokenDecimals(
        tokenDetails?.tokenAddress,
        tokenDetails?.tokenAbi
      )
    );

    if (tokenDecimalsError) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        tokenDecimalsRes?.data?.message ||
        validationsMessages.UNABLE_TO_FETCH_CONTRACT
      );
    }
    const nftPrice = data.amount * 10 ** Number(tokenDecimalsRes);
    const [transferError, tranferRes] = await Utils.parseResponse(
      BlockchainService.transferToken(
        tokenDetails?.tokenAddress,
        tokenDetails?.tokenAbi,
        process.env.REACT_APP_MASTER_CONTRACT_ADDRESS,
        nftPrice
      )
    );
    if (transferError || !tranferRes) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        transferError?.data?.message || "Unable to transfer token"
      );
    }
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.makeOfferWithToken(
        this.state?.nftDetails?.collectionAddress,
        tokenDetails?.tokenAddress,
        this.state?.nftDetails?.tokenId,
        nftPrice
      )
    );

    if (blockchainError || !blockchainRes) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return CommonToasts.errorToast(
        blockchainError?.data?.message ||
        validationsMessages.ERROR_IN_BLOCKCHAIN
      );
    }
    let requestData = {
      _id: this.state?.nftDetails?._id || "",
      amount: data.amount,
      currency: data.token,
      expTime: data.epochDate,
      userAddress: this.props?.wallet?.walletConnect?.userId,
      userId: this.props?.wallet?.walletConnect?._id,
      type: transactionConstants.OFFER,
      transaction: blockchainRes.transactionHash || "",
      seller:
        this.state?.ownerDetails?._id ||
        this.state?.nftDetails?.ownedBy?._id ||
        this.state?.nftDetails?.ownedBy ||
        "",
      buyer: this.props?.wallet?.walletConnect?._id,
    };
    this.addOffer(requestData);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
  };
  selectTime = (event) => {
    this.setState({ selectedTime: event.target.value });
    this.getPriceGraphData(this.state.id, event.target.value);
  };

  filterByTime = (time) => {
    this.setState({ selectedTime: time });
    this.getPriceGraphData(this.state.id, time);
  };

  handleSetState = (dataObj) => this.setState(dataObj)

  render() {
    return (
      <>
        <HeaderComponent />
        <NFTDetailsComponent
          state={this.state}
          getUSDEquivalentValue={this.getUSDEquivalentValue}
          toggleAccordian={this.toggleAccordian}
          onClickNFT={this.onClickNFT}
          toggleReportDialog={this.toggleReportDialog}
          selectReason={this.selectReason}
          onReportNFT={this.onReportNFT}
          toggleFullImageView={this.toggleFullImageView}
          likeUnlikeNFT={this.likeUnlikeNFT}
          openSharePopup={this.openSharePopup}
          closeSharePopup={this.closeSharePopup}
          userDetails={this.props?.wallet?.walletConnect}
          buyNowNft={this.BuyNowNft}
          sellNowNft={this.sellNowNft}
          acceptOfferNft={this.AcceptOfferNft}
          rejectOfferNft={this.RejectOfferNft}
          removeNftFromSale={this.removeNftFromSale}
          makeOffer={this.makeOffer}
          approvedTokens={this.getTokens}
          selectTime={this.selectTime}
          getOffer={this.getSpecificOffer}
          getItemActivityData={this.getItemActivityData}
          itemActivities={this.state.itemActivities}
          isOpen={this.state.isOpen}
          steps={this.state.steps}
          filterByTime={this.filterByTime}
          handleSetState={this.handleSetState}
        />
        <FooterComponent />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { currency: state.currency, wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(NFTDetails);
