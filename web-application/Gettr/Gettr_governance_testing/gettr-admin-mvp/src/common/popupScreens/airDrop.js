import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/modal";
import utility from "../../utility";
import Papa from "papaparse";
// import CommonEnterOtp from "../components/commonEnterOtp";
import VerifyYourself from "../components/verifyYourself";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { Loader } from "../components/components";
import { history } from "../../managers/history";

const ParentContainer = styled.div`
  background: #ffffff;
  border: none;
  border-radius: 19px;
  width: ${(props) => (props.width ? props.width : "613px")};
  height: ${(props) => (props.height ? props.height : "307px")};
  padding: 5px;
`;
const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Heading = styled.div`
  font: normal 700 16px/22px "Roboto";
  color: #1e1e1e;
`;
const FileName = styled.div`
  font: normal 500 14px/22px "Roboto";
  text-align: center;
`;
const ContinueBtn = styled.button`
  border: none;
  font: normal 500 16px/22px "Roboto";
  width: 551px;
  height: 48px;
  background: ${(props) => (props.data === "" ? "#ec9da6" : "#FC223B")};
  border-radius: 50px;
  color: white;
  opacity: ${(props) => (props.disabled ? "0.3" : "")};
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
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 551px;
  height: 71px;
  border: 1.5px dashed #e7e7e7;
  border-radius: 10px;
  margin: 30px;
  color: #50555c;
  font: normal 600 14px/22px "Roboto";
`;
const CloseImg = styled.img`
  cursor: pointer;
`;

function AirDrop(props) {
  const [popupScreen, setPopupScreen] = useState(true);
  // const [enterOTP, setEnterOTP] = useState(false);
  // const [otp, setOtp] =  useState(new Array(6).fill(""));
  const [passcode, setPasscode] = useState(new Array(6).fill(""));
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const [parsedData, setParsedData] = useState([]);
  const [fileName, setFileName] = useState("");
  const handleClose = () => {
    setParsedData([]);
    setFileName("");
    setPopupScreen(true);
    setPasscode(new Array(6).fill(""));
    props.setMintModal((pre) => ({ ...pre, airDrop: false }));
  };
  const createRequest = async (passcode) => {
    setVerifyLoader(true);
    let startTime = Date.now();
    let endTime =
      (Math.floor(startTime / 1000) + utility.convertHoursToSeconds(48)) * 1000;
    let requestData = {
      createdBy: props?.user?.details?.profile?.email,
      type: "AIRDROP",
      startTime: startTime,
      endTime: endTime,
      airdrops: parsedData,
      role: props.user.userRole,
      passcode,
      successMessage: "Airdrop Request Created Successfully",
    };
    await props.requestProposal(requestData);
    setVerifyLoader(false);
    handleClose();
    history.push("/dashboard/overview");
  };
  const changeHandler = async (event) => {
    setLoader(true);
    const fileCheck = event.target.files[0].name.endsWith(".csv");
    if (fileCheck) {
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          setParsedData(results.data);
          setFileName(event.target.files[0]?.name);
          setLoader(false);
        },
      });
    } else {
      utility.apiFailureToast(
        "File format not supported, please upload a CSV file"
      );
      setLoader(false);
    }
  };
  const CreateAirdropProposal = (passcode) => {
    createRequest(passcode);
    setPasscode(new Array(6).fill(""));
    setParsedData([]);
  };
  return (
    <Modal
      open={props.mintModal}
      handleClose={() => {
        setPopupScreen(true);
        props.setMintModal((pre) => ({ ...pre, airDrop: false }));
        setPasscode(new Array(6).fill(""));
        setParsedData([]);
      }}
      marginTop={"83px"}
    >
      {popupScreen ? (
        // enterOTP ? (
        // <CommonEnterOtp
        //   setPopupScreen={setPopupScreen}
        //   setMintModal={props.setMintModal}
        //   setEnterOTP={setEnterOTP}
        //   setOtp={setOtp}
        //   otp={otp}
        // />

        // ):
        <ParentContainer height="343px">
          <MintContainer>
            <Header>
              <Heading>New Airdrop</Heading>
              <CloseImg
                src="/images/closeIcon.svg"
                alt="/"
                onClick={() => {
                  setParsedData([]);
                  setFileName("");
                  setLoader(false);
                  props.setMintModal((pre) => ({ ...pre, airDrop: false }));
                }}
              />
            </Header>
            <Hrline></Hrline>
            <input
              type="file"
              style={{ display: "none" }}
              id="upload-file"
              accept=".csv"
              onChange={(e) => changeHandler(e)}
            />
            {loader ? (
              <InputContainer>
                <Loader />
              </InputContainer>
            ) : (
              <label htmlFor="upload-file">
                <InputContainer>
                  <img src="/images/uploadIcon.svg" alt="/" />
                  &nbsp; Upload CSV
                </InputContainer>
                {fileName && <FileName>{`File name : ${fileName}`}</FileName>}
              </label>
            )}
            <ContinueBtn
              disabled={fileName === ""}
              onClick={() => setPopupScreen((pre) => !pre)}
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
          apiCallFunction={(passcode) => CreateAirdropProposal(passcode)}
          buttonText="Create Airdrop Proposal"
          verifyLoader={verifyLoader}
        />
      )}
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(AirDrop);
