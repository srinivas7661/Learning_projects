import React from "react";
import styled from "styled-components";

const TableContainer = styled.table`
  table-layout: auto;
  width: 100%;
  height: 100%;
`;
const TableRow = styled.tr`
  margin-top: 20px;
  border-bottom: 1px solid #e7e7e7;
  border-radius: 1px;
`;
const TableHeaderColumn = styled.td`
  font: 700 14px/22px var(--root-font);
  padding: 20px;
  color: #50555c;
  letter-spacing: -0.408px;
  img {
    margin-left: 15px;
  }
`;

const TableData = styled.td`
  font: 400 14px/22px var(--root-font);
  padding: 20px;
`;

const EntryRewardTable = (props) => {
  return (
    <TableContainer>
      <TableRow>
        {props.header.map((item, index) => (
          <TableHeaderColumn key={index}>
            {item.name}
            {item.filterRequired ? (
              <img src="/images/filter.svg" alt="filter" />
            ) : (
              ""
            )}
          </TableHeaderColumn>
        ))}
      </TableRow>
      <tbody>
        {props.data.map((data, index) => {
          return (
            <TableRow key={index}>
              {Object.values(data).map((item, ind) => (
                <TableData key={ind}>{item}</TableData>
              ))}
            </TableRow>
          );
        })}
      </tbody>
    </TableContainer>
  );
};
export default EntryRewardTable;
