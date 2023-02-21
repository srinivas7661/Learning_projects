import * as React from "react";
import { useHistory } from "react-router";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
//import TablePagination from '@mui/material/TablePagination';
import NoRecordPlaceholderComponent from "../../common/components/NoRecordPlaceholderComponent";
import RequestDetailsPage from "../requestedtokens/requesteddetails";

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
    Collections: "Name",
    Volume: "Contract",
    Owner: "Contact person",
    Items: "Email",
    Date: "Date",
  },
];

export default function ListedToken(props) {
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openRequestDetailsPage, setOpenRequestDetailsPage] =
    React.useState(false);
  const [updateDetails, setUpdateDetails] = React.useState(null);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const openReviewNft = (data) => {
    setOpenRequestDetailsPage(data);
  };

  return (
    <div className="m-t-52 mb-t-16 tab-margin-16">
      {!openRequestDetailsPage && (
        <>
          <div className="padding-listed-79 padding-tab-list mb-list-pd">
            <span className="fc-151e58 fs-size-22">Listed Tokens</span>
          </div>
          <div className="padding-table-79 padding-tab-table-flt mb-table-pd">
            <Paper elevation={0} className="table-root-collection">
              <TableContainer
                component={Paper}
                className="table-root-collection"
              >
                <Table aria-label="customized table" className="table-width"> 
                  <TableHead>
                    {head.map((row) => (
                      <TableRow>
                        <StyledTableCell className="table-cell">
                          {row.Collections}
                        </StyledTableCell>
                        <StyledTableCell align="left" className="table-cell">
                          {row.Volume}
                        </StyledTableCell>
                        <StyledTableCell align="left" className="table-cell">
                          {row.Owner}
                        </StyledTableCell>
                        <StyledTableCell align="left" className="table-cell">
                          {row.Items}
                        </StyledTableCell>
                        <StyledTableCell align="left" className="table-cell">
                          {row.Date}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {props?.state?.approvedTokens &&
                      props?.state?.approvedTokens?.length > 0 &&
                      props?.state?.approvedTokens.map((row) => {
                        return (
                          <StyledTableRow
                            className="cursor-pointer"
                            key={row.name}
                            onClick={() => {
                              setUpdateDetails(row);
                              openReviewNft(true);
                            }}
                          >
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              <img
                                className="h-30 w-30 m-10"
                                src={"/images/Binance.png"}
                              />
                              {row.tokenName}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              {row.tokenAddress}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              {row.contactPerson}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body"
                            >
                              {row.email}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className="table-body date-cell "
                            >
                              {moment(row.modifiedOn).format("DD-MM-YYYY")}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {(!props.state?.approvedTokens ||
                props.state?.approvedTokens.length < 1) && (
                <NoRecordPlaceholderComponent text="No listed token found" />
              )}
            </Paper>
          </div>
        </>
      )}

      {openRequestDetailsPage && (
        <RequestDetailsPage
          openReviewNft={openReviewNft}
          updateDetails={updateDetails}
        />
      )}
    </div>
  );
}
