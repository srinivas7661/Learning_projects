import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../header";
import { history } from "../../managers/history";
import Mint from "../../common/popupScreens/mint";
import AirDrop from "../../common/popupScreens/airDrop";
import VerifyYourselfPopup from "../../common/popupScreens/verifyYourselfPopup";
import ProposalList from "../proposalList";
import ProposalDetails from "../proposalDetails";
import ManageTeam from "../manageTeam";
import AdminDetails from "../../common/popupScreens/adminDetails";
import utility from "../../utility";
import { ProposalService } from "../../services";
import UnblockUser from "../../common/popupScreens/unblockUser";
import AddAdmin from "../../common/popupScreens/addAdmin";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";

const MidContainer = styled.div`
  width: 100%;
  color: white;
  height: 380px;
  background-color: #161616;
`;

const MidSubContainer = styled.div`
  margin: auto;
  height: 280px;
  background-color: #161616;
`;
const FunctionalityDiv = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  margin: auto;
  margin-top: -150px;
  justify-content: space-between;
`;
const LeftFunctionDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  column-gap: 20px;
`;
const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  min-width: 349px;
  background-color: #424242;
  border-radius: 10px;
  padding-left: 15px;
  gap: 10px;
`;
const SearchIcon = styled.img`
  margin-left: 5px;
  width: 20px;
  height: 20px;
`;
const SearchInput = styled.input`
  height: 100%;
  background-color: #424242;
  border-radius: 10px;
  border-color: transparent !important;
  outline: 0px !important;
  color: white;
  font-size: 14px;
  font-weight: 400;
  width: 260px;
  ::placeholder {
    color: white;
    font-weight: 400;
  }
  &::-webkit-search-cancel-button {
    display: none;
  }
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
const RightFunctionDiv = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  padding-left: 20px;
  column-gap: 16px;
  flex-direction: row;
  justify-content: flex-end;
`;
const AdminButton = styled.button`
  width: 212px;
  height: 50px;
  background: #fc223b;
  border-radius: 10px;
  font: normal 600 16px/22px "Roboto";
  color: #ffffff;
  outline: none;
  border: none;
`;
const MintButton = styled.button`
  cursor: "pointer";
  display: ${(props) => (props.role === "ADMIN" ? `none` : "flex")};
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #ffa629;
  border-radius: 10px;
  /* padding-left: 2%;
  padding-right: 2%; */
  height: 50px;
  min-width: 150px;
  border: none;
  /* width: 100%; */
`;
const AirdropButton = styled.button`
  display: ${(props) => (props.role === "ADMIN" ? `none` : "flex")};
  align-items: center;
  gap: 12px;
  justify-content: center;
  border-radius: 10px;
  /* padding-left: 2%;
  padding-right: 2%; */
  height: 50px;
  /* width: 100%; */
  min-width: 150px;
  background-color: #fc223b;
  cursor: "pointer";
  border: none;
`;
const MintIcon = styled.img`
  height: 15px;
  width: 14px;
  margin-bottom: 3px;
`;
const MintText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font: normal 600 16px/22px "Roboto";
  color: white;
`;
const AirdropIcon = styled.img`
  height: 18px;
  width: 17px;
  margin-bottom: 5px;
`;
const AirdropText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font: normal 600 16px/22px "Roboto";
  color: white;
  cursor: pointer;
`;
const MidTextContainer = styled.div`
  font-weight: 700;
  text-align: center;
  font-size: 30px;
  padding-left: ${(props) => props.active};
  width: 100%;
  p {
    font: normal 400 14px/22px "Roboto";
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #ffffff;
    span {
      font-weight: 700;
    }
  }
`;
const TableContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(2px 2px 5px #0000000d);
  width: 80%;
  margin: auto;
  margin-top: 20px;
`;
const LeftIconImg = styled.img`
  width: 20px;
  height: 22px;
  cursor: pointer;
`;
const MidAlignContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const MidAlignContainerButton = styled.div`
  display: flex;
  align-items: center;
  color: #298fff;
  font: normal 600 14px/22px "Roboto";
  justify-content: center;
  cursor: pointer;
  height: 35px;
  display: flex;
  align-items: flex-end;
`;
const FullWidthDiv = styled.div`
  width: 80%;
  display: flex;
  margin: auto;
  justify-content: center;
  margin-top: 60px;
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
  height: 33px;
  border-radius: 6px;
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
  height: 33px;
  background-color: ${(props) => (props.show === "PASSED" ? "#50555c" : "")};
  color: ${(props) => (props.show === "PASSED" ? "white" : "#000000")};
  border-radius: 6px;
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
  height: 33px;
  color: #000000;
  background-color: ${(props) => (props.show === "FAILED" ? "#50555c" : "")};
  color: ${(props) => (props.show === "FAILED" ? "white" : "#000000")};
  border-radius: 6px;
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
  height: 33px;
  color: #000000;
  background-color: ${(props) => (props.show === "AIRDROP" ? "#50555c" : "")};
  color: ${(props) => (props.show === "AIRDROP" ? "white" : "#000000")};
  border-radius: 5px;
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
  height: 33px;
  color: #000000;
  background-color: ${(props) => (props.show === "MINT" ? "#50555c" : "")};
  color: ${(props) => (props.show === "MINT" ? "white" : "#000000")};
  border-radius: 6px;
  padding-left: 10px;
  padding-top: 1px;
  margin-top: 7px;
  cursor: pointer;
  &:hover {
    background-color: #50555c;
    color: white;
  }
`;
// const DropDownButtonUnfreeze = styled.div`
//   display: flex;
//   align-items: center;
//   font: normal 400 14px/22px "Roboto";
//   border: 1px solid #e7e7e7;
//   height: 33px;
//   color: #000000;
//   background-color: ${(props) => (props.show === "UNFREEZE" ? "#50555c" : "")};
//   color: ${(props) => (props.show === "UNFREEZE" ? "white" : "#000000")};
//   border-radius: 6px;
//   padding-left: 10px;
//   padding-top: 1px;
//   margin-top: 7px;
//   cursor: pointer;
//   &:hover {
//     background-color: #50555c;
//     color: white;
//   }
// `;

const ParentContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
`;
function GovernanceOverview(props) {
  const [detailsModal, setDetailsModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [eachAdminDetails, setEachAdminDetails] = useState({});
  const [activeSuperAdminCount, setActiveSuperAdminCount] = useState(0);

  const [mintModal, setMintModal] = useState({
    mint: false,
    airDrop: false,
    unblockUser: false,
    verifyYourself: false,
  });
  const [verifyLoader, setVerifyLoader] = useState(false);

  const [addVotePasscode, setaddVotePasscode] = useState(new Array(6).fill(""));
  const [addVoteApiCall, setAddVoteApiCall] = useState(false);
  const AddVoteToProposal = (value) => {
    setAddVoteApiCall(value);
  };
  const activeMenu = window.location.pathname;
  const [dropdown, setDropdown] = useState(false);
  const [proposalSearchValue, setProposalSearchValue] = useState("");
  const [teamSearchValue, setTeamSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gtrBalance, setGtrBalance] = useState(0);
  const requestProposal = async (requestData) => {
    let [error, response] = await utility.parseResponse(
      ProposalService.createProposal(requestData)
    );
    if (requestData?.airdrops?.length === 0) {
      return utility.apiFailureToast("File is empty, upload another file ");
    }
    if (error || !response.data) {
      return utility.apiFailureToast("Proposal creation failed");
    }
    utility.apiSuccessToast(requestData.successMessage);
  };
  const getBalance = async () => {
    let [error, response] = await utility.parseResponse(
      ProposalService.GTRBalance()
    );
    if (error || !response.balance) {
      return utility.apiFailureToast("failed to fetch balance");
    }
    setGtrBalance(parseInt(response.balance));
  };
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <>
      {sessionStorage.getItem("url") &&
        sessionStorage.getItem("accessToken") && (
          <ParentContainer>
            <Header state={history?.location?.state} />
            <MidContainer active={activeMenu.includes("overview") ? "" : ""}>
              <MidSubContainer>
                <FullWidthDiv>
                  <MidAlignContainer>
                    {(activeMenu.includes("proposal-details") ||
                      activeMenu.includes("team")) && (
                      <LeftIconImg
                        src="/images/left-arrow-icon.svg"
                        alt="arrow"
                        onClick={() => history.push("/dashboard/overview")}
                      />
                    )}
                    <MidTextContainer>
                      <div
                        style={{
                          marginLeft: activeMenu.includes("proposal-details")
                            ? "auto"
                            : "",
                        }}
                      >
                        {activeMenu.includes("overview") &&
                          "Governance Overview"}
                        {activeMenu.includes("proposal-details") &&
                          "Proposal Details"}
                        {activeMenu.includes("team") && "Manage Team"}
                      </div>
                      {activeMenu.includes("overview") && (
                        <p>
                          Available Balance for Airdrop : &nbsp;
                          <span>{gtrBalance} GTR</span>
                        </p>
                      )}
                    </MidTextContainer>
                  </MidAlignContainer>
                </FullWidthDiv>

                <Mint
                  mintModal={mintModal.mint}
                  setMintModal={setMintModal}
                  requestProposal={requestProposal}
                  marginTop={"83px"}
                />
                <AirDrop
                  mintModal={mintModal.airDrop}
                  setMintModal={setMintModal}
                  requestProposal={requestProposal}
                  marginTop={"83px"}
                />
                <UnblockUser
                  mintModal={mintModal.unblockUser}
                  setMintModal={setMintModal}
                  marginTop={"83px"}
                />
                <VerifyYourselfPopup
                  mintModal={mintModal.verifyYourself}
                  setMintModal={setMintModal}
                  addVotePasscode={addVotePasscode}
                  setaddVotePasscode={setaddVotePasscode}
                  AddVoteToProposal={AddVoteToProposal}
                  verifyLoader={verifyLoader}
                  marginTop={"83px"}
                />
                {detailsModal ? (
                  <AdminDetails
                    open={detailsModal}
                    setModal={setDetailsModal}
                    eachAdminDetails={eachAdminDetails}
                    activeSuperAdminCount={activeSuperAdminCount}
                    removeAdmin={requestProposal}
                  />
                ) : null}
                {adminModal ? (
                  <AddAdmin
                    open={adminModal}
                    setModal={setAdminModal}
                    addAdminDetails={requestProposal}
                  />
                ) : null}
              </MidSubContainer>
              <FunctionalityDiv>
                {(activeMenu.includes("overview") ||
                  activeMenu.includes("team")) && (
                  <>
                    <LeftFunctionDiv>
                      <SearchDiv>
                        <SearchIcon src="/images/search-icon.svg" alt="icon" />
                        {activeMenu.includes("overview") ? (
                          <div>
                            <SearchInput
                              type="search"
                              placeholder="Search"
                              value={proposalSearchValue}
                              onChange={(e) =>
                                setProposalSearchValue(e.target.value)
                              }
                            />
                            {proposalSearchValue !== "" && (
                              <img
                                src="/images/dropCross.svg"
                                alt="/cancel"
                                onClick={() => setProposalSearchValue("")}
                              />
                            )}
                          </div>
                        ) : (
                          <div>
                            <SearchInput
                              type="search"
                              placeholder="Search"
                              value={teamSearchValue}
                              onChange={(e) =>
                                setTeamSearchValue(e.target.value)
                              }
                            />
                            {teamSearchValue !== "" && (
                              <img
                                src="/images/dropCross.svg"
                                alt="/cancel"
                                onClick={() => setTeamSearchValue("")}
                              />
                            )}
                          </div>
                        )}
                      </SearchDiv>
                      {activeMenu.includes("overview") && (
                        <div
                          style={{
                            position: "relative",
                            textAlign: "center",
                          }}
                        >
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
                                  alt="close"
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
                                    setType("Airdrop");
                                    setStatus("");
                                  }}
                                >
                                  Airdrop
                                </DropDownButtonAirdrop>
                                <DropDownButtonMint
                                  show={type}
                                  onClick={() => {
                                    setType("Mint");
                                    setStatus("");
                                  }}
                                >
                                  Mint
                                </DropDownButtonMint>
                                {/* <DropDownButtonUnfreeze
                                  show={type}
                                  onClick={() => {
                                    setType("Unfreeze");
                                    setStatus("");
                                  }}
                                >
                                  Unfreeze
                                </DropDownButtonUnfreeze> */}
                                <MidAlignContainerButton
                                  onClick={() => setDropdown(false)}
                                >
                                  Done
                                </MidAlignContainerButton>
                              </DropContainer>
                            </DropDownListDiv>
                          )}
                        </div>
                      )}
                    </LeftFunctionDiv>
                    {activeMenu.includes("overview") && (
                      <RightFunctionDiv>
                        <MintButton
                          role={props.user.userRole}
                          onClick={() =>
                            setMintModal((pre) => ({ ...pre, mint: true }))
                          }
                        >
                          <MintIcon src="/images/mint-icon.svg" alt="mint" />
                          <MintText>Mint</MintText>
                        </MintButton>
                        <AirdropButton
                          role={props.user.userRole}
                          onClick={() =>
                            setMintModal((pre) => ({
                              ...pre,
                              airDrop: true,
                            }))
                          }
                        >
                          <AirdropIcon
                            src="/images/airdrop-icon.svg"
                            alt="airdrop"
                          />
                          <AirdropText>Airdrop</AirdropText>
                        </AirdropButton>
                      </RightFunctionDiv>
                    )}
                    {activeMenu.includes("team") && (
                      <RightFunctionDiv>
                        <AdminButton
                          onClick={() => {
                            setAdminModal(true);
                          }}
                        >
                          Add Admin
                        </AdminButton>
                      </RightFunctionDiv>
                    )}
                  </>
                )}
              </FunctionalityDiv>

              <TableContainer
                active={
                  activeMenu.includes("overview") || activeMenu.includes("team")
                    ? "280px"
                    : "220px"
                }
              >
                {activeMenu.includes("overview") && (
                  <ProposalList
                    setAddVoteApiCall={setAddVoteApiCall}
                    searchValue={proposalSearchValue}
                    status={status}
                    type={type}
                    dropdown={dropdown}
                  />
                )}
                {activeMenu.includes("proposal-details") && (
                  <ProposalDetails
                    addVoteApiCall={addVoteApiCall}
                    setAddVoteApiCall={setAddVoteApiCall}
                    addVotePasscode={addVotePasscode}
                    popupModal={setMintModal}
                    setVerifyLoader={setVerifyLoader}
                    verifyLoader={verifyLoader}
                  />
                )}
                {activeMenu.includes("team") && (
                  <ManageTeam
                    setDetailsModal={setDetailsModal}
                    setAdminModal={setAdminModal}
                    detailsAdmin={setEachAdminDetails}
                    setActiveSuperAdminCount={setActiveSuperAdminCount}
                    searchValue={teamSearchValue}
                  />
                )}
              </TableContainer>
            </MidContainer>
          </ParentContainer>
        )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(GovernanceOverview);
