import React from "react";
import { history } from "../../managers/history";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Row, Column } from "simple-flexbox";
import styled from "styled-components";
import { useHistory } from "react-router";
import AdminModule from "../../services/adminMicroService";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { connect } from "react-redux";
import { ContentService } from "../../services";
import {
  apiFailureConstants,
  apiSuccessConstants,
  credsConstants,
} from "../../constants";
import Utils from "../../utility";
import useWindowDimensions from "../../common/windowDimensions";

const ChangeText = styled.div`
  text-align: left;
  font: normal normal bold 18px/22px Barlow;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
  @media (max-width: 767px) {
    margin: 16px 0;
  }
`;
const BackImg = styled.img`
  cursor: pointer;
`;
const PaymentDetails = styled.div`
  text-align: left;
  font: normal normal 600 16px/19px Barlow;
  color: #151e58;
  opacity: 1;
  margin: 18px 0 0 40px;
`;

const ApproveBtn = styled.button`
  width: 99px;
  height: 34px;
  background-color: #6874e8;
  border: none;
  border-radius: 4px;
  margin-right: 26px;
  color: #ffffff;
  @media (max-width: 767px) {
    width: 140px;
  }
`;

const RejectBtn = styled.button`
  width: 99px;
  height: 34px;
  background-color: #fc4c4c;
  border: none;
  border-radius: 4px;
  margin-right: 26px;
  color: #ffffff;
  @media (max-width: 767px) {
    width: 140px;
  }
`;

const VerifyBtn = styled.button`
  width: 99px;
  height: 34px;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: #ffffff;
  border: none;
  cursor: pointer;
  margin: 20px 0 0 20px;
`;

const Donebtn = styled.button`
  width: 85px;
  height: 34px;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  text-align: center;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  border: none;
  color: #ffffff;
  justify-content: flex-end;
`;

const InputText = styled.div`
  width: 456px;
  height: 38px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  margin-top: 10px;
  @media (max-width: 767px) {
    width: unset;
    margin: 24px 16px;
  }
`;
const BoxDiv = styled.span`
  display: flex;
  flex-direction: column;
`;
const HeadText = styled.div`
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  color: #151e58;
  opacity: 1;
`;
const ErrorSpan = styled.span`
  color: red;
  padding-bottom: 10px;
`;
const InputBox = styled.input`
  width: 456px;
  height: 34px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  border: none;
  opacity: 1;
  margin: 10px 0 3px 0;
  padding-left: 10px;
  @media (max-width: 767px) {
    width: unset;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
`;

const Header = styled.span`
  color: #151e58;
  font: normal 600 22px Inter;
  margin-bottom: none;
  padding-left: 18px;
  padding-bottom: 5px;
`;
const RequestDiv = styled.p`
  padding-top: 15px;
  color: #b1b1b2;
  @media (max-width: 767px) {
    padding-top: 0px;
    font: normal normal 10px/12px Barlow;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    padding-top: 5px;
    font: normal normal 10px/12px Barlow;
  }
`;

const LineDiv = styled.div`
  @media (max-width: 767px) {
    display: flex;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
  }
`;
const DottedDiv = styled.div`
  @media (max-width: 767px) {
    align-self: center;
    width: 100%;
    border: 1px dashed #707070;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    align-self: center;
    width: 100%;
    border: 1px dashed #707070;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
  }
`;
const DottedDivColor = styled.div`
  @media (max-width: 767px) {
    align-self: center;
    width: 100%;
    border: 1px solid #6a6afa;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    align-self: center;
    width: 100%;
    border: 1px solid #6a6afa;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
  }
`;
const LineImg = styled.img`
  width: 100%;
`;
const DottedDivPayment = styled.div`
  @media (max-width: 767px) {
    align-self: center;
    width: 100%;
    border: 1px dashed #707070;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    align-self: center;
    width: 100%;
    border: 1px dashed #707070;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
    margin: 0 0 18px 0;
  }
`;
const DottedDivColorPayment = styled.div`
  @media (max-width: 767px) {
    align-self: center;
    width: 100%;
    border: 1px solid #6a6afa;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    align-self: center;
    width: 100%;
    border: 1px solid #6a6afa;
    transform: matrix(1, 0, 0, 1, 0, -2);
    height: 0px;
    margin: 0 0 18px 0;
  }
`;
const BackIcon = styled.div`
  margin: 15px 18px;
`;
const BackIconImg = styled.img`
  width: 13px;
  height: 13px;
`;
const ColumnNew = styled(Column)`
  @media (max-width: 767px) {
    background: #ffffff;
    padding: 16px;
  }
`;
const DonebtnHead = styled.div`
  margin-top: 25px;
  margin-left: auto;

  @media (max-width: 767px) {
    margin: 0 16px 26px auto;
  }
`;
const TransationBtn = styled.div`
display: flex;
margin-top: 16px;
padding-left: 24px;
@media (min-width:768px) and (max-width:1024px){
  padding-left: 38px;
}
@media (min-width:1441px){
  padding-left: 40px;
}
`
 
// const handleChangePage = () => {
//   history.push("/dashboard/tokens-list/requested-tokens");
// };

function TokenDetails(props) {
  let adminAddress = props.wallet.userAddress.userAddress || "";
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [token, setToken] = React.useState([]);
  const [approve, setApprove] = React.useState([]);
  const [comments, setComments] = React.useState("");
  const [isVerified, setVerified] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };
  const [dialogopen, setDialogOpen] = React.useState(false);
  const handleClickToOpenReject = () => {
    setDialogOpen(true);
  };

  const handleClickToCloseReject = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    if (props.updateDetails?.isPaymentPending === false) {
      setVerified(true);
    }
  }, [props]);

  React.useEffect(() => {
    getTokendata();
  }, []);

  const successfullySent = () =>
    toast.success(apiSuccessConstants.MAIL_SENT, {
      duration: 3000,
      position: apiSuccessConstants.TOASTS_POSITION,
      className: "toast-div-address",
    });

  const tokenRemoved = () =>
    toast.success("Token Succesfully Removed", {
      duration: 3000,
      position: apiSuccessConstants.TOASTS_POSITION,
      className: "toast-div-address",
    });

    const notVerified = () =>{
      Utils.apiFailureToast(apiFailureConstants.WRONG_CONTRACT_ADDRESS);
    }
  
  const getTokendata = async () => {
    try {
      const response = await AdminModule.getToken(props.updateDetails._id);
      if (response) {
        setToken(response);
      }
    } catch (e) {
      setToken("");
    }
  };

  const approveRejectToken = async (id) => {
    try {
      const request = {
        _id: id,
      };
      const response = await AdminModule.approveRejectToken(request);
    } catch (e) {
      return;
    }
  };

  const sendMailToUser = async () => {
    try {
      let data = {
        to: token?.email || "",
        from: credsConstants.SENDER_EMAIL_ADDRESS,
        subject: credsConstants.VERIFY_SUBJECT,
        title: credsConstants.TEXT_TYPE,
        text: credsConstants.TEXT_TYPE,
        tokenId: token?._id || "",
        walletId: adminAddress || "",
        amount: Number(amount) || 0,
        currency: credsConstants.CURRENCY_TYPE_BNB,
        sentFromEmail: credsConstants.SENDER_EMAIL_ADDRESS,
        postedBy: credsConstants.SENDER_EMAIL_ADDRESS,
        postedTo: token?.email || "",
      };
      const res = await ContentService.transactionDetailsService(data);
      if (res === true) {
        approveRejectToken(token?._id || "");
        successfullySent();
        setOpen(false);
      }
    } catch (error) {
      return;
    }
  };

  const sendTransactionDetails = () => {
    if (amount?.length === 0 || adminAddress?.length === 0) {
      Utils.apiFailureToast(apiFailureConstants.SOMETHING_WENT_WRONG);
    } else {
      sendMailToUser();
    }
  };

  const tokenRejection = async (id) => {
    try {
      let data = {
        _id: id,
        comment: comments,
      };
      const res = await AdminModule.rejectTokens(data);
      if (res) {
        setDialogOpen(false);
        history.push("/dashboard/tokens-list/rejected-tokens");
      }
    } catch (error) {
      return;
    }
  };

  const verifyToken = async (id) => {
    try {
      let data = {
        tokenId: id,
      };
      const res = await AdminModule.verifyTokens(data);
      if (res) {
        setVerified(true);
      }
    } catch (error) {
      notVerified();
      return;
    }
  };

  const removeTokenFromList = async (id) => {
    try {
      const res = await AdminModule.removeToken(id);
      if (res) {
        redirectPage();
        tokenRemoved();
      }
    } catch (error) {
      return;
    }
  };

  const redirectPage = () => {
    props.openReviewNft(false);
    window.location.reload();
  }

  return (
    <div className="p-r-79 p-l-71 details-padding-40 tb-pd-20">
      <div>
        <Toaster />
      </div>
      <div>
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <BackImg
              onClick={redirectPage}
              src="/images/back.svg"
            />
            <Header>Token Details</Header>
          </div>
          <div className="main-container tab-main-reverse">
            <div className="table-container tab-width-details">
              <table class="content-table mb-table-margin-10">
                <tbody className="table-body">
                  <tr>
                    <td className="card-title c-p mb-width-table">
                      Token name:
                    </td>
                    <td className="fc-535877 mb-word-break">
                      {token?.tokenName || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="card-title c-p mb-width-table">
                      Token symbol:
                    </td>
                    <td className="fc-535877 mb-word-break">
                      {token?.tokenSymbol || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="card-title c-p mb-width-table">Contract:</td>
                    <td className="fc-535877 mb-word-break">
                      {token?.tokenAddress || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="card-title c-p mb-width-table">
                      Contact person:
                    </td>
                    <td className="fc-535877 mb-word-break">
                      {token?.contactPerson || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="card-title c-p mb-width-table">Email:</td>
                    <td className="fc-535877 mb-word-break">
                      {token?.email || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="card-title c-p mb-width-table">Phone:</td>
                    <td className="fc-535877 mb-word-break">
                      {token?.phone || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="card-title c-p mb-width-table">Comment:</td>
                    <td className="fc-535877 mb-word-break">
                      {token?.comment || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
              {props.updateDetails?.isApproved === true ? (
                ""
              ) : (
                <TransationBtn>
                  <RejectBtn onClick={handleClickToOpenReject}>
                    Reject
                  </RejectBtn>
                  <ApproveBtn onClick={handleClickToOpen}>Approve</ApproveBtn>
                </TransationBtn>
              )}
              <br />
              {token?.transactionDetails?.transactionId?.length > 0 ? (
                <>
                  <PaymentDetails>Payment Details</PaymentDetails>
                  <table class="content-table mb-table-margin-10">
                    <tbody className="table-body">
                      <tr>
                        <td className="card-title c-p mb-width-table">
                          Transaction Id:
                        </td>
                        <td className="fc-535877 mb-word-break">
                          {token?.transactionDetails?.transactionId || ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="card-title c-p mb-width-table">
                          Transaction Amount:
                        </td>
                        <td className="fc-535877 mb-word-break">
                          {token?.transactionDetails?.transactionAmount || ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="card-title c-p mb-width-table">
                          Transaction date and time:
                        </td>
                        <td className="fc-535877 mb-word-break">
                          {token?.transactionDetails?.transactionDateAndTime ||
                            ""}
                        </td>
                      </tr>

                      {isVerified === true ? (
                        <div className="button-container">
                          <button
                            onClick={() => removeTokenFromList(token._id)}
                            className="rm-button"
                          >
                            Remove Token
                          </button>
                        </div>
                      ) : (
                        <VerifyBtn onClick={() => verifyToken(token._id)}>
                          Verify
                        </VerifyBtn>
                      )}
                    </tbody>
                  </table>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="sub-container sub-padding tab-width-100 tab-view-flex">
              <h1 className="status-heading status-heading-tab fs-14-barlow-mb">
                Status
              </h1>
              <div className="approval-container first-container tab-approval">
                <LineDiv>
                  <img
                    className="approval-image approval-tab-img margin-tab-app"
                    src="/images/Request received.svg"
                  />

                  {props.updateDetails?.isApproved === true ? (
                    <DottedDivColor>
                      {width > 1024 && (
                        <img
                          className="line-image"
                          src="/images/colored lines.svg"
                        />
                      )}
                    </DottedDivColor>
                  ) : (
                    <DottedDiv>
                      {width > 1024 && (
                        <img
                          style={{ paddingLeft: "40px" }}
                          className="line-image"
                          src="/images/dotted line.svg"
                        />
                      )}
                    </DottedDiv>
                  )}
                </LineDiv>

                <div className="time-container para1 fs-10-barlow pad-0">
                  <p className="time-para fs-10-barlow">
                    {moment(token?.addedOn || "").format("lll")}
                  </p>
                  <p>Request received</p>
                </div>
              </div>

              <div className="approval-container tab-approval req-approve-tab">
                <LineDiv>
                  {props.updateDetails.isApproved === true ? (
                    <img
                      className="approval-tab-img approval-image"
                      src="/images/Request Approve.svg"
                    />
                  ) : (
                    <img
                      className="approval-tab-img approval-image"
                      src="/images/Request_Approve_Dark.svg"
                    />
                  )}
                </LineDiv>
                {props.updateDetails.isApproved === true ? (
                  <div className="time-container para1 fs-10-barlow pad-0">
                    <p className="time-para">
                      {moment(new Date().getTime()).format("lll") || ""}
                    </p>
                    <p>Request Approve</p>
                  </div>
                ) : (
                  <div className="time-container para1 fs-10-barlow pad-0">
                    <RequestDiv>Request Approve</RequestDiv>
                  </div>
                )}
              </div>

              {isVerified === true ? (
                <>
                  <DottedDivColorPayment>
                    {width > 1024 && (
                      <img
                        className="line-image"
                        src="/images/colored lines.svg"
                      />
                    )}
                  </DottedDivColorPayment>
                  <div className="approval-container tab-approval last-div-w-50">
                    <div>
                      <img
                        className="approval-image approval-tab-img"
                        src="/images/Payment Verified.svg"
                      />
                    </div>
                    <div className="time-container para1 fs-10-barlow pad-0 mb-w-100">
                      <p className="time-para">
                        {moment(new Date().getTime()).format("lll") || ""}
                      </p>
                      <p>Payment Verified</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <DottedDivPayment>
                    {width > 1024 && (
                      <img
                        style={{ paddingLeft: "40px" }}
                        className="line-image"
                        src="/images/dotted line.svg"
                      />
                    )}
                  </DottedDivPayment>
                  <div className="approval-container tab-approval last-div-w-50">
                    <div>
                      <img
                        className="approval-image approval-tab-img"
                        src="/images/Payment_Verified_Dark.svg"
                      />
                    </div>
                    <div className="time-container para1 fs-10-barlow pad-0 mb-w-100">
                      <RequestDiv>Payment Verified</RequestDiv>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Accept Box */}
        <Dialog
          open={open}
          className="align-c justify-c  border-radius-70 dialog-container-comment"
          onClose={handleToClose}
        >
          {width < 767 && (
            <div className="display-flex bg-F0F0F6">
              <BackIcon onClick={handleToClose}>
                <BackIconImg src="/images/back.svg" />
              </BackIcon>
              <ChangeText style={{ paddingBottom: "20px" }}>
                Send Payment Request
              </ChangeText>
            </div>
          )}

          <DialogContent className="align-c justify-c border-radius-6 bg-F0F0F6 p-20">
            {width > 767 && (
              <Row justifyContent="space-between" marginTop="8px">
                <ChangeText style={{ paddingBottom: "20px" }}>
                  Send Payment Request
                </ChangeText>
                <p
                  onClick={handleToClose}
                  style={{ width: "13px", height: "13px", color: "#151E58" }}
                >
                  X
                </p>
              </Row>
            )}
            <ColumnNew>
              <BoxDiv>
                <HeadText>Wallet ID</HeadText>
                <InputBox value={adminAddress || ""} />
                {adminAddress.length === 0 ? (
                  <ErrorSpan>Wallet is not connected</ErrorSpan>
                ) : (
                  ""
                )}
              </BoxDiv>
              <BoxDiv>
                <HeadText>Amount</HeadText>
                <InputBox onChange={(e) => setAmount(e.target.value)} />
              </BoxDiv>

              <BtnDiv>
                <Donebtn onClick={sendTransactionDetails}>Send</Donebtn>
              </BtnDiv>
            </ColumnNew>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {/* Reject Box */}
        <Dialog
          open={dialogopen}
          className="align-c justify-c  border-radius-70 dialog-container-comment"
          onClose={handleClickToCloseReject}
        >
          {width < 767 && (
            <div className="display-flex bg-F0F0F6">
              <BackIcon
                // style={{ width: "13px", height: "13px", color: "#151E58" }}
                onClick={handleClickToCloseReject}
              >
                <BackIconImg src="/images/back.svg" />
              </BackIcon>
              <ChangeText>Reject Token</ChangeText>
            </div>
          )}
          <DialogContent className="align-c justify-c bgclr-white border-radius-6 p-20 mb-list-pd bg-F0F0F6">
            {width > 767 && (
              <Row justifyContent="space-between" marginTop="8px">
                <ChangeText>Reject Token</ChangeText>
                <p
                  style={{ width: "13px", height: "13px", color: "#151E58" }}
                  onClick={handleClickToCloseReject}
                >
                  X
                </p>
              </Row>
            )}
            <ColumnNew>
              <div>
                <InputText style={{ height: "162px" }}>
                  <textarea
                    onChange={(e) => setComments(e.target.value)}
                    className="bg-none border-none txt-l fs-16 align-c p-t-6 write-comment"
                    style={{ paddingBottom: "130px", paddingLeft: "10px" }}
                    placeholder=""
                  ></textarea>
                </InputText>
              </div>

              <DonebtnHead style={{}}>
                <Donebtn onClick={() => tokenRejection(token._id)}>
                  Done
                </Donebtn>
              </DonebtnHead>
            </ColumnNew>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { wallet: state.wallet };
};
export default connect(mapStateToProps)(TokenDetails);
