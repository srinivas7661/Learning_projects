import React, { useState } from "react";
import styled from "styled-components";
import { AdminPermissions, AdminRoles } from "../../constants";
import Modal from "../components/modal";

const ParentContainer = styled.div`
  background: #ffffff;
  border-radius: 19px;
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;
  border-bottom: 1px solid #eaeaea;
  h1 {
    font-family: var(--root-font);
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #1e1e1e;
  }
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
const PopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 696px;
  padding: 25px;
  > div {
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
  }
`;
const AdminRoleSelect = styled.div`
  width: 367px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  overflow-y: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  margin-top: 20px;
  p {
    margin-bottom: 0px !important;
    padding: 10px;
  }
`;

const DropDownContainer = styled.div`
  width: 367px;
  height: 60px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const AccessDiv = styled.div`
  div {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    p {
      margin-bottom: 0px !important;
    }
    img {
      cursor: pointer;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  button {
    text-align: center;
    width: 367px;
    height: 48px;
    background: #fc223b;
    border-radius: 50px;
    font: normal 500 16px/22px var(--root-font);
    border: none;
    color: #ffffff;
  }
`;

const AddAdmin = ({ setModal, open, setAdmin, admin, addAdmin }) => {
  const [dropDown, setDropDown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handlePermissionChange = (permission) => {
    let index = admin.permissions.findIndex((item) => item === permission);
    let permissions = admin.permissions;
    if (index === -1) {
      permissions.push(permission);
    } else permissions.splice(index, 1);
    setAdmin((pre) => ({ ...pre, permissions }));
  };

  return (
    <Modal
      open={open}
      handleClose={() => {
        setModal(false);
      }}
    >
      <ParentContainer>
        <HeadingContainer>
          <h1>Add Admin</h1>
          <img
            onClick={() => {
              setModal(false);
            }}
            src="/images/closeIcon.svg"
            alt="close"
          />
        </HeadingContainer>
        <PopContainer>
          <div>
            <h1>Admin Name :</h1>
            <input
              type="text"
              name="admin Name"
              value={admin.name}
              onChange={(e) =>
                setAdmin((pre) => ({ ...pre, name: e.target.value }))
              }
            />
          </div>
          <div>
            <h1>Admin Email :</h1>
            <input
              type="text"
              name="admin Email"
              value={admin.email}
              onChange={(e) =>
                setAdmin((pre) => ({ ...pre, email: e.target.value }))
              }
            />
          </div>
          <div>
            <h1>Role :</h1>
            <DropDownContainer>
              <span>
                {selectedIndex != null
                  ? AdminRoles[selectedIndex].name
                  : "Admin"}
              </span>
              <img
                src="/images/arrowDown.svg"
                alt="down"
                onClick={(e) => {
                  setDropDown(!dropDown);
                }}
              />
            </DropDownContainer>
            {dropDown ? (
              <AdminRoleSelect>
                {AdminRoles.map((item, index) => (
                  <div
                    key={item.value}
                    onClick={() => {
                      setSelectedIndex(index);
                      setDropDown(false);
                      setAdmin((pre) => ({ ...pre, role: item?.value }));
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
              </AdminRoleSelect>
            ) : (
              <></>
            )}
          </div>
          <div>
            <h1>Access :</h1>
            <AccessDiv>
              {AdminPermissions.map((item, key) => (
                <div key={key}>
                  <p>{item.name}</p>
                  <img
                    alt="check"
                    onClick={() => handlePermissionChange(item.value)}
                    src={
                      !admin.permissions.includes(item.value)
                        ? "/images/grayCheck.svg"
                        : "/images/coloredCheck.svg"
                    }
                  />
                </div>
              ))}
            </AccessDiv>
          </div>
          <ButtonContainer>
            <button onClick={() => addAdmin()}>Invite</button>
          </ButtonContainer>
        </PopContainer>
      </ParentContainer>
    </Modal>
  );
};

export default AddAdmin;
