import React from "react";
import styled from "styled-components";
import { Paper, TableBody } from "@material-ui/core";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { height, padding } from "@mui/system";
import useWindowDimensions from "../../common/windowDimensions";

const ParentContainer = styled.div`
  display: "flex";
  flex-direction: "column";
  padding: 10px 10px 0px 10px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000d;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  opacity: 1;
  max-width: 2560px;
  margin: 0 auto;
`;
const TableContainer = styled.div`
  overflow: auto;
`;
const TableCell = styled.td`
  width: 24%;
  padding: 10px 0 10px 10px;
  ${
    "" /* width: ${(props) => (props.tableCellWidth ? props.tableCellWidth : "")}; */
  }
  text-align: left;
  font: normal normal 500 14px/17px Barlow;
  letter-spacing: 0px;
  color: #535877;
`;
const TableCellL3 = styled.td`
  padding: 10px 0 10px 0px;
  width: 15%;
  text-align: left;
  font: normal normal 500 14px Barlow;
  letter-spacing: 0px;
  color: #535877;

  margin: 0;
  padding: 11px;
`;
const TableCell1 = styled.td`
  padding: 10px 0 10px 0px;
  width: 20%;
  text-align: left;
  font: normal normal 500 14px/17px Barlow;
  letter-spacing: 0px;
  color: #535877;
  margin: 0;
  padding: 2px;
`;
const TableCellA = styled.td`
  padding: 10px 0 10px 0px;
  width: 25%;
  text-align: left;
  font: normal normal 500 14px/17px Barlow;
  letter-spacing: 0px;
  color: #535877;

  margin: 0;
  padding: 10px;
`;

const TableHeader = styled.td`
  padding: 10px 0 10px 10px;
  text-align: left;
  font: normal normal 500 14px/17px Barlow;
  letter-spacing: 0px;
  color: #151e58;
`;
const TableRow = styled.tr`
width:"100%"
  cursor: ${(props) => (props.isPointer ? "pointer" : "")};
  height: 44px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  &:nth-child(even) {
    background-color: #fff;
  }
`;
const Table = styled.table`
  display: flex;
  display: table;
  border-collapse: collapse;
  width: 98%;
  margin: 0 auto;
  white-space: nowrap;
`;
const ImageDiv = styled.img`
  width: 25px;
  height: 25px;
  // background: gray 0% 0% no-repeat padding-box;
  border-radius: 50%;
  margin: 0px 15px 0px 5px;
`;
const ViewButton = styled.button`
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #6874e8;
  border: none;
  background: none;
`;

const DialogTitleComment = styled(DialogTitle)`
  padding: 24px 24px 12px 24px !important;
  img{cursor:pointer;}

`;
const DialogContentComment = styled(DialogContent)`
  padding: 0 22px 24px 23px !important;
`;


const CustomTable = ({ columns, rows, maxWidth, tableCellWidth }) => {
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState("");

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };
  const { height, width } = useWindowDimensions();

  return (
    <ParentContainer component={Paper}>
      <TableContainer>
        <Table maxWidth={maxWidth}>
          <tr>
            {columns && columns.length
              ? columns.map((column) => <TableHeader>{column}</TableHeader>)
              : ""}
          </tr>

          <TableBody>
            {rows && rows.length
              ? rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell1>
                      <ImageDiv src="/images/token.svg" />
                      {row.tokenName}
                    </TableCell1>
                    <TableCellA>{row.tokenAddress}</TableCellA>
                    <TableCellL3 tableCellWidth={tableCellWidth}>
                      {moment(row.addedOn).format("DD-MM-YYYY")}
                    </TableCellL3>

                    <TableCell
                      tableCellWidth={tableCellWidth}
                      onClick={() => {
                        handleClickToOpen();
                        setComments(row?.rejectedComment);
                      }}
                    >
                      <ViewButton> See comment </ViewButton>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>

        <Dialog
          open={open}
          onClose={handleToClose}
          className="dialog-container-comment"
        >
          {width < 767 && (
            <div className="tab-popupMob">
              <img
                onClick={handleToClose}
                color="primary"
                autoFocus
                src="/images/back.svg"
              />

              <span className="comment-text">Comments</span>
            </div>
          )}

          <DialogTitleComment>
            {width > 767 && (
              <div className="tab-popup">
                <span className="comment-text">Comments</span>

                <img
                  onClick={handleToClose}
                  color="primary"
                  autoFocus
                  
                  src="/images/Close.svg"
                />
              </div>
            )}
          </DialogTitleComment>
          <DialogContentComment>
            <DialogContentText className="tab-popup-input">
              {comments || "Not yet Commented"}
            </DialogContentText>
          </DialogContentComment>
        </Dialog>
      </TableContainer>
    </ParentContainer>
  );
};

export default CustomTable;
