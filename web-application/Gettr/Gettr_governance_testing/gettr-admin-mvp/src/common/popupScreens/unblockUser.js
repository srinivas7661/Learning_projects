import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/modal";
import VerifyYourself from "../components/verifyYourself";

const ParentContainer = styled.div`
  background: #ffffff;
  border: none;
  border-radius: 19px;
  width: 613px;
  /* height: 307px; */
  /* padding: 5px; */
`;
const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Heading = styled.div`
  font: normal 700 16px/22px "Roboto";
  color: #1e1e1e; ;
`;
const BtnUnblock = styled.button`
  border: none;
  font: normal 500 16px/22px "Roboto";
  width: 100%;
  height: 48px;
  background: #fc223b;
  border-radius: 50px;
  color: white;
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
const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 29px 24px 33px;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font: normal 400 14px/22px "Roboto";
  width: 100%;
  height: 44px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 10px 0px 10px 20px;
  input {
    font: normal 500 14px/22px "Roboto";
    height: 100%;
    background-color: transparent;
    border-radius: 10px;
    border-color: transparent !important;
    outline: 0px !important;
    color: black;
    padding-left: 3%;
    width: 100%;
    ::placeholder {
      color: #898a8d;
      font: normal 400 14px/22px "Roboto";
    }
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
const UserList = styled.div`
  width: 100%;
  height: 538px;
  background: #f7f7f7;
  border-radius: 10px;
  margin: 24px 0px 24px 0px;
`;
const UserTable = styled.table`
  width: 100%;
  border-radius: 10px;
  tbody {
    tr {
      th {
        background: #898a8d;
        font: normal 700 14px/22px "Roboto";
        letter-spacing: -0.408px;
        color: #ffffff;
        width: 25%;
        height: 55px;
      }
      th:first-of-type {
        border-top-left-radius: 10px;
        width: 18%;
      }
      th:last-of-type {
        border-top-right-radius: 10px;
      }
    }
  }
`;
const EachUserRow = styled.tr`
  background: ${(props) => (props.select ? "#ffffff" : "transparent")};
  border-left: ${(props) => (props.select ? "5px solid #FC223B" : "none")};
  td {
    font: normal 400 14px/22px "Roboto";
    color: #000000;
    height: 64px;
    border-bottom: 1px solid #e7e7e7;
    border-radius: 1px;
  }
  td:first-of-type {
    display: flex;
    justify-content: center;
  }
`;
const ImageContainer = styled.p`
  border-radius: 60%;
  margin: auto 0 auto 0;
  height: 32px;
  width: 32px;
  overflow: hidden;
`;

const CloseImg = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const apiData = [
  {
    id: 1,
    image:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Alex jhon",
    gettrId: "alexjhon",
    gtrBalance: 100,
  },
  {
    id: 2,
    image:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Pavan ram",
    gettrId: "pavanram",
    gtrBalance: 100,
  },
  {
    id: 3,
    image:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Ram sita",
    gettrId: "ramsita",
    gtrBalance: 100,
  },
  {
    id: 4,
    image:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Ram Laksh",
    gettrId: "ramlaksh",
    gtrBalance: 100,
  },
  {
    id: 5,
    image:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Van Hus",
    gettrId: "vanhus",
    gtrBalance: 100,
  },
  {
    id: 6,
    image:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    name: "Alex jhon",
    gettrId: "alexjhon",
    gtrBalance: 100,
  },
];

export default function UnblockUser({ mintModal, setMintModal }) {
  const [popupScreen, setPopupScreen] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([2, 3]);
  const [passcode, setPasscode] = useState(new Array(6).fill(""));
  const selectUser = (user) => {
    const userId = user.id;
    selectedUsers.includes(userId)
      ? setSelectedUsers((pre) => pre.filter((num) => num !== userId))
      : setSelectedUsers((pre) => [...pre, userId]);
  };
  const handleClose = (passcode) => {
    setPopupScreen(true);
    setMintModal((pre) => ({ ...pre, unblockUser: false }));
  };

  return (
    <Modal
      open={mintModal}
      handleClose={() => {
        setMintModal((pre) => ({ ...pre, unblockUser: false }));
      }}
      marginTop={"83px"}
    >
      {popupScreen ? (
        // enterOTP ?
        //  <CommonEnterOtp
        //     setPopupScreen={setPopupScreen}
        //     setMintModal={setMintModal}
        //     setEnterOTP={setEnterOTP}
        //     setOtp={setOtp}
        //     otp={otp}
        //   />
        // :
        <ParentContainer>
          <MintContainer>
            <Header>
              <Heading>Unblock User</Heading>
              <CloseImg
                src="/images/closeIcon.svg"
                alt="/"
                onClick={() =>
                  setMintModal((pre) => ({ ...pre, unblockUser: false }))
                }
              />
            </Header>
            <Hrline></Hrline>
            <Content>
              <SearchContainer>
                <img src="/images/searchIcon.svg" alt="/" />
                <input placeholder="Search"></input>
              </SearchContainer>
              <UserList>
                <UserTable>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>User Name</th>
                      <th>GETTR ID</th>
                      <th>GTR Balance</th>
                    </tr>
                    {apiData &&
                      apiData.map((eachUser, index) => (
                        <>
                          <EachUserRow
                            key={eachUser.id}
                            onClick={() => selectUser(eachUser)}
                            select={selectedUsers.includes(eachUser.id)}
                          >
                            <td>
                              <ImageContainer>
                                <img
                                  src={eachUser.image}
                                  alt="avatar-from"
                                  height={32}
                                  width={32}
                                />
                              </ImageContainer>
                            </td>
                            <td>{eachUser.name}</td>
                            <td>{eachUser.gettrId}</td>
                            <td>{eachUser.gtrBalance} </td>
                          </EachUserRow>
                        </>
                      ))}
                  </tbody>
                </UserTable>
              </UserList>
              <BtnUnblock onClick={() => setPopupScreen((pre) => !pre)}>
                Unblock
              </BtnUnblock>
            </Content>
          </MintContainer>
        </ParentContainer>
      ) : (
        <VerifyYourself
          passcode={passcode}
          setPasscode={setPasscode}
          handleClose={handleClose}
          apiCallFunction={(passcode) => handleClose(passcode)}
          buttonText="Unblock Selected User"
        />
      )}
    </Modal>
  );
}
