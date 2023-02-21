import { ethers } from "ethers";
import contractABI from "../assets/abi/abi.json";
import IgABI from "../assets/abi/ig.json"
import { sessionManager } from "../managers/sessionManager";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export default {
  connectWallet,
  addCollection,
  changePortalPrice
};

async function connectWallet() {
  if (!window.ethereum)
    return window.open("https://metamask.io/download.html", "_blank");

  return window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((response) => {
      console.log("response==connectWallet=", response);
      if (!response) return Promise.reject(response);
      return Promise.resolve(response);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function addCollection(name, symbol, owner, whitelistAddresses) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log("signer==", signer);

  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  try {
    const result = await contractData.createCollection(
      name,
      symbol,
      owner,
      5,
      whitelistAddresses
    );
    console.log("result==", result);
    let res = await result.wait();
    return {
      ...res,
    };
  } catch (err) {
    console.log("++++", err);
  }
}
async function changePortalPrice(name, symbol, owner, whitelistAddresses) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log("signer==", signer);

  const contractData = new ethers.Contract(
    contractAddress,
    IgABI,
    signer
  );
  try {
    const result = await contractData.changePortalFee(
     2
    );
    console.log("result==", result);
    let res = await result.wait();
    return {
      ...res,
    };
  } catch (err) {
    console.log("++++", err);
  }
}