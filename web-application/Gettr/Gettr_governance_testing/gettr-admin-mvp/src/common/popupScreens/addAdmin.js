import React, { useState } from "react";
import styled from "styled-components";
import { PopupContainer } from "../components/components";
import Modal from "../components/modal";
import utility from "../../utility";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import VerifyYourself from "../components/verifyYourself";
import { history } from "../../managers/history";

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
  padding: 26px 29px 26px 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
`;

const Line = styled.hr`
  margin: 0;
`;

const SideHeader = styled.div`
  font: normal 600 14px/22px var(--root-font);
  color: #50555c;
`;

const RoleContainer = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 8px;
  margin: 10px 0px 10px 0px;
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
  img {
    cursor: pointer;
  }
`;
const FilterDropMenu = styled.div`
  width: 377px;
  height: 100px;
  border: 1px solid #e7e7e7;
  position: absolute;
  border-radius: 10px;
  margin-top: -30px;
  display: flex;
  flex-direction: column !important;
  background-color: white;
  justify-content: space-around;
  gap: 8px !important;
  p {
    font-family: var(--root-font);
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: #000000;
    margin: 0px 0px 0px 10px !important;
  }
`;
const AccessContainer = styled.div`
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  gap: 24px !important;
  margin-top: 25px;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p {
      font: normal 500 14px/22px var(--root-font);
      margin-bottom: 0px;
      color: #000000;
    }
  }
`;
const ButtonComponent = styled.button`
  margin-top: 20px;
  width: 367px;
  height: 48px;
  background: ${(props) => (props.disabled ? "#ec9da6" : "#FC223B")};
  border-radius: 50px;
  font: normal 600 16px/22px "Roboto";
  color: #ffffff;
  border: none;
`;
const NameDiv = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
  h1 {
    font: normal 600 14px/22px var(--root-font);
    color: #50555c;
    margin-bottom: 0px !important;
  }
  input {
    width: 370px;
    height: 48px;
    padding-left: 10px;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
  }
`;

const AddAdmin = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const [reqObj, setReqObj] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [verifyPopup, setVerifyPopup] = useState(true);
  const [passcode, setPasscode] = useState(new Array(6).fill(""));

  const handleClose = () => {
    setVerifyPopup(true);
    props.setModal(false);
  };

  const dropDownList = [
    {
      name: "Super Admin",
      value: "ADD_SUPER_ADMIN",
    },
    {
      name: "Admin",
      value: "ADD_SUB_ADMIN",
    },
  ];

  const createAdmin = async (passcode) => {
    setVerifyLoader(true);
    let startTime = Date.now();
    let endTime =
      (Math.floor(startTime / 1000) + utility.convertHoursToSeconds(48)) * 1000;
    let requestData = {
      createdBy: props?.user?.details?.profile?.email,
      type: reqObj.role,
      startTime: startTime,
      endTime: endTime,
      role: "SUPER_ADMIN",
      user: {
        email: reqObj.email,
        name: reqObj.name,
      },
      successMessage: "Add Admin Request created successfully",
      passcode,
    };
    await props.addAdminDetails(requestData);
    handleClose();
    setVerifyLoader(false);
    history.push("/dashboard/overview");
  };

  const disable =
    Boolean(reqObj.name) && Boolean(reqObj.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,50})+$/.test(reqObj.email)) && Boolean(reqObj.role);

  return (
    <Modal
      open={props.open}
      handleClose={() => {
        props.setModal(false);
      }}
    >
      {verifyPopup ? (
        <PopupContainer height={"767px"} width={"417px"}>
          <TitleConatiner>
            <span>Add Admim</span>
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
            <NameDiv>
              <h1>Admin Name :</h1>
              <input
                type="text"
                onChange={(e) => {
                  setReqObj((pre) => ({ ...pre, name: e.target.value }));
                }}
              />
            </NameDiv>
            <NameDiv>
              <h1>Admin Email :</h1>
              <input
                type="email"
                onChange={(e) => {
                  setReqObj((pre) => ({ ...pre, email: e.target.value }));
                }}
              />
            </NameDiv>
            <SideHeader>
              <span>Role :</span>
              <RoleContainer>
                <div onClick={() => setDropDown(!dropDown)}>
                  <div>
                    {reqObj.role
                      ? reqObj.role === "ADD_SUPER_ADMIN"
                        ? "Super Admin"
                        : "Admin"
                      : "None"}
                  </div>
                </div>
                <img
                  src={
                    dropDown ? "/images/dropUp.svg" : "/images/downArrow.svg"
                  }
                  alt="down"
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                />
              </RoleContainer>
              {dropDown && (
                <FilterDropMenu>
                  {dropDownList.map((item, index) => (
                    <div
                      key={item.value}
                      onClick={(e) => {
                        setDropDown(false);
                        setReqObj((pre) => ({ ...pre, role: item.value }));
                      }}
                      id="role"
                      value={item.value}
                    >
                      <p>{item.name}</p>
                    </div>
                  ))}
                </FilterDropMenu>
              )}
            </SideHeader>

            <SideHeader>
              <span>Access :</span>
              <AccessContainer>
                <div>
                  <p>Manage User</p>
                  <img src="/images/coloredCheck.svg" alt="check" />
                </div>
                <div>
                  <p>Manage Pool</p>
                  <img src="/images/coloredCheck.svg" alt="check" />
                </div>
                <div>
                  <p>Manage Rewards Activity</p>
                  <img src="/images/coloredCheck.svg" alt="check" />
                </div>
                <div>
                  <p>Manage Team</p>
                  <img src="/images/coloredCheck.svg" alt="check" />
                </div>
              </AccessContainer>
            </SideHeader>
            <ButtonComponent
              onClick={() => {
                setVerifyPopup(false);
              }}
              disabled={!disable}
            >
              Invite
            </ButtonComponent>
          </DetailsContainer>
        </PopupContainer>
      ) : (
        <VerifyYourself
          passcode={passcode}
          setPasscode={setPasscode}
          handleClose={handleClose}
          buttonText="Invite Admin"
          apiCallFunction={(passcode) => createAdmin(passcode)}
          verifyLoader={verifyLoader}
        />
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(AddAdmin);
