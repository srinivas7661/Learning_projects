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
import PaginationFooter from "../../common/components/paginationFooter";
import { useState } from "react";
import SubAdminDialog from "./subAminDialog";
import Utility from "../../utility";
import Tooltip from "@mui/material/Tooltip";
import NoRecordPlaceholderComponent from "../../common/components/NoRecordPlaceholderComponent";

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
    Email: "Email",
    Permission_Provided: "Permission Provided",
  },
];

export default function SubAdminsComponent(props) {
  const [openDialogForRemoveAdmin, setOpenDialogForRemoveAdmin] =
    useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [openEditAdminDialog, setEditAdminDialog] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [openReviewNftPage, setOpenReviewNft] = useState(false);

  function addAdminDetail(data) {
    props.addSubAdmin(data);
    setOpenAdminDialog(false);
  }

  function updateAdminDetail(data) {
    props.updateSubAdmin(
      { ...data, user_id: selectedAdmin.user_id },
      selectedAdmin
    );
    setEditAdminDialog(false);
  }

  function removeAdmin() {
    props.removeSubAdmin(selectedAdmin);
    setOpenDialogForRemoveAdmin(false);
  }
  function shorten(b, amountL = 38, amountR = 3, stars = 3) {
    if (b.length > 38) {
      return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
        b.length - 0,
        b.length
      )}`;
    } else {
      return b;
    }
  }
  const { handleSearchUserList } = props;

  const openReviewNft = (data) => {
    setOpenReviewNft(data);
  };
  // console.log("handleSearchUserList",props)
  return (
    <div>
      <div
        className="container h-800 mx-width-2560 mt-73 padding-79 padding-re"
        id="category_scroll"
      >
        <Grid item xs={12}>
          <div>
            <div className="display-flex justify-content-between flex-d-c">
              <div className="display-flex flex-d-c display-un p-t-b-16">
                <span className="align-self-center fs-size-22 fc-151e58">
                  Sub Admins
                </span>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="game-search report-search-form margin-t-16 width-100 h-42"
                  elevation={0}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    className="search-game-input"
                    id="search-field"
                    name="searchQuery"
                    // value={props.state.searchQuery}
                    // onChange={(event) => props.onChangeSearchField(event)}
                    onChange={(e) => {
                      var text = e.target.value;
                      var searchHash = text.replace(/\s/g, "");
                      handleSearchUserList(searchHash);
                    }}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    className="icon-search-btn"
                  >
                    <img src="/search.svg" alt={"image"} />
                  </IconButton>
                </Paper>
              </div>
              <div>
                <button
                  className="w-132 h-34 bg-6874E8 font-size-14 fc-fff br-4 border-none width-100 h-42"
                  onClick={() => {
                    setOpenAdminDialog(true);
                    setSelectedAdmin(null);
                  }}
                >
                  Add Sub Admin
                </button>
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
                      {props.state.filterUserList &&
                        props.state.filterUserList.map((row, index) => (
                          <StyledTableRow key={index}>
                            {/* <StyledTableCell className="w-20"></StyledTableCell> */}
                            {/* <Tooltip title={row?.name || ''} describeChild placement="bottom-start" className="cursor-pointer"> */}
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              {row?.name || ""}
                            </StyledTableCell>
                            {/* </Tooltip> */}
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              {row.email || ""}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              {Utility.getPermissionListFromRoleString(
                                row?.user_metadata?.role || ""
                              )}
                            </StyledTableCell>

                            <StyledTableCell
                              align="left"
                              className="table-body fc-6874E8 w-195"
                            >
                              <p
                                className="fc-6874E8 cursor-pointer m-auto"
                                onClick={() => {
                                  setEditAdminDialog(true);
                                  setSelectedAdmin(row);
                                }}
                              >
                                Edit
                              </p>
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body padding-table-29"
                            >
                              <p
                                className="fc-FC4C4C cursor-pointer m-auto"
                                onClick={() => {
                                  setOpenDialogForRemoveAdmin(true);
                                  setSelectedAdmin(row);
                                }}
                              >
                                Remove
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {(!props.state?.filterUserList ||
                  props.state?.filterUserList.length < 1) && (
                  <NoRecordPlaceholderComponent text="No sub admin found"/>
                )}
              </Paper>
            </div>
          </div>
        </Grid>
        {/* <PaginationFooter state={props.state}
                                  list={props.state?.usersList || []}
                                  onClickPreviousPage={props.onClickPreviousPage}
                                  onClickNextPage={props.onClickNextPage}
                /> */}
      </div>
      {openAdminDialog && (
        <SubAdminDialog
          isOpen={openAdminDialog}
          title={"Add Sub Admin"}
          buttonText={"Add"}
          closeDialog={setOpenAdminDialog}
          onClickHandler={addAdminDetail}
          selectedAdmin={selectedAdmin}
        />
      )}
      {openEditAdminDialog && (
        <SubAdminDialog
          isOpen={openEditAdminDialog}
          title={"Update Sub Admin"}
          buttonText={"Update"}
          closeDialog={setEditAdminDialog}
          onClickHandler={updateAdminDetail}
          selectedAdmin={selectedAdmin}
        />
      )}
      {openDialogForRemoveAdmin && (
        <ConfirmationPopup
          isOpen={openDialogForRemoveAdmin}
          title={"Remove Sub Admin"}
          descriptionText={`Are you sure you want to remove <span style="color: #6874E8">${
            selectedAdmin?.name || ""
          }</span> as Sub Admin?`}
          confirmBtnText={"Done"}
          onClickClose={setOpenDialogForRemoveAdmin}
          onClickConfirm={removeAdmin}
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
          <StyledTableCell className="table-cell w-267">
            {row.Name}
          </StyledTableCell>
          {/* <StyledTableCell ></StyledTableCell> */}
          <StyledTableCell align="left" className="table-cell w-351">
            {row.Email}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-347">
            {row.Permission_Provided}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell" />
          <StyledTableCell align="left" className="table-cell" />

          {/* <StyledTableCell align="right">review, delete_report&nbsp;(g)</StyledTableCell> */}
        </TableRow>
      ))}
    </TableHead>
  );
};
