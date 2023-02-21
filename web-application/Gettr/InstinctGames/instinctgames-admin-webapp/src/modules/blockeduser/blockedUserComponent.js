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
    Delete_report: "Block",
  },
];

export default function BlockedUserComponent(props) {
  const [openConfirmDialogForUnBlockUser, setOpenConfirmDialogForUnBlockUser] =
    useState(false);
  const [selectedReport, updateSelectedReport] = useState(null);
  const [openReviewNftPage, setOpenReviewNft] = useState(false);

  const onClickConfirmUnBlockUser = () => {
    props.unblockUser(selectedReport);
    setOpenConfirmDialogForUnBlockUser(false);
  };
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
      <div
        className="container container-report padding-79 tab-padding-32 mb-list-pd mb-report-cont tab-report-cont"
        id="category_scroll"
      >
        <Grid item xs={12}>
          <div>
            {width < 768 && <span className="nft-sold">Blocked User</span>}
            <div className="nft-div mt-20">
              <div className="report-search">
                {width > 767 && <span className="nft-sold">Blocked User</span>}
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
                    // value={props.state.searchField}
                    onChange={(e) => props.onSearch(e.target.value)}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    className="icon-search-btn"
                  >
                    <img src="/search.svg" alt="search" />
                  </IconButton>
                </Paper>
              </div>
              <div>
                <Paper className="select-opt" elevation={0} onClick={iconChange}>
                {!iconShow ? ( <select
                    className="select-opt w-124 p-l-3 outline-none select-arrow-dn"
                    name={"selectedDaysFilter"}
                    value={props.state.duration || "oneDay"}
                    onChange={(event) => props.onSelectDaysFilter(event)}
                  >
                    <option value={"oneDay"}>Last 1 Day</option>
                    <option value={"monthly"}>Last 1 Month</option>
                    <option value={"yearly"}>Last 1 Year</option>
                  </select>):( <select
                    className="select-opt w-124 p-l-3 outline-none select-arrow-up"
                    name={"selectedDaysFilter"}
                    value={props.state.duration || "oneDay"}
                    onChange={(event) => props.onSelectDaysFilter(event)}
                  >
                    <option value={"oneDay"}>Last 1 Day</option>
                    <option value={"monthly"}>Last 1 Month</option>
                    <option value={"yearly"}>Last 1 Year</option>
                  </select>)}
                  {/* <select
                    className="select-opt w-124 p-l-3 outline-none"
                    name={"selectedDaysFilter"}
                    value={props.state.duration || "oneDay"}
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
                      {props.state?.removedNftList &&
                        props.state?.removedNftList?.length > 0 &&
                        props?.state?.removedNftList?.map((row, index) => (
                          <StyledTableRow key={index}>
                            {/* <StyledTableCell className="w-20"></StyledTableCell> */}
                            <StyledTableCell
                              align="left"
                              className=" table-body"
                            >
                              <img
                                className="h-30 w-30 m-10 br-50-per"
                                alt="profile"
                                src={
                                  row?.profileImage || "/defaultprofile.png"
                                }
                              />
                              {row?.firstName || ""}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                             {row?.reportedInfo?.reportedBy || ""}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              {moment(row?.addedOn).format("DD-MM-YYYY")}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                                {row?.reportedInfo?.reason || ""}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              <p
                                className="fc-6874E8 cursor-pointer m-0"
                                onClick={() => {
                                  updateSelectedReport(row);
                                  setOpenConfirmDialogForUnBlockUser(true);
                                }}
                              >
                                Unblock user
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {(!props.state?.removedNftList ||
                  props.state?.removedNftList.length < 1) && (
                  <NoRecordPlaceholderComponent text="No blocked user found" />
                )}
              </Paper>
            </div>
          </div>
        </Grid>

        {(!props.state?.removedNftList ||
                    props.state?.removedNftList.length < 1) ?(
                     ""
                    
                  ) :
                  <PaginationFooter
                  state={props.state}
                  list={props.state?.removedNftList || []}
                  onClickPreviousPage={props.onClickPreviousPage}
                  onClickNextPage={props.onClickNextPage}
                />}
      </div>
      {openConfirmDialogForUnBlockUser && (
        <ConfirmationPopup
          isOpen={openConfirmDialogForUnBlockUser}
          title={"Unblock User"}
          descriptionText={"Are you sure you want to unblock this user?"}
          confirmBtnText={"Ok"}
          onClickClose={setOpenConfirmDialogForUnBlockUser}
          onClickConfirm={onClickConfirmUnBlockUser}
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
          <StyledTableCell className="table-cell w-272">
            {row.Name}
          </StyledTableCell>
          {/* <StyledTableCell ></StyledTableCell> */}
          <StyledTableCell align="left" className="table-cell w-211">
            {row.Reported_by}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-202">
            {row.Reported_on}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-201">
            {row.Reason}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-369">
            {row.Delete_report}
          </StyledTableCell>
          {/* <StyledTableCell align="right">review, delete_report&nbsp;(g)</StyledTableCell> */}
        </TableRow>
      ))}
    </TableHead>
  );
};
