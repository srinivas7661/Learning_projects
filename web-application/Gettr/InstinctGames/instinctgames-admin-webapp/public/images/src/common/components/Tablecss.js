import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  margin-top: 30px;
  border-spacing: 0 6px;
  box-shadow: 0px 4px 15px #00000012;
  border-radius: 7px;
  overflow-x:auto;
  opacity: 1;
  
  
    @media (max-width: 768px) {
    padding:0 20px 0 20px; 
    }
`;
const TableHead = styled.thead`
  background-color: #ffffff;
  border-radius: 7px;
  opacity: 1;

`;
const TableBody = styled.tbody`
  white-space: nowrap;
  border-spacing: 0 4px;
  border-top: 1px solid #e6e6e6;
`;
const HeadColumn = styled.th`
  padding: 10px 10px 10px 10px;
  text-align: left;
  height: 50px;
  color: #7d84c0;
  font: normal normal bold 14px/19px Nunito;

  &:first-child {
    border-radius: 5px 0 0 0;
  }
  &:last-child {
    border-radius: 0 5px 0 0;
  }
`;

const BodyRow = styled.tr`
  background-color: #ffffff 0% 0% no-repeat padding-box;
  width: 200px;
  border-radius: 7px;
  opacity: 1;
  cursor: pointer;
  border-top: 1px solid #ccc;

`;
const BodyColumn = styled.td`
  padding: 10px 10px 10px 10px;
  font: normal normal normal 16px/22px Nunito;

  color: #343434;
  &:first-child {
    border-radius: 0 0 0 0;
  }
  &:last-child {
    border-radius: 0 0 0 0;
  }
`;

export default {
  Table,
  TableHead,
  TableBody,
  HeadColumn,
  BodyColumn,
  BodyRow,
};
