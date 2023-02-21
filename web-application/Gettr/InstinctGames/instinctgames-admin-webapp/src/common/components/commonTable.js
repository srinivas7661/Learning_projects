import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffff",
    color: "black",
    borderBottom:"none !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom:"none !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const head = [
  {
  Collections:"Collections",
  Volume:"Volume",
  Owner:"Owner",
  Items:"Items"
  }
];
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Eclair', 262, 16.0, 24, 6.0),
   createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

];

export default function CommonTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    
    
  return (
      <Paper elevation={0} className="table-root-collection">
    <TableContainer component={Paper} className="table-root-collection">
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className="table-width">
        <TableHead>
          {head.map((row)=>(
          <TableRow>
          <StyledTableCell className="table-cell">{row.Collections}</StyledTableCell>
            {/* <StyledTableCell ></StyledTableCell> */}
            <StyledTableCell align="left" className="table-cell">{row.Volume}</StyledTableCell>
            <StyledTableCell align="left" className="table-cell">{row.Owner}</StyledTableCell>
            <StyledTableCell align="left" className="table-cell">{row.Items}</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
                {/* <StyledTableCell className="w-20"></StyledTableCell> */}
              <StyledTableCell  align="left" className="w-500 table-body">
              <img className="h-30 w-30 m-10" src={"/defaultprofile.png"}/>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left" className="table-body">{row.calories}</StyledTableCell>
              <StyledTableCell align="left" className="table-body">{row.fat}</StyledTableCell>
              <StyledTableCell align="left" className="table-body">{row.carbs}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  );
}