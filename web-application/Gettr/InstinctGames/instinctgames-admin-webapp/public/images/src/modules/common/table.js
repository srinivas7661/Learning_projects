import styled from "styled-components";

const Table = styled.table`
  width: 98%;
  border-collapse: separate;
  white-space: nowrap;
  margin: 20px;
`;
const TableHead = styled.tr`
  width: 90%;
 
`;
const TableBody = styled.tbody`
  width: 10%;
  height: 100%;
`;
const HeadColumn = styled.th`
  text-align: left;
  font-size: 16px;
  font-weight: 300;
  width:380px;
  color:#668cff;
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
`;
const BodyColumn = styled.td`
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  width: 30px;
  color:#343434;
  border-top: 0.10000001192092896px solid #f2f2f2;
  padding-top: 10px;
  padding-bottom: 10px;
   &:first-child {
    border-radius: 0 0 0 0;
   }
   &:last-child {
    border-radius: 0 0 0 0;
   }
 `;
const BodyColumnRight = styled.td`
  text-align: center;
  font-size: 16px;
  width:320px;
  color:#343434;
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
  width:320px;
  color:#ffffff;
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
}