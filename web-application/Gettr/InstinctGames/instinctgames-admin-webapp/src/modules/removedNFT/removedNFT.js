import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ConfirmationPopup from "../../common/components/confirmationPopup";
import PaginationFooter from "../../common/components/paginationFooter";
import moment from "moment";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import NoRecordPlaceholderComponent from "../../common/components/NoRecordPlaceholderComponent";
import ReviewRemovedNftPage from "./reviewRemovedNft";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffff",
    color: "black",
    borderBottom: "none !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "none !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    background: "#F8F8F8 0% 0% no-repeat padding-box",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  borderRadius: "4px",
}));

const head = [
  {
    Name: "Name",
    Reported_by: "Reported by",
    Reported_on: "Reported on",
    Reason: "Reason",
    ReviewNFT: "Review",
    Review: "Removed on",
    Delete_report: " ",
  },
];

export default function RemovedNFT(props) {
  const [
    openConfirmDialogForUndoRemoveNft,
    setOpenConfirmDialogForUndoRemoveNft,
  ] = useState(false);
  const [selectedReport, updateSelectedReport] = useState(null);
  const [openReviewNftPage, setOpenReviewNft] = useState(false);

  const onClickConfirmUndoRemoveNft = () => {
    props.unRemoveNft(selectedReport);
    setOpenConfirmDialogForUndoRemoveNft(false);
  };
  const handleReview = () => {
    props.navigateToTab("review-removed-nft");
    // props.navigateToTab("/dashboard/manage-content/reported-nft/review-nft")
  };
  const openReviewNft = (data) => {
    setOpenReviewNft(data);
  };
  const [iconShow, setIconShow] = React.useState(false);

  const iconChange = () => {
    setIconShow(!iconShow);
  };

  return (
    <div>
      {!openReviewNftPage && (
        <div
          className="container container-report padding-79 tab-padding-32 mb-list-pd mb-report-cont tab-report-cont"
          id="category_scroll"
        >
          <Grid item xs={12}>
            <div>
              <div className="nft-div">
                <div className="report-search">
                  <span className="nft-sold">Removed NFT</span>
                </div>
                <div>
                  <Paper
                    className="select-opt"
                    elevation={0}
                    onClick={iconChange}
                  >
                    {!iconShow ? (
                      <select
                        className="select-opt w-124 p-l-3 outline-none select-arrow-dn"
                        name={"selectedDaysFilter"}
                        value={props.state.selectedDaysFilter || 1}
                        onChange={(event) => props.onSelectDaysFilter(event)}
                      >
                        <option value={"oneDay"}>Last 1 Day</option>
                        <option value={"monthly"}>Last 1 Month</option>
                        <option value={"yearly"}>Last 1 Year</option>
                      </select>
                    ) : (
                      <select
                        className="select-opt w-124 p-l-3 outline-none select-arrow-up"
                        name={"selectedDaysFilter"}
                        value={props.state.selectedDaysFilter || 1}
                        onChange={(event) => props.onSelectDaysFilter(event)}
                      >
                        <option value={"oneDay"}>Last 1 Day</option>
                        <option value={"monthly"}>Last 1 Month</option>
                        <option value={"yearly"}>Last 1 Year</option>
                      </select>
                    )}
                    {/* <select
                      className="select-opt w-124 p-l-3 outline-none"
                      name={"selectedDaysFilter"}
                      value={props.state.selectedDaysFilter || 1}
                      onChange={(event) => props.onSelectDaysFilter(event)}
                    >
                      <option value={"oneDay"}>Last 1 Day</option>
                      <option value={"monthly"}>Last 1 Month</option>
                      <option value={"yearly"}>Last 1 Year</option>
                    </select> */}
                  </Paper>
                </div>
              </div>
              <div className="collection-table">
                <Paper elevation={0} className="table-root-collection">
                  <TableContainer component={Paper} className="box-shadow-none">
                    <Table
                      sx={{ minWidth: 700 }}
                      aria-label="customized table"
                      className="table-width"
                    >
                      <TableHeaderView />
                      <TableBody>
                        {props?.state?.removedNftList.length > 0 &&
                          props?.state?.removedNftList.map((row, index) => (
                            <StyledTableRow key={index}>
                              {/* <StyledTableCell className="w-20"></StyledTableCell> */}
                              <StyledTableCell
                                align="left"
                                className=" table-body"
                              >
                                <img
                                  className="h-30 w-30 m-10 br-50-per"
                                  src={
                                    row?.content?.imageUrl ||
                                    "/defaultprofile.png"
                                  }
                                />
                                {row?.content?.name || ""}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className="table-body"
                              >
                                {row.reports[0]?.reason}
                                {row.reportCount > 1 ? (
                                  <span className="m-l-2 fc-6874E8">
                                    +{row.reportCount - 1}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className="table-body fc-6874E8"
                              >
                                <p
                                  className="fc-6874E8 cursor-pointer m-0"
                                  onClick={() => {
                                    // handleReview()
                                    updateSelectedReport(row);
                                    // setOpenConfirmDialogForUndoRemoveNft(true)
                                    openReviewNft(true);
                                  }}
                                >
                                  Review NFT
                                </p>
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className="table-body"
                              >
                                {moment(row?.reports[0]?.addedOn).format(
                                  "DD-MM-YYYY"
                                )}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className="table-body"
                              >
                                <p
                                  className="fc-14AD6C cursor-pointer m-0"
                                  onClick={() => {
                                    updateSelectedReport(row);
                                    setOpenConfirmDialogForUndoRemoveNft(true);
                                  }}
                                >
                                  Undo Remove
                                </p>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {(!props.state?.removedNftList ||
                    props.state?.removedNftList.length < 1) && (
                    <NoRecordPlaceholderComponent text="No removed NFT found" />
                  )}
                </Paper>
              </div>
            </div>
          </Grid>

          {!props.state?.removedNftList ||
          props.state?.removedNftList.length < 1 ? (
            ""
          ) : (
            <PaginationFooter
              state={props.state}
              list={props.state?.removedNftList || []}
              onClickPreviousPage={props.onClickPreviousPage}
              onClickNextPage={props.onClickNextPage}
            />
          )}
        </div>
      )}
      {openConfirmDialogForUndoRemoveNft && (
        <ConfirmationPopup
          isOpen={openConfirmDialogForUndoRemoveNft}
          title={"Undo Remove"}
          descriptionText={
            "This action will also unblock the owner of this NFT?"
          }
          confirmBtnText={"Ok"}
          onClickClose={setOpenConfirmDialogForUndoRemoveNft}
          onClickConfirm={onClickConfirmUndoRemoveNft}
          openReviewNft={openReviewNft}
        />
      )}
      {openReviewNftPage && (
        <ReviewRemovedNftPage
          isOpen={openReviewNftPage}
          onClose={setOpenReviewNft}
          nftReportData={selectedReport || null}
          onClickClose={setOpenConfirmDialogForUndoRemoveNft}
          //  onClickConfirm={onClickConfirmUndoRemoveNft}
          onClickDeleteReport={onClickConfirmUndoRemoveNft}
          openReviewNft={openReviewNft}
        />
      )}
    </div>
  );
}

const TableHeaderView = () => {
  return (
    <TableHead>
      {head.map((row) => (
        <TableRow>
          <StyledTableCell className="table-cell">{row.Name}</StyledTableCell>
          <StyledTableCell align="left" className="table-cell">
            {row.Reason}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell">
            {row.ReviewNFT}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell">
            {row.Review}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell">
            {row.Delete_report}
          </StyledTableCell>
        </TableRow>
      ))}
    </TableHead>
  );
};
