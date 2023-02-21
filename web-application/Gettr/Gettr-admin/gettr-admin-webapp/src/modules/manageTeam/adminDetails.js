import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PopupContainer } from "../../common/components/components";
import ButtonComponent from "../../common/components/button";
import Modal from "../../common/components/modal";
import Utils from "../../utility";
import AdminConfigService from "../../services/adminConfig";

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
  margin-top: 20px;
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

const AdminDetails = ({ open, setModal, admin }) => {
  const adminId = admin.id;
  const [dropDown, setDropDown] = useState(false);
  const dropDownList = [
    {
      name: "Super Admin",
      value: "Super Admin",
    },
    {
      name: "Admin",
      value: "Admin",
    },
  ];
  const [userDetails, setUserDetails] = useState();
  const [access, setAccess] = useState(null);
  const [array, setArray] = useState([]);
  console.log(array, "srinivas");

  const [status, setStatus] = useState(undefined);
  console.log(status, "relangi");

  const [role, setRole] = useState("");

  useEffect(() => {
    checkBoxShortList(access);
  }, [access]);

  useEffect(() => {
    adminUpdate({});
  }, []);

  function checkBoxShortList(id) {
    if (array.includes(id)) {
      setArray((pre) => pre.filter((ids) => ids !== id));
    } else {
      setArray((pre) => [...pre, id]);
    }
  }

  async function adminUpdate(data) {
    const reqObject = data;
    let [error, response] = await Utils.parseResponse(
      AdminConfigService.updateAdmin(reqObject, adminId)
    );
    if (error || !response) {
      return;
    }
    setUserDetails(response);
    const arr = response.permissions;
    const status = response.status;
    const role = response.role;
    setStatus(status);
    setRole(role);
    setArray(arr);
  }

  function adminDataUpdate() {
    const adminData = {
      role,
      status,
      permissions: array,
    };
    adminUpdate(adminData);
  }

  return (
    <Modal
      open={open}
      handleClose={() => {
        setModal(false);
      }}
    >
      <PopupContainer height={"736px"} width={"439px"}>
        <TitleConatiner>
          <span>Admin Detals</span>
          <img
            alt="close popup"
            src="/images/popup-cross.svg"
            onClick={() => {
              setModal(false);
            }}
          ></img>
        </TitleConatiner>
        <Line></Line>
        <DetailsContainer>
          <NameAndEmail>
            <div>
              <div>
                <div>Name :</div>
                {userDetails?.name !== "" ? (
                  <p>{userDetails?.name}</p>
                ) : (
                  <p>--</p>
                )}
              </div>
              <div>
                <div>Email :</div>
                {userDetails?.email !== "" || null ? (
                  <p>{userDetails?.email}</p>
                ) : (
                  <p>- -</p>
                )}
              </div>
            </div>
            <ImageContainer>
              <img
                src={
                  "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                }
                alt="avatar-from"
                height={62}
                width={62}
              />
            </ImageContainer>
          </NameAndEmail>
          <SideHeader>
            <span>Role :</span>
            <RoleContainer>
              <div onClick={() => setDropDown(!dropDown)}>
                <div>{role ? role : "None"}</div>
              </div>
              <img
                src="/images/arrowDown.svg"
                alt="down"
                height={17}
                width={17}
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
                      setRole(item.value);
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
            <span>Status :</span>
            <RadioButtons>
              <div>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={status === "active"}
                  onChange={() => {
                    setStatus("active");
                  }}
                ></input>
                <label>Active</label>
                <br></br>
              </div>
              <div>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={status === "Inactive"}
                  onChange={() => {
                    setStatus("Inactive");
                  }}
                ></input>
                <label>Inactive</label>
                <br></br>
              </div>
            </RadioButtons>
          </SideHeader>
          <SideHeader>
            <span>Access :</span>
            <AccessContainer>
              <div>
                <p>Manage User</p>
                <img
                  onClick={(e) => {
                    setAccess("Manage User");
                  }}
                  src={
                    array.includes("Manage User")
                      ? "/images/coloredCheck.svg"
                      : "/images/check.svg"
                  }
                  alt="check"
                />
              </div>
              <div>
                <p>Manage Pool</p>
                <img
                  onClick={(e) => {
                    setAccess("Manage Pool");
                  }}
                  src={
                    array.includes("Manage Pool")
                      ? "/images/coloredCheck.svg"
                      : "/images/check.svg"
                  }
                  alt="check"
                />
              </div>
              <div>
                <p>Manage Rewards Activity</p>
                <img
                  onClick={(e) => {
                    setAccess("Manage Rewards Activity");
                  }}
                  src={
                    array.includes("Manage Rewards Activity")
                      ? "/images/coloredCheck.svg"
                      : "/images/check.svg"
                  }
                  alt="check"
                />
              </div>
              <div>
                <p>Manage Team</p>
                <img
                  onClick={(e) => {
                    setAccess("Manage Team");
                  }}
                  src={
                    array.includes("Manage Team")
                      ? "/images/coloredCheck.svg"
                      : "/images/grayCheck.svg"
                  }
                  alt="check"
                />
              </div>
            </AccessContainer>
          </SideHeader>
          <ButtonComponent
            font={"500 16px/22px  var(--root-font)"}
            margin={"25px 0 0 0"}
            onClick={() => {
              adminDataUpdate();
              setModal(false);
            }}
          >
            Update
          </ButtonComponent>
        </DetailsContainer>
      </PopupContainer>
    </Modal>
  );
};

export default AdminDetails;
