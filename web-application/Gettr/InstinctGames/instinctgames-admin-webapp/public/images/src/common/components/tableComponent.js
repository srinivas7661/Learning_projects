import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  border-spacing: 0 6px;
  border-radius: 7px;
  style="overflow-x:auto;"
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
  padding-right: 20px;
`;
const HeadColumn = styled.th`
  padding: 30px 0 9px 15px;
  text-align: left;

  font-weight: 300;
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

  border-radius: 7px;
  opacity: 1;
  cursor: pointer;
  border-top: 1px solid #e6e6e6;
`;
const BodyColumn = styled.td`
  padding: 20px 8px 15px 15px;
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  color: #3e344b;
  &:first-child {
    border-radius: 0 0 0 0;
  }
  &:last-child {
    border-radius: 0 0 0 0;
  }
`;

const BodyColumnRight = styled.td`
  padding: 20px 0px 20px 15px;
  text-align: center;
  font-size: 16px;
  // font-weight: 400;

  color: #343434;
  &:first-child {
    border-radius: 0 0 0 0;
  }
  &:last-child {
    border-radius: 0 0 0 0;
  }
`;
const HeadColumnRight = styled.th`
  padding: 9px 0 9px 15px;
  text-align: center;
  font-size: 18px;
  font-weight: 300;

  color: #ffffff;
  &:first-child {
    border-radius: 5px 0 0 0;
  }
  &:last-child {
    border-radius: 0 5px 0 0;
  }
`;
export default {
  Table,
  TableHead,
  TableBody,
  HeadColumn,
  BodyColumn,
  BodyRow,
  BodyColumnRight,
  HeadColumnRight,
};
