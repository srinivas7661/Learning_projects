import React, { useEffect } from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Column, Row } from "simple-flexbox";
import Back from "../../assets/SVGs/back.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import ConfirmationPopup from "../../common/components/confirmationPopup";
import moment from "moment";
import GetNftDetails from "../../services/contentService";
import GetRemovedNftListById from "../../services/contentService";
import Loader from "../analytics/component/loader";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffff",
    color: "black",
    borderBottom: "none !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "none !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F8F8F8",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Maindiv = styled.div``;
const MainComponent = styled.div`
  background-color: #f0f0f6;
  padding: 57px 91px 78px 59px;
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 767px) {
    width: 100%;
    padding: 16px 16px 16px 16px;
    margin: 0 auto;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 16px 23px 16px 23px;
  }
  // @media (min-width: 1025px) and (max-width: 1439px) {
  //   padding: 57px 23px 16px 23px;
  // }
`;

const EditImageText1 = styled.div`
  text-align: left;
  font: normal normal 600 22px Barlow;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
  margin-left: 18px;
  margin-bottom: 28px;
`;
const RowDiv = styled(Row)`
  justify-content: space-between;
`;
const ColumnDiv = styled.div`
  display: flex;
  /* flex-direction: row; */
  width: 1520px;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column-reverse;
    width: 100%;
    padding: 0 20px 0 0;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ReviewPaper = styled(Paper)`
  border: 1px solid #f0f0f0 !important;
`;

const head = [
  {
    // Name: "Name",
    Reported_by: "Reported by",
    Reported_on: "Reported on",
    Reason: "Reason",
    // Review: "Review",
    Delete_report: "Delete report",
  },
];
const reviewnft = [
  {
    name: "Lofi",
    reported_by: "12-11-21",
    reported_on: "Copyright Infringement",
    // Reason: "Reason",
    // Review: "Review",
    Delete_report: "Delete report",
  },
  {
    name: "Lofi",
    reported_by: "12-11-21",
    reported_on: "Copyright Infringement",
    // Reason: "Reason",
    // Review: "Review",
    Delete_report: "Delete report",
  },
];
export default function ReviewRemovedNftPage(props) {
  // console.log("props123321", props.nftReportData.content);
  const [
    openConfirmDialogForUndoRemoveNft,
    setOpenConfirmDialogForUndoRemoveNft,
  ] = useState(false);
  const [selectedReport, updateSelectedReport] = useState(null);
  const [nftDetails, setNftDetails] = useState([]);
  const [removedNftList, setRemovedNftList] = useState([]);
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    nftDetailsData(props?.nftReportData?._id);
    removedList(props?.nftReportData?._id);
  }, []);

  const nftDetailsData = async (contentId) => {
    const response = await GetNftDetails.getNftDetails(contentId);
    if (response) {
    setNftDetails(response);
    setLoading(false);
    }
  };
  const removedList = async (id) => {
    const response = await GetRemovedNftListById.removedNftDetailsList(id);
    if (response) {
    setRemovedNftList(response);
    setLoading(false);
    }
  };

  const onClickConfirmUndoRemoveNft = () => {
    props.unRemoveNft(selectedReport);
    setOpenConfirmDialogForUndoRemoveNft(false);
  };
  // console.log(props?.nftReportData?._id, "check");
  // console.log(removedNftList, "descr");
  return (
    <Maindiv>
      <MainComponent>
        <Row>
          <button
            type="button"
            className="border-none p-0"
            onClick={() => props.openReviewNft(false)}
          >
            <img src={Back} className="width-25 m-b-20" />
          </button>
          <EditImageText1>Review NFT</EditImageText1>
        </Row>
        <div>
        {loading === true ? (
            <ReviewPaper elevation={0}>
              <div className="display-flex flex-row gap-68 m-24 mb-column tab-column">
                <ColumnDiv>
                  <div className="homePageLoader">
                    <Loader />
                  </div>
                </ColumnDiv>
              </div>
            </ReviewPaper>
          ) : (
          <ReviewPaper elevation={0}>
            <div className="display-flex flex-row gap-68 m-24 mb-column tab-column">
              <img
                src={nftDetails?.cdnUrl}
                width={271}
                height={271}
                className="br-4 mb-img-width"
              />
              <ColumnDiv>
                <div className="display-flex flex-column w-per-100 w-251">
                  <p className="review-title">{nftDetails?.nftType}</p>
                  <p className="review-heading">
                    {nftDetails?.name || "Shoto Todoroki MHA"}
                  </p>
                  <p className="review-description">Description</p>
                  <p className="description-short w-504 mb-description-review w-447 w-352">
                    {nftDetails?.description || ""}
                  </p>
                  <div className="display-flex flex-row gap-20">
                    <p className="owner-div">
                      <img
                        src={
                          nftDetails?.ownedBy?.profileImage ||
                          "/defaultprofile.png"
                        }
                        className="img-div"
                      />
                      <div className="owner-text">
                        <span className="owner-title">Owner</span>
                        <span className="owner-description">{`${
                          nftDetails?.ownedBy?.firstName || nftDetails?.ownedBy?._id
                        } ${nftDetails?.ownedBy?.lastName || " "}`}</span>
                      </div>
                    </p>
                    <p className="owner-div">
                      <img
                        src={nftDetails?.createdBy?.profileImage || "/defaultprofile.png"}
                        className="img-div"
                      />
                      <div className="owner-text">
                        <span className="owner-title">Creater</span>
                        <span className="owner-description">{`${
                          nftDetails?.createdBy?.firstName || nftDetails?.createdBy?._id 
                        } ${nftDetails?.createdBy?.lastName || " "}`}</span>
                      </div>
                    </p>
                  </div>
                  <p className="review-link reason-div">
                    Link{" "}
                    <span className="link-span">
                      {nftDetails?.externalLink}
                    </span>
                  </p>
                </div>
                <ButtonDiv>
                  <button
                    autoFocus
                    onClick={() => {
                      props.onClickDeleteReport();
                      props.openReviewNft(false);
                    }}
                    className="review-undo-btn bg-14AD6C w-132 h-34 br-4 fc-fff btn-width-height"
                  >
                    {/* {console.log(nftDetails?._id, "sd amir")} */}
                    Undo Remove
                  </button>
                  {/* <button
            autoFocus
            onClick={() => props.onClickDeleteNftAndClocUser()}
            className="review-block-btn"
          >
            Remove NFT and Block User
          </button> */}
                </ButtonDiv>
              </ColumnDiv>
            </div>
          </ReviewPaper>
          )}
        </div>
        <div className="collection-table">
          <Paper elevation={0} className="table-root-collection">
            <TableContainer component={Paper} className="box-shadow-none">
              <Table
                sx={{ minWidth: 700 }}
                aria-label="customized table"
                className="table-width"
              >
                <TableHeaderView />
                <TableBody>
                {loading === true ? (
                    <StyledTableRow style={{ background: "none" }}>
                      <StyledTableCell colspan={12}>
                        <div className="homePageLoader">
                          <Loader />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                
                  removedNftList &&
                    removedNftList?.length >= 1 &&
                    removedNftList?.map((row, index) => {
                      return (
                        <StyledTableRow>
                          {/* <StyledTableCell className="w-20"></StyledTableCell> */}
                          <StyledTableCell align="left" className=" table-body">
                            <img
                              className="h-30 w-30 m-10"
                              src={
                                row.userOfReportedContent?.profileImage ||
                                "/defaultprofile.png"
                              }
                            />{" "}
                            {`${
                              row?.userOfReportedContent?.firstName || "No Name"
                            } ${props?.nftReportData?.addedBy?.lastName || ""}`}
                          </StyledTableCell>
                          <StyledTableCell align="left" className="table-body">
                            {moment(row?.addedOn).format("DD-MM-YYYY")}
                          </StyledTableCell>
                          <StyledTableCell align="left" className="table-body">
                            {row?.reason}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left"
                                                                     className="table-body fc-6874E8"><p
                                                        className="fc-6874E8 cursor-pointer m-0"
                                                       >Review NFT</p></StyledTableCell> */}
                          <StyledTableCell align="left" className="table-body">
                            <img
                              className="delete-icon cursor-pointer"
                              onClick={() => {
                                // updateSelectedReport(row)
                                // setOpenConfirmDialogForDeleteReportNft(true)
                              }}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </MainComponent>
    </Maindiv>
  );
}

const TableHeaderView = () => {
  return (
    <TableHead>
      {head.map((row) => (
        <TableRow>
          <StyledTableCell className="table-cell w-353">
            {row.Reported_by}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-260">
            {row.Reported_on}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-329">
            {row.Reason}
          </StyledTableCell>
          <StyledTableCell align="left" className="table-cell w-818">
            {row.Review}
          </StyledTableCell>
        </TableRow>
      ))}
    </TableHead>
  );
};
