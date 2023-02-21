import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {Row, Column} from "simple-flexbox";
import styled from "styled-components";

const ChangeText = styled.div`
  text-align: left;
  font-size: 18px;
  font-style: Barlow;
  font-weight: 500;
  letter-spacing: 0px;
  color: #151e58;
  margin-bottom: 10px;
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
`;

const InputText = styled.div`
  width: 409px;
  height: 38px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  margin: 15px 0px 15px 0px;
`;

const DialogContainer = styled(Dialog)`
    &:last-child{
      padding-bottom: 0 !important;
  
}
`

export default function ForgotPassword(props) {
    return (
        <div>
            <DialogContainer
                className="m-l-10 p-t-70 align-c justify-c m-l-2 border-radius-70 password-dialog"
                open={!!props.state.openPasswordPopup}
                onClose={props.closePasswordPopup}
            >
                <DialogContent className="align-c justify-c bgclr-white border-radius-6 p-20">
                    <Row justifyContent="space-between" marginTop="8px">
                        <ChangeText>Forgot Password</ChangeText>
                    </Row>
                    <Column>
                        <InputText>
                            <input
                                className="bg-none border-none txt-l fs-16 menu align-c inputbox"
                                type="email"
                                placeholder="Email" onChange={props.onChangeEvent}
                                value={props.state.forgotEmail}
                                id="forgotEmail"
                            />
                        </InputText>

                        {props.state.forgotEmailError && props.state.forgotEmailError.length > 0 &&
                        <Row className='mt-20 width-100 error'>{props.state.forgotEmailError}</Row>}

                        <DialogActions
                            style={{
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginTop: "15px",
                            }}
                        >
                            <Donebtn onClick={(event) => props.onConfirmForgotPasswordClick(event)} >
                                Confirm
                            </Donebtn>
                        </DialogActions>
                    </Column>
                </DialogContent>
            </DialogContainer>
        </div>
    );
}
