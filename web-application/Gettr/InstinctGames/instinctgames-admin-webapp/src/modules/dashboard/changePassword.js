import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Row, Column } from "simple-flexbox";
import styled from "styled-components";
import useWindowDimensions from "../../common/windowDimensions";
import SelectInput from "@mui/material/Select/SelectInput";

const ChangeText = styled.div`
  text-align: left;
  font-size: 18px;
  font-style: Barlow;
  font-weight: 500;
  letter-spacing: 0px;
  color: #151e58;
  margin-bottom: 10px;
  font-weight: 500;
  @media (max-width: 767px) {
    padding-top: 18px;
  }
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
  font-size: 14px;
`;
const BtnDisabled = styled.button`
  width: 95px;
  height: 34px;
  cursor: not-allowed !important;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 0.56;
  color: #ffffff;
  // margin-top: 20px !important;
  // margin-bottom: 26px !important;
  font: normal normal 14px/17px Barlow;
  letter-spacing: 0;
  border: none;
`;
const InputText = styled.div`
  width: 409px;
  height: 38px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  margin: 15px 0px 15px 0px;
  @media (max-width: 767px) {
      width: 100%;
      /* #ffffff !important */
  }
`;
const CloseIcon = styled.span`
  color: #151e58;
  width: 24px;
  height: 24px;
  text-align: right;
  cursor: pointer;
`;
const BackIcon = styled(CloseIcon)`
  margin: 18px;
`;
const BackIconImg = styled.img`
  width: 13px;
  height: 13px;
`;
const DialogNew = styled(Dialog)`
  ${"" /* width: 100%; */}
  // width: 767px !important;
margin: 0 !important;
`;
const RowNew = styled(Row)`
  @media (max-width: 767px) {
    margin-left: 0px !important;
    width: 100%;
  }
`;
const DialogContentNew = styled(DialogContent)`
  @media (max-width: 767px) {
    background: #f0f0f6 !important;
  }
`;
const ColumnNew = styled(Column)`
  @media (max-width: 767px) {
    background: #ffffff !important;
    padding: 14px 16px;
  }
`;
export default function ChangePassword(props) {
  const { height, width } = useWindowDimensions();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      props.state?.oldPassword?.length > 0 &&
      props.state?.newPassword?.length > 0 &&
      props.state?.confirmNewPassword?.length > 0
    ) {
      setIsActive(true);
    } else if (
      props.state?.oldPassword?.length === 0 ||
      props.state?.newPassword?.length === 0 ||
      props.state?.confirmNewPassword?.length === 0
    ) {
      setIsActive(false);
    }
  }, [props]);

  return (
    // <div>
    <DialogNew
      className="p-t-70 align-c justify-c m-l-2 border-radius-70 password-dialog"
      open={props.openPasswordBox}
      // onClose={props.closePasswordPopup}
    >
      {width < 767 && (
        <RowNew>
          <BackIcon
            // onClick={() => props.closeDialog(false)}
            onClose={props.closePasswordPopup}
          >
            <BackIconImg src="/images/back.svg" />
          </BackIcon>
          <ChangeText>Change Password</ChangeText>
        </RowNew>
      )}
      <DialogContentNew className="align-c justify-c bgclr-white border-radius-6 p-20">
        {width > 767 && (
          <Row justifyContent="space-between" marginTop="8px">
            <ChangeText>Change Password</ChangeText>
            <CloseIcon>
              <img
                onClick = {() => {props.onCrossBtnClick(); props.closePasswordPopup()}}
                src="/images/Close.svg"
              ></img>
            </CloseIcon>
          </Row>
        )}
        <ColumnNew>
          <InputText>
            <input
              className="bg-none border-none txt-l fs-16 menu align-c inputbox"
              type="password"
              onChange={props.onChangeEvent}
              value={props.state.oldPassword}
              id="oldPassword"
              placeholder="Old password"
            />
          </InputText>

          {props.state.oldPasswordError &&
            props.state.oldPasswordError.length > 0 && (
              <Row className="mt-20 width-100 error">
                {props.state.oldPasswordError}
              </Row>
            )}
          <InputText>
            <input
              className="bg-none border-none txt-l fs-16 menu align-c inputbox"
              type="password"
              placeholder="New password"
              onChange={props.onChangeEvent}
              value={props.state.newPassword}
              id="newPassword"
            />
          </InputText>
          {props.state.passwordError && props.state.passwordError.length > 0 ? (
            <Row className="mt-20 width-100 error">
              {props.state.passwordError}
            </Row>
          ) : (
            ""
          )}
          <InputText>
            <input
              className="bg-none border-none txt-l fs-16 menu align-c inputbox"
              type="password"
              placeholder="Confirm password"
              onChange={props.onChangeEvent}
              value={props.state.confirmNewPassword}
              id="confirmNewPassword"
            />
          </InputText>
          {props.state.confirmPasswordError &&
            props.state.confirmPasswordError.length > 0 && (
              <Row className="mt-20 width-100 error">
                {props.state.confirmPasswordError}
              </Row>
            )}

          <DialogActions
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              // marginTop: "15px",
            }}
          >
            {isActive === false ? (
              <BtnDisabled>Done</BtnDisabled>
            ) : (
              <Donebtn onClick={(event) => props.onChangePasswordClick(event)}>
                Done
              </Donebtn>
            )}
          </DialogActions>
        </ColumnNew>
      </DialogContentNew>
    </DialogNew>
    // </div>
  );
}
