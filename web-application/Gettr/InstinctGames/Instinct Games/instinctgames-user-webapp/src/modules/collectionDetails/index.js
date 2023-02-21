import CollectionDetailsComponent from "./collectionDetailsComponent";
import CollectionDetailsMobile from "./collectionDetailsMobile";

import React, { Component } from "react";
import { detailsTab, eventConstants, genericConstants } from "../../constants";
import { getCollectionById } from "../../services";
import { getNfts } from "../../services";
import { sellAndPurchaseService, ContentService } from "../../services";
import { getApproveToken } from "../../services/adminConfigMicroservices";
import Footer from "../common/footer";
import Header from "../common/header";
import utility, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { Toaster } from "react-hot-toast";
import Moralis from "moralis";
import { NFTModel } from "../../models/nft";
import commonToasts from "../../common/components/commonToasts";
import FilterSideMobile from "./filterSideMobile";
import Utils from "../../utility";
import { getNftTraits, filterNft } from "../../services/contentMicroservice"

class CollectionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: detailsTab[0].name,
      searchName: "",
      collectionDetails: [],
      nftList: [],
      priceFilter: {
        selectedToken: "",
        minTokenValue: "",
        maxTokenValue: "",
      },
      openFilter: true,
      nftsCount: "",
      collectionNft: {},
      volumeTradeCount: "",
      sideBarStatus: true,
      skip: 0,
      limit: 10,
      priceGraphData: [],
      avgPrice: "",
      itemActivities: [],
      onAuction: "",
      selectedTime: 365,
      statsData: "",
      saleData: "",
      updatedOn: "",
      recentFilter: false,
      recentFilterIndex: "",
      cursor: null,
      tabId: "",
      showPriceFilter: false,
      approvedTokens: [],
      collectionRequest: {},
      collectionNFTAttributes: [], // atributes Only from moralis
    };
  }

  componentDidMount() {
    Moralis.start({
      serverUrl: process.env.REACT_APP_MORALIS_URL,
      appId: process.env.REACT_APP_MORALIS_APP_ID,
    });
    this.getCollectionDetailsById();
    this.getNftListFromCollection();
    this.getCollectionVolumeTrade();
    this.getPriceGraphData();
    this.getActivities();
    this.getStats();
    this.getTokens();
    this.getOwners();
    // this.filterNfts()
  }

  toggleShowPriceFilter = () => {
    this.setState((prevState) => ({
      showPriceFilter: !prevState.showPriceFilter,
    }));
  };
  hideLoader = () => {
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
  };
  changeOpenFilter = (value) => {
    switch (value) {
      case "auction":
        this.setState({
          type: "auction",
        });
        break;
      case "new":
        this.setState({
          type: "new",
        });
        break;
      case "offer":
        this.setState({
          type: "offer",
        });
        break;
      default:
        this.setState((prevState) => ({
          openFilter: !prevState.openFilter,
        }));
        break;
    }
  };

  setTabId = (index) => {
    if (index !== this.state.tabId) {
      this.setState({
        tabId: index,
      });
    } else {
      this.setState({
        tabId: false,
      });
    }
  };

  getCollectionDetailsById = async () => {
    const { params } = this.props.match;
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const response = await getCollectionById(params.id);
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({
      collectionDetails: response.length !== 0 ? response[0] : [],
    });

  };

  getNftListFromCollection = async (filterReq) => {
    const { params } = this.props.match;
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    let req = {
      "collectionDetails.collectionAddress": params.collectionAddress,
      skip: 0,
      limit: 10
    };
    if (filterReq)
      req = {
        ...req,
        ...filterReq,
      };
    const response = await getNfts(req);
    const options = {
      chain: process.env.REACT_APP_NETWORK_NAME,
      address: params.collectionAddress,
      limit: 10,
      cursor: null,
    };
    let userNFTs = await Moralis.Web3API.token
      .getNFTOwners(options)
      .catch((err) => console.log(err));
    if (userNFTs && userNFTs.cursor !== "" && userNFTs.cursor != null) {
      this.state.cursor = userNFTs.cursor;
    }

    let collectionNFTAttributes = [];
    userNFTs.result.forEach((nft) => {
      collectionNFTAttributes = collectionNFTAttributes.concat(JSON.parse(nft?.metadata)?.attributes)
    })

    let allNFTs = response?.nftContent
      .concat(userNFTs.result)
      .map((item) => new NFTModel(item));
    let distinctNFTs = Array.from(new Set(allNFTs.map((a) => a.tokenId))).map(
      (id) => {
        return allNFTs.find((a) => a.tokenId === id);
      }
    );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    setTimeout(this.hideLoader, 3000);
    this.setState({
      nftList: distinctNFTs,
      nftsCount: response.totalCount,
      collectionNFTAttributes
    });
    this.getNftTraitsFromDB(this.state.collectionDetails?.collectionAddress)
    this.filterNfts([], this.state.collectionDetails?.collectionAddress)
  };

  fetchNftsFromMoralis = async () => {
    const { params } = this.props.match;
    if (!this.state.cursor) return;
    const options = {
      chain: process.env.REACT_APP_NETWORK_NAME,
      address: params.collectionAddress,
      limit: 10,
      cursor: this.state.cursor,
    };

    let userNFTs = await Moralis.Web3API.token
      .getNFTOwners(options)
      .catch((err) => console.log(err));
    console.log("userNfts", userNFTs)
    if (userNFTs && userNFTs.cursor !== "" && userNFTs.cursor != null) {
      this.state.cursor = userNFTs.cursor;
    } else {
      this.state.cursor = null;
    }

    let collectionNFTAttributes = [];
    userNFTs.result.forEach((nft) => {
      collectionNFTAttributes = collectionNFTAttributes.concat(JSON.parse(nft.metadata).attributes)
    })

    let allNFTs = userNFTs.result.map((item) => new NFTModel(item));

    const newNftList = this.state.nftList.concat(allNFTs);
    this.setState({
      nftList: newNftList,
      collectionNFTAttributes
    });
    // this.getNftTraitsFromDB(this.state.collectionDetails?.collectionAddress)
  };

  filterCollectionNftadded = async (req) => {
    const { params } = this.props.match;
    let reqData = {
      skip: 0,
      limit: 10,
      "collectionDetails.collectionAddress": params.collectionAddress,
      ...req
    };
    // if (this.state.updatedOn)
    //   reqData = {
    //     ...reqData,
    //     sortingKey: { updatedOn: this.state.updatedOn },
    //   };
    this.setState({
      collectionRequest: reqData,
    });
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const response = await getNfts(reqData);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    this.setState({
      nftList: response.nftContent,
    });
  };

  filterCollectionNftList = async (isLoadMore) => {
    console.log("filterCollectionNftList")
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const { params } = this.props.match;
    if (
      this.state.priceFilter.minTokenValue < 0 ||
      this.state.priceFilter.maxTokenValue < 0
    ) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      commonToasts.errorToast("min or max value should be greater than 0");
    } else {
      this.props.dispatchAction(eventConstants.SHOW_LOADER);

      if (isLoadMore) {
        this.state.limit = this.state.limit + 10;
      }
      let previousRequest = this.state.collectionRequest;

      let reqData = {
        skip: this.state.skip,
        limit: 10,
        ...previousRequest,
        "collectionDetails.collectionAddress": params.collectionAddress,
      };
      if (this.state.priceFilter && this.state.priceFilter.selectedToken)
        reqData = {
          ...reqData,
          currency: this.state.priceFilter.selectedToken,
        };
      if (this.state.saleData)
        reqData = {
          ...reqData,
          ["saleData.isOpenForSale"]: this.state.saleData,
        };
      if (this.state.updatedOn)
        reqData = {
          ...reqData,
          sortingKey: { updatedOn: this.state.updatedOn },
        };
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
      if (this.state.offers) {
        reqData = {
          ...reqData,
          hasOffers: true,
        };
      }
      if (this.state.updatedOnfilter) {
        reqData = {
          ...reqData,
          sortingKey: { updatedOn: -1 },
        };
      }

      this.props.dispatchAction(eventConstants.SHOW_LOADER);
      const response = await getNfts(reqData);
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      this.setState({
        nftList: response.nftContent,
      });
    }
  };

  clearPriceFilter = async () => {
    this.setState(
      {
        priceFilter: {
          selectedToken: "",
          minTokenValue: "",
          maxTokenValue: "",
        },
      },
      () => this.componentDidMount()
    );
  };

  filterNftByPrice = (tab) => {
    if (tab === "Collected") this.filterCollectionNftList();
    else this.getActivities();
    this.getStats();
    this.getCollectionVolumeTrade();
  };

  filterNftBySale = async () => {
    this.state.limit = 10;
    await this.setState({
      saleData: true,
      offers: false,
      updatedOnfilter: false,
    });
    // this.state.saleData = true;
    this.filterCollectionNftList();
    this.getStats();
  };
  filterNftByAdded = async () => {
    this.state.limit = 10;
    await this.setState({
      updatedOnfilter: true,
      offers: false,
      saleData: false,
    });
    this.filterCollectionNftList();
    this.getStats();
  };

  filterNftByAdded = async () => {
    this.state.limit = 10;
    this.filterCollectionNftList();
  };

  filterNftByOffers = async () => {
    this.state.limit = 10;
    this.state.offers = true;
    // this.state.nftList = this.state.nftList.filter(
    //   (nft) => nft.offers.length !== 0
    // );
    this.filterCollectionNftList();
    this.getStats();
  };

  changeSearchName = (value) => {
    this.setState({
      searchName: value,
    });
  };

  changePriceFilter = (filter, value) => {
    this.setState((prevState) => ({
      priceFilter: { ...prevState.priceFilter, [filter]: value },
    }));
  };

  changeActiveTab = async (index) => {
    await this.setState({
      activeTab: detailsTab[index].name,
      priceFilter: {
        selectedToken: "",
        minTokenValue: "",
        maxTokenValue: "",
      },
      openFilter: false,
    });
    await this.getStats();
  };

  getCollectionVolumeTrade = async () => {
    const { params } = this.props.match;

    let reqData = {
      collectionId: params.id,
    };
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
    this.props.dispatchAction(eventConstants.SHOW_LOADER);

    const response = await sellAndPurchaseService.totalVolumeTraded(reqData);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({
      volumeTradeCount:
        response.length !== 0
          ? response[0]?.volumeTraded.toFixed(3)
          : "--",
    });
  };
  changeSidebarStatus = () => {
    this.setState((prevState) => ({
      sideBarStatus: !prevState.sideBarStatus,
    }));
  };

  selectTime = (value) => {
    this.setState({ selectedTime: value });
    this.getPriceGraphData(value);
  };
  getPriceGraphData = async (noOfDays) => {
    const { params } = this.props.match;

    let req = {
      collectionId: params.id,
      type: "SELL",
      day: noOfDays ? Number(noOfDays) : this.state.selectedTime,
    };
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(
      ContentService.priceGraph(req)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
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
  getActivities = async () => {
    const { params } = this.props.match;
    let reqData = {
      collectionId: params.id,
      // type:"BUY"&"SELL",
      skip: 0,
      // //TODO need to change
      limit: 6,
      // "sortingKey": 1
    };
    // if (this.state.priceFilter && this.state.priceFilter.selectedToken)
    //     reqData = {...reqData, currency: this.state.priceFilter.selectedToken};

    // if (
    //     this.state.priceFilter &&
    //     (this.state.priceFilter.minTokenValue ||
    //         this.state.priceFilter.minTokenValue === 0) &&
    //     this.state.priceFilter.maxTokenValue
    // )
    //     reqData = {
    //         ...reqData,
    //         minPrice: Number(this.state.priceFilter.minTokenValue),
    //         maxPrice: Number(this.state.priceFilter.maxTokenValue),
    //     };
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [error, response] = await utility.parseResponse(
      sellAndPurchaseService.getActivity(reqData)
    );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error || !response) return;
    this.setState({ itemActivities: response });
  };

  getStats = async () => {
    const { params } = this.props.match;
    let reqData = {
      "collectionDetails.collectionAddress": params?.collectionAddress,
      // collectionId: params.id
    };
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
    if (this.state.saleData)
      reqData = {
        ...reqData,
        ["saleData.isOpenForSale"]: this.state.saleData,
      };
    if (this.state.offers) {
      reqData = {
        ...reqData,
        hasOffers: true,
      };
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);

    const [error, response] = await utility.parseResponse(
      ContentService.getCount(reqData)
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);

    if (error || !response) return;
    this.setState({ statsData: response });
  };

  toogleFilterDropdown = () => {
    this.setState({ recentFilter: !this.state.recentFilter });
  };
  onChangeRecentFilter = (index) => {
    this.setState({ recentFilterIndex: index });
    let req = {
      skip: 0,
      limit: this.state.collectedNftsLimit,
    };

    switch (index) {
      case 0:
        req = {
          ...req,
        };
        break;
      case 1:
        req = {
          ...req,
          sortingKey: { addedOn: -1 },
        };
        break;
      case 2:
        req = {
          ...req,
          sortingKey: { updatedOn: -1 },
          "saleData.isOpenForSale": true,
        };
        break;
      case 3:
        req = {
          ...req,
          sortingKey: { "saleData.price": 1 },
        };
        break;
      case 4:
        req = {
          ...req,
          sortingKey: { "saleData.price": -1 },
        };
        break;
      default:
        break;
    }

    // if (index === 1)
    //     req = {
    //         ...req,
    //         "sortingKey": {"updatedOn": -1},
    //         "saleData.isOpenForSale": true
    //     }
    // else
    //     req = {
    //         ...req,
    //         "sortingKey": {"addedOn": -1},
    //     }
    this.filterCollectionNftadded(req);
    this.setState({ recentFilter: false });
  };

  loadMore = () => {
    let reqData = {};
    if (this.state.priceFilter && this.state.priceFilter.selectedToken)
      reqData = { ...reqData, currency: this.state.priceFilter.selectedToken };
    if (this.state.saleData)
      reqData = {
        ...reqData,
        ["saleData.isOpenForSale"]: this.state.saleData,
      };
    if (this.state.updatedOn)
      reqData = {
        ...reqData,
        sortingKey: { updatedOn: this.state.updatedOn },
      };
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

    if (reqData && Object.keys(reqData).length > 0) {
      // this.filterCollectionNftList(true)
      return;
    }
    this.fetchNftsFromMoralis();
  };
  getTokens = async () => {
    const [err, response] = await Utils.parseResponse(getApproveToken());
    this.setState({ approvedTokens: response?.approvedTokensContent });
  };

  getOwners = async () => {
    const { params } = this.props.match;
    let address = params?.collectionAddress;
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [err, response] = await Utils.parseResponse(
      sellAndPurchaseService.getOwners(address)
    );
    if (response) {
      this.setState({ collectionNft: response });
      //   this.props.dispatchAction(eventConstants.HIDE_LOADER);
    }
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
  };
  filterNftList = async (isLoadMore) => {
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const { params } = this.props.match;
    if (isLoadMore) {
      this.state.limit = this.state.limit + 20;
    }
    let reqData = {
      skip: this.state.skip,
      limit: this.state.limit,
      "collectionDetails.collectionAddress": params.collectionAddress,
    };
    const nftListResponse = await getNfts(reqData);
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    // setTimeout(this.hideLoader, 6000);
    this.setState({
      nftList: nftListResponse?.nftContent,
    });
    this.fetchNftsFromMoralis();
  };

  getNftTraitsFromDB = async (data) => {
    const reqData = {
      collectionAddress: data
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [err, response] = await Utils.parseResponse(getNftTraits(reqData));
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (err || !response) return;
    const combinedData = await this.state.collectionNFTAttributes.concat(...response)
    this.setState({ collectionNFTAttributes: combinedData })
  }

  filterNfts = async (traitSelectedOptions, address = this.state.collectionDetails?.collectionAddress) => {
    const reqData = {
      collectionAddress: address,
      attributes: traitSelectedOptions,
    }
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [err, response] = await Utils.parseResponse(filterNft(reqData));
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (err || !response) return;
    this.setState({ nftList: response })
  }
  render() {
    const props = {
      state: this.state,
      changeActiveTab: this.changeActiveTab,
      toogleFilterDropdown: this.toogleFilterDropdown,
      onChangeRecentFilter: this.onChangeRecentFilter,
      changeSidebarStatus: this.changeSidebarStatus,
      changeOpenFilter: this.changeOpenFilter,
      clearPriceFilter: this.clearPriceFilter,
      loadMore: this.loadMore,
      filterCollectionNftList: this.filterCollectionNftList,
      filterNftByPrice: this.filterNftByPrice,
      filterNftBySale: this.filterNftBySale,
      filterNftByOffers: this.filterNftByOffers,
      filterNftByAdded: this.filterNftByAdded,
      changePriceFilter: this.changePriceFilter,
      changeSearchName: this.changeSearchName,
      selectTime: this.selectTime,
    };
    return (
      <>
        <Header />
        <div>
          <Toaster />
        </div>
        <CollectionDetailsComponent
          state={this.state}
          filterCollectionNftList={this.filterCollectionNftList}
          filterNftByPrice={this.filterNftByPrice}
          filterNftBySale={this.filterNftBySale}
          filterNftByOffers={this.filterNftByOffers}
          filterNftByAdded={this.filterNftByAdded}
          changePriceFilter={this.changePriceFilter}
          changeOpenFilter={this.changeOpenFilter}
          changeActiveTab={this.changeActiveTab}
          changeSearchName={this.changeSearchName}
          changeSidebarStatus={this.changeSidebarStatus}
          filterNftByCollection={this.filterNftByCollection}
          filterNftByCategory={this.filterNftByCategory}
          selectTime={this.selectTime}
          clearPriceFilter={this.clearPriceFilter}
          toogleFilterDropdown={this.toogleFilterDropdown}
          onChangeRecentFilter={this.onChangeRecentFilter}
          loadMore={this.loadMore}
          toggleShowPriceFilter={this.toggleShowPriceFilter}
          setPriceFilterValue={this.setPriceFilterValue}
          filterNftList={this.filterNftList}
          collectionNFTAttributes={this.state.collectionNFTAttributes}
          filterNfts={this.filterNfts}
        />
        <CollectionDetailsMobile
          state={this.state}
          changeActiveTab={this.changeActiveTab}
          toogleFilterDropdown={this.toogleFilterDropdown}
          onChangeRecentFilter={this.onChangeRecentFilter}
          changeSidebarStatus={this.changeSidebarStatus}
          changeOpenFilter={this.changeOpenFilter}
          clearPriceFilter={this.clearPriceFilter}
          loadMore={this.loadMore}
          filterCollectionNftList={this.filterCollectionNftList}
          filterNftByPrice={this.filterNftByPrice}
          filterNftBySale={this.filterNftBySale}
          filterNftByOffers={this.filterNftByOffers}
          filterNftByAdded={this.filterNftByAdded}
          changePriceFilter={this.changePriceFilter}
          changeSearchName={this.changeSearchName}
          selectTime={this.selectTime}
          setTabId={this.setTabId}
          toggleShowPriceFilter={this.toggleShowPriceFilter}
          setPriceFilterValue={this.setPriceFilterValue}
        />
        <Footer />
        <div className="md:hidden">
          <FilterSideMobile params={props} activeTab={this.state.activeTab} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { currency: state.currency, wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(CollectionDetails);
