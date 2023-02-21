import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  border-spacing: 0 6px;
  
  background: #FFFFFF 0% 0% no-repeat padding-box;

  border-radius: 7px;
  overflow-x:auto;
  opacity: 1;
  
  
    @media (max-width: 768px) {
    padding:0 20px 0 20px;
   
   
      }
`;
const TableHead = styled.thead`
  background-color: #FFFFFF;
  
  border-bottom:1px solid #E8E8E8;

border-radius: 7px;
opacity: 1;



  // font-weight:600;
`;

const TableBody = styled.tbody`
  
 
  white-space: nowrap;
  border-spacing: 0 4px;
  padding-right: 20px;
  
`;
const HeadColumn = styled.th`
  padding: 9px 0 9px 15px;
  color: var(--unnamed-color-7d84c0);
text-align: left;
font: normal normal bold 14px/19px Nunito;
letter-spacing: 0px;
color: #7D84C0;
opacity: 1;
  text-align: left;
  
  font-weight: 300;

  font: normal normal bold 14px/19px Nunito;
  
  
  &:first-child {
  border-radius: 5px 0 0 0;
  }
  &:last-child {
  border-radius: 0 5px 0 0;
  }
`;

const BodyRow = styled.tr`
  background-color: #FFFFFF 0% 0% no-repeat padding-box;
   
  border-radius: 7px;
  opacity: 1;
  cursor: pointer;
  
`;
const BodyColumn = styled.td`
  padding: 20px 0 15px 15px;
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  font-weight: 400;

  color:#3E344B;
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
  // font-weight: 400;
 
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