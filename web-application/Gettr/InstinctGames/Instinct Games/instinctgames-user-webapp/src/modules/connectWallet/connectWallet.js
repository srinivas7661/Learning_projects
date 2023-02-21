import React,{ useEffect} from "react";
import styled from "styled-components";
import Utility from "../../utility";
import BlockchainService from "../../services/blockchainService";
import { addUser } from "../../services/userMicroservice";
import { useDispatch } from "react-redux";
import { eventConstants, validationsMessages } from "../../constants";
import { history } from "../../managers/history";
import CommonToasts from "../../common/components/commonToasts";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import Web3 from "web3";

const WalletText = styled.h1`
  text-align: center;
  color: #ffffff;
  margin-top: 20px;
`;
const Line = styled.hr`
  height: 4px;
  color: #8255ec;
  margin-top: 20px;
`;
function ConnectWallet(props) {
  const dispatcher = useDispatch();
  async function onClickMetaMask() {
    const [err, response] = await Utility.parseResponse(
      BlockchainService.connectWallet()
    );
    if (err || !response) {
      return CommonToasts.errorToast(
        err?.message || validationsMessages.UNABLE_TO_CONNECT_WALLET
      );
    }
    dispatcher({ type: eventConstants.SHOW_LOADER });
    const [error, addUserResponse] = await Utility.parseResponse(
      addUser({
        userId: response[0],
        password: process.env.REACT_APP_ADD_IG_MEMBER_PASSWORD,
      })
    );
    dispatcher({ type: eventConstants.HIDE_LOADER });
    if (error || !addUserResponse) {
      return CommonToasts.errorToast(
        err?.message || validationsMessages.UNABLE_TO_ADD_USER
      );
    }
    dispatcher({
      type: eventConstants.META_MASK,
      data: { ...addUserResponse },
    });
    history.push("/");
  }
  const connectWaletConnect = async () => {
    const RPC_URLS = {
      56: "https://bsc-dataseed.binance.org/",
      97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    };
    const provider = new WalletConnectProvider({
      rpc: {
        56: RPC_URLS[56],
        97: RPC_URLS[97],
      },
      qrcode: true,
      pollingInterval: 15000,
    });
    const accountData = await provider.enable();
    let web3;
    web3 = new Web3(provider);
    const acc = await web3.eth.getAccounts();
    const account = accountData[0];
    const [error, addUserResponse] = await Utility.parseResponse(
      addUser({
        userId: account,
        password: process.env.REACT_APP_ADD_IG_MEMBER_PASSWORD,
      })
    );
    dispatcher({ type: eventConstants.HIDE_LOADER });
    if (error || !addUserResponse) {
      return CommonToasts.errorToast(
        error?.message || validationsMessages.UNABLE_TO_ADD_USER
      );
    }
    dispatcher({
      type: eventConstants.WALLET_DATA,
      data: { ...addUserResponse },
    });
    history.push("/");
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="w-full px-10  py-40 bg-main bg-cover min-h-screen bg-top flex items-center justify-center mobile:pt-20 mobile:items-start">
        <div className="polygon-wallet relative min-w-333 bg-black-100 w-full max-w-lg2 mobile:max-h-56">
          <WalletText className="text-ft14 sm:py-5 sm:text-ft9 xl:text-ft19 font-black font-EurostileExtd">
            CONNECT YOUR WALLET
          </WalletText>
          <Line className="border-blue-80 sm:border-primary-50" />
          <div className="flex flex-col py-10 sm:py-20 gap-4 sm:gap-8 font-EurostileMedium items-center">
            <button
              className="market-button text-ft0 gap-4 sm:gap-8 w-38.5 pl-4 sm:pl-10 py-1.75 sm:py-2.5 sm:text-ft15 sm:w-93 flex items-center  rounded-full text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10 "
              onClick={onClickMetaMask}
            >
              <img
                className="w-4.5 sm:w-11"
                src="/images/metaMaskFox.svg"
                alt="metaMaskFox"
              />
              <span>Metamask</span>
            </button>
            <button
              className="market-button text-ft0 gap-4 sm:gap-8 w-38.5 pl-4 sm:pl-10 py-1.75 sm:py-2.5 sm:text-ft15 sm:w-93 flex items-center  rounded-full text-white bg-blue-60 relative overflow-hidden border border-blue-80 z-10"
              onClick={connectWaletConnect}
            >
              <img
                className="w-3.5 sm:w-9"
                src="/images/walletConnect.svg"
                alt="walletConnect"
              />
              <span>WalletConnect</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectWallet;
