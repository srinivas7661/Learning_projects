import React from "react";
import styled from "styled-components";
import { Checkbox, Paper, TableBody } from "@material-ui/core";
import { Row, Column } from "simple-flexbox";

const ParentContainer = styled.div`
  display: "flex";
  flex-direction: "column";
  padding: 10px 10px 0px 20px;
  margin-bottom: 30px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 15px #00000012;
  border-radius: 7px;
  opacity: 1;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const HeaderText = styled.div`
  text-align: left;
  font: normal normal bold 16px Nunito;
  letter-spacing: 0px;
  margin-top: 10px;
  margin-left: 10px;
  color: #686868;
  opacity: 1;
`;

const Devider = styled.hr`
margin: 20px 0 0 0;
border-top: 0.3px solid rgba(0, 0, 0, 0.1);
`


const TableContainer = styled.div`
overflow: auto;
`;

const TableCell = styled.td`
text-align: left;
font: normal normal normal 16px Nunito;
color: #3E344B;
padding: 10px 0 10px 10px;
white-space:nowrap;
width:${props => props.tableCellWidth ? props.tableCellWidth : ""};
@media (max-width:1024px){
  font: normal normal normal 14px Nunito;
  width: 12%;
}
`
const TableHeader = styled.td`
    color: #7D84C0;
    font-weight: bold;
    text-align: left;
    padding: 10px 0 10px 10px;
    white-space:nowrap;
    font: normal normal bold 16px Nunito;
@media (max-width:1024px){
  font: normal normal bold 14px Nunito;
  width: 12%;
}
`
const TableRow = styled.tr`
  border-top: 0.3px solid rgba(0, 0, 0, 0.1);
  cursor: ${props => props.isPointer ? "pointer" : ""};
`

const Table = styled.table`
width: 100%;
border-color: grey;
width: 100%;
display: table;
border-spacing: 0;
border-collapse: collapse;
@media (max-width:1024px){
min-width: ${props => props.minWidth ? props.minWidth : ""};
}
`

const CustomTable = ({
  tableHeading,
  columns,
  rows,
  isCheckBoxVisible,
  headerBorder,
  minWidth,
  tableCellWidth
}) => {

  return (
    <ParentContainer component={Paper} >
      {tableHeading ? (
        <Row className="overflow-auto">
          <HeaderText>
            <Column align="left" className="fw-bold">
              {tableHeading}
            </Column>
          </HeaderText>
        </Row>
      ) : null}
      {headerBorder ? <Devider /> : ""}
      <TableContainer>
        <Table minWidth={minWidth}>
          <tr >
            {isCheckBoxVisible ? (
              <TableHeader>
                <Checkbox className="checkbox-side" size="small" color="default" onClick={() => true} />
              </TableHeader>
            ) : null}
            {columns && columns.length
              ? columns.map((column) => (
                <TableHeader>
                  {column}
                </TableHeader>
              ))
              : ""}
          </tr>

          <TableBody>
            {rows && rows.length
              ? rows.map((row, index) => (
                <TableRow
                  isPointer={row.handleClick ? true : false}
                  key={index}
                  onClick={(event) => {
                    if (
                      !row.handleClick ||
                      (isCheckBoxVisible && event?.target?.type === "checkbox")
                    )
                      return;
                    row.handleClick();
                  }}
                >
                  {isCheckBoxVisible ? (
                    <TableCell>
                      <Checkbox className="checkbox-side" color="default" size="small" onClick={() => true} />
                    </TableCell>
                  ) : null}
                  {Object.values(row).map((item) =>
                    typeof item !== "function" ? (
                      <TableCell tableCellWidth={tableCellWidth}>
                        {item}
                      </TableCell>
                    ) : (
                      ""
                    )
                  )}
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
