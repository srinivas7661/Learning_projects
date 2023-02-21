import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { pathConstants } from "../../constants";

const DialogContainer = styled.div`
  width: 418px;
  height: 332px;
  background: #181442 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
`;
const HeadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 63%;
`;
const Loader = styled.div`
  border: 8px solid #292550;
  border-radius: 50%;
  border-top: 8px solid #16ab6e;
  width: 100px;
  height: 100px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DeleteText = styled.span`
  margin: 12px 0 0 20px;
  width: 63px;
  height: 24px;
  text-align: left;
  font: normal normal 600 20px/24px Inter;
  letter-spacing: 0px;
  color: #1f1f1f;
  white-space: nowrap;
  opacity: 1;
`;
const Line = styled.hr`
  margin: 11.19px 0 24.81px 0;
  width: 466px;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CancelButton = styled.button`
  width: 343px;
  height: 38px;
  background: #181442 0% 0% no-repeat padding-box;
  border: 0.5px solid #c3c3c3;
  border-radius: 12px;
  opacity: 1;
  color: #ffffff;
`;
const MidSection = styled.div`
  display: flex;
  flex-direction: column;
  /* row-gap: 19px; */
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 
  padding: 5px 0 0 0;
`;
const InputContainer = styled.div`
  margin: 0 0 30px 0;
  font: normal normal normal 14px/17px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

const SuccesImage = styled.img`
  width: 127px;
  height: 125px;
  opacity: 1;
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
  backdrop-filter: blur(4px);
`;

export default function NftCreatedPopup(props) {
  const history = useHistory();

  const redirect = () => {
    history.push(pathConstants.NFT_DETAILS + "/" + props.nftDetails?._id);
  };

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.isOpen}
      PaperProps={{
        style: {
          backgroundColor: "black",
        },
      }}
      BackdropComponent={Backdrop}
    >
      {(() => {
        switch (props.steps) {
          case 1:
            return (
              <div className="w-104.5 h-83 bg-black-60 rounded-md opacity-100">
                <div className="justify-center flex items-center h-62pe">
                  <Loader />
                </div>

                <div className="flex flex-col items-center justify-center text-center pt-1.25 px-0 pb-0">
                  <div className="text-ft6 text-white mx-0 mt-0">
                    Please approve your token,
                  </div>
                </div>
              </div>
            );

          case 2:
            return (
              <div className="w-104.5 h-83 bg-black-60 rounded-md opacity-100">
                <div className="justify-center flex items-center h-62pe">
                  <Loader />
                </div>

                <div className="flex flex-col items-center justify-center text-center pt-1.25 px-0 pb-0">
                  <div className="text-ft6 text-white mx-0 mt-0">
                    Wait while transaction is happening
                  </div>
                </div>
              </div>
            );

          case 3:
            return (
              <div className="w-104.5 h-83 bg-black-60 rounded-md opacity-100">
                 <div className="justify-center flex items-center h-62pe">
                  <SuccesImage src="/images/Done.svg" />
                </div>
                <div className="flex flex-col items-center justify-center text-center pt-1.25 px-0 pb-0">
                <div className="text-ft6 text-white mx-0 mt-0">
                    You have bought Nft successfully
                  </div>
                </div>
                <ButtonContainer>
                  <CancelButton onClick={redirect}>Close</CancelButton>
                </ButtonContainer>
              </div>
            );
          default:
            return;
        }
      })()}
    </Dialog>
  );
}
