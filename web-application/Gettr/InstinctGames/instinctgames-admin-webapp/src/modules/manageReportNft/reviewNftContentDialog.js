import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import moment from "moment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  alignItems: "flex-start",
  marginTop: "125px",
  "& .MuiDialogContent-root": {
    padding: "26px",
  },
  "& .MuiDialogActions-root": {
    padding: "16px 14px 20px 0px",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#151E58",
            padding: "20px",
          }}
        >
          <img src="/close.png" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ReviewNftDialog(props) {
  console.warn("nftContentData", props.nftReportData);
  return (
    <div>
      <BootstrapDialog
        onClose={() => props.onClose(false)}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
        className="responsive-dialog"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          className="dialog-title p-t-30 p-b-22 p-l-25"
          onClose={() => props.onClose(false)}
        >
          Review NFT
        </BootstrapDialogTitle>
        <DialogContent>
          <div className="display-flex flex-row gap-20">
            <img
              src={"/goku.jpg" || props?.nftReportData?.content?.cdnUrl}
              width={271}
              height={271}
              className="br-4"
            />
            <div className="display-flex flex-column">
              <p className="review-title">My Hero Academia</p>
              <p className="review-heading">Shoto Todoroki MHA</p>
              <p className="review-description">Description</p>
              <p className="description-short">
                {props?.nftReportData?.content?.description || ""}
              </p>
              <div className="display-flex flex-row gap-20">
                <p className="owner-div">
                  <img src={"/defaultprofile.png"} className="img-div" />
                  <div className="owner-text">
                    <span className="owner-title">Owner</span>
                    <span className="owner-description">{`${
                      props?.nftReportData?.content?.ownedBy?.firstName || ""
                    } ${
                      props?.nftReportData?.content?.ownedBy?.lastName || ""
                    }`}</span>
                  </div>
                </p>
                <p className="owner-div">
                  <img src="/defaultprofile.png" className="img-div" />
                  <div className="owner-text">
                    <span className="owner-title">Creater</span>
                    <span className="owner-description">{`${
                      props?.nftReportData?.content?.createdBy?.firstName || ""
                    } ${
                      props?.nftReportData?.content?.createdBy?.lastName || ""
                    }`}</span>
                  </div>
                </p>
              </div>
              <p className="review-link reason-div">
                Link <span className="link-span">Https://yourlink.com</span>
              </p>
              <div className="display-flex flex-row gap-20">
                <p className="review-report-by">
                  Reported by
                  <div className="reported-by-div">
                    <span className="report-span">
                      {`${props?.nftReportData?.addedBy?.firstName || ""} ${
                        props?.nftReportData?.addedBy?.lastName || ""
                      }`}
                      <span className="report-span report-span-margin">on</span>
                    </span>
                    <span className="report-span">
                      {moment(props?.nftReportData?.addedOn || 0).format(
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </div>
                </p>
                <p className="review-report-by reason-div">
                  Reason
                  <span className="link-span white-space">
                    {props?.nftReportData?.reason || 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={() => props.onClickDeleteReport()}
            className="review-delete-btn"
          >
            Delete Report
          </Button>
          <Button
            autoFocus
            onClick={() => props.onClickDeleteNft()}
            className="review-remove-btn"
          >
            Remove NFT
          </Button>
          <button
            autoFocus
            onClick={() => props.onClickDeleteNftAndClocUser()}
            className="review-block-btn"
          >
            Remove NFT and Block User
          </button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
