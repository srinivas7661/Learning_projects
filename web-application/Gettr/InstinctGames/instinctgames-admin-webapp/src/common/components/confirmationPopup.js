import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";

const DialogTitleHead = styled(DialogTitle)`
  padding: 28px 0 11px 23px !important;
`;
const DialogContentDiv = styled(DialogContent)`
  padding: 0 27px 16px 23px !important;
`;
const DialogActionBtn = styled(DialogActions)`
  padding: 5px 62px 34px 23px !important;
  justify-content: flex-end !important;
`;
export default function ConfirmationPopup(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.isOpen}
        onClose={() => props.onClickClose(false)}
        aria-labelledby="responsive-dialog-title"
        className="dialog-popup-confirm"
      >
        <DialogTitleHead id="responsive-dialog-title">
          <div className="delete-report">{props.title || ""}</div>
        </DialogTitleHead>
        <DialogContentDiv>
          <DialogContentText>
            <div
              className="delete-text"
              dangerouslySetInnerHTML={{ __html: props.descriptionText || "" }}
            >
              {/*{props.descriptionText || ''}*/}
            </div>
          </DialogContentText>
        </DialogContentDiv>
        <DialogActionBtn>
          <button
            autoFocus
            onClick={() => {
              props.onClickConfirm(props.inputId);
              props.openReviewNft(false);
            }}
            className="delete-btn"
          >
            {props.confirmBtnText || "Confirm"}
          </button>
          <button
            onClick={() => props.onClickClose(false)}
            autoFocus
            className="cancel-btn"
          >
            Cancel
          </button>
        </DialogActionBtn>
      </Dialog>
    </div>
  );
}
