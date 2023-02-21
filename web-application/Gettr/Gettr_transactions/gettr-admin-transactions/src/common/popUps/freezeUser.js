import React from "react";
import styled from "styled-components";

const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: white;
  height: 433px;
  width: 613x;
`;
const Heading = styled.div`
  font: normal 700 16px/22px "Roboto";
  color: #1e1e1e; ;
`;
const CloseImg = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
const AmountInput = styled.input`
  width: 433px;
  height: 186px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  font: normal 700 14px/22px "Roboto";
`;
const ContinueBtn = styled.button`
  border: none;
  font: normal 500 16px/22px "Roboto";
  width: 551px;
  height: 48px;
  background: #fc223b;
  border-radius: 50px;
  color: white;
  margin: 15px 30px 30px 30px;
`;
const ParentContainer = styled.div`
  padding-top: 100px;
  position: fixed;
  z-index: 10;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
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
const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
`;
const EnterAmount = styled.div`
  font: normal 600 14px/22px "Roboto";
  display: flex;
  letter-spacing: -0.408px;
  color: #50555c;
`;

const FreezeUser = ({ setFreezeModal, setVerifyModal }) => {
  return (
    <ParentContainer>
      <MintContainer>
        <Header>
          <Heading>Freeze User</Heading>
          <CloseImg
            src="/images/closeIcon.svg"
            alt="/"
            onClick={() => {
              setFreezeModal(false);
            }}
          />
        </Header>
        <Hrline></Hrline>
        <AmountContainer>
          <EnterAmount>Freeze Reason :</EnterAmount>
          <AmountInput type={"passcode"}></AmountInput>
        </AmountContainer>
        <ContinueBtn
          onClick={() => {
            setVerifyModal(true);
            setFreezeModal(false);
          }}
        >
          Continue
        </ContinueBtn>
      </MintContainer>
    </ParentContainer>
  );
};

export default FreezeUser;
