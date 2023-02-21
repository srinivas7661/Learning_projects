import React, { useState } from "react";
import styled from "styled-components";
import Header from "../header";
import { history } from "../../managers/history";
import GettrTransactions from "../gettrTransactions";
import TransactionDetails from "../transactionDetails";
import VerifyYourSelf from "../../common/popUps/verifyYourSelf";
import FreezeUser from "../../common/popUps/freezeUser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 0;
  width: 100%;
`;
const MidContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #161616;
  color: white;
  padding-bottom: ${(props) => props.active};
`;

const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 170px;
  align-items: center;
  /* padding-left: ${(props) => props.active}; */
`;

const FunctionalityDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 17.5%;
  padding-right: 17.5%;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #424242;
  border-radius: 10px;
  padding-left: 1%;
`;

const SearchIcon = styled.img`
  padding-left: 5px;
  width: 22px;
  height: 22px;
`;

const SearchInput = styled.input`
  height: 100%;
  background-color: #424242;
  border-radius: 10px;
  border-color: transparent !important;
  outline: 0px !important;
  color: white;
  font-size: 14px;
  font-weight: 100;
  padding-left: 7%;
  width: 260px;
  ::placeholder {
    color: white;
    font-weight: 100;
  }
`;

const MidTextContainer = styled.div`
  font-weight: 500;
  font-size: 24px;
  padding-left: ${(props) => props.active};
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(2px 2px 5px #0000000d);
  width: ${(props) => props.width};
  /* margin-left: 17.5%; */
  z-index: 2;
  position: absolute;
  top: ${(props) => props.active};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding};
`;

const LeftIconImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const MidAlignContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 150px;
  width: 832px;
`;

const FullWidthDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const RightFunctionDiv = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  padding-left: 20px;
  column-gap: 7px;
  flex-direction: row;
  justify-content: flex-end;
`;
const FirstorLastButton = styled.button`
  color: ${(props) => (props.background ? "#000000" : "#FFFFFF")};
  width: 76px;
  height: ${(props) => (props.background ? "30px" : "50px")};
  border-radius: ${(props) => (props.background ? "4px" : "6px")};
  background: ${(props) => (props.background ? props.background : "#161616")};
  border: ${(props) => (props.background ? "none" : "1px solid #414141")}; ;
`;
const RightorLeftArrow = styled.button`
  color: #ffffff;
  width: 37px;
  height: 50px;
  border-radius: 6px;
  background: #161616;
  border: 1px solid #414141;
`;

const PageStatus = styled.button`
  color: ${(props) => (props.background ? "#000000" : "#FFFFFF")};
  width: 122px;
  height: ${(props) => (props.background ? "30px" : "50px")};
  border-radius: ${(props) => (props.background ? "4px" : "6px")};
  background: ${(props) => (props.background ? props.background : "#161616")};
  border: ${(props) => (props.background ? "none" : "1px solid #414141")};
`;

const DropdownDiv = styled.div`
  display: flex;
  height: 50px;
  min-width: 116px;
  align-items: center;
  align-self: center;
  background-color: #424242;
  border-radius: 10px;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  white-space: nowrap;
  cursor: pointer;
  font: normal 400 14px/22px "Roboto";
`;
const SubDiv = styled.div`
  width: ${(props) => (props.active ? "151px" : "")};
  height: 33px;
  background: ${(props) => (props.active ? "#666666" : "transparent")};
  border-radius: 6px;
  font: normal 400 14px/22px "Roboto";
  display: flex;
  font-weight: 700;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  span {
    font-weight: 700;
  }
`;

const DropDownListDiv = styled.div`
  margin-top: -10px;
  position: absolute;
  width: 198px;
  height: 100%;
  min-height: 367px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 9px;
  z-index: 5;
  top: 110%;
  padding: 10px;
  padding-top: 0px !important;
`;
const DropContainer = styled.div`
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const DropDownHeading = styled.div`
  text-align: start;
  color: #898a8d;
  margin-top: 10px;
  font: normal 600 14px/22px "Roboto";
`;
const DropDownButtonPending = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e7e7e7;
  height: 25px;
  border-radius: 3px;
  padding-left: 10px;
  padding-top: 1px;
  margin-top: 7px;
  font: normal 400 14px/22px "Roboto";
  background-color: ${(props) => (props.show === "PENDING" ? "#50555c" : "")};
  color: ${(props) => (props.show === "PENDING" ? "white" : "#000000")};
  cursor: pointer;
  &:hover {
    background-color: #50555c;
    color: white;
  }
`;
const DropDownButtonPassed = styled.div`
  display: flex;
  align-items: center;
  font: normal 400 14px/22px "Roboto";
  border: 1px solid #e7e7e7;
  height: 25px;
  background-color: ${(props) => (props.show === "PASSED" ? "#50555c" : "")};
  color: ${(props) => (props.show === "PASSED" ? "white" : "#000000")};
  border-radius: 3px;
  padding-left: 10px;
  padding-top: 1px;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    background-color: #50555c;
    color: white;
  }
`;
const DropDownButtonFailed = styled.div`
  display: flex;
  align-items: center;
  font: normal 400 14px/22px "Roboto";
  border: 1px solid #e7e7e7;
  height: 25px;
  color: #000000;
  background-color: ${(props) => (props.show === "FAILED" ? "#50555c" : "")};
  color: ${(props) => (props.show === "FAILED" ? "white" : "#000000")};
  border-radius: 3px;
  padding-left: 10px;
  padding-top: 1px;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    background-color: #50555c;
    color: white;
  }
`;
const DropDownButtonAirdrop = styled.div`
  display: flex;
  align-items: center;
  font: normal 400 14px/22px "Roboto";
  border: 1px solid #e7e7e7;
  height: 25px;
  color: #000000;
  background-color: ${(props) => (props.show === "AIRDROP" ? "#50555c" : "")};
  color: ${(props) => (props.show === "AIRDROP" ? "white" : "#000000")};
  border-radius: 3px;
  padding-left: 10px;
  padding-top: 1px;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    background-color: #50555c;
    color: white;
  }
`;
const DropDownButtonMint = styled.div`
  display: flex;
  align-items: center;
  font: normal 400 14px/22px "Roboto";
  border: 1px solid #e7e7e7;
  height: 25px;
  color: #000000;
  background-color: ${(props) => (props.show === "MINT" ? "#50555c" : "")};
  color: ${(props) => (props.show === "MINT" ? "white" : "#000000")};
  border-radius: 3px;
  padding-left: 10px;
  padding-top: 1px;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    background-color: #50555c;
    color: white;
  }
`;
const DropDownButtonUnfreeze = styled.div`
  display: flex;
  align-items: center;
  font: normal 400 14px/22px "Roboto";
  border: 1px solid #e7e7e7;
  height: 25px;
  color: #000000;
  background-color: ${(props) => (props.show === "UNFREEZE" ? "#50555c" : "")};
  color: ${(props) => (props.show === "UNFREEZE" ? "white" : "#000000")};
  border-radius: 3px;
  padding-left: 10px;
  padding-top: 1px;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    background-color: #50555c;
    color: white;
  }
`;

const LeftFunctionDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  column-gap: 20px;
`;
const MidAlignContainerButton = styled.div`
  display: flex;
  align-items: center;
  color: #298fff;
  font: normal 600 12px/22px "Roboto";
  justify-content: center;
  cursor: pointer;
  height: 35px;
  display: flex;
  align-items: flex-end;
`;

export default function TransactionsOverview() {
  const [verifyModal, setVerifyModal] = useState(false);
  const [freezeModal, setFreezeModal] = useState(false);

  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const activeMenu = window.location.pathname;

  return (
    <Container>
      <Header />
      <MidContainer
        active={activeMenu.includes("gettr-transactions") ? "7%" : "9.25%"}
      >
        <LogoContainer
          active={activeMenu.includes("gettr-transactions") ? "42%" : "28%"}
        >
          <FullWidthDiv>
            <MidAlignContainer>
              {activeMenu.includes("transaction-details") && (
                <LeftIconImg
                  src="/images/left-arrow-icon.svg"
                  alt="arrow"
                  onClick={() => history.push("/dashboard/gettr-transactions")}
                />
              )}
              <MidTextContainer
                active={
                  activeMenu.includes("gettr-transactions") ? "0%" : "18%"
                }
              >
                {activeMenu.includes("gettr-transactions")
                  ? "GETTR Transactions"
                  : activeMenu.includes("transaction-details") &&
                    "Transaction Details"}
              </MidTextContainer>
            </MidAlignContainer>
          </FullWidthDiv>
        </LogoContainer>
        {activeMenu.includes("gettr-transactions") && (
          <FunctionalityDiv>
            <LeftFunctionDiv>
              <SearchDiv>
                <SearchIcon src="/images/search-icon.svg" alt="icon" />
                <SearchInput placeholder="Search" />
              </SearchDiv>
              <div style={{ position: "relative", textAlign: "center" }}>
                <DropdownDiv onClick={() => setDropdown(!dropdown)}>
                  Filter : &nbsp;
                  <SubDiv active={status !== "" || type !== ""}>
                    {status === "" && type === "" ? (
                      <span>None</span>
                    ) : status !== "" ? (
                      `Status : ${status.toUpperCase()}`
                    ) : (
                      `Type : ${type.toUpperCase()}`
                    )}
                    {(status !== "" || type !== "") && (
                      <img
                        onClick={() => {
                          setType("");
                          setStatus("");
                        }}
                        src="/images/dropCross.svg"
                      />
                    )}
                  </SubDiv>
                </DropdownDiv>
                {dropdown && (
                  <DropDownListDiv>
                    <DropContainer>
                      <DropDownHeading>Select Status</DropDownHeading>
                      <DropDownButtonPending
                        show={status}
                        onClick={() => {
                          setStatus("Pending");
                          setType("");
                        }}
                      >
                        PENDING
                      </DropDownButtonPending>
                      <DropDownButtonPassed
                        show={status}
                        onClick={() => {
                          setStatus("Passed");
                          setType("");
                        }}
                      >
                        PASSED
                      </DropDownButtonPassed>
                      <DropDownButtonFailed
                        show={status}
                        onClick={() => {
                          setStatus("Failed");
                          setType("");
                        }}
                      >
                        FAILED
                      </DropDownButtonFailed>
                      <DropDownHeading>Select Type</DropDownHeading>
                      <DropDownButtonAirdrop
                        show={type}
                        onClick={() => {
                          setType("Send");
                          setStatus("");
                        }}
                      >
                        Send
                      </DropDownButtonAirdrop>
                      <DropDownButtonMint
                        show={type}
                        onClick={() => {
                          setType("Redeem");
                          setStatus("");
                        }}
                      >
                        Redeem
                      </DropDownButtonMint>
                      <DropDownButtonUnfreeze
                        show={type}
                        onClick={() => {
                          setType("Reward");
                          setStatus("");
                        }}
                      >
                        Reward
                      </DropDownButtonUnfreeze>
                      <MidAlignContainerButton
                        onClick={() => setDropdown(false)}
                      >
                        Done
                      </MidAlignContainerButton>
                    </DropContainer>
                  </DropDownListDiv>
                )}
              </div>
            </LeftFunctionDiv>
            <RightFunctionDiv>
              <FirstorLastButton>First</FirstorLastButton>
              <RightorLeftArrow>
                <img src="/images/leftpage.svg" alt="/" />
              </RightorLeftArrow>
              <PageStatus>Page 1 of 40</PageStatus>
              <RightorLeftArrow>
                <img src="/images/rightpage.svg" alt="/" />
              </RightorLeftArrow>
              <FirstorLastButton>Last</FirstorLastButton>
            </RightFunctionDiv>
          </FunctionalityDiv>
        )}
      </MidContainer>
      <TableContainer
        active={activeMenu.includes("gettr-transactions") ? "280px" : "220px"}
        width={activeMenu.includes("transaction-details") ? "832px" : "65vw"}
        padding={activeMenu.includes("transaction-details") ? "32px 0" : ""}
      >
        {activeMenu.includes("gettr-transactions") && <GettrTransactions />}
        {activeMenu.includes("transaction-details") && (
          <TransactionDetails
            setVerifyModal={setVerifyModal}
            setFreezeModal={setFreezeModal}
          />
        )}
      </TableContainer>
      {verifyModal ? <VerifyYourSelf setVerifyModal={setVerifyModal} /> : null};
      {freezeModal ? (
        <FreezeUser
          setFreezeModal={setFreezeModal}
          setVerifyModal={setVerifyModal}
        />
      ) : null}
      ;
    </Container>
  );
}
