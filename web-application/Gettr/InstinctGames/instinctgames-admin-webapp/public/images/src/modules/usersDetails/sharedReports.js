import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Drawer } from '@material-ui/core';
import styled from "styled-components";

const ImageWeb = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;
const ImageTab = styled.img`
width: 100px;
height: 100px;
border-radius: 50%;
`;
const ViewButton = styled.button`
width: 133px;
height: 34px;
background: #7D84C0 0% 0% no-repeat padding-box;
box-shadow:none;
border:none;
border-radius: 5px;
text-align: center;
font: normal normal normal 16px/22px Nunito;
color: #FFF4F3;
`;
const CloseButton = styled.button`
width:fit-content;
margin-right:5%;
height:fit-content ;
float: right;
background: transparent;
border:none;
`;
const Icon = styled.img`
width: 100%;
height: 100%;
`;
const Report = styled.img`
display: block;
margin-left: auto;
margin-right: auto;
width: 50%;
`;

const useStyles = makeStyles({
  drawer: {
    width: "100%"
  }
});

function SharedReports() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  }
  return (
    <>
      {/*table for web */}
      <div className="display-block display-none-web">
        {/*<TableContainer component={Paper}>*/}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="fc-blue ">Docter's Name</TableCell>
                <TableCell className="fc-blue ">Email ID</TableCell>
                <TableCell className="fc-blue ">Shared Report Type</TableCell>
                <TableCell className="fc-blue ">Report Shared On</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><ImageWeb src="images/tabletuser.svg"></ImageWeb></TableCell>
                <TableCell>Dr. Lacy Marven</TableCell>
                <TableCell>lacymarven123@gmail.com</TableCell>
                <TableCell>Alexs Appleseed Health Report #2..</TableCell>
                <TableCell>11 Jan 2021</TableCell>
                <TableCell><ViewButton onClick={toggleDrawer(true)}>View Report</ViewButton></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><ImageWeb src="images/tabletuser.svg"></ImageWeb></TableCell>
                <TableCell>Dr. Lacy Marven</TableCell>
                <TableCell>lacymarven123@gmail.com</TableCell>
                <TableCell>Alexs Appleseed Health Report #2..</TableCell>
                <TableCell>11 Jan 2021</TableCell>
                <TableCell><ViewButton onClick={toggleDrawer(true)}>View Report</ViewButton></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/*table for tab */}
      <div className="display-none display-block-tab w-100-pr" >
        <TableContainer>
          <Table>
            <TableRow>
              <TableCell><ImageTab src="images/tabletuser.svg"></ImageTab></TableCell>
              <TableCell>
                <TableHead>
                  <TableRow><TableCell className="fc-blue border-bottom-none" >Docter's Name</TableCell></TableRow>
                </TableHead>
                <TableBody>
                  <TableRow><TableCell className="border-bottom-none">Dr. lacy Marven</TableCell></TableRow>
                </TableBody>
                <TableHead>
                  <TableRow><TableCell className="fc-blue border-bottom-none">Email ID</TableCell></TableRow>
                </TableHead>
                <TableBody>
                  <TableRow><TableCell className="border-bottom-none">lacymarven123@gmail.com</TableCell></TableRow>
                </TableBody>
              </TableCell>
              <TableCell>
                <TableRow>
                  <TableHead>
                    <TableRow><TableCell className="fc-blue border-bottom-none">Shared Report Type</TableCell></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow><TableCell className="border-bottom-none">Alexs Appleseed Health Report #2...</TableCell></TableRow>
                  </TableBody>
                </TableRow>
                <TableRow>
                  <TableHead>
                    <TableRow><TableCell className="fc-blue border-bottom-none">Report Shared On</TableCell></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className="border-bottom-none">11 Jan 2021</TableCell>
                      <TableCell className="border-bottom-none"><ViewButton onClick={toggleDrawer(true)}>View Report</ViewButton></TableCell>
                    </TableRow>
                  </TableBody>
                </TableRow>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </div>
      <Drawer
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        variant={"persistent"}
        classes={{ paper: classes.drawer }}>
        <div>
          <CloseButton onClick={toggleDrawer(false)} className="flex-right margin-t-top-15-px"><Icon src="images/cross.svg"></Icon></CloseButton>
          <Report src="images/tabletuser.svg" ></Report>
        </div>
      </Drawer>
    </>
  )
}

export default SharedReports;