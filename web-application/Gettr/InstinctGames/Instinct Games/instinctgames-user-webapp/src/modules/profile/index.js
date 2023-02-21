import React, {Component} from "react";
import ProfileComponent from "./profileComponent";
import {getUserData} from "../../services/userMicroservice";
import {getApproveToken, getNfts,hiddenNft} from "../../services";
import Utils from "../../utility";
import {connect} from "react-redux";
import FooterComponent from "../common/footer/footer";
import Header from "../common/header";
import CommonToasts from "../../common/components/commonToasts";
import {BlockchainService} from "../../services";
import {getOffer} from "../../services/contentMicroservice";
import {eventConstants} from "../../constants";
import {profileTab} from "../../constants";
import ContentService, {nftDetails} from "../../services/contentMicroservice";
import {NFTModel} from "../../models/nft";
import {
    CURRENCIES,
    transactionConstants,
    validationsMessages,
} from "../../constants";
import {history} from "../../managers/history";
import utility, {dispatchAction} from "../../utility";
import Moralis from "moralis";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {},
            nftDetails: {},
            // favoriteNftsLimit: ,
            allFavoriteNftsLimit: 0,
            favoriteNfts: [],
            totalFavoriteNftsCount: 0,
            collectedNftsLimit: 10,
            collectedNfts: [],
            totalCollectedNftsCount: 0,
            defaultTab: profileTab[0],
            createdNftsLimit: 10,
            createdNfts: [],
            totalCreatedNftsCount: 0,
            hiddenNftsLimit: 10,
            hiddenNfts: [],
            totalHiddenNftsCount: 0,
            listedNftsLimit: 10,
            listedNfts: [],
            totalListedNftsCount: 0,
            active: "collected",
            itemsFilter: "Single Items",
            timeFilter: "Recently Received",
            offersList: [],
            topFavouritedNfts: [],
            approvedTokens: [],
            collectionTabs: {
                collected: false,
                created: false,
                hidden: false,
                activity: false,
                offers: false,
                listing: false,
            },
            specificSingleOffer: {},
            toggleMobile: {
                favourited: false,
            },
            recentFilter: false,
            recentFilterIndex: 0,
            sharePopup: false,
            saleProcessMessage: "Your sale is processing.."

        };
    }

    async componentDidMount() {
        Moralis.start({
            serverUrl: process.env.REACT_APP_MORALIS_URL,
            appId: process.env.REACT_APP_MORALIS_APP_ID,
        });
        this.getTokens();
        this.offerList();
        this.getUserDetails();
        this.getFavoriteNftList({skip: 0, limit: 100});
        this.getNFTDetails(this.state.specificSingleOffer._id);
        this.getCollectedNfts({
            // skip: 0,
            // limit: this.state.collectedNftsLimit,
        });
    }

    getTokens = async () => {
        // this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const [err, response] = await Utils.parseResponse(getApproveToken());
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        this.setState({approvedTokens: response?.approvedTokensContent});

    };

    offerList = async () => {
        let reqData = {
            ownerAddress: this.props?.user?.walletConnect?.userId,
        };

        const response = await getOffer(reqData);

        this.setState({
            offersList: response,
        });
    };
    getSpecificOffer = (specificOffer) => {
        this.setState({specificSingleOffer: specificOffer});
    };
    getNFTDetails = async (id) => {
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const [error, response] = await utility.parseResponse(
            ContentService.nftDetails(id)
        );
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        if (error || !response) return;
        this.setState({nftDetails: response});
    };

    filterToken = (tokenName) => {
        let tokenDetails = {};
        this.state.approvedTokens.map((token) => {
            if (token.tokenName === tokenName) tokenDetails = token;
            return token;
        });
        return tokenDetails;
    };

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

        let collectionAddress = "";
        if (this.state?.nftDetails?.collectionId?.collectionAddress)
            collectionAddress = this.state?.nftDetails?.collectionId?.collectionAddress
        else {
            collectionAddress = this.state?.nftDetails?.collectionDetails?.collectionAddress
        }
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.acceptOfferToken({
                tokenType: 1,
                contractAddress: collectionAddress,
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
        // return;
        if (this.state?.specificSingleOffer?.offers?.currency !== CURRENCIES.BNB) {
            await this.approveOffer();
            return;
        }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);

        let collectionAddress = "";
        if (this.state?.specificSingleOffer?.collectionId?.collectionAddress)
            collectionAddress = this.state?.specificSingleOffer?.collectionId?.collectionAddress
        else {
            collectionAddress = this.state?.specificSingleOffer?.collectionDetails?.collectionAddress
        }
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.acceptOffer({
                tokenType: 1,
                contractAddress: collectionAddress,
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
            updatedBy: this.props?.user?.walletConnect?._id || "",
            seller: this.props?.user?.walletConnect?._id || "",

            saleData: {
                ...this.state?.nftDetails?.saleData,
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
        this.setState({saleProcessMessage: "Your sale is successful"})
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
                contractAddress:
                this.state?.nftDetails?.collectionId?.collectionAddress,
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
                contractAddress: this.state?.nftDetails.collectionId?.collectionAddress,
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
    getUserDetails = async () => {
        if (this?.props?.user?.walletConnect) {
            this.setState({userDetails: this?.props?.user?.walletConnect});
            return;
        }
        const userDetails = await getUserData(
            this.props?.user?.walletConnect?.userId
        );
        this.setState({userDetails});
    };

    changeDefaultTab = (index) => {
        this.setState({
            defaultTab: profileTab[index],
        });
    };

    getUserDetails = async () => {
        console.log("user", this.props.user.walletConnect);
        if (!this.props?.user?.walletConnect?.userId)
            history.push("/wallet-connect");
        if (this?.props?.user?.walletConnect) {
            this.setState({userDetails: this?.props?.user?.walletConnect});
            return;
        }
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const userDetails = await getUserData(
            this.props?.user?.walletConnect?.userId
        );
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        this.setState({userDetails});
    };

    getFavoriteNftList = async (reqData) => {
        if (!this.props?.user?.walletConnect?._id) return;
        reqData = {
            ...reqData,
            "likedBy.userId": this.props?.user?.walletConnect?._id,
        };

        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const nftListResponse = await getNfts(reqData);
        // console.log(nftListResponse, "srinivas");
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        this.setState({
            favoriteNfts: nftListResponse?.nftContent,
            totalFavoriteNftsCount: nftListResponse?.totalCount,
            topFavouritedNfts:
                nftListResponse?.nftContent?.length >= 3
                    ? nftListResponse?.nftContent.slice(0, 3)
                    : nftListResponse?.nftContent,
        });
    };

    filterFavoriteNftList = async (isLoadMore) => {
        if (isLoadMore) {
            this.state.favoriteNftsLimit = this.state.favoriteNftsLimit;
        }
        let reqData = {
            skip: this.state.skip,
            limit: this.state.favoriteNftsLimit,
        };
        this.getFavoriteNftList(reqData);
    };
    allFavoriteNftList = async (isLoadMore) => {
        if (isLoadMore) {
            this.state.allFavoriteNftsLimit = this.state.allFavoriteNftsLimit + 10;
        }
        let reqData = {
            skip: this.state.skip,
            limit: this.state.allFavoriteNftsLimit,
        };
        this.getFavoriteNftList(reqData);
    };

    getCreatedNfts = async (reqData) => {
        reqData = {...reqData, createdBy: this.props?.user?.walletConnect?._id};
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const nftListResponse = await getNfts(reqData);
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        this.setState({
            createdNfts: nftListResponse?.nftContent,
            totalCreatedNftsCount: nftListResponse?.totalCount,
        });
    };

    filterCreatedNftList = async (isLoadMore) => {
        if (isLoadMore) {
            this.state.createdNftsLimit = this.state.createdNftsLimit + 10;
        }
        let reqData = {skip: this.state.skip, limit: this.state.createdNftsLimit};
        this.getCreatedNfts(reqData);
    };

    getCollectedNfts = async (reqData) => {
        reqData = {
            ...reqData,
            ownerAddress: this.props?.user?.walletConnect?.userId,
        };
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        let nftListResponse = await getNfts(reqData);
        reqData = {...reqData, isHidden: true}
        const hiddenNftListResponse = await getNfts(reqData);
        nftListResponse = [...nftListResponse.nftContent, ...hiddenNftListResponse.nftContent]
        const options = {
            address: this.props?.user?.walletConnect?.userId,
            chain: process.env.REACT_APP_NETWORK_NAME,
            limit: 100,
            page: 1,
        };

        const nftData = await Moralis.Web3API.account.getNFTs(options);
        let userNFTs = nftData.result;
        if (nftData.total > 100) {
            let pages = Math.ceil(nftData.total / 100);
            for (let i = 2; i <= pages; i++) {
                options.page = i;
                let moreUserNFTs = await Moralis.Web3API.account.getNFTs(options);
                if (moreUserNFTs.page !== i) {
                    break;
                } else {
                    userNFTs.concat(moreUserNFTs.result);
                }
            }
        }
       
    //   nftListResponse= nftListResponse.map((dbNft)=>{
    //         dbNft.isPresentInDb=true
    //         return dbNft;
    //     })

        

        let allNFTs = nftListResponse.concat(userNFTs)
            .map((item) => new NFTModel(item));

        let distinctNFTs = Array.from(new Set(allNFTs.map((a) => a.tokenId))).map(
            (id) => {
                return allNFTs.find((a) => a.tokenId === id);
            }
        );
        distinctNFTs = distinctNFTs.filter(nft => {
            if (nft.isHidden)
                return false
            return nft;
        })
        console.log(distinctNFTs, "check nft");

        this.props.dispatchAction(eventConstants.HIDE_LOADER);

        this.setState({
            collectedNfts: distinctNFTs,
            totalCollectedNftsCount: nftListResponse?.totalCount,
        });
    };

    filterCollectedNftList = async (isLoadMore) => {
        if (isLoadMore) {
            this.state.collectedNftsLimit = this.state.collectedNftsLimit + 10;
        }
        let reqData = {
            skip: this.state.skip,
            limit: this.state.collectedNftsLimit,
        };
        this.getCollectedNfts(reqData);
    };

    getHiddenNfts = async () => {
       let reqData = {
           ownerAddress: this.props?.user?.walletConnect?.userId
        };
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const nftListResponse = await hiddenNft(reqData.ownerAddress);
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        this.setState({
            hiddenNfts: nftListResponse,
            totalHiddenNftsCount: nftListResponse?.totalCount,
        });
    };

    filterHiddenNftList = async (isLoadMore) => {
        if (isLoadMore) {
            this.state.hiddenNftsLimit = this.state.hiddenNftsLimit + 10;
        }
        let reqData = {skip: this.state.skip, limit: this.state.hiddenNftsLimit};
        this.getHiddenNfts(reqData);
    };

    getListedNfts = async (reqData) => {
        reqData = {
            ...reqData,
            ownerAddress: this.props?.user?.walletConnect?.userId,
            "saleData.isOpenForSale": true,
        };
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const nftListResponse = await getNfts(reqData);
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        this.setState({
            listedNfts: nftListResponse?.nftContent,
            totalListedNftsCount: nftListResponse?.totalCount,
        });
    };

    filterListedNftList = async (isLoadMore) => {
        if (isLoadMore) {
            this.state.listedNftsLimit = this.state.listedNftsLimit + 10;
        }
        let reqData = {skip: this.state.skip, limit: this.state.listedNftsLimit};
        this.getListedNfts(reqData);
    };

    changeItemsFilter = (name) => {
        this.setState({itemsFilter: name});
    };

    changeTimeFilter = (name) => {
        this.setState({timeFilter: name});
    };
    getListedNfts = async (reqData) => {
        reqData = {
            ...reqData,
            ownerAddress: this.props?.user?.walletConnect?.userId,
            "saleData.isOpenForSale": true,
        };
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const nftListResponse = await getNfts(reqData);
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        this.setState({
            listedNfts: nftListResponse?.nftContent,
            totalListedNftsCount: nftListResponse?.totalCount,
        });
    };

    filterListedNftList = async (isLoadMore) => {
        if (isLoadMore) {
            this.state.listedNftsLimit = this.state.listedNftsLimit + 10;
        }
        let reqData = {skip: this.state.skip, limit: this.state.listedNftsLimit};
        this.getListedNfts(reqData);
    };

    changeItemsFilter = (e) => {
        this.setState({itemsFilter: e.target.value});
    };

    changeTimeFilter = (e) => {
        this.setState({timeFilter: e.target.value});
    };

    activeTab = (tabName) => {
        this.setState({
            active: tabName,
            recentFilter: false,
            recentFilterIndex: 0,
        });
        if (tabName === "collected") {
            // this.setState({active: act})
            this.getCollectedNfts({
                // skip: 0,
                // limit: this.state.collectedNftsLimit,
            });
        } else if (tabName === "created") {
            this.getCreatedNfts({skip: 0, limit: this.state.createdNftsLimit});
        } else if (tabName === "hidden") {
            this.getHiddenNfts({skip: 0, limit: this.state.hiddenNftsLimit});
        } else if (tabName === "offers") {
            // this.getCreatedNfts({ skip: 0, limit: this.state.createdNftsLimit });
        } else if (tabName === "favourited") {
            this.getListedNfts({skip: 0, limit: this.state.listedNftsLimit});
        }
    };
    toggleCollectionTab = (tabName) => {
        const _collectionsTab = {
            ...this.state.collectionTabs,
            [tabName]: !this.state.collectionTabs[tabName],
        };
        this.setState({collectionTabs: _collectionsTab});
        switch (tabName) {
            case "collected":
                this.getCollectedNfts({
                    // skip: 0,
                    // limit: this.state.collectedNftsLimit,
                });
                break;
            case "created":
                this.getCreatedNfts({skip: 0, limit: this.state.createdNftsLimit});
                break;
            case "hidden":
                this.getHiddenNfts({skip: 0, limit: this.state.hiddenNftsLimit});
                break;
            case "offers":
                // this.getListedNfts({ skip: 0, limit: this.state.listedNftsLimit });
                break;
            case "favourited":
                this.getListedNfts({skip: 0, limit: this.state.listedNftsLimit});
                break;
        }
    };

    toggleMobile = (tabName) => {
        const _toggleMobile = {
            ...this.state.toggleMobile,
            [tabName]: !this.state.toggleMobile[tabName],
        };
        this.setState({toggleMobile: _toggleMobile});
        switch (tabName) {
            case "favourited":
                this.getListedNfts({skip: 0, limit: this.state.listedNftsLimit});
                break;
        }
    };
    toogleFilterDropdown = () => {
        this.setState({recentFilter: !this.state.recentFilter});
    };
    onChangeRecentFilter = (index) => {
        this.setState({recentFilterIndex: index});
        let req = {
            skip: 0,
            limit: this.state.collectedNftsLimit,
        };
        if (index === 1)
            req = {
                ...req,
                sortingKey: {updatedOn: -1},
                "saleData.isOpenForSale": true,
            };
        else
            req = {
                ...req,
                sortingKey: {addedOn: -1},
            };
        switch (this.state.active) {
            case "collected":
                this.getCollectedNfts(req);
                break;
            case "created":
                this.getCreatedNfts(req);
                break;
            case "hidden":
                this.getHiddenNfts(req);
                break;
            case "offers":
                this.offerList(req);
                break;
            case "favourited":
                this.getFavoriteNftList(req);
                break;

            default:
                break;
        }
        this.setState({recentFilter: false});
    };

    render() {
        const {defaultTab} = this.state;

        return (
            <>
                <Header/>
                <ProfileComponent
                    state={this.state}
                    filterFavoriteNftList={this.filterFavoriteNftList}
                    allFavoriteNftList={this.allFavoriteNftList}
                    filterCollectedNftList={this.filterCollectedNftList}
                    filterCreatedNftList={this.filterCreatedNftList}
                    filterHiddenNftList={this.filterHiddenNftList}
                    filterListedNftList={this.filterListedNftList}
                    toggleCollectionTab={this.toggleCollectionTab}
                    changeItemsFilter={this.changeItemsFilter}
                    changeTimeFilter={this.changeTimeFilter}
                    activeTab={this.activeTab}
                    changeDefaultTab={this.changeDefaultTab}
                    allFavoritedNftList={this.allFavoriteNftList}
                    toggleMobile={this.toggleMobile}
                    userDetails={this.props?.user?.walletConnect}
                    getOffer={this.getSpecificOffer}
                    acceptOfferNft={this.AcceptOfferNft}
                    rejectOfferNft={this.RejectOfferNft}
                    nftDetails={this.getNFTDetails}
                    getCollectedNfts={this.getCollectedNfts}
                    toogleFilterDropdown={this.toogleFilterDropdown}
                    onChangeRecentFilter={this.onChangeRecentFilter}
                    sharePopup={this.sharePopup}
                />
                <FooterComponent/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.wallet};
};

export default connect(mapStateToProps, {dispatchAction})(Profile);
