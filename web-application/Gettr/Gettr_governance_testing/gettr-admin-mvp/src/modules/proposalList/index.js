import React from "react";
import styled from "styled-components";
import { history } from "../../managers/history";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import utility from "../../utility";
import { ProposalService } from "../../services";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { Loader } from "../../common/components/components";
import { proposalTypes, status, proposalListStatus } from "../../constants";

const Table = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 0px 10px 0px;
`;
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 86px;
  justify-content: space-between;
  padding-left: 36px;
  padding-right: 31px;
`;
const TableHeading = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1e1e1e;
`;
const PageDiv = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  img {
    cursor: pointer;
  }
`;
const Pagination = styled.div`
  width: 122px;
  height: 30px;
  background: #efefef;
  border-radius: 4px;
  font: normal 400 14px/22px "Roboto";
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TableRow = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  padding-left: 2%;
  justify-content: space-between;
  border-top: 1px solid #e7e7e7;
  border-left: 5px solid #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
    border-left: 5px solid #fc223b;
  }
`;
const LeftRowContentTop = styled.div`
  font-weight: 500;
  font-size: 25px;
  color: #1e1e1e;
`;
const LeftRowContentBottom = styled.div`
  display: flex;
`;
const StatusDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) =>
    props.status === "PASSED"
      ? "#03bd6424"
      : props.status === "FAILED"
      ? "#FFE0E4"
      : "#FFEBCF"};
  color: #03bd64;
  width: 85px;
  height: 25px;
  border-radius: 7px;
`;
const StatusText = styled.div`
  font-size: 12px;

  color: ${(props) =>
    props.status === "PASSED"
      ? "#03BD64"
      : props.status === "FAILED"
      ? "#FC223B"
      : "#FFA629"};
`;
const RightRowContent = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  font-size: 14px;
  color: #000000;
`;
const TableIcon = styled.img`
  padding-left: 5px;
  width: 22px;
  height: 22px;
`;
const TimeStamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
`;
const NoProposals = styled.div`
  width: 100%;
  height: 500px;
  font: normal 500 25px/22px "Roboto";
  display: flex;
  background: #ffffff;
  justify-content: center;
  border-top: 1px solid #e7e7e7;
  padding-top: 31px;
  color: #000000;
  border-radius: 0px 0px 15px 15px;
`;
const LoaderDiv = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 200px;
  margin-left: auto;
  margin-right: auto;
`;
const ContentDiv = styled.div`
  padding: 2% 0;
`;

function ProposalList(props) {
  const [proposalList, setProposalList] = useState([]);

  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const skip = useRef(0);
  useEffect(() => {
    props?.setAddVoteApiCall(false);
    if (!props.dropdown) {
      getRecentProposals();
      setCurrentPage(1);
      skip.current = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.searchValue,
    props.dropdown,
    props.status,
    props.type,
    props.user.userRole,
  ]);

  const limit = 6;

  const getRecentProposals = async () => {
    let userRole = props.user.userRole;
    let [error, response] = await utility.parseResponse(
      ProposalService.getProposals(
        props.searchValue,
        props.status,
        props.type,
        limit,
        skip.current,
        userRole
      )
    );
    if (error || !response.data) return;
    setLoader(false);
    setProposalList(response.data.data);
    setTotalPage(Math.ceil(response.data.total / 6));
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      skip.current += limit;
      getRecentProposals();
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      skip.current -= limit;
      getRecentProposals();
    }
  };

  const lastPage = () => {
    setCurrentPage(totalPage);
    skip.current = limit * (totalPage - 1);
    getRecentProposals();
  };

  const firstPage = () => {
    setCurrentPage(1);
    skip.current = 0;
    getRecentProposals();
  };

  const textFilter = (string) => {
    let oldString = string;
    let strArr = oldString.split("_");
    for (let i = 0; i < strArr.length; i++) {
      strArr[i] =
        strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1).toLowerCase();
    }
    let newStr = strArr.join(" ");
    return newStr;
  };

  return (
    <Table>
      <TableHeader>
        <TableHeading>Recent Proposals</TableHeading>
        <PageDiv>
          {currentPage !== 1 && (
            <div onClick={() => firstPage()}>
              <img src="/images/leftArrow.svg" alt="left" />
              <img src="/images/leftArrow.svg" alt="left" />
            </div>
          )}
          {currentPage !== 1 && (
            <img
              onClick={() => prevPage()}
              src="/images/leftArrow.svg"
              alt="left"
            />
          )}

          <Pagination>
            Page {currentPage} of {totalPage}
          </Pagination>
          {currentPage !== totalPage && (
            <img
              onClick={() => nextPage()}
              src="/images/rightArrow.svg"
              alt="right"
            />
          )}
          {currentPage !== totalPage && (
            <div onClick={() => lastPage()}>
              <img src="/images/rightArrow.svg" alt="right" />
              <img src="/images/rightArrow.svg" alt="right" />
            </div>
          )}
        </PageDiv>
      </TableHeader>
      {proposalList.length > 0 ? (
        <div>
          {proposalList &&
            proposalList.map((data, index) => (
              <TableRow
                key={index}
                onClick={() =>
                  history.push(`/dashboard/proposal-details/${data._id}`)
                }
              >
                <ContentDiv>
                  <LeftRowContentTop>
                    {data.type === proposalTypes.MINT.value ||
                    data.type === proposalTypes.AIRDROP.value
                      ? textFilter(data.type) +
                        " proposal for " +
                        data.amount +
                        " GTR"
                      : data.type === proposalTypes.ADD_SUPER_ADMIN.value ||
                        data.type === proposalTypes.ADD_SUB_ADMIN.value ||
                        data.type === proposalTypes.REMOVE_SUPER_ADMIN.value ||
                        data.type === proposalTypes.REMOVE_SUB_ADMIN.value
                      ? textFilter(data.type) +
                        " @ " +
                        (data?.user?.email === ""
                          ? "gettradmin@gettr.com"
                          : data?.user?.email)
                      : textFilter(data.type)}
                  </LeftRowContentTop>
                  <LeftRowContentBottom>
                    <StatusDiv status={data.status}>
                      <TableIcon
                        src={
                          data.status === status.PASSED.name
                            ? "/images/success-icon.svg"
                            : data.status === status.FAILED.name
                            ? "/images/failed-icon.svg"
                            : "/images/alert-triangle.svg"
                        }
                        alt="icon"
                      />
                      <StatusText status={data.status}>
                        {data.status === status.PASSED.name
                          ? status.PASSED.value
                          : data.status === status.FAILED.name
                          ? status.FAILED.value
                          : status.PENDING.value}
                      </StatusText>
                    </StatusDiv>
                    &nbsp;&nbsp;
                    <TimeStamp>
                      {moment(data.addedOn).local().format("lll")}
                    </TimeStamp>
                  </LeftRowContentBottom>
                </ContentDiv>
                <RightRowContent>
                  {data.status === status.PASSED.name ||
                  data.status === status.FAILED.name ? (
                    <TableIcon
                      src={
                        data.status === status.PASSED.name
                          ? "/images/success-icon.svg"
                          : data.status === status.FAILED.name
                          ? "/images/failed-icon.svg"
                          : ""
                      }
                      alt="icon"
                    />
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;
                  {data.status === proposalListStatus.PASSED.name
                    ? proposalListStatus.PASSED.value
                    : data.status === proposalListStatus.FAILED.name
                    ? proposalListStatus.FAILED.value
                    : proposalListStatus.PENDING.value}
                </RightRowContent>
              </TableRow>
            ))}
        </div>
      ) : (
        <>
          {loader ? (
            <LoaderDiv>
              <Loader />
            </LoaderDiv>
          ) : (
            <NoProposals>No proposal found!</NoProposals>
          )}
        </>
      )}
    </Table>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(ProposalList);
