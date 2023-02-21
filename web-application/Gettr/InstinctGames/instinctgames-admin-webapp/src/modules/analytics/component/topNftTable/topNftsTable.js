import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Loader from "../loader";
import NoRecordPlaceholderComponent from "../../../../common/components/NoRecordPlaceholderComponent";

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

export default function TopNftTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLoadMore = (event) => {
    if (rowsPerPage + 5 > data?.length) {
      let max = data?.length - rowsPerPage;
      setRowsPerPage(rowsPerPage + max);
    } else {
      setRowsPerPage(rowsPerPage + 5);
    }
  };
  const handleLoadLess = (event) => {
    if (rowsPerPage === data?.length) {
      setRowsPerPage(5);
    } else {
      setRowsPerPage(rowsPerPage - 5);
    }
  };

  React.useEffect(() => {
    if (props.opt === "1") {
      setData(props?.oneDaysData);
    } else if (props.opt === "2") {
      setData(props?.oneMonthData);
    } else if (props.opt === "3") {
      setData(props?.oneYearData);
    }
  }, [props]);

  // console.log("handleLoadMore", props);

  return (
    <>
      <Paper elevation={0} className="table-root-collection pb-0 m-t-25">
        <TableContainer
          component={Paper}
          className="table-root-collection pb-0"
        >
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            className="table-width"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell className="table-cell">Name</StyledTableCell>
                <StyledTableCell align="left" className="table-cell">
                  Volume
                </StyledTableCell>
                <StyledTableCell align="left" className="table-cell">
                  Owners
                </StyledTableCell>
                <StyledTableCell align="left" className="table-cell">
                  
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.loading === true ? (
                <StyledTableRow style={{ background: "none" }}>
                  <StyledTableCell colspan={12}>
                    <div className="homePageLoader">
                      <Loader />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                data &&
                data.length >= 1 &&
                data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell
                        align="left"
                        className="w-500 table-body mb-w-251"
                      >
                        <img
                          className="h-30 w-30 m-10 br-50-per"
                          src={row?.imageUrl || "/defaultprofile.png"}
                        />
                        {row.nftName}
                      </StyledTableCell>
                      <StyledTableCell align="left" className="table-cell">
                        {row.volume + " " + "BNB"}
                      </StyledTableCell>
                      <StyledTableCell align="left" className="table-cell">
                        {row.ownerCount}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className="table-cell"
                      ></StyledTableCell>
                    </StyledTableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {(!data || data.length < 1) && <NoRecordPlaceholderComponent text="No Nft found" />}
        {data && data.length > 0 && (
          <div className="load-more h-52">
            {rowsPerPage === data?.length ? (
              <button onClick={handleLoadLess} className="load-btn">
                {" "}
                View Less <img src="/upArrow.svg" />
              </button>
            ) : (
              <button onClick={handleLoadMore} className="load-btn">
                {" "}
                View More <img src="/arrow.svg" />{" "}
              </button>
            )}
          </div>
        )}
      </Paper>
    </>
  );
}
