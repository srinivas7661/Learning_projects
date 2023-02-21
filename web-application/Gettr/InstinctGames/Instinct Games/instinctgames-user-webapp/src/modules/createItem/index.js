import React, { Component } from "react";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import CreateItem from "./createItem";
import { history } from "../../managers/history";
import { validationsMessages } from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import Utils, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { eventConstants, pathConstants } from "../../constants";
import {
    getApproveToken,
    getcollection,
    getCollectionByCategoryId,
} from "../../services/adminConfigMicroservices";
import { BlockchainService, ContentService } from "../../services";
import Moralis from "moralis";

class CreateItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            steps: 1,
            content: [],
            categoryId: "",
            collection: [],
            mintData: [],
            approvedTokens: [],
            selectedCollection: {},
        };
    }

    async componentDidMount() {
        Moralis.start({
            serverUrl: process.env.REACT_APP_MORALIS_URL,
            appId: process.env.REACT_APP_MORALIS_APP_ID,
        });
        await this.getCollectionsForNft();
        await this.getTokens();
    }

    getCollectionsForNft = async () => {
        let pathName = window.location.pathname;
        let pathArray = pathName.split("/");
        if (pathArray.length !== 3) return history.push("/");
        const [err, response] = await Utils.parseResponse(
            getCollectionByCategoryId(pathArray[pathArray.length - 1])
        );

        if (err || !response) {
            return err?.message;
        }
        response.collections = response.collections.filter(coll => {
            return coll._id !== "62fe282c368c4e54dc83757a";

        })
        this.setState({
            collection: response.collections,
            categoryId: pathArray[pathArray.length - 1],
        });
    };
    getTokens = async () => {
        const [err, response] = await Utils.parseResponse(getApproveToken());
        this.setState({ approvedTokens: response?.approvedTokensContent });
    };
    getRequestDataForSaveNftContent = (
        tokenId,
        data,
        ipfsRes,
        blockchainRes,
        selectedCollection
    ) => {
        return {
            tokenId: tokenId,
            nftAmount: data?.nftCount || 1,
            transactionHash: blockchainRes?.transactionHash || "",
            name: data?.name || "",
            categoryId: this.state.categoryId || "",
            collectionId: selectedCollection?._id || "62428814d9467900358c86d6",
            ipfsUrl: ipfsRes?.ipfsUrl || "",
            cdnUrl: ipfsRes?.cdnUrl || "",
            cid: ipfsRes?.cid || "",
            contentType: data?.type || "Action",
            nftType: data?.type || "",
            externalLink: data?.externalLinks || "",
            description: data?.description || "",

            network: {
                chainId: blockchainRes?.chainId || "",
                name: blockchainRes?.name || "",
            },
            saleData: {
                price: data?.price || 0,
                currency: data?.currency || "BNB",
            },
            tags: data?.tags || [],
            attributes: data?.properties || [],
            ownedBy: this.props.walletConnect?._id || "",
            createdBy: this.props.walletConnect?._id || "",
            updatedBy: this.props.walletConnect?._id || "",
            ownerAddress: this.props.walletConnect?.userId || "",
            collectionDetails: {
                collectionAddress: selectedCollection?.collectionAddress,
                collectionName: selectedCollection?.name
            }
        };
    };
    createNftHandler = async (data) => {
        if (!data || Object.keys(data).length < 1 || !data.file) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return;
        }
        const selectedCollection = this.state.collection[Number(data.selectedCollectionIndex)];

        let formData = new FormData();
        formData.append("fileName", data.file?.name || "");
        formData.append("files", data.file || "");
        formData.append("name", data?.name || "")
        formData.append("description", data?.description || "")
        formData.append("attributes", data?.properties ? JSON.stringify(data?.properties) : [])

        if (data?.tags?.length) {
            for (let index = 0; index < data?.tags?.length; index++) {
                formData.append(`tags[${index}]`, data?.tags[index])
            }
        }
        formData.append("currency", data?.currency || "")
        formData.append("externalLinks", data?.externalLinks || "")
        formData.append("price", data?.price || "")
        formData.append("type", data?.type || "")
        formData.append("collectionId", selectedCollection._id || "")
        // formData.append("tokenId", tokenId || "")
        formData.append("categoryId", this.state.categoryId || "")

        if (!this.props.walletConnect) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return CommonToasts.errorToast(
                validationsMessages.UNABLE_TO_CONNECT_WALLET
            );
        }
        //add to IPFS
        this.setState({ isOpen: true });
        const [err, ipfsRes] = await Utils.parseResponse(
            ContentService.addIpfs(formData)
        );
        if (err || !ipfsRes.ipfsUrl) {
            this.setState({ isOpen: false });
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return CommonToasts.errorToast(
                err || validationsMessages.UNABLE_TO_ADD_FILE_ON_IPFS
            );
        }

        // create NFT on blockchain

        let tokenId = "";
        if (this.state.collection[data.selectedCollectionIndex].tokenType === 'ERC1155') {
            tokenId = await this.getTokenIdFromMoralis(selectedCollection.collectionAddress);
        }
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            this.state.collection[data.selectedCollectionIndex].tokenType === 'ERC721' ? BlockchainService.mintNFT({
                tokenURI: ipfsRes?.ipfsUrl,
                collectionAddress: selectedCollection.collectionAddress,
            }) : BlockchainService.mintNFT1155(
                tokenId === false ? 1 : parseInt(tokenId) + 1, data.nftCount, selectedCollection.collectionAddress, ipfsRes?.ipfsUrl
            )
        );
        if (blockchainError || !blockchainRes) {
            this.setState({ isOpen: false });
            this.props.dispatchAction(eventConstants.HIDE_LOADER);

            return CommonToasts.errorToast(
                blockchainError.message ||
                validationsMessages.UNABLE_TO_MINT_NFT_ON_BLOCKCHAIN
            );
        }

        //get tokenId from morallis
        // const tokenId = await this.getTokenIdFromMoralis(selectedCollection.collectionAddress);
        if (this.state.collection[data.selectedCollectionIndex].tokenType === 'ERC721') {
            if (blockchainRes.events && blockchainRes.events.length && blockchainRes.events[0].args && blockchainRes.events[0].args["tokenId"])
                tokenId = blockchainRes.events[0].args["tokenId"].toHexString().toString();
            else
                tokenId = await this.getTokenIdFromMoralis(selectedCollection.collectionAddress);
        }

        // save NFT data on DB
        const [contentError, contentRes] = await Utils.parseResponse(
            ContentService.createNftContent(
                this.getRequestDataForSaveNftContent(
                    this.state.collection[data.selectedCollectionIndex].tokenType === 'ERC721' ? tokenId : (tokenId === false ? 1 : parseInt(tokenId) + 1),
                    data,
                    ipfsRes,
                    blockchainRes,
                    selectedCollection
                )
            )
        );
        this.setState({ steps: 2, content: contentRes });
        if (contentError || !contentRes) {
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            return CommonToasts.errorToast(
                contentError?.message || validationsMessages.UNABLE_TO_SAVE_NFT
            );
        } else {
            this.props.dispatchAction(eventConstants.HIDE_LOADER);
            CommonToasts.successToast("Your Nft is created successfully");
            history.push(pathConstants.HEADER.NFT_DETAILS + "?id=" + contentRes?._id + "&collectionAddress=" + selectedCollection.collectionAddress + "&tokenId=" + contentRes?.tokenId);
            window.location.reload();
        }
    };

    getTokenIdFromMoralis = async (collectionAddress) => {
        const options = {
            address: this.props?.walletConnect?.userId,
            token_address: collectionAddress,
            chain: process.env.REACT_APP_NETWORK_NAME || "bsc Testnet",
            limit: 100,
            page: 1
        };
        const nftData = await Moralis.Web3API.account.getNFTsForContract(options);
        let userNFTs = nftData.result;
        if (userNFTs.length)
            return userNFTs[0].token_id
        return false;
    }

    showPopup = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        return (
            <>
                <HeaderComponent />
                <CreateItem
                    collection={this.state.collection}
                    token={this.state.approvedTokens}
                    createNftHandler={this.createNftHandler}
                    isOpen={this.state.isOpen}
                    steps={this.state.steps}
                    content={this.state.content}
                    selectedCollection={this.state.selectedCollection}
                />
                <FooterComponent />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { walletConnect: state.wallet.walletConnect };
};

export default connect(mapStateToProps, { dispatchAction })(
    CreateItemComponent
);
