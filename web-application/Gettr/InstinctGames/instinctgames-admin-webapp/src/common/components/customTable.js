import React from "react";
import styled from "styled-components";
import { Paper, TableBody } from "@material-ui/core";

const ParentContainer = styled.div`
  display: "flex";
  flex-direction: "column";
  padding: 10px 10px 0px 10px;
  width: 100%;
  height: 800px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000d;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  opacity: 1;
`;
const TableContainer = styled.div`
  overflow: auto;
`;
const TableCell = styled.td`
  padding: 10px 0 10px 10px;
  width: ${(props) => (props.tableCellWidth ? props.tableCellWidth : "")};
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #535877;
`;
const TableHeader = styled.td`
  padding: 10px 0 10px 10px;
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #151e58;
`;
const TableRow = styled.tr`
  cursor: ${(props) => (props.isPointer ? "pointer" : "")};
  height: 44px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  &:nth-child(even) {
    background-color: #fff;
  }
`;
const Table = styled.table`
  display: flex;
  display: table;
  border-collapse: collapse;
`;
const ImageDiv = styled.img`
  width: 25px;
  height: 25px;
  background: gray 0% 0% no-repeat padding-box;
  border-radius: 50%;
  margin: 0px 15px 0px 5px;
`;
const CustomTable = ({ columns, rows, maxWidth, tableCellWidth }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ParentContainer component={Paper}>
      <TableContainer>
        <Table maxWidth={maxWidth}>
          <tr>
            {columns && columns.length
              ? columns.map((column) => <TableHeader>{column}</TableHeader>)
              : ""}
          </tr>

          <TableBody>
            {rows && rows.length
              ? rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell tableCellWidth={tableCellWidth}>
                    <ImageDiv />
                    {row.name}
                  </TableCell>
                  <TableCell tableCellWidth={tableCellWidth}>
                    <ImageDiv />
                    {row.reportBy}
                  </TableCell>
                  <TableCell tableCellWidth={tableCellWidth}>
                    {row.reportOn}
                  </TableCell>
                  <TableCell tableCellWidth={tableCellWidth}>
                    {row.reason}
                  </TableCell>
                  <TableCell tableCellWidth={tableCellWidth}>
                    {row.removedOn}
                  </TableCell>
                  <TableCell tableCellWidth={tableCellWidth}>
                    {row.reportView}
                  </TableCell>
                </TableRow>
              ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </ParentContainer>
  );
};

export default CustomTable;
