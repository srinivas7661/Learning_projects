import React from "react";
import TableComponent from "../../common/components/Tablecss";
import styled from 'styled-components';

const Tablediv = styled.div`
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 15px #00000012;
border-radius: 7px;
opacity: 1;
width:100%;
`;
const ButtonText = styled.div`

`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#7D84C0" : "#F6CB83")};
  color: ${(props) => (props.primary ? "#FFF4F3" : "#5C4B75")};
  border:none;
  // font-size: 1em;
  height: 35px;
  width: 135px;  
  // font-size:small;
  border-radius: 5px;
  text-align: center;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #FFF4F3;
  @media(max-width:768px){
    margin:0 10px 0 10px;
  }
`;

const data = {
  1: {
    column1: "Report Ordering Survey",
    column2: "Lorem Ipsum",
    column3: "Active",
    column4: ""
  },
  2: {
    column1: "Lorem Ipsum",
    column2: "Lorem Ipsum",
    column3: "Active",
    column4: ""
  },
};

export default function PendingTable() {
  return (
    <Tablediv>
      <TableComponent.Table>

        <TableComponent.TableHead>

          <TableComponent.HeadColumn>Survey Title</TableComponent.HeadColumn>

          <TableComponent.HeadColumn>Trigger</TableComponent.HeadColumn>

          <TableComponent.HeadColumn>Status</TableComponent.HeadColumn>
          <TableComponent.HeadColumn>{" "}</TableComponent.HeadColumn>

        </TableComponent.TableHead>
        <TableComponent.TableBody className="border-top-none">
          {Object.values(data).map((item) => {
            return (
              <TableComponent.BodyRow className="border-top-1-px-solid">

                <TableComponent.BodyColumn>{item.column1} </TableComponent.BodyColumn>

                <TableComponent.BodyColumn>{item.column2}</TableComponent.BodyColumn>

                <TableComponent.BodyColumn>{item.column3}</TableComponent.BodyColumn>

                <TableComponent.BodyColumn className="w-150">
                  <Button primary className="margin-right-20-px">View Resposes</Button>
                </TableComponent.BodyColumn>

              </TableComponent.BodyRow>

            );
          })}

        </TableComponent.TableBody>
      </TableComponent.Table>
    </Tablediv>
  );
}
