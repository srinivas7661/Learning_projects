import React, { useEffect } from "react";
import FilterSideBarComponent from "./filterSideBar";
import ClosedSideBarComponent from "./closedSideBar";
import NftCard from "../../common/components/nftCard";
import FooterComponent from "../common/footer";
import { FilterSidebarBottom } from "./filterSidebarBottom";
import { pathConstants } from "../../constants";
import { history } from "../../managers/history";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch } from "react-redux";
import { eventConstants } from "../../constants";
import CircularProgress from "@material-ui/core/CircularProgress";

// import {  useMoralisWeb3Api } from "react-moralis";


function ExplorePageComponent(props) {
    const dispatch = useDispatch();
    // const Web3Api = useMoralisWeb3Api();
    // const fetchSearchNFTs = async () => {
    //     console.log("process.env.REACT_APP_NETWORK_NAME ",process.env.REACT_APP_NETWORK_NAME)
    //     const options = { chain: process.env.REACT_APP_NETWORK_NAME || "bsc Testnet", filter: "global", address:"0xD6Dfe643f0b72675238c29d66C79B5eF64abdab2"};
    //     const NFTs = await Web3Api.account.getNFTs(options);
    //     console.log(NFTs);
    // }
    // fetchSearchNFTs()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // useEffect(() => {
    //     setTimeout(() => {
    //       dispatch({ type: eventConstants.SHOW_LOADER });
    //     }, 4000);
    //   }, []);
    return (
        <div className="flex bg-homepage bg-black-60">
            {props?.state?.isSideBarOpen ? (
                <FilterSideBarComponent
                    state={props.state}
                    toggleSideBar={props.toggleSideBar}
                    openFilter={props.openFilter}
                    changePriceFilter={props.changePriceFilter}
                    filterNftByPrice={props.filterNftByPrice}
                    filterNftByCollection={props.filterNftByCollection}
                    filterNftByCategory={props.filterNftByCategory}
                    clearFilterByPrice={props.clearFilterByPrice}
                />
            ) : (
                <ClosedSideBarComponent toggleSideBar={props.toggleSideBar} />
            )}
            <div className="w-full tablet:mt-9 mobile:mt-9 tablet:ml-0 mobile:ml-0">
                {NftListComponent(props)}
                <FooterComponent />
                <FilterSidebarBottom props={props} />
            </div>
        </div>
    );
}

function NftListComponent(props) {
    return (
        <div
            className="bg-homepage bg-cover bg-black-60 w-full pl-9 h-screen overflow-y-auto sm-desk:mt-10  mt-17.5 tablet:mt-8.5 tablet:ml-10 mobile:ml-0 mobile:mt-8.5">
            <div className="text-white marketplace-text  font-black mt-oex mobile:text-ft14">
                MARKETPLACE
            </div>
            <div className="py-8 h-80vh min-h-740 scrollbar overflow-y-scroll">
                {/* <InfiniteScroll
                pageStart={0}
                loadMore={props.fetchNftsOnScroll}
                hasMore={true}
                loader={<></>}
                useWindow={false}
            > */}
                {props.state.nfts.length !== 0 && (<NftList
                    nfts={props?.state?.nfts}
                    limit={props?.state?.limit}
                    totalNftsCount={props?.state?.totalNftsCount}
                    filterNftList={props.filterNftList}
                    loadNftList={props.loadNftList}
                    onClickNFT={props.onClickNFT}
                />)}
                {/* </InfiniteScroll> */}
            </div>
        </div>
    );
}

export function NftList(props) {
    const [show, setShow] = React.useState(false);

    const redirect = (id, collectionAddress, tokenId) => {
        history.push(pathConstants.HEADER.NFT_DETAILS + "?id=" + id + "&collectionAddress=" + collectionAddress + "&tokenId=" + tokenId);
    };
    const [isLoad, setIsLoad] = React.useState(false);
    function nftData() {
        setIsLoad(false)

    }
    async function handleLoader() {
        setIsLoad(true)
        props.loadNftList(true)
        setTimeout(nftData, 3000);

    }

    const loadMoreHandler = () => {
        handleLoader();
        setShow(prev => !prev)
    }

    return (
        <>
            <div className="flex flex-wrap mt-fex">
                {props?.nfts.length ? (
                    props?.nfts.map((nft) => {
                        let collectionAddress = nft?.collectionId?.collectionAddress;
                        if (!collectionAddress)
                            collectionAddress = nft?.collectionDetails?.collectionAddress
                        return (
                            <div className="pr-9.25 pb-5 mobile:pr-3.5"
                                onClick={() => redirect(nft?._id, collectionAddress, nft.tokenId)}>
                                <NftCard
                                    nft={nft}
                                    widthCard={
                                        props.width ? props.width : "w-53.75 mobile:w-24.75"
                                    }
                                    imageHeight={
                                        props.height ? props.height : "h-53.75 mobile:h-28.5"
                                    }
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="text-ft15 text-white font-bold font-EurostileBold flex w-full justify-center">No
                        items found</div>
                )}
            </div>
            {props.limit < props.totalNftsCount ? (
                <div className="flex justify-center">
                    <button
                        onClick={loadMoreHandler}
                        className="market-button text-ft0 py-1.25 sm:text-ft13 w-24 h-6.5 sm:w-44 sm:h-12 rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10"
                    >
                        Load More
                    </button>

                </div>

            ) : (
                ""
            )}
            {isLoad ? (<div className="loader">
                <CircularProgress
                    size={40}
                    // left={-20}
                    top={10}
                    status="loading"
                    style={{
                        marginLeft: "50%",
                    }}
                />
            </div>

            ) : ""}
        </>
    );
}

export default ExplorePageComponent;
