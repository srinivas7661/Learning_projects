import React, {Component} from "react";
import ExplorePageComponent from "./explorePageComponent";
import {getNfts} from "../../services";
import HeaderComponent from "../common/header";
import {history} from "../../managers/history";
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";
import {eventConstants} from "../../constants";
import { utils } from "react-bootstrap";
import commonToasts from "../../common/components/commonToasts";
class ExplorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: true,
            currentOpenFilter: {
                price:false,
                collections:false,
                categories:false,
            },
            priceFilter: {
                selectedToken: "",
                minTokenValue: "",
                maxTokenValue: "",
            },
            categoryId: "",
            collectionId: "",
            collectionAddress:null,
            nfts: [],
            totalNftsCount: 0,
            skip: 0,
            limit: 30,
            hasMoreNfts: false
        };
    }

    componentDidMount() {
        this.getNftList({"saleData.isOpenForSale": true, skip:0, limit:30});
    }
    hideLoader = () => {      
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
    };
    getNftList = async (reqData) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const nftListResponse = await getNfts(reqData);
        setTimeout(this.hideLoader, 3000);
        if(nftListResponse?.nftContent.length < nftListResponse?.totalCount)
            this.state.hasMoreNfts = true
        this.setState({
            nfts: nftListResponse?.nftContent,
            totalNftsCount: nftListResponse?.totalCount,
            limit:30
        });
    };

    fetchNftsOnScroll = (page)=>{
        this.loadMore(page)
    }

    loadMore = async (page) => {
        if(!this.state.hasMoreNfts)
            return;
        let requestData = {
            skip: this.state.skip + this.state.limit,
            limit: this.state.limit,
            "saleData.isOpenForSale": true
        }


        if (this.state.collectionId)
            requestData = {...requestData, collectionId: this.state.collectionId};
        
        if (this.state.collectionAddress)
        requestData = {"collectionDetails.collectionAddress": this.state.collectionAddress,"saleData.isOpenForSale": true};
        if (this.state.categoryId)
            requestData = {...requestData, categoryId: this.state.categoryId};
        if (this.state.priceFilter && this.state.priceFilter.selectedToken)
            requestData = {...requestData, currency: this.state.priceFilter.selectedToken};
        if (
            this.state.priceFilter &&
            (this.state.priceFilter.minTokenValue) ||
            (this.state.priceFilter.maxTokenValue) ||
            (this.state.priceFilter.minTokenValue && this.state.priceFilter.maxTokenValue)
        )
            requestData = {
                ...requestData,
                minPrice: Number(this.state.priceFilter.minTokenValue),
                maxPrice: Number(this.state.priceFilter.maxTokenValue),
            };


        const nftListResponse = await getNfts(requestData);
        const newNftList = [...this.state.nfts,...nftListResponse?.nftContent]
        if(Number(nftListResponse?.totalCount) <= newNftList.length || requestData.skip >=Number(nftListResponse?.totalCount))
            this.state.hasMoreNfts = false;
        else{
            this.state.skip = this.state.skip + this.state.limit
        }
        this.setState({nfts: newNftList})
    }

    //this function will use to toggle the filter sidebar
    toggleSideBar = () => {
        this.setState({isSideBarOpen: !this.state.isSideBarOpen});
    };

    //this function will be use to expand one specific filter
    openFilter = (filterType) => {      
        this.setState({
            currentOpenFilter: {
                ...this.state.currentOpenFilter,
                [filterType]:!this.state.currentOpenFilter[filterType]
            }
        })
    };

    changePriceFilter = (priceFilter, value) => {
        const _priceFilter = {...this.state.priceFilter, [priceFilter]: value};
        this.setState({priceFilter: _priceFilter});
    };

    //duplicate function
    // filterNftList = async (isLoadMore) => {
    //     this.props.dispatchAction(eventConstants.SHOW_LOADER);
    //     if (isLoadMore) {
    //         this.state.limit = this.state.limit + 10;
    //     }
    //     let reqData = {skip: this.state.skip, limit: this.state.limit, "saleData.isOpenForSale": true};
    //     // if (this.state.collectionId)
    //     //     reqData = {...reqData, collectionId: this.state.collectionId};
    //     if (this.state.collectionAddress)
    //         reqData = {"collectionDetails.collectionAddress": this.state.collectionAddress,"saleData.isOpenForSale": true};
    //     if (this.state.categoryId)
    //         reqData = {...reqData, categoryId: this.state.categoryId};
    //     if (this.state.priceFilter && this.state.priceFilter.selectedToken)
    //         reqData = {...reqData, currency: this.state.priceFilter.selectedToken};
    //     if (
    //         this.state.priceFilter &&
    //         (this.state.priceFilter.minTokenValue) ||
    //         (this.state.priceFilter.maxTokenValue) ||
    //         (this.state.priceFilter.minTokenValue && this.state.priceFilter.maxTokenValue)
    //     )
    //         reqData = {
    //             ...reqData,
    //             minPrice: Number(this.state.priceFilter.minTokenValue),
    //             maxPrice: Number(this.state.priceFilter.maxTokenValue),
    //         };
    //     // if (reqData.skip)
    //     //     delete reqData.skip;
    //     // if (reqData.limit)
    //     //     delete reqData.limit;
    //     const nftListResponse = await getNfts(reqData);
    //     this.props.dispatchAction(eventConstants.HIDE_LOADER);
    //     this.setState({
    //         nfts: nftListResponse?.nftContent,
    //         totalNftsCount: nftListResponse?.totalCount,
    //     });
    // };

    clearFilterByPrice = async () => {
        this.state.skip = 0;
        this.state.limit = 1000;
        this.setState(
            {
                priceFilter: {
                    selectedToken: "",
                    maxTokenValue: "",
                    minTokenValue: "",
                },
            },
            () => {
                this.filterNftList();
            }
        );
    };

  filterNftList = async (isLoadMore) => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    if(this.state.priceFilter.minTokenValue<0 || this.state.priceFilter.maxTokenValue<0)
    {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      commonToasts.errorToast("min or max value should be greater than 0")
    }
    else
    {
      this.props.dispatchAction(eventConstants.SHOW_LOADER);
      
    if (isLoadMore) {
      this.state.limit = this.state.limit + 30;
    }
    let reqData = { skip: this.state.skip, limit: this.state.limit ,"saleData.isOpenForSale": true};
    if (this.state.collectionId)
      reqData = { ...reqData, collectionId: this.state.collectionId };
    if (this.state.collectionAddress)
      reqData = {"collectionDetails.collectionAddress":this.state.collectionAddress,"saleData.isOpenForSale": true};
    if (this.state.categoryId)
      reqData = { ...reqData, categoryId: this.state.categoryId };
    if (this.state.priceFilter && this.state.priceFilter.selectedToken)
      reqData = { ...reqData, currency: this.state.priceFilter.selectedToken };
    if (
      this.state.priceFilter &&
      (this.state.priceFilter.minTokenValue) ||
      (this.state.priceFilter.maxTokenValue) ||
      (this.state.priceFilter.minTokenValue && this.state.priceFilter.maxTokenValue)
    )
      reqData = {
        ...reqData,
        minPrice: Number(this.state.priceFilter.minTokenValue),
        maxPrice: Number(this.state.priceFilter.maxTokenValue),
      };
        // if (reqData.skip)
        //     delete reqData.skip;
        // if (reqData.limit)
        //     delete reqData.limit;
    const nftListResponse = await getNfts(reqData);
    // setTimeout(this.hideLoader, 6000);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({
      nfts: nftListResponse?.nftContent,
      totalNftsCount: nftListResponse?.totalCount,
    });
  }
  };

  clearFilterByPrice = async () => {
    this.state.skip = 0;
    this.state.limit = 1000;
    this.setState(
        {
            priceFilter: {
                selectedToken: "",
                maxTokenValue: "",
                minTokenValue: "",
            },
        },
        () => {
            this.filterNftList();
        }
    );
};
    filterNftByPrice = async () => {
        // this.state.skip = 0;
        // this.state.limit = 12;
        this.filterNftList();
    };

    filterNftByCollection = async (collectionAddress) => {
        if (collectionAddress)
            this.state.collectionAddress = collectionAddress;
        else
            this.state.collectionAddress = collectionAddress;
        this.state.skip = 0;
        this.state.limit = 30;
        this.filterNftList();
    };

    filterNftByCategory = async (categoryId) => {
        if (categoryId)
            this.state.categoryId = categoryId;
        else
            this.state.categoryId = "";
        this.state.skip = 0;
        this.state.limit = 30;
        this.filterNftList();
    };
    onClickNFT = async (nftId) => {
        history.push(`/nft/${nftId}`);
    };
    loadNftList = async (isLoadMore) => {
        if (isLoadMore) {
          this.state.limit = this.state.limit + 30;
        }
        let reqData = { skip: this.state.skip, limit: this.state.limit ,"saleData.isOpenForSale": true};
       
        const nftListResponse = await getNfts(reqData);
        this.setState({
          nfts: nftListResponse?.nftContent,
        //   totalNftsCount: nftListResponse?.totalCount,
        });
      
      };

    render() {
        return (
            <>
                <HeaderComponent/>
                <ExplorePageComponent
                    state={this.state}
                    fetchNftsOnScroll={this.fetchNftsOnScroll}
                    toggleSideBar={this.toggleSideBar}
                    openFilter={this.openFilter}
                    changePriceFilter={this.changePriceFilter}
                    filterNftByPrice={this.filterNftByPrice}
                    filterNftByCollection={this.filterNftByCollection}
                    filterNftByCategory={this.filterNftByCategory}
                    filterNftList={this.filterNftList}
                    onClickNFT={this.onClickNFT}
                    clearFilterByPrice={this.clearFilterByPrice}
                    loadNftList={this.loadNftList}
                />
            </>
        );
    }
  }


const mapStateToProps = (state) => {
    return {wallet: state.wallet};
};
export default connect(mapStateToProps, {dispatchAction})(ExplorePage);
