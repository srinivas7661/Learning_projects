import React, { Component } from "react";
import HeaderComponent from "../common/header";
import SearchResultsComponent from "./searchResultsComponent";
import {
  getCategories,
  getcollection,
  getNfts,
  getFilteredCollection,
} from "../../services";
import FooterComponent from "../common/footer/footer";
import { connect } from "react-redux";
import utility, { dispatchAction } from "../../utility";
import { eventConstants } from "../../constants";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "nfts",
      //TODO need to change limit discuss it
      limit: 1000,
      searchString: "",
      collectionFilter: {
        collectionType: "",
        selectedCategory: "",
        sortKey: "",
      },
      collectionsList: [],
      categories: [],
      nfts: [],
      totalNftsCount: 0,
      recentFilter: false,
      recentFilterIndex: 0,
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const searchString = query.get("s");
    this.state.searchString = searchString;
    this.getCategories();
    this.searchCollections(searchString);
    this.getNftList({ skip: 0, limit: this.state.limit });
  }

  getCategories = async () => {
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const res = await getCategories();
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({ categories: res.categoriesContent });
  };

  searchCollections = async (type) => {
    console.log("for type checking");
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const searchString = this.state.searchString.trim();
    let req = {
      searchValue: searchString,
      searchKeys: ["name"],
    };
    if (this.state.collectionFilter.selectedCategory)
      req["categoryId"] = this.state.collectionFilter.selectedCategory;
    if (this.state.collectionFilter.collectionType)
      req["collectionType"] = this.state.collectionFilter.collectionType;
    if (this.state.collectionFilter.sortKey)
      req["sortingKey"] = this.state.collectionFilter.sortKey;

    if(type=="All"){
      req = {
        searchValue: searchString,
        searchKeys: ["name"],
      };
    }

    const [error, collectionsRes] = await utility.parseResponse(
      getFilteredCollection(
        req
        // this.state.collectionFilter.selectedCategory, this.state.collectionFilter.collectionType, false, this.state.searchString
      )
    );
    // const collectionsRes = await getcollection(
    //     this.state.collectionFilter.selectedCategory, this.state.collectionFilter.collectionType, false, this.state.searchString
    //  )
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({ collectionsList: collectionsRes.collections });
  };

  changeCollectionFilter = (type, value) => {
    console.log("type",type)
 
    const _collectionFilter = { ...this.state.collectionFilter, [type]: value };
    this.state.collectionFilter = _collectionFilter;
    this.searchCollections(value);
  };

  changeSelectedTab = (_selectedTab) => {
    this.setState({ selectedTab: _selectedTab });
  };

  filterNftList = async (isLoadMore, filterReq) => {
    // if (isLoadMore) {
    //     this.state.limit = this.state.limit + 10;
    // }
    let reqData = {};
    if (filterReq) reqData = { ...reqData, ...filterReq };
    this.getNftList(reqData);
  };

  getNftList = async (reqData) => {
    let string = "name";
    const searchString = this.state.searchString.trim();
    if (
      searchString == "INSTINCT" ||
      searchString == "SACRED" ||
      searchString == "SACRED TAILS" ||
      searchString == "Instinct" ||
      searchString == "Sacred" ||
      searchString == "Sacred Tails" ||
      searchString == "instinct" ||
      searchString == "sacred" ||
      searchString == "sacred tails" ||
      searchString == "bnb" ||
      searchString == "BNB"
    ) {
      string = "saleData.currency";
    }
    if (this.state.searchString) {
      reqData = { ...reqData, searchKeys: [string], searchValue: searchString };
    }

    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const nftListResponse = await getNfts(reqData);
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    this.setState({
      nfts: nftListResponse?.nftContent,
      totalNftsCount: nftListResponse?.totalCount,
    });
  };

  toogleFilterDropdown = () => {
    this.setState({ recentFilter: !this.state.recentFilter });
  };
  onChangeRecentFilter = (index) => {
    this.setState({ recentFilterIndex: index });
    let req = {
      skip: 0,
      limit: this.state.collectedNftsLimit,
      // "saleData.isOpenForSale": true
    };

    switch (index) {
      case 0:
          req = {
              ...req,
          }
          break;
      case 1:
          req = {
              ...req,
              "sortingKey": {"addedOn": -1},
          }
          break;
      case 2:
          req = {
              ...req,
              "sortingKey": {"updatedOn": -1},
              "saleData.isOpenForSale": true

          }
          break;
      case 3:
          req = {
              ...req,
              "sortingKey": {"saleData.price": 1},
          }
          break;
       case 4:
            req = {
                ...req,
                "sortingKey": {"saleData.price": -1},
            }
            break;
      default:
          break;
  }
    // if (index === 1)
    //   req = {
    //     ...req,
    //     sortingKey: { updatedOn: -1 },
    //     "saleData.isOpenForSale": true,
    //   };
    // else
    //   req = {
    //     ...req,
    //     sortingKey: { addedOn: -1 },
    //   };
    this.filterNftList(false, req);
    this.setState({ recentFilter: false });
  };

  render() {
    return (
      <>
        <HeaderComponent />
        <SearchResultsComponent
          state={this.state}
          changeCollectionFilter={this.changeCollectionFilter}
          changeSelectedTab={this.changeSelectedTab}
          filterNftList={this.filterNftList}
          toogleFilterDropdown={this.toogleFilterDropdown}
          onChangeRecentFilter={this.onChangeRecentFilter}
        />
        <FooterComponent />
      </>
    );
  }
  
}

const mapStateToProps = (state) => {
  return { wallet: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(SearchResults);
