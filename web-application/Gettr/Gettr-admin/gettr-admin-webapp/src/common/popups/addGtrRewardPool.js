import React from "react";
import styled from "styled-components";
import { PopupContainer } from "../../common/components/components";
import { stringConstants } from "../../constants";
import ButtonComponent from "../components/button";

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
const AmountContainer = styled.div`
  padding: 0px 29px 26px 33px;
`;
const InputContainers = styled.div`
  input {
    width: 370px;
    height: 48px;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
    font: 400 14px/22px var(--root-font);
    padding-left: 22px;
    color: #000000;
    :focus {
      outline: none;
    }
  }
  div {
    margin-top: 37px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font: 600 14px/22px var(--root-font);
    }
  }
`;
const Line = styled.hr`
  margin: 0;
`;

const AddGtrRewardPool = ({ close, setState }) => {
  const handleChange = (e, id) => {
    if (id === stringConstants.ADMIN_PASSWORD) {
      setState((pre) => ({
        ...pre,
        adminPassword: e.target.value,
      }));
    } else if (id === stringConstants.AMOUNT) {
      setState((pre) => ({
        ...pre,
        amount: e.target.value,
      }));
    }
  };
  return (
    <PopupContainer height={"404px"}>
      <TitleConatiner>
        <span>Add GTR in Reward Pool</span>
        <img
          alt="close popup"
          src="/images/popup-cross.svg"
          onClick={close}
        ></img>
      </TitleConatiner>
      <Line></Line>
      <AmountContainer>
        <InputContainers>
          <div>
            <span>Enter Amount :</span>
            <input
              id={stringConstants.AMOUNT}
              type="text"
              placeholder="Enter amount"
              onChange={(e) => handleChange(e, stringConstants.AMOUNT)}
            />
          </div>
          <div>
            <span>Enter Admin Password :</span>
            <input
              id={stringConstants.ADMIN_PASSWORD}
              type="text"
              placeholder="Enter admin password"
              onChange={(e) => handleChange(e, stringConstants.ADMIN_PASSWORD)}
            />
          </div>
        </InputContainers>
        <ButtonComponent
          font={"500 16px/22px  var(--root-font)"}
          margin={"69px 0 0 0"}
          clickHandler={close}
        >
          Create
        </ButtonComponent>
      </AmountContainer>
    </PopupContainer>
  );
};

export default AddGtrRewardPool;
