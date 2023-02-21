import React from "react";
// import { makeStyles } from '@material-ui/styles';
import TableComponent from "../../common/components/Tokencomponent";
import styled from 'styled-components';
// import Buttofpaddingn from '@material-ui/core/Button';
// import { Column, Row } from "simple-flexbox";

const Input = styled.input`
height:15px;
width:15px;
`;
const Tablediv = styled.div`
margin-top:25px;
// border:1px solid gray;
box-shadow: 0px 4px 15px #00000012;
border-radius:7px;

`;
const Th = styled.th`

text-align: left;
font: normal normal bold 16px/22px;
letter-spacing: 0px;
color: #686868;

 padding: 9px 0 9px 15px;
&:first-child {
border-radius: 5px 0 0 0;
}
&:last-child {
border-radius: 0 5px 0 0;
}
`;


const data = {
  1: {
    column1: "Peter Pearson",
    column2: "BD0024",
    column3: "General Physician",
  },
  2: {
    column1: "Peter Pearson",
    column2: "BD0024",
    column3: "General Physician",
  },
};
const Img = styled.img`
  border-radius:50%;
  height:30px;
  width:35px;
  margin-left: 29px;`
export default function PendingTable(props) {


  return (
    <Tablediv>
      <TableComponent.Table cellpadding="0" cellspacing="0">
        <TableComponent.TableHead>
          <Th>Pending</Th>
        </TableComponent.TableHead>
      </TableComponent.Table>
      <div style={{ padding: "10px" }}>
        <TableComponent.Table>
          <TableComponent.TableHead className="border-bottom-none">
            <TableComponent.HeadColumn style={{ width: "145px" }}>
              <Input type="checkbox" />
            </TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Health Coach Name</TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Health Coach ID</TableComponent.HeadColumn>
            <TableComponent.HeadColumn style={{ paddingLeft: "80px" }}>Type</TableComponent.HeadColumn>
          </TableComponent.TableHead>
          <TableComponent.TableBody>
            {Object.values(data).map((item) => {
              return (
                <TableComponent.BodyRow className="border-top-1px-solid cursor-text">
                  <TableComponent.BodyColumn>
                    <Input type="checkbox" />
                    <Img src="images/baby.png" />
                  </TableComponent.BodyColumn>
                  <TableComponent.BodyColumn>{item.column1} </TableComponent.BodyColumn>
                  <TableComponent.BodyColumn>{item.column2} </TableComponent.BodyColumn>
                  <TableComponent.BodyColumn style={{ paddingLeft: "80px" }}>{item.column3}</TableComponent.BodyColumn>
                </TableComponent.BodyRow>
              );
            })}
          </TableComponent.TableBody>
        </TableComponent.Table>
      </div>
    </Tablediv>
  );
}
