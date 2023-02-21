import * as React from "react";
// import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { history } from "../../managers/history";
import moment from "moment";
import RequestDetailsPage from "./requesteddetails";
import useWindowDimensions from "../../common/windowDimensions";
import AdminModule from "../../services/adminMicroService";
import styled from "styled-components";


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
    cursor: "pointer",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ImageDiv = styled.img`
  width: 25px;
  height: 25px;
  // background: gray 0% 0% no-repeat padding-box;
  border-radius: 50%;
  margin: 0px 15px 0px 0px;
`;

const head = [
  {
    Collections: "Name",
    Volume: "Contract",
    Owner: "Contact person",
    Items: "Email",
    Date: "Date",
    Status: "Status",
  },
];

export default function RequestedTokens(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openRequestDetailsPage, setOpenRequestDetailsPage] =
    React.useState(false);
  const [updateDetails, setUpdateDetails] = React.useState(null);
  const [requestToken, setRequestToken] = React.useState([])
  const [filterType, setFilterType] = React.useState("All")
  const [filterDuration, setFilterDuration] = React.useState("month")

  const optTime = [
    {
      key: "month",
      type: "Last 1 Month",
    },
    {
      key: "day",
      type: "Last 1 Day",
    },
    {
      key: "year",
      type: "Last 1 Year",
    },
  ];

  const optType = [
    {
      key: "All",
      type: "All",
    },
    {
      key: "Review",
      type: "Review Pending",
    },
    {
      key: "Payment",
      type: "Payment Pending",
    },
  ];

  React.useEffect(() => {
    tokensRequested(filterType,filterDuration);
  },[filterType,filterDuration])

  const tokensRequested = async (type,duration) => {
    try {
      let reqData = {
        type: type,
        duration: duration,
      };
      const result = await AdminModule.requestedToken(reqData);
      if (result) {
        setRequestToken(result)
      }
    } catch (e) {
      setRequestToken([])
    }
  };

  // const handleChangePage = () => {
  //   history.push("/dashboard/tokens-list/requested-details");
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const openReviewNft = (data) => {
    setOpenRequestDetailsPage(data);
  };

  const { height, width } = useWindowDimensions();

  return (
    <div>
      <div className="tb-pd-23 desktop-pad-71 mb-list-pd-req tb-padding-req">
        {!openRequestDetailsPage && (
          <>
            {width < 768 && (
              <span
                style={{
                  color: "#151e58",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Requested Tokens
              </span>
            )}
            <div className="header-div mb-margin-9" style={{ width: "100%" }}>
              <div>
                {width > 767 && (
                  <span
                    style={{
                      color: "#151e58",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Requested Tokens
                  </span>
                  
                )}
                <span className='statusUpperSpan'>
                  <span className="statusLowerSpan">Status</span>
                <select
                  onChange={(e) => setFilterType(e.target.value)}
                  className="dropdown-requested outline-none mb-dropdown-req"
                  style={{ width: "100px" }}
                >
                  {optType.map((data) => {
                    return (
                      <>
                        <option value={data.key}>{data.type}</option>
                      </>
                    );
                  })}
                </select>
                </span>
              </div>

              <select
                onChange={(e) => setFilterDuration(e.target.value)}
                className="dropdown-requested outline-none"
                style={{ width: "154px" }}
              >
                {optTime.map((data) => {
                  return (
                    <>
                      <option value={data.key}>{data.type}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <Paper elevation={0} style={{ width: "100%" }}>
              <TableContainer
                component={Paper}
                className="table-root-collection h-463"
              >
                <Table
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                  className="table-width"
                >
                  <TableHead>
                    {head.map((row) => (
                      <TableRow className="w-100-per">
                        <StyledTableCell className="table-cell-rq w-18-per">
                          {row.Collections}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className="table-cell-rq w-28-per"
                        >
                          {row.Volume}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className="table-cell-rq w-16-per"
                        >
                          {row.Owner}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className="table-cell-rq w-18-per"
                        >
                          {row.Items}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className="table-cell-rq w-8-per"
                        >
                          {row.Date}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className="table-cell-rq w-12-per"
                        >
                          {row.Status}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {requestToken &&
                      requestToken?.length >= 1 &&
                      requestToken.map((row, idx) => (
                        <StyledTableRow key={row._id}>
                          {/* <StyledTableCell align="left" className="table-body">
                        <img
                          className="h-30 w-30 m-10"
                          src="/images/token.svg"
                        />
                        {row.name}
                      </StyledTableCell> */}
                          <StyledTableCell align="left" className="table-body">
                          <ImageDiv src="/images/token.svg"/>
                            {row?.requestedTokenContent?.tokenName || ""}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="table-body w-28-per"
                          >
                            {row?.requestedTokenContent?.tokenAddress || ""}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="table-body w-16-per"
                          >
                            {row?.requestedTokenContent?.contactPerson || ""}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="table-body w-18-per"
                          >
                            {row?.requestedTokenContent?.email || ""}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="table-body w-8-per"
                          >
                            {moment(
                              row?.requestedTokenContent?.addedOn || ""
                            ).format("DD-MM-YYYY")}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="table-body w-12-per padding-table-29"
                          >
                            {row?.requestedTokenContent?.isApproved === true ? (
                              <button
                                onClick={() => {
                                  setUpdateDetails(row?.requestedTokenContent);
                                  openReviewNft(true);
                                }}
                                className="fc-6874E8 cursor-pointer m-0 payment-btn"
                              >
                                <span className="payment-btn-text">
                                  Payment Pending
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setUpdateDetails(row?.requestedTokenContent);
                                  openReviewNft(true);
                                }}
                                className="fc-6874E8 cursor-pointer m-0 review-btn"
                              >
                                <span className="review-btn-text">
                                  Review Pending
                                </span>
                              </button>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}
      </div>
      {openRequestDetailsPage && (
        <RequestDetailsPage
          openReviewNft={openReviewNft}
          updateDetails={updateDetails}
        />
      )}
    </div>
  );
}
