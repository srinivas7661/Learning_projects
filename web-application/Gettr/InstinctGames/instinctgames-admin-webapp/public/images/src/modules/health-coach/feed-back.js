import React from "react";
// import { makeStyles } from '@material-ui/styles';
import TableComponent from "../../common/components/Tokencomponent";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Tablediv = styled.div`
margin-top:25px;
// border:1px solid gray;
box-shadow: 0px 4px 15px #00000012;
border-radius:7px;
@media(max-width:1025px){
  overflow-x:auto;

}
`;

// import Button from '@material-ui/core/Button';
// import { Column, Row } from "simple-flexbox";

const Input = styled.input`
height:15px;
width:15px;
`;
const Th = styled.th`

color: var(--unnamed-color-686868);
text-align: left;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #686868;

 padding: 9px 0 9px 15px;
&:first-child {
border-radius: 5px 0 0 0;
}
&:last-child {
}
`;

const data = {
  1: {
    column1: "Holly Higgins",
    column2: "BHC0023",
    column3: "Hollistic",
    column4: "10",
    column5: "",
    column6: "Active",
  },
  2: {
    column1: "Holly Higgins",
    column2: "BHC0023",
    column3: "Hollistic",
    column4: "10",
    column5: "",
    column6: "Active",
  },
  3: {
    column1: "Holly Higgins",
    column2: "BHC0023",
    column3: "Hollistic",
    column4: "10",
    column5: "",
    column6: "Active",
  },
};
const Star = styled.div`
display:flex;
`;

export default function PendingTable(props) {

  const Img = styled.img`
  border-radius:50%;
  margin-left: 29px;
  height:33px;
  width:35px;`


  return (
    <Tablediv>
      <TableComponent.Table cellpadding="0" cellspacing="0">
        <TableComponent.TableHead>
          <Th>
            Confirnmed
          </Th>
        </TableComponent.TableHead>
      </TableComponent.Table>
      <div style={{ padding: "10px" }}>
        <TableComponent.Table>
          <TableComponent.TableHead className="border-bottom-none">
            <TableComponent.HeadColumn>
              <Input type="checkbox" />
            </TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Health Coach Name</TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Health Coach ID</TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Type</TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Appointments</TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Rating</TableComponent.HeadColumn>
            <TableComponent.HeadColumn>Status</TableComponent.HeadColumn>
          </TableComponent.TableHead>
          <TableComponent.TableBody>
            {Object.values(data).map((item) => {
              return (
                <TableComponent.BodyRow className="border-top-1px-solid">
                  <TableComponent.BodyColumn>
                    <Input type="checkbox" />
                    <Link className="link" to='/appointment'>
                      <Img src="images/baby.png" alt="img" />
                    </Link>
                  </TableComponent.BodyColumn>
                  <TableComponent.BodyColumn><Link className="link" to='/health-coach-details'>{item.column1} </Link></TableComponent.BodyColumn>
                  <TableComponent.BodyColumn><Link className="link" to='/health-coach-details'>{item.column2} </Link></TableComponent.BodyColumn>
                  <TableComponent.BodyColumn><Link className="link" to='/health-coach-details'>{item.column3}</Link></TableComponent.BodyColumn>
                  <TableComponent.BodyColumn><Link className="link" to='/health-coach-details'>{item.column4}</Link></TableComponent.BodyColumn>
                  <TableComponent.BodyColumn>
                    <Star><Link className="link" to='/health-coach-details'>
                      <TableComponent.BodyColumn>
                        <img src="images/star.svg" />
                      </TableComponent.BodyColumn>
                      <TableComponent.BodyColumn>
                        <img src="images/star.svg" />
                      </TableComponent.BodyColumn>
                      <TableComponent.BodyColumn>
                        <img src="images/star.svg" />
                      </TableComponent.BodyColumn>
                      <TableComponent.BodyColumn>
                        <img src="images/star.svg" />
                      </TableComponent.BodyColumn>
                      <TableComponent.BodyColumn>
                        <img src="images/star.svg" />
                      </TableComponent.BodyColumn>
                    </Link></Star>
                  </TableComponent.BodyColumn>
                  <TableComponent.BodyColumn><Link className="link" to='/health-coach-details'>{item.column6}</Link></TableComponent.BodyColumn>
                </TableComponent.BodyRow>
              );
            })}
          </TableComponent.TableBody>
        </TableComponent.Table>
      </div>
    </Tablediv>
  );
}
