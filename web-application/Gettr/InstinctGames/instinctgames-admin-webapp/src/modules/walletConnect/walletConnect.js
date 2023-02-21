import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Utility from "../../utility";
import { eventConstants } from "../../constants";
import { BlockchainService } from "../../services";
import { history } from "../../managers/history";
import CommonToasts from "../../common/components/commonToasts";
import { validationsMessages } from "../../constants";
const MainComponent = styled.div``;
const Parent = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin-top: 50px;
  margin-bottom: 100px;
  @media (max-width: 767px) {
    padding: 0 16px 0 16px;
  }
`;
const WalletDiv = styled.div`
  width: 524px;
  height: 80px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 16px;
  display: flex;
  padding: 24px;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Text = styled.div`
  color: #151e58;
  font-size: 22px;
  font-family: Barlow;
  font-weight: 600;
  width: 100%;
  ${"" /* margin-left: 278px; */}
  margin-bottom: 20px;
`;
const Div = styled.div`
  color: #c3c3c3;
  font-size: 16px;
  margin-left: 15px;
  margin-top: 3px;
  cursor: pointer;
`;
const ParentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Images = styled.img`
  width: 23px;
  height: 23px;
  margin: 0 15px 20px 0;
  cursor:pointer;
`;
const Img = styled.img``;

export default function Wallet(props) {
  const dispatcher = useDispatch();
  async function onClickMetaMask() {
    const [err, response] = await Utility.parseResponse(
      BlockchainService.connectWallet()
    );
    if (err || !response) {
      return Utility.apiFailureToast("Please install metamask ");
    }
    const userAddress = response[0];
    if (!userAddress) {
      return Utility.apiFailureToast(
        err?.message || "Unable to connect metamask"
      );
    }
    dispatcher({
      type: eventConstants.CONNECTED_METAMASK,
      data: { userAddress },
    });
    history.push("/dashboard/manage-store/collection");
  }
  return (
    <MainComponent>
      <Parent>
        <ParentDiv>
          <Images
            onClick={() => history.push("/dashboard/manage-store/collection")}
            src="/back.svg"
          />
          <Text>Connect your wallet</Text>
        </ParentDiv>
        <WalletDiv onClick={onClickMetaMask}>
          <Img src="/images/metamask.svg" />
          <Div>Metamask</Div>
        </WalletDiv>
      </Parent>
    </MainComponent>
  );
}
