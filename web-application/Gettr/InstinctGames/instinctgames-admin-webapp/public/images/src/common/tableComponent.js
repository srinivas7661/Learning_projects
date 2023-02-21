import styled from "styled-components";

const Table = styled.table`
  width: 96%;
  white-space: nowrap;
  margin-top: 27px;
  border-spacing: 0 6px;
  padding-right: 40px;
  margin-left: 19px;
`;
const TableHead = styled.thead`
  background-color: #ffffff;
`;
const TableBody = styled.tbody`
  width: 100%;
  border-collapse: separate;
  white-space: nowrap;
  border-spacing: 0 10px;
  padding-right: 20px;
`;
const HeadColumn = styled.th`
  padding: 9px 0 9px 10px;
  text-align: left;
  font-size: 14px;
  width: 320px;
  color: #7d84c0;

  &:first-child {
    border-radius: 5px 0 0 0;
  }
  &:last-child {
    border-radius: 0 5px 0 0;
  }
`;
const BodyRow = styled.tr`
  background-color: #ffffff;
  cursor: pointer;
  border-top: 0.3px solid #acacac;
`;
const BodyColumn = styled.td`
  padding: 20px 0 20px 11px;
  text-align: left;
  font-size: 16px;
  width: 320px;
  color: #3e344b;
  &:first-child {
    border-radius: 0 0 0 0;
  }
  &:last-child {
    border-radius: 0 0 0 0;
  }
`;
const BodyColumnRight = styled.td`
  padding: 20px 0 20px 15px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  width: 320px;
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
  font-weight: 600;
  width: 320px;
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
