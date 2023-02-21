import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../managers/history";
import { useParams } from "react-router-dom";
import Utills from "../../utility";
import { ProposalService } from "../../services";
import moment from "moment";
import utility from "../../utility";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { userConstants } from "../../constants";
import { Loader } from "../../common/components/components";
import { proposalTypes, status, votesStatus } from "../../constants";
import md5 from "md5";
import { CSVLink } from "react-csv";

const ProposalsList = styled.div`
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  width: 100%;
`;

const ProposalNameContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled.div`
  font: normal 700 25px/22px "Roboto";
  display: flex;
  align-items: center;
  color: #000000;
`;
const Timer = styled.div`
  font: normal 400 14px/22px "Roboto";
  color: #000000;
  display: flex;
  align-items: center;
  height: 22px;
  background: #f3f3f3;
  margin-top: 10px;
  border-radius: 6px;
  padding: 0px 8px 0px 8px;
  span {
    font-weight: 600;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
`;
const ConfirmButton = styled.button`
  width: 138px;
  height: 44px;
  background: ${(props) => (props.color ? props.color : "#03BD64")};
  border-radius: 10px;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.3 : "")};
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const ProposalDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px;
  gap: 30px;
  div {
    h1 {
      font: normal 600 14px/22px "Roboto";
      display: flex;
      align-items: center;
      color: #50555c;
    }
    p {
      font: normal 400 24px/22px "Roboto";
      display: flex;
      align-items: center;
      color: #000000;
      align-items: flex-end;
      span {
        font: normal 400 14px/16px "Roboto";
      }
    }
  }
`;
const Hrline = styled.hr`
  border: 1px solid #e7e7e7;
  border-radius: 1px;
  margin-top: 10px !important;
`;
const Status = styled.div`
  font: normal 400 14px/22px var(--root-font);
  color: ${(props) =>
    props.status === "PENDING"
      ? "#FFA629"
      : props.status === status.PASSED.name
      ? "#03bd64"
      : "#FC223B"};
  padding: 0 10px 0 6px;
  display: flex;
  max-width: 95px;
  align-items: center;
  gap: 6px;
  height: 24px;
  background: ${(props) =>
    props.status === "PENDING"
      ? "#FFEBCF"
      : props.status === status.PASSED.name
      ? "#03bd6424"
      : "#FFE0E4"};
  border-radius: 4px;
`;
const VotesTitle = styled.div`
  font: normal 700 20px/22px "Roboto";
  display: flex;
  align-items: center;
  letter-spacing: -0.408px;
  color: #1e1e1e;
  padding: 25px;
`;

const TableAndVotesContainer = styled.div`
  padding: 0px 25px 0px 25px;
  display: flex;
  flex-direction: row;
`;

const VotesTable = styled.table`
  padding: 5px;
  width: 75%;
  height: 100%;
  tbody {
    tr {
      border-bottom: 1px solid #e7e7e7;
      border-radius: 1px;
      th {
        font: normal 700 14px/22px "Roboto";
        letter-spacing: -0.408px;
        color: #50555c;
        padding: 18px;
      }
      td {
        font: normal 400 14px/22px "Roboto";
        color: #000000;
        padding: 18px;
      }
    }
  }
`;
const VotesStatus = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 39px;
  padding: 20px 0px 0px 60px;
  /* border: 1px solid #E7E7E7; */
  border-radius: 1px;
  border-left: 1px solid #e7e7e7;
  margin-left: 70px;
`;
const Heading = styled.div`
  font: normal 600 14px/22px "Roboto";
  color: #50555c;
`;
const StatusContainer = styled.div`
  font: normal 600 14px/22px "Roboto";
  display: flex;
  flex-direction: column;
  align-items: left;
  color: ${(props) => props.color};
  gap: 11px;
  p {
    font-weight: 700;
    font-size: 34px;
    display: flex;
    align-items: left;
  }
`;
const LoaderDiv = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 550px;
  margin-left: auto;
  margin-right: auto;
`;
function ProposalDetails(props) {
  const user = JSON.parse(sessionStorage.getItem(userConstants.USER_DETAILS))
    .profile.email;
  const { id } = useParams();
  const [apiData, setApiData] = useState({});

  const [disableButton, setDisableButton] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loader, setLoader] = useState(true);
  const [addVoteReqData, setAddVoteReqData] = useState({});
  const [data, setData] = useState([]);

  const setRequestData = async ({ isAccepted }) => {
    let reqObj = {
      proposal: id,
      voter: user,
      isAccepted: isAccepted,
      role: props.user.userRole,
      passcode: utility.encryptData(md5(props.addVotePasscode.join(""))),
    };
    setAddVoteReqData(reqObj);
    return reqObj;
  };

  const handleClose = () => {
    props.popupModal((pre) => ({ ...pre, verifyYourself: false }));
  };

  useEffect(() => {
    if (props.addVoteApiCall) {
      approvingProposal(addVoteReqData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.addVoteApiCall]);
  useEffect(() => {
    setAddVoteReqData((pre) => ({
      ...pre,
      passcode: utility.encryptData(md5(props.addVotePasscode.join(""))),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.addVotePasscode.join("").length, id]);

  const approvingProposal = async (reqObj) => {
    props.setVerifyLoader(true);
    let [error, response] = await Utills.parseResponse(
      ProposalService.addVote(reqObj)
    );
    props.setAddVoteApiCall(false);
    if (error || !response?.data) {
      props.setVerifyLoader(false);
      handleClose();
      return utility.apiFailureToast("Couldn't post your vote");
    } else {
      utility.apiSuccessToast(
        reqObj.isAccepted === true
          ? "Request has been approved"
          : "Request has been rejected"
      );
    }
    props.setVerifyLoader(false);
    handleClose();
    history.push("/dashboard/overview");
  };

  const getProposalDetails = async () => {
    let [error, response] = await Utills.parseResponse(
      ProposalService.getProposalWithVotes(
        id,
        JSON.parse(sessionStorage.getItem(userConstants.USER_DETAILS)).profile
          .email
      )
    );
    if (error || !response) {
      setApiData({});
    } else {
      setApiData(response.data);
    }
    response.data?.voted ||
    response.data?.proposal?.data?.status === status.PASSED.name
      ? setDisableButton(true)
      : setDisableButton(false);
    setLoader(false);
  };

  function getTimer(endTime) {
    const timeInMillis = endTime > Date.now() ? endTime - Date.now() : 0;
    const days = Math.floor(timeInMillis / 86400000);
    const hours = Math.floor((timeInMillis % (1000 * 60 * 60 * 24)) / 3600000);
    const minutes = Math.floor((timeInMillis % 3600000) / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    if (days > 0) {
      return `${days > 1 ? `${days} days` : `${days} day`} ${
        hours > 9 ? hours : `0${hours}`
      }:${minutes > 9 ? minutes : `0${minutes}`}:${
        seconds > 9 ? seconds : `0${seconds}`
      }`;
    } else {
      return `${hours > 9 ? hours : `0${hours}`}:${
        minutes > 9 ? minutes : `0${minutes}`
      }:${seconds > 9 ? seconds : `0${seconds}`}`;
    }
  }
  useEffect(() => {
    getProposalDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let csvData = [
      {
        gettrId: "",
        amount: "",
      },
    ];
    if (apiData?.proposal?.data?.airdrops?.length > 0) {
      csvData = apiData?.proposal?.data?.airdrops?.map((item) => ({
        gettrId: item.gettrId,
        amount: item.amount,
      }));
    }
    setData(csvData);
    const intervalId = setInterval(() => {
      const timeRemaining = getTimer(apiData?.proposal?.data?.endTime);
      if (timeRemaining === `00:00:00`) {
        setDisableButton(true);
        clearInterval(intervalId);
      }
      setTimer(timeRemaining);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [apiData]);

  const textFilter = (string) => {
    let oldString = string;
    let strArr = oldString.split("_");
    for (let i = 0; i < strArr.length; i++) {
      strArr[i] =
        strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1).toLowerCase();
    }
    let newStr = strArr.join(" ");
    return newStr;
  };

  return (
    <>
      {loader ? (
        <LoaderDiv>
          <Loader />
        </LoaderDiv>
      ) : (
        <ProposalsList>
          <ProposalNameContainer>
            <Name>
              {apiData?.proposal?.data?.type &&
                (apiData.proposal.data.type === proposalTypes.MINT.value ||
                apiData.proposal.data.type === proposalTypes.AIRDROP.value
                  ? textFilter(apiData.proposal.data.type) +
                    ` ${apiData.proposal.data.amount}` +
                    " GTR"
                  : apiData.proposal.data.type === proposalTypes.UNFREEZE.value
                  ? textFilter(apiData.proposal.data.type) +
                    " @ " +
                    apiData.proposal.data.account
                  : textFilter(apiData.proposal.data.type))}
            </Name>
            <Timer>
              Time Remaining :&nbsp; <span>{timer}</span>
            </Timer>
            <ButtonsContainer>
              <ConfirmButton
                disabled={disableButton}
                onClick={() => {
                  setRequestData({ isAccepted: true });
                  props.popupModal((pre) => ({ ...pre, verifyYourself: true }));
                }}
              >
                <div>Approve</div>
                <img src="/images/approveTick.svg" alt="/" />
              </ConfirmButton>
              <ConfirmButton
                disabled={disableButton}
                onClick={() => {
                  setRequestData({ isAccepted: false });
                  props.popupModal((pre) => ({ ...pre, verifyYourself: true }));
                }}
                color="#FC223B"
              >
                <div>Reject</div>
                <img src="/images/rejectCross.svg" alt="/" />
              </ConfirmButton>
            </ButtonsContainer>
          </ProposalNameContainer>
          <ProposalDetailsContainer>
            <div>
              <h1>
                {apiData?.proposal?.data?.type ===
                  proposalTypes.ADD_SUPER_ADMIN.value ||
                apiData?.proposal?.data?.type ===
                  proposalTypes.ADD_SUB_ADMIN.value
                  ? "User"
                  : "Amount"}
              </h1>
              {apiData?.proposal?.data?.type ===
                proposalTypes.ADD_SUPER_ADMIN.value ||
              apiData?.proposal?.data?.type ===
                proposalTypes.ADD_SUB_ADMIN.value ? (
                <p>{apiData?.proposal?.data?.user?.name || "user name"}</p>
              ) : (
                <p>
                  {apiData?.proposal?.data?.amount}&nbsp; <span>GTR</span>
                </p>
              )}
            </div>
            <div>
              <h1>Status</h1>
              <Status status={apiData.proposal?.data?.status}>
                <img
                  src={
                    apiData.proposal?.data?.status === status.PASSED.name
                      ? "/images/success-icon.svg"
                      : apiData.proposal?.data?.status === status.FAILED.name
                      ? "/images/failed-icon.svg"
                      : "/images/alert-triangle.svg"
                  }
                  alt="/"
                />
                {apiData.proposal?.data?.status.charAt(0) +
                  apiData?.proposal?.data?.status.slice(1).toLowerCase()}
              </Status>
            </div>
            <div>
              <h1>Created By</h1>
              <p>
                {apiData?.proposal?.data?.createdBy?.name ||
                  apiData?.proposal?.data?.createdBy?.gettrId}
              </p>
            </div>
            <div>
              <h1>Created On</h1>
              <p>
                {moment(apiData?.proposal?.data?.addedOn)
                  .local()
                  .format("DD MMM YYYY ")}
                at
                {moment(apiData?.proposal?.data?.addedOn)
                  .local()
                  .format(" hh:mm A")}
              </p>
            </div>
            <CSVLink
              filename={`Airdrop_${apiData?.proposal?.data?.amount}.csv`}
              className={"downloadCSV"}
              style={{
                display:
                  apiData?.proposal?.data?.type !== proposalTypes.AIRDROP.value
                    ? "none"
                    : "",
              }}
              data={data}
            >
              Download CSV
            </CSVLink>
          </ProposalDetailsContainer>
          <Hrline />
          <VotesTitle>Votes</VotesTitle>
          <TableAndVotesContainer>
            <VotesTable>
              <tbody>
                <tr>
                  <th>Admin Name</th>
                  <th>Voting Date and Time</th>
                  <th>Response</th>
                </tr>
                {apiData.votes &&
                  apiData.votes.map((data) => (
                    <tr>
                      <td>{data?.voter?.name || "gettr user"}</td>
                      <td>
                        {moment(data?.addedOn).local().format("DD MMM YYYY ")}
                        at
                        {moment(data?.addedOn).local().format(" hh:mm A")}
                      </td>
                      <td>
                        {data?.isAccepted === true
                          ? votesStatus.APPROVED
                          : votesStatus.REJECTED}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </VotesTable>
            <VotesStatus>
              <Heading>Votes</Heading>
              <StatusContainer color="#03BD64">
                <div>{votesStatus.APPROVED}</div>
                <p>{apiData?.stats?.accepted || 0}</p>
              </StatusContainer>
              <StatusContainer color="#FC223B">
                <div>{votesStatus.REJECTED}</div>
                <p>{apiData.stats?.rejected || 0}</p>
              </StatusContainer>
              <StatusContainer color="#898A8D">
                <div>{votesStatus.PENDING}</div>
                <p>{apiData.stats?.pending || 0}</p>
              </StatusContainer>
            </VotesStatus>
          </TableAndVotesContainer>
        </ProposalsList>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(ProposalDetails);
