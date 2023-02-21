/* global BigInt */
import { cookiesConstants, httpConstants } from "../constants";
import Utility from "../utility";
import { sessionManager } from "../managers/sessionManager";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";
import contractABI from "../assets/abi/erc721CollectionAbi.json";
import updatedABI from "../assets/abi/updatedAbi.json";
import erc1155CollectionABI from "../assets/abi/erc1155CollectionAbi.json";
import controllerContractABI from "../assets/abi/controllerContractAbi.json";
import erc20ContractAbi from "../assets/abi/erc20ContractABI.json";
import erc721ContractAbi from "../assets/abi/erc721TemplateABI.json";
import Web3 from "web3";
import { httpService } from "../utility/httpService";

export default {
    connectWallet,
    mintNFT,
    setApprovalForAll,
    buyNFTWithToken,
    approveToken,
    getTokenDecimals,
    buyNFT,
    sellNft,
    removeFromSaleNft,
    getNftPrice,
    makeOffer,
    makeOfferWithToken,
    transferToken,
    acceptOffer,
    acceptOfferToken,
    rejectOffer,
    rejectOfferToken,
    getListingInfo,
    getTokenSymbol,
    getERC20TokenDecimals,
    getNftMetaData,
    getERC721TokenName,
    getERC721TokenOwnerAddress,
    transferNft,
    mintNFT1155
};

async function acceptOffer({ tokenType, contractAddress, tokenId, offererAddress }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();

    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);

    const result = await contractData.acceptOffer(tokenType, contractAddress, tokenId, offererAddress);
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function acceptOfferToken({ tokenType, contractAddress, tokenId, offererAddress }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);

    const result = await contractData.acceptOffer(
        tokenType,
        contractAddress,
        tokenId,
        offererAddress
    );
    let res = await result.wait();

    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function rejectOffer({ contractAddress, tokenId, offererAddress }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();

    // await getNftPrice(contractAddress, tokenId);
    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);

    const result = await contractData.rejectOffer(contractAddress, tokenId, offererAddress);
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function rejectOfferToken({ contractAddress, tokenId, offererAddress }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);
    const result = await contractData.rejectOffer(
        contractAddress,
        tokenId,
        offererAddress
    );
    let res = await result.wait();

    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function connectWallet() {
    if (!window.ethereum)
        return window.open("https://metamask.io/download.html", "_blank");

    return window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((response) => {
            if (!response) return Promise.reject(response);
            return Promise.resolve(response);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
}

async function getWalletConnectProvider() {
    const RPC_URLS = {
        56: "https://bsc-dataseed.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    };
    return new WalletConnectProvider({
        rpc: {
            56: RPC_URLS[56],
            97: RPC_URLS[97],
        },
    });
}

async function mintNFT({ tokenURI, collectionAddress }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();

    if (!web3Provider) return Promise.reject("Please connect your wallet");
    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        collectionAddress,
        updatedABI,
        signer
    );
    const result = await contractData.createToken(tokenURI);
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

//set approval for marketplace to trade the nfts
async function setApprovalForAll(collectionAddress, tokenType) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();

    if (!web3Provider) return Promise.reject("Please connect your wallet");
    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = tokenType === "ERC721" ? new ethers.Contract(
        collectionAddress,
        updatedABI,
        signer
    ) : new ethers.Contract(
        collectionAddress,
        erc1155CollectionABI,
        signer
    )
    const result = await contractData.setApprovalForAll(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, true);
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}


//price should be in wei
async function sellNft({ tokenType, tokenId, price, currency, collectionAddress, decimals, erc20CurrencyAddress }) {
    if ((!tokenId && tokenId !== 0) || !price | !currency | !collectionAddress) {
        return Promise.reject("Invalid params");
    }

    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");
    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        process.env.REACT_APP_MASTER_CONTRACT_ADDRESS,
        controllerContractABI,
        signer
    );
    let tokenChoice = Utility.getTokenChoice(currency);

    if (tokenChoice === 1) price = ethers.utils.parseEther(price.toString());
    else price = BigInt(price * 10 ** decimals);
    const result = await contractData.putOnSale(
        tokenType,
        collectionAddress,
        tokenId,
        price,
        Number(tokenChoice),
        erc20CurrencyAddress
    );
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function removeFromSaleNft({ contractAddress, tokenId }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();

    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);
    const result = await contractData.cancelListing(contractAddress, tokenId);
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

//1bnb=0.136ether
async function approveToken(_contractAddress, _contractABI, _spender, _amount) {
    if (!_contractAddress || !_contractABI || !_spender || !_amount)
        return Promise.reject("Insufficient data");

    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        _contractAddress,
        _contractABI,
        signer
    );

    const result = await contractData.approve(_spender, BigInt(_amount));
    let res = await result.wait();

    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function getTokenDecimals(_contractAddress, _contractABI) {
    if (!_contractAddress || !_contractABI)
        return Promise.reject("Insufficient data");

    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        _contractAddress,
        _contractABI,
        signer
    );
    const result = await contractData.decimals();
    return Number(result);
}

//1bnb=0.136ether
async function buyNFT({ tokenType, contractAddress, tokenId, price }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);
    const options = { value: ethers.utils.parseEther(price.toString()) };
    const result = await contractData.buyNft(tokenType, contractAddress, tokenId, "0x0000000000000000000000000000000000000000", options);
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

//1bnb=0.136ether
async function buyNFTWithToken(
    tokenType,
    collectionContractAddress,
    tokenAddress,
    tokenId
) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        process.env.REACT_APP_MASTER_CONTRACT_ADDRESS,
        controllerContractABI,
        signer
    );
    let price = 0;
    const options = { value: ethers.utils.parseEther(price.toString()) };
    const result = await contractData.buyNft(tokenType, collectionContractAddress, tokenId, tokenAddress, options);
    let res = await result.wait();

    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

//1bnb=0.136ether
async function getNftPrice(_contractAddress, tokenId) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        _contractAddress,
        updatedABI,
        signer
    );
    return await contractData.auctionPrice(tokenId);
}

async function makeOffer({ contractAddress, tokenId, amount }) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");
    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);
    let _amount = BigInt(amount * 10 ** 18);
    const options = { value: ethers.utils.parseEther(amount.toString()) };
    const result = await contractData.makeOffer(contractAddress, tokenId, _amount, "0x0000000000000000000000000000000000000000", options);
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function transferToken(
    _tokenAddress,
    _tokenABI,
    _contractAddress,
    _amount
) {
    if (!_tokenAddress || !_amount) return Promise.reject("Insufficient data");
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(_tokenAddress, _tokenABI, signer);

    const result = await contractData.approve(_contractAddress, BigInt(_amount));
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function makeOfferWithToken(
    ContractAddress,
    tokenAddress,
    tokenId,
    amount
) {
    const isWalletConnect = sessionManager.getDataFromSessionStorage(
        cookiesConstants.IS_METAMASK
    );
    let web3Provider = window.ethereum;
    if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
    if (!web3Provider) return Promise.reject("Please connect your wallet");

    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(process.env.REACT_APP_MASTER_CONTRACT_ADDRESS, controllerContractABI, signer);
    let _amount = 0;
    const options = { value: ethers.utils.parseEther(_amount.toString()) };
    const result = await contractData.makeOffer(
        ContractAddress,
        tokenId,
        BigInt(amount),
        tokenAddress,
        options
    );
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function getListingInfo(collectionAddress, tokenId) {
    const web3 = new Web3(process.env.REACT_APP_RPC_URL);
    const contractData = new web3.eth.Contract(controllerContractABI, process.env.REACT_APP_MASTER_CONTRACT_ADDRESS);
    const res = await contractData.methods.getTokenListingDetails(collectionAddress, tokenId).call()
    return res;
}

async function getTokenSymbol(_contractAddress) {
    const web3 = new Web3(process.env.REACT_APP_RPC_URL);
    const contractData = new web3.eth.Contract(erc20ContractAbi, _contractAddress);
    const res = await contractData.methods.symbol().call().catch(err => {
    })
    if (!res)
        return ""
    return res;
}

async function getERC20TokenDecimals(_contractAddress) {
    const web3 = new Web3(process.env.REACT_APP_RPC_URL);
    const contractData = new web3.eth.Contract(erc20ContractAbi, _contractAddress);
    const res = await contractData.methods.decimals().call().catch(err => {
    })
    if (!res)
        return 0
    return res;
}

async function getNftMetaData(_contractAddress, tokenId, tokenType) {
    const web3 = new Web3(process.env.REACT_APP_RPC_URL);
    const contractData = tokenType === "ERC721" ? new web3.eth.Contract(erc721ContractAbi, _contractAddress) : new web3.eth.Contract(erc1155CollectionABI, _contractAddress)
    const res = tokenType === "ERC721" ? await contractData.methods.tokenURI(tokenId).call().catch(err => {
    }) : await contractData.methods.uri(tokenId).call().catch(err => {
    })
    if (!res)
        return {}
    // let resJson = await fetch(res).catch(err => {
    // })
    // resJson = await resJson.json();
    if (res)
        return res;
    return ""
}

async function getERC721TokenName(_contractAddress) {
    const web3 = new Web3(process.env.REACT_APP_RPC_URL);
    const contractData = new web3.eth.Contract(erc721ContractAbi, _contractAddress);
    const res = await contractData.methods.name().call().catch(err => {
    })
    if (!res)
        return ""
    return res;
}

async function getERC721TokenOwnerAddress(_contractAddress, tokenId) {
    const web3 = new Web3(process.env.REACT_APP_RPC_URL);
    const contractData = new web3.eth.Contract(erc721ContractAbi, _contractAddress);
    const res = await contractData.methods.ownerOf(tokenId).call().catch(err => {
    })
    if (!res)
        return ""
    return res;
}
async function transferNft({ _contractAddress, _transferAddress, _fromAddress, tokenId }) {
    // const isWalletConnect = sessionManager.getDataFromSessionStorage(
    //     cookiesConstants.IS_METAMASK
    // );
    let web3Provider = window.ethereum;
    // if (!isWalletConnect) web3Provider = await getWalletConnectProvider();

    if (!web3Provider) return Promise.reject("Please connect your wallet");
    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        _contractAddress,
        erc721ContractAbi,
        signer
    );

    const result = await contractData.transferFrom(
        _fromAddress,
        _transferAddress,
        tokenId,
    );
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
    // const res = await contractData.methods.ownerOf(tokenId).call().catch(err => {
    // })
    // if (!res)
    //     return ""
    // return res;
}

// async function mintNFT11552(id, amount, contractAddress) {
//     console.log("id, amount, contractAddress=-=-=-=-=-=-=-=-=-=-=-", id, amount, contractAddress )
//     const isWalletConnect = sessionManager.getDataFromSessionStorage(
//         cookiesConstants.IS_METAMASK
//     );
//     let web3Provider = window.ethereum;
//     if (!isWalletConnect) web3Provider = await getWalletConnectProvider();
//     console.log("ABCD =-=-=-=-=-=-=-=-=-= ABCD -=-=-=-=-=-=-=-=-")
//     if (!web3Provider) return Promise.reject("Please connect your wallet");
//     const provider = new ethers.providers.Web3Provider(web3Provider);
//     const signer = provider.getSigner();
//     console.log("signer======================", signer?.provider?.provider?.selectedAddress);
//     const contractData = new ethers.Contract(
//         contractAddress,
//         erc1155CollectionABI,
//         signer
//     );
//     const result = await contractData.mint(Web3.utils.toChecksumAddress(signer?.provider?.provider?.selectedAddress), 1, amount, "");
//     console.log("1111111111111112222222222222223333333333333333444444444444444455555555555555555555555555")
//     let res = await result.wait();
//     return {
//         ...res,
//         chainId: provider?._network?.chainId || "",
//         name: provider?._network?.name || "",
//     };
// }

async function mintNFT1155(id, amount, contractAddress, nftUri) {
    window.web3 = new Web3(window.ethereum);
    // console.log("id================", id);
    let contractInstance = new window.web3.eth.Contract(
        erc1155CollectionABI,
        contractAddress
    );
    const gasPrice = await window.web3.eth.getGasPrice();
    let transaction = {
        from: window.web3.currentProvider.selectedAddress,
        to: contractAddress, //contractAddress of the collection (same in data below)
        gas: 7920000,
        gasPrice: gasPrice,
        data: contractInstance.methods
            .mintBatch(Web3.utils.toChecksumAddress(window.web3.currentProvider.selectedAddress), [id], [amount], [nftUri])
            .encodeABI(),
    };

    let res;

    await window.web3.eth
        .sendTransaction(transaction)
        .on("transactionHash", function (hash) {
            // console.log("transactionHash ====", hash);
        })
        .on("receipt", async function (receipt) {
            //receive the contract address from this object
            // console.log("receipt ====", receipt);
            res = {
                transactionHash: receipt.transactionHash,
                chainId: window.web3?.currentProvider?.chainId || "",
                name: "bsc testnet",
            };
        })
        .on("confirmation", function (confirmationNumber, receipt) {

        })
        .on("error", function (error) {
            // console.log("error in ERC1155 minting====================", error)
            res = { message: "NFT Minting failed" }
        });

    return res;
}
