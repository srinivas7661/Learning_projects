import React, {Component} from "react";
import HeaderComponent from "./header";
import {HeaderMobile} from "./HeaderMobile";
import {dispatchAction} from "../../../utility";
import {eventConstants} from "../../../constants";
import {connect} from "react-redux";
import ContentService, {getNfts} from "../../../services/contentMicroservice";
import {getcollection} from "../../../services";
import NotificationService from "../../../services/notificationService"
import {history} from "../../../managers/history";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionsList: [],
            nftsList: [],
            searchString: "",
            isSearchBarOpen: false,
            notificationUnreadCount: 0
        };
    }

    render() {
        return (
            <>
                <HeaderComponent/>
                <HeaderMobile/>
            </>
        );
    }

    componentDidMount() {
        this.convertCurrencyToUSD();
        this.getNotificationUnreadCount();
    }

    getNotificationUnreadCount = async () => {
        const requestBody = {
            "queryObj": {
                "postedTo": this.props?.walletConnect?.walletConnect?._id
            }
        }
        const response = await NotificationService.getUserUnReadNotificationCount(requestBody).catch(err => {})
        this.props.dispatchAction(eventConstants.UPDATE_NOTIFICATION_UNREAD_COUNT, response)
        // if(response && response.count){
        //     this.setState({notificationUnreadCount: response.count})
        // }
    }

    searchCollections = async (searchString) => {
        const collectionsRes = await getcollection(false, false, 3, searchString);
        if (collectionsRes && collectionsRes.collections)
            this.setState({collectionsList: collectionsRes.collections});
    };

    getNftList = async (searchString) => {
        let reqData = {"saleData.isOpenForSale": true, limit: 3};
        if (searchString)
            reqData = {...reqData, searchKeys: ["name"], searchValue: searchString};
        const nftListResponse = await getNfts(reqData);
        if (nftListResponse && nftListResponse.nftContent)
            this.setState({nftsList: nftListResponse?.nftContent});
    };

    onGlobalSearch = (e) => {
        if (!e.target.value) {
            this.setState({isSearchBarOpen: false, searchString: e.target.value});
            return;
        }
        this.setState({isSearchBarOpen: true, searchString: e.target.value});
        this.searchCollections(e.target.value);
        this.getNftList(e.target.value);
    };

    convertCurrencyToUSD = async () => {
        try {
            const convertedDataBNB = await ContentService.bnbConversionToDollar();
            this.props.dispatchAction(
                eventConstants.BNB_USD_CONVERSION,
                convertedDataBNB?.quote?.USD?.price || 0
            );
            const convertedDataSacred =
                await ContentService.sacredTailsConversionToDollar();
            this.props.dispatchAction(
                eventConstants.SACRED_USD_CONVERSION,
                convertedDataSacred?.quote?.USD?.price || 0
            );
            const convertedDataInstinct =
                await ContentService.instinctConversionToDollar();
            this.props.dispatchAction(
                eventConstants.INSTINCT_USD_CONVERSION,
                convertedDataInstinct?.quote?.USD?.price || 0
            );
        } catch (e) {
            console.log(e);
        }
    };

    navigateToAllSearchResults = () => {
        window.location.href = `/search-items?s= ${this?.state?.searchString}`
        // history.push("/search-items?s=" + this?.state?.searchString);
    };

    render() {
        return (
            <>
                <HeaderComponent
                    state={this.state}
                    onGlobalSearch={this.onGlobalSearch}
                    navigateToAllSearchResults={this.navigateToAllSearchResults}
                />
                <HeaderMobile/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {currency: state.currency, walletConnect: state.wallet};
};
export default connect(mapStateToProps, {dispatchAction})(Header);
