import React from "react";
import styled from "styled-components";
import { coinList } from "../constants";
import { ClickOutside } from "./components";

const SelectedCoinContainer = styled.div`
  width: ${(props) => (props.width ? `${props.width}px` : "297px")};
  height: ${(props) => (props.height ? `${props.height}px` : "69px")};
  padding: ${(props) => (props.padding ? props.padding : "10px")};
  margin: ${(props) => (props.margin ? props.margin : "45px 0 0 0")};
  border: ${(props) => (props.border ? props.border : `1px solid #dadada`)};
  border-radius: 10px;
  /* border-right: solid 1px lightgrey; */
  overflow: hidden;
  font: ${(props) =>
    props.font ? props.font : `500 17px/22px var(--root-font)`};
  color: #000000;
`;

const CoinDropdown = styled.div`
  width: ${(props) => (props.width ? `${props.width}px` : "297px")};
  position: absolute;
  background: white;
  border: 1px solid #dadada;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "10px"};
  padding: ${(props) =>
    props.dropdownPadding ? props.dropdownPadding : "10px"};
  display: flex;
  flex-flow: column;
  font: ${(props) =>
    props.font ? props.font : `500 17px/22px var(--root-font)`};
  gap: 15px;
`;

const CoinContainer = styled.div`
  cursor: pointer;
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: flex-start;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font: ${(props) => props.font};

      margin-bottom: 0px;
      color: #000000;
    }
  }
`;
// const DropdownIcon = styled.img`
//   margin-left: auto;
//   rotate: ${(props) => (props.isOpen ? "180deg" : "")};
// `;

function DropDownComponent({
  id,
  handleChange,
  handleClose,
  handleOpen,
  state,
  MenuItemCustom,
  ...rest
}) {
  const handleChangeFunction = (index, coin) => {
    if (id) {
      handleChange(id, coin);
    } else {
      handleChange(index);
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <ClickOutside oneClickOutside={handleClose} isOpen={state.viewDrop}>
        <SelectedCoinContainer id={id} {...rest}>
          <CoinContainer>
            {MenuItemCustom ? (
              <MenuItemCustom state={state} coin={state.coinName} />
            ) : (
              <MenuItem state={state} coin={state.coinName} />
            )}
            {/* <DropdownIcon
              src="/images/drop-down.svg"
              alt="drop-down"
              isOpen={state.viewDrop}
            /> */}
          </CoinContainer>
        </SelectedCoinContainer>
        {state.viewDrop && (
          <CoinDropdown {...rest}>
            {coinList.map((coin, index) => (
              <CoinContainer
                onClick={() => handleChangeFunction(index, coin)}
                key={index}
              >
                {MenuItemCustom ? (
                  <MenuItemCustom state={state} coin={coin} />
                ) : (
                  <MenuItem state={state} coin={coin} />
                )}
              </CoinContainer>
            ))}
          </CoinDropdown>
        )}
      </ClickOutside>
    </div>
  );
}

const MenuItem = ({ state, coin }) => {
  return (
    <>
      <img
        src={
          state.paymentRequest
            ? state.paymentRequest.token === coinList[0]
              ? "/images/iconGtr.svg"
              : "/images/iconAdr.svg"
            : coinList[0] === coin
            ? "/images/iconGtr.svg"
            : "/images/iconAdr.svg"
        }
        height={47}
        width={47}
        alt={state.coinName}
      />
      <div>
        <p>{state.paymentRequest ? state.paymentRequest.token : coin}</p>
        <div>
          {state.paymentRequest
            ? state.paymentRequest?.amount
            : state.amount
            ? state.amount
            : 0}
        </div>
      </div>
    </>
  );
};

export default DropDownComponent;
