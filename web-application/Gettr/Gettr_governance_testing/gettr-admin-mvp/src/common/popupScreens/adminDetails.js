import React, { useState } from "react";
import styled from "styled-components";
import { PopupContainer } from "../components/components";
import Modal from "../components/modal";
import utility, { dispatchAction } from "../../utility";
import VerifyYourself from "../components/verifyYourself";
import { DummyImage } from "../components/components";
import { history } from "../../managers/history";
import { connect } from "react-redux";

const TitleConatiner = styled.div`
  padding: 30px 29px 26px 33px;
  display: flex;
  justify-content: space-between;
  span {
    font: 700 16px/22px var(--root-font);
    text-align: left;
    color: #1e1e1e;
  }
  img {
    height: 20px;
    cursor: pointer;
  }
`;
const DetailsContainer = styled.div`
  padding: 0px 29px 26px 33px;
`;

const Line = styled.hr`
  margin: 0;
`;
const NameAndEmail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 28px 0px 15px 0px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: left;
      div {
        font: normal 600 14px/22px var(--root-font);
        color: #50555c;
      }
      p {
        margin-left: 44px;
        font: normal 400 14px/22px var(--root-font);
        color: #000000;
      }
    }
  }
`;
const ImageContainer = styled.div`
  border-radius: 60%;
  margin: auto 0 auto 0;
  height: 62px;
  width: 62px;
  overflow: hidden;
  margin: 0px 0px 20px 10px;
`;
const SideHeader = styled.div`
  font: normal 600 14px/22px var(--root-font);
  color: #50555c;
`;
const RadioButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
  margin: 15px 0px 35px 0px;
  div {
    display: flex;
    flex-direction: row;
    align-items: left;
    gap: 0px;
    input:checked {
      accent-color: #fc223b;
    }
    label {
      font: normal 500 14px/22px var(--root-font);
      margin: 0px 0px 0px 16px;
      color: #000000;
    }
  }
`;
const ReasonInput = styled.input`
  width: 372px;
  height: 156px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
`;
const RoleContainer = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 8px;
  margin: 13px 0px 30px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  div {
    font: normal 500 14px/22px var(--root-font);
    color: #000000;
    border: none;
    width: 90%;
  }
`;
const ButtonComponent = styled.button`
  margin-top: 60px;
  width: 367px;
  height: 48px;
  background: #fc223b;
  border-radius: 50px;
  font: normal 600 16px/22px "Roboto";
  color: #ffffff;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.3 : "")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const AdminDetails = (props) => {
  //{ open, setModal, eachAdminDetails, removeAdmin }
  const [dropDown, setDropDown] = useState(false);
  const [verifyPopup, setVerifyPopup] = useState(true);
  const [passcode, setPasscode] = useState(new Array(6).fill(""));
  const [verifyLoader, setVerifyLoader] = useState(false);

  const handleClose = () => {
    setVerifyPopup(true);
    props.setModal(false);
  };
  const removeAdminDetails = async (passcode) => {
    setVerifyLoader(true);
    let startTime = Date.now();
    let endTime =
      (Math.floor(startTime / 1000) + utility.convertHoursToSeconds(48)) * 1000;
    let requestData = {
      createdBy: props?.user?.details?.profile?.email,
      type:
        props.eachAdminDetails?.role === "SUPER_ADMIN"
          ? "REMOVE_SUPER_ADMIN"
          : "REMOVE_SUB_ADMIN",
      startTime: startTime,
      endTime: endTime,
      role: "SUPER_ADMIN",
      user: {
        email: props.eachAdminDetails?.email,
        name: props.eachAdminDetails?.name,
      },
      successMessage: "Remove Admin Request created successfully",
      passcode,
    };
    await props.removeAdmin(requestData);
    handleClose();
    setVerifyLoader(false);
    history.push("/dashboard/team");
  };

  return (
    <Modal
      open={props.open}
      handleClose={() => {
        props.setModal(false);
      }}
    >
      {verifyPopup ? (
        <PopupContainer height={"736px"} width={"439px"}>
          <TitleConatiner>
            <span>Admin Detals</span>
            <img
              alt="close popup"
              src="/images/closeIcon.svg"
              onClick={() => {
                props.setModal(false);
              }}
            ></img>
          </TitleConatiner>
          <Line></Line>
          <DetailsContainer>
            <NameAndEmail>
              <div>
                <div>
                  <div>Name :</div>
                  {props.eachAdminDetails?.name !== "" ? (
                    <p>{props.eachAdminDetails?.name}</p>
                  ) : (
                    <p>--</p>
                  )}
                </div>
                <div>
                  <div>Email :</div>
                  {props.eachAdminDetails?.email !== "" || null ? (
                    <p>{props.eachAdminDetails?.email}</p>
                  ) : (
                    <p>- -</p>
                  )}
                </div>
              </div>
              <ImageContainer>
                {props.eachAdminDetails.picture ? (
                  <img
                    alt="avatar"
                    src={props.eachAdminDetails?.picture}
                    onError={(e) => {
                      props.eachAdminDetails.picture = "";
                    }}
                  />
                ) : (
                  <DummyImage width={"62px"} height={"62px"}>
                    {props.eachAdminDetails?.name.slice(0, 1)}
                  </DummyImage>
                )}
              </ImageContainer>
            </NameAndEmail>
            <SideHeader>
              <span>Role :</span>
              <RoleContainer>
                <div onClick={() => setDropDown(!dropDown)}>
                  <div>
                    {props.eachAdminDetails?.role
                      ? props.eachAdminDetails?.role
                      : "None"}
                  </div>
                </div>
              </RoleContainer>
            </SideHeader>
            <SideHeader>
              <span>Status :</span>
              <RadioButtons>
                <div>
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={props.eachAdminDetails?.isApproved}
                  ></input>
                  <label>Active</label>
                  <br></br>
                </div>
                <div>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={!props.eachAdminDetails?.isApproved}
                  ></input>
                  <label>Inactive</label>
                  <br></br>
                </div>
              </RadioButtons>
            </SideHeader>
            <SideHeader>
              <span>Reason to Freeze Admin :</span>
              <ReasonInput />
            </SideHeader>
            <ButtonComponent
              disabled={!props.eachAdminDetails?.isApproved || (props.eachAdminDetails.role === "SUPER_ADMIN" && props.activeSuperAdminCount === 1) }
              onClick={() => {
                setVerifyPopup(false);
              }}
            >
              Remove Admin
            </ButtonComponent>
          </DetailsContainer>
        </PopupContainer>
      ) : (
        <VerifyYourself
          passcode={passcode}
          setPasscode={setPasscode}
          handleClose={handleClose}
          buttonText="Remove Admin"
          apiCallFunction={(passcode) => removeAdminDetails(passcode)}
          verifyLoader={verifyLoader}
        />
      )}
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(AdminDetails);
