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
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export default function TopNftTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLoadMore = (event) => {
    if (rowsPerPage + 5 > rows.length) {
      let max = rows.length - rowsPerPage;
      setRowsPerPage(rowsPerPage + max);
    } else {
      setRowsPerPage(rowsPerPage + 5);
    }
  };
  const handleLoadLess = (event) => {
    if (rowsPerPage === rows.length) {
      setRowsPerPage(5);
    } else {
      setRowsPerPage(rowsPerPage - 5);
    }
  };

  // console.log("roes" , rows.length)
  console.log("handleLoadMore", rowsPerPage);

  const exportToCSV = (data, fileName) => {
    const csvData = data.map((obj) => {
      obj.Name = obj.name;
      obj.Volume = obj.calories;
      obj.Owners = obj.fat;
      delete obj.name;
      delete obj.calories;
      delete obj.fat;
      delete obj.carbs;
      delete obj.protein;
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const finaldata = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(finaldata, fileName + fileExtension);
  };

  return (
    <>
      <div className="display-flex justify-content-between">
        <span className="nft-sold">Top NFTs </span>
        <div className="display-flex align-items-baseline">
          <button
            className="export-btn"
            onClick={() => exportToCSV(rows, "topNfts")}
          >
            Export
          </button>
          <Paper className="select-opt" elevation={0}>
            <select className="select-opt w-122 p-l-3 p-l-6">
              <option>Last 7 days</option>
            </select>
          </Paper>
        </div>
      </div>
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
                {/* <StyledTableCell ></StyledTableCell> */}
                <StyledTableCell align="left" className="table-cell">
                  Volume
                </StyledTableCell>
                <StyledTableCell align="left" className="table-cell">
                  Owners
                </StyledTableCell>
                {/* <StyledTableCell align="left">Items</StyledTableCell> */}
                {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.name}>
                    {/* <StyledTableCell className="w-20"><img className="h-30 w-30" src={"/defaultprofile.png"}/></StyledTableCell> */}
                    <StyledTableCell align="left" className="w-500 table-body">
                      <img
                        className="h-30 w-30 m-10"
                        src={"/defaultprofile.png"}
                      />
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="table-cell">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="table-cell">
                      {row.fat}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className="table-cell"
                    ></StyledTableCell>
                    {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="load-more h-52">
          {rowsPerPage === rows.length ? (
            <button onClick={handleLoadLess} className="load-btn">
              {" "}
              View Less <img src="/upArrow.svg" />{" "}
            </button>
          ) : (
            <button onClick={handleLoadMore} className="load-btn">
              {" "}
              View More <img src="/arrow.svg" />{" "}
            </button>
          )}
        </div>
      </Paper>
    </>
  );
}
