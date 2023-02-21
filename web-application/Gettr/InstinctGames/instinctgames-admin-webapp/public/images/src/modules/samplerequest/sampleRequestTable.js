import React from "react";
import TableComponent from "../../common/components/tableComponent";
import styled from "styled-components";
import { Paper } from "material-ui";

const Input = styled.input`
  height: 15px;
  width: 15px;
`;


const data = {
  1: {
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  2: {
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  3: {
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  4: {
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  5: {
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
};

export default function RequestTable() {
  const Imgtab = styled.img`
   border-radius: 50%;
   height: 30px;
   width:30px;
`;
  return (
    
    <TableComponent.Table cellpadding="0" cellspacing="0">
      {/* <TableComponent.TableHead></TableComponent.TableHead> */}
      <TableComponent.TableHead>
        <TableComponent.HeadColumn>
          <Input type="checkbox" />
        </TableComponent.HeadColumn>
        <TableComponent.HeadColumn>
        
        </TableComponent.HeadColumn>
        <TableComponent.HeadColumn>User Name</TableComponent.HeadColumn>
        <TableComponent.HeadColumn>Sample ID</TableComponent.HeadColumn>
        <TableComponent.HeadColumn>Sample Type</TableComponent.HeadColumn>
        <TableComponent.HeadColumn>Sample Event</TableComponent.HeadColumn>
        <TableComponent.HeadColumn>
          Order Date and Time
        </TableComponent.HeadColumn>
        <TableComponent.HeadColumn>ZIP Code</TableComponent.HeadColumn>
        <TableComponent.HeadColumn>Status</TableComponent.HeadColumn>
      </TableComponent.TableHead>
      <TableComponent.TableBody>
        {Object.values(data).map((item) => {
          return (
            <TableComponent.BodyRow> 
              <TableComponent.BodyColumn>
                <Input type="checkbox" />
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
              <Imgtab src="images/baby.png" />
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
                {item.column1}
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
                {item.column2}
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
                {item.column3}
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
                {item.column4}
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
                {item.column5}
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
                {item.column6}
              </TableComponent.BodyColumn>
              <TableComponent.BodyColumn>
                {item.column7}
              </TableComponent.BodyColumn>
            </TableComponent.BodyRow>
          );
        })}
      </TableComponent.TableBody>
    </TableComponent.Table>
    
  );
}
