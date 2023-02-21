import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/modal";
import utility from "../../utility";
// import CommonEnterOtp from "../components/commonEnterOtp";
import VerifyYourself from "../components/verifyYourself";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { history } from "../../managers/history";

const ParentContainer = styled.div`
  background: #ffffff;
  border: none;
  border-radius: 19px;
  width: 613px;
  /* height: 307px;
  padding: 5px; */
`;
const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.height ? props.height : "")};
`;
const Heading = styled.div`
  font: normal 700 16px/22px "Roboto";
  color: #1e1e1e;
`;
const AmountInput = styled.input`
  padding: 0px 0px 0px 22px;
  width: 370px;
  height: 48px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  font: normal 700 14px/22px "Roboto";
  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
  &::-webkit-outer-spin-button {
    display: none;
  }
`;
const ContinueBtn = styled.button`
  border: none;
  font: normal 500 16px/22px "Roboto";
  width: 551px;
  height: 48px;
  background: ${(props) =>
    props.password === "" || props.data === "" ? "#ec9da6" : "#FC223B"};

  border-radius: 50px;
  color: white;
  margin: 15px 30px 0px 30px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 30px 15px 30px;
`;
const Hrline = styled.hr`
  border: 1px solid #e7e7e7;
  border-radius: 1px;
  margin-top: 10px !important;
`;
const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
`;
const EnterAmount = styled.div`
  font: normal 600 14px/22px "Roboto";
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #50555c;
`;

const CloseImg = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
function Mint(props) {
  const [popupScreen, setPopupScreen] = useState(true);
  // const [enterOTP, setEnterOTP] = useState(false);
  // const [otp, setOtp] = useState(new Array(6).fill(""));
  const [passcode, setPasscode] = useState(new Array(6).fill(""));
  const [verifyLoader, setVerifyLoader] = useState(false);

  const [amount, setAmount] = useState("");

  const parsedAmount =
    parseInt(amount.replace(/,/g, "") || 0).toLocaleString() === "0"
      ? ""
      : parseInt(amount.replace(/,/g, "") || 0).toLocaleString();

  const handleClose = () => {
    setPopupScreen(true);
    setAmount("");
    setPasscode(new Array(6).fill(""));
    props.setMintModal((pre) => ({ ...pre, mint: false }));
  };
  const createRequest = async (passcode) => {
    setVerifyLoader(true);
    let startTime = Date.now();
    let endTime =
      (Math.floor(startTime / 1000) + utility.convertHoursToSeconds(48)) * 1000;
    let requestData = {
      createdBy: props?.user?.details?.profile?.email,
      type: "MINT",
      amount: parseInt(amount),
      startTime: startTime,
      endTime: endTime,
      role: props.user.userRole,
      passcode,
      successMessage: "Minting Request Created Successfully",
    };
    await props.requestProposal(requestData);
    setVerifyLoader(false);
    handleClose();
    history.push("/dashboard/overview");
  };
  const CreateMintRequest = (passcode) => {
    createRequest(passcode);
    setPasscode(new Array(6).fill(""));
    setAmount("");
  };
  return (
    <Modal
      open={props.mintModal}
      handleClose={() => {
        setPopupScreen(true);
        props.setMintModal((pre) => ({ ...pre, mint: false }));
        setPasscode(new Array(6).fill(""));
        setAmount("");
      }}
      marginTop={"83px"}
    >
      {popupScreen ? (
        //  enterOTP ?
        // <CommonEnterOtp
        //   setPopupScreen={setPopupScreen}
        //   setMintModal={props.setMintModal}
        //   setEnterOTP={setEnterOTP}
        //   setOtp={setOtp}
        //   otp={otp}
        // />
        // :
        <ParentContainer>
          <MintContainer height="307px">
            <Header>
              <Heading>Mint</Heading>
              <CloseImg
                src="/images/closeIcon.svg"
                alt="/"
                onClick={() => {
                  setAmount("");
                  props.setMintModal((pre) => ({ ...pre, mint: false }));
                }}
              />
            </Header>
            <Hrline></Hrline>
            <AmountContainer>
              <EnterAmount>Enter Amount :</EnterAmount>

              <AmountInput
                placeholder="Number of GTR"
                value={parsedAmount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </AmountContainer>
            <ContinueBtn
              onClick={() => setPopupScreen((pre) => !pre)}
              disabled={amount === ""}
              data={amount}
            >
              Continue
            </ContinueBtn>
          </MintContainer>
        </ParentContainer>
      ) : (
        <VerifyYourself
          passcode={passcode}
          setPasscode={setPasscode}
          handleClose={handleClose}
          apiCallFunction={(passcode) => CreateMintRequest(passcode)}
          buttonText="Create Minting Proposal"
          verifyLoader={verifyLoader}
        />
      )}
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(Mint);
