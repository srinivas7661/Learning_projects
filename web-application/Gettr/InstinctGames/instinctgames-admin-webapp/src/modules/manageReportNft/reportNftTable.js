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
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ConfirmationPopup from "../../common/components/confirmationPopup";
import ReviewNftPage from "./reviewNftPage";
import PaginationFooter from "../../common/components/paginationFooter";
import moment from "moment";
import { useState } from "react";
import NoRecordPlaceholderComponent from "../../common/components/NoRecordPlaceholderComponent";
import { history } from "../../managers/history";
import useWindowDimensions from "../../common/windowDimensions";

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
}));

const head = [
  {
    Name: "Name",
    Reported_by: "Reported by",
    Reported_on: "Reported on",
    Reason: "Reason",
    Review: "Review",
    Delete_report: "Delete report",
  },
];

export default function ReportNftTable(props) {
  const [
    openConfirmDialogForDeleteReportNft,
    setOpenConfirmDialogForDeleteReportNft,
  ] = useState(false);
  const [openConfirmDialogForDeleteNft, setOpenConfirmDialogForDeleteNft] =
    useState(false);
  const [
    openConfirmDialogForDeleteNftAndBlockUser,
    setOpenConfirmDialogForDeleteNftAndBlockUser,
  ] = useState(false);
  const [openReviewNftDialog, setOpenReviewNftDialog] = useState(false);
  const [openReviewNftPage, setOpenReviewNft] = useState(false);
  const [selectedReport, updateSelectedReport] = useState(null);
  const [inputId, setInputId] = useState("");

  const onClickConfirmDeleteReportNft = () => {
    props.deleteReportedNft(selectedReport);
    setOpenConfirmDialogForDeleteReportNft(false);
  };
  const onClickConfirmDeleteNft = () => {
    props.removeNft(selectedReport);
    setOpenConfirmDialogForDeleteNft(false);
  };
  const onClickConfirmDeleteNftAndBlockUser = (id) => {
    if (id?.length > 0) {
      props.removeNftAndBlockUser(selectedReport, id, true);
    } else {
      props.removeNft(selectedReport, false);
    }
    setOpenConfirmDialogForDeleteNftAndBlockUser(false);
  };
  const onClickDeleteReportInReviewNftDialog = (id) => {
    // if (id?.length > 0){
    props.deleteReportedNft(id);
    // }
    setOpenReviewNft(false);

    // setOpenConfirmDialogForDeleteReportNft(true);
  };
  const onClickDeleteNftInReviewNftDialog = () => {
    setOpenReviewNftDialog(false);
    setOpenConfirmDialogForDeleteNft(true);
  };
  const onClickDeleteNftAndBlockUserInReviewNftDialog = (id) => {
    setInputId(id);
    setOpenReviewNftDialog(false);
    setOpenConfirmDialogForDeleteNftAndBlockUser(true);
  };
  // const handleReview = () =>{
  //     props.navigateToTab("review-nft")
  //     // props.navigateToTab("/dashboard/manage-content/reported-nft/review-nft")
  // }
  const openReviewNft = (data) => {
    setOpenReviewNft(data);
  };
  const { height, width } = useWindowDimensions();
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
              {width < 768 && <span className="nft-sold">Reported NFT</span>}
              <div className="display-flex justify-content-between mt-20">
                <div className="report-search">
                  {width > 767 && (
                    <span className="nft-sold">Reported NFT</span>
                  )}
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="game-search report-search-form mb-search-form"
                    elevation={0}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      className="search-game-input"
                      id="search-field"
                      name="searchField"
                      value={props.state.searchField}
                      onChange={(event) => {
                        props.onChangeSearchField(event);
                      }}
                    />
                    <IconButton
                      type="submit"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      className="icon-search-btn"
                    >
                      <img src="/search.svg" />
                    </IconButton>
                  </Paper>
                </div>
                <div>
                  <Paper className="select-opt" elevation={0} onClick={iconChange}>
                  {!iconShow ? (  <select
                      className="select-opt w-124 p-l-3 outline-none select-arrow-dn"
                      name={"selectedDaysFilter"}
                      value={props.state.selectedDaysFilter || 1}
                      onChange={(event) => props.onSelectDaysFilter(event)}
                    >
                      <option value={"oneDay"}>Last 1 Day</option>
                      <option value={"monthly"}>Last 1 Month</option>
                      <option value={"yearly"}>Last 1 Year</option>
                    </select>): (<select
                      className="select-opt w-124 p-l-3 outline-none select-arrow-up"
                      name={"selectedDaysFilter"}
                      value={props.state.selectedDaysFilter || 1}
                      onChange={(event) => props.onSelectDaysFilter(event)}
                    >
                      <option value={"oneDay"}>Last 1 Day</option>
                      <option value={"monthly"}>Last 1 Month</option>
                      <option value={"yearly"}>Last 1 Year</option>
                    </select>)}
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
                        {props?.state?.reportedNftList.length > 0 &&
                          props?.state?.reportedNftList.map((row, index) => (
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
                                {row?.reports[0]?.reason}
                                {row.reportCount > 1 ? (
                                  <span className="m-l-2 fc-6874E8">
                                    +{row.reportCount-1}
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
                                    updateSelectedReport(row);
                                    openReviewNft(true);
                                    // setOpenConfirmDialogForDeleteReportNft(true)
                                    // handleReview()
                                  }}
                                >
                                  Review NFT
                                </p>
                              </StyledTableCell>
                              {/* <StyledTableCell align="left" className="table-body"><img
                                                        className="delete-icon cursor-pointer"
                                                        onClick={() => {
                                                            updateSelectedReport(row)
                                                            setOpenConfirmDialogForDeleteReportNft(true)
                                                        }}
                                                        src="/delete.svg"/></StyledTableCell> */}
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {(!props.state?.reportedNftList ||
                    props.state?.reportedNftList.length < 1) && (
                    <NoRecordPlaceholderComponent text="No reported Nft found" />
                  )}
                </Paper>
              </div>
            </div>
          </Grid>
          {(!props.state?.reportedNftList ||
                    props.state?.reportedNftList.length < 1) ?(
                     ""
                    
                  ) :
                  <PaginationFooter
                  state={props.state}
                  list={props.state?.reportedNftList || []}
                  onClickPreviousPage={props.onClickPreviousPage}
                  onClickNextPage={props.onClickNextPage}
                />}
         
        </div>
      )}
      {openConfirmDialogForDeleteReportNft && (
        <ConfirmationPopup
          isOpen={openConfirmDialogForDeleteReportNft}
          title={"Delete Report"}
          descriptionText={"Are you sure you want to delete report?"}
          confirmBtnText={"Delete"}
          onClickClose={setOpenConfirmDialogForDeleteReportNft}
          onClickConfirm={onClickConfirmDeleteReportNft}
          openReviewNft={openReviewNft}
        />
      )}

      {openConfirmDialogForDeleteNft && (
        <ConfirmationPopup
          isOpen={openConfirmDialogForDeleteNft}
          title={"Remove NFT"}
          descriptionText={"Are you sure you want to Remove NFT?"}
          confirmBtnText={"Remove"}
          onClickClose={setOpenConfirmDialogForDeleteNft}
          onClickConfirm={onClickConfirmDeleteNft}
          openReviewNft={openReviewNft}
        />
      )}
      {openConfirmDialogForDeleteNftAndBlockUser && (
        <ConfirmationPopup
          isOpen={openConfirmDialogForDeleteNftAndBlockUser}
          title={"Remove NFT and Block User"}
          descriptionText={
            "Are you sure you want to remove NFT and block user?"
          }
          confirmBtnText={"Ok"}
          onClickClose={setOpenConfirmDialogForDeleteNftAndBlockUser}
          onClickConfirm={onClickConfirmDeleteNftAndBlockUser}
          openReviewNft={openReviewNft}
          inputId={inputId}
        />
      )}

      {openReviewNftPage && (
        <ReviewNftPage
          isOpen={openReviewNftPage}
          onClose={setOpenReviewNft}
          nftReportData={selectedReport || null}
          onClickDeleteReport={onClickDeleteReportInReviewNftDialog}
          onClickDeleteNft={onClickDeleteNftInReviewNftDialog}
          onClickDeleteNftAndClocUser={
            onClickDeleteNftAndBlockUserInReviewNftDialog
          }
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
          <StyledTableCell className="table-cell w-353">
            {row.Name}
          </StyledTableCell>
          {/* <StyledTableCell ></StyledTableCell> */}
          {/* <StyledTableCell align="left"
                                 className="table-cell w-332">{row.Reported_by}</StyledTableCell> */}
          {/* <StyledTableCell align="left"
                                 className="table-cell w-260">{row.Reported_on}</StyledTableCell> */}
          <StyledTableCell align="left" className="table-cell w-329">
            {row.Reason}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-818">
            {row.Review}
          </StyledTableCell>
          {/* <StyledTableCell align="left"
                                 className="table-cell">{row.Delete_report}</StyledTableCell> */}
          {/* <StyledTableCell align="right">review, delete_report&nbsp;(g)</StyledTableCell> */}
        </TableRow>
      ))}
    </TableHead>
  );
};
