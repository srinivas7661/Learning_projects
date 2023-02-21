import React from "react";
import BaseComponent from "../baseComponent";
import CreateCollection from "./createCollection";
import AdminModule from "../../services/adminMicroService";
import {connect} from "react-redux";
import {history} from "../../managers/history";
import Utils, {dispatchAction} from "../../utility";
import {getCategories} from "../../services/adminMicroService";
import Web3 from "web3";
import contractABI from "../../assets/abi/abi.json";
import toast, {Toaster} from "react-hot-toast";
import CommonToasts from "../../common/components/commonToasts";
import {validationsMessages} from "../../constants";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const ownerAddress = process.env.REACT_APP_OWNER_ADDRESS;

class CreateCollectionNew extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            description: props.profileDetail.description || "",
            name: props.profileDetail.name || "",
            symbol: props.profileDetail.symbol || "",
            selectEvery: props.profileDetail.selectEvery || "",
            whiteListedAddresses: props.profileDetail.whiteListedAddresses || [],
            isPublic: true,
            imageUrl: props.profileDetail.imageUrl || "",
            coverUrl: props.profileDetail.coverUrl || "",
            collectionType: props.profileDetail.typeId || "",
            categoryId: props.profileDetail.categoryId || "",
            _id: props.profileDetail._id,
            addedOn: Date.now(),
            confirmationModal: null,
            contractValue:0,
            tokenType:null
        };
        
    }

    componentDidMount() {
        let web3;
        web3 = new Web3(window.ethereum);
        let check = web3.eth.abi.decodeLog([
            {
                "indexed": true,
                "name": "collectionAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "name",
                "type": "string"
            },
                {
                    "indexed": false,
                    "name": "owner",
                    "type": "address"
                }
        ],
            "0x000000000000000000000000d6dfe643f0b72675238c29d66c79b5ef64abdab2",
            ["0x0000000000000000000000003623cb5ce8a350100e47b1d56d2f74e4dbf5a860","0xfb9a4a57fc2312ac140e4dc1096a3e95eb54e75ba71758d718109a5198309a0d"])
        console.log("+++",check)
        this.getCategory();
    }

    getCategory = async () => {
        const res = await getCategories();
        this.setState({
            categoryList: res.categoriesContent,
        });
    };
    handleConfirmationModal = (param) => {
        this.setState({confirmationModal: param});
    };
    handleTokenType = () => {
        if (this.state.contractValue === 2) {
          this.setState({ tokenType: "ERC1155" });
        } else {
          this.setState({ tokenType: "ERC721" });
        }
      };
    createCollection = async (data) => {
        const address = this.props.wallet?.userAddress;
        console.log("address", address, "ownerAddress", ownerAddress);
        if (address.toLowerCase() !== ownerAddress.toLowerCase()) {
            this.setState({confirmationModal: "null"});
            return CommonToasts.failureMessageSent(
                validationsMessages.CANNOT_CREATE_COLLECTION_NOT_OWNER
            );
        }
        if(this.state.contractValue===0){
            return  CommonToasts.failureMessageSent("You must choose token type");
      
          }
        // create collection on blockchain
        let web3;
        web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        web3.eth.getAccounts().then(async (accounts) => {
            if (!accounts || !accounts.length) {
                CommonToasts.failureMessageSent(
                    validationsMessages.METAMASK_NOT_CONNECT
                );
                return;
            }
            //TODO need to show loader
            const acc = accounts[0];
            //TODO we need to convert whitelistAdd value in array to

            // const whitelistAdreess = Array.from(this.state.whiteListedAddresses);
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            contract.methods
                .createCollection(
                    this.state.contractValue||1,
                    this.state.name,
                    this.state.symbol,
                    this.state.whiteListedAddresses,
                    process.env.REACT_APP_IS_WHITELISTING_ENABLED.toLowerCase() === 'true',
                    2
                )
                .send({from: acc}, async (err, transactionHash) => {
                    if (err || !transactionHash) {
                        this.setState({confirmationModal: "null"});
                        return CommonToasts.failureMessageSent(
                            validationsMessages.TRANSACTION_FAILED
                        );
                    }
                    const res = await this.getTransactionReceipt(transactionHash);

                    let eventsLogs = web3.eth.abi.decodeLog([
                            {
                                "indexed": true,
                                "name": "collectionAddress",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "name": "collectiobOwner",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "name": "collectionType",
                                "type": "string"
                            }
                        ],
                        res.logs[0].data, [res.logs[0].topics[1],res.logs[0].topics[2]])
                    const collectionAddress = eventsLogs.collectionAddress;
                    if (!res) {
                        this.setState({confirmationModal: "null"});
                        CommonToasts.failureMessageSent(
                            validationsMessages.COLLECTION_CREATION_FAILURE
                        );
                    }
                    //save collection in db
                    else {
                        this.handleTokenType()
                        let requestData = {
                            name: this.state.name,
                            imageUrl: this.state.imageUrl,
                            coverUrl: this.state.coverUrl,
                            description: this.state.description,
                            whiteListedAddresses: this.state.whiteListedAddresses,
                            categoryId: this.state.categoryId,
                            collectionType: this.state.typeId,
                            symbol: this.state.symbol,
                            collectionAddress: collectionAddress,
                            tokenType:this.state.tokenType,
                            addedOn: Date.now(),
                        };
                        const result = await Utils.parseResponse(
                            AdminModule.addCollections(requestData)
                        );
                        if (result)
                            //TODO need to use loader instead of toast
                            history.push("/dashboard/manage-store/collection");
                        this.setState({confirmationModal: "confirm"});
                    }
                });
        });
    };
    delay = (ms) => new Promise((res) => setTimeout(res, ms));
    getTransactionReceipt = async (hash) => {
        let web3;
        web3 = new Web3(window.ethereum);
        let count = 0;
        while (true) {
            count++;
            const receipt = await web3.eth.getTransactionReceipt(hash);
            if (receipt !== null || count > 10) {
                return receipt;
            }
            await this.delay(3000);
        }
    };
    addWhitelistAddress = async (data) => {
        const address = this.props.wallet?.userAddress;
        if (address !== ownerAddress) {
            this.setState({confirmationModal: "null"});
            return CommonToasts.failureMessageSent(
                validationsMessages.CANNOT_UPDATE_COLLECTION_NOT_OWNER
            );
        }
        let whiteListData = this.state.whiteListedAddresses;
        if (!whiteListData) {
            whiteListData = [];
        }

        if (!this.props.wallet?.userAddress)
            return CommonToasts.failureMessageSent(
                validationsMessages.WALLET_NOT_CONNECT
            );
        let web3;
        web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        web3.eth.getAccounts().then(async (accounts) => {
            if (!accounts || !accounts.length) {
                CommonToasts.failureMessageSent(
                    validationsMessages.METAMASK_NOT_CONNECT
                );
                return;
            }
            //TODO need to show loader
            let marketAddress = this.props.profileDetail.collectionAddress;
            const acc = accounts[0];
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            const whiteListResponse = await contract.methods
                .addWhitelistAddress(marketAddress, whiteListData)
                .send({from: acc}, async (err, transactionHash) => {
                    if (err || !transactionHash) {
                        this.setState({confirmationModal: "null"});
                        return CommonToasts.failureMessageSent(
                            validationsMessages.TRANSACTION_FAILED
                        );
                    }
                });
            if (!whiteListResponse) {
                this.setState({confirmationModal: "null"});
                return CommonToasts.failureMessageSent(
                    validationsMessages.BLOCKCHAIN_ERROR
                );
            } else {
                let requestData = {
                    _id: this.state._id,
                    imageUrl: this.state.imageUrl,
                    coverUrl: this.state.coverUrl,
                    description: this.state.description,
                    categoryId: this.state.categoryId,
                    collectionType: this.state.typeId,
                    whiteListedAddresses: this.state.whiteListedAddresses,
                };
                let result = await AdminModule.updateCollection(requestData);
                if (result) this.setState({collection: result});
                this.setState({confirmationModal: "confirm"});
            }
        });
    };

    setLogoImage = (logoImage) => {
        this.setState({imageUrl: logoImage});
    };
    setCoverImage = (coverImage) => {
        this.setState({coverUrl: coverImage});
    };
    setDescription = (description) => {
        this.setState({description: description});
    };
    setName = (name) => {
        this.setState({name: name});
    };
    setSymbol = (symbol) => {
        this.setState({symbol: symbol});
    };
    setEveryOne = (everyOne) => {
        this.setState({selectEvery: everyOne});
    };
    setWhiteList = (whiteListAd) => {
        this.setState({whiteListedAddresses: whiteListAd});
    };
    setCategory = (category) => {
        this.setState({categoryId: category});
    };
    setType = (type) => {
        this.setState({typeId: type});
    };
    setContractValue = (value) => {
        this.setState({contractValue:value});
    };

    render() {
        return (
            <>
                <CreateCollection
                    state={this.state}
                    createCollection={this.createCollection}
                    setLogoImage={this.setLogoImage}
                    setCoverImage={this.setCoverImage}
                    setName={this.setName}
                    setSymbol={this.setSymbol}
                    setDescription={this.setDescription}
                    setEveryOne={this.setEveryOne}
                    setWhiteList={this.setWhiteList}
                    activeTab={this.props.activeTab}
                    setCategory={this.setCategory}
                    setType={this.setType}
                    setContractValue={this.setContractValue}
                    updateCollections={this.updateCollections}
                    navigateToTab={this.props.navigateToTab}
                    categoryList={this.categoryList}
                    confirmationModal={this.state.confirmationModal}
                    handleModal={this.handleConfirmationModal}
                    metaLoader={this.props.wallet?.userAddress}
                    addWhitelistAddress={this.addWhitelistAddress}
                    handleOnChange={this.handleOnChange}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {wallet: state.wallet?.userAddress || null};
};
export default connect(mapStateToProps, {dispatchAction})(
    CreateCollectionNew
);
