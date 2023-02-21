import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Row, Column } from "simple-flexbox";
import { history } from "../../managers/history";
import styled from "styled-components";

const ChangeText = styled.div`
  text-align: left;
  font: normal normal medium 18px/22px Barlow;
  letter-spacing: 0px;
  color: #151e58;
  margin-bottom: 10px;
`;
const Okbtn = styled.button`
  width: 95px;
  height: 34px;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  text-align: center;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;
const Cancel = styled.button`
  width: 95px;
  height: 34px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #6874e8;
  border-radius: 4px;
  text-align: center;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #6874e8;
  opacity: 1;
`;

const InputText = styled.div`
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #535877;
  opacity: 1;
  margin: 15px 0px 15px 0px;
`;

export default function ChangePassword(props) {
  const handleClose = () => {
    history.push("/dashboard");
  };

  return (
    <Dialog
      className="dialog"
      open={props.openChangePassword}
      onClose={handleClose}
    >
      <DialogContent className="main-dialog">
        <ChangeText>Undo Remove</ChangeText>

        <InputText>
          This action will also unblock the creator of this NFT
        </InputText>

        <Okbtn
          onClick={() => {
            alert("ok");
          }}
        >
          Ok
        </Okbtn>

        <Cancel
          onClick={() => {
            alert("cancel");
          }}
        >
          Cancel
        </Cancel>
      </DialogContent>
    </Dialog>
  );
}
