import React from "react";
import styled from "styled-components";
import { TopEarnerList } from "../../constants";

const TopEarnerMainComponent = styled.div`
  width: 605px;
  height: 455px;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 41px;
`;

const TopEarnerHeadingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 18px 14px;
`;
const ViewAll = styled.a`
  width: 70px;
  height: 22px;
  font: normal 400 15px/22px "Roboto";
  display: flex;
  align-items: center;
  text-align: right;
  color: #298fff;
  cursor: pointer;
`;

const TopEarnerHeading = styled.div`
  width: 83px;
  height: 22px;
  font: normal 500 17px/22px "Roboto";
  align-items: center;
  color: #545b66;
  white-space: nowrap;
`;
const TopEarnersDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 46px;
`;
const TopUserDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
`;
const TopEarnerValue = styled.div`
  height: 22px;
  font: normal 600 16px/22px "Roboto";
  align-items: center;
  color: #000000;
`;
const TopEarnerInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 27px;
  border-radius: 50%;
`;
const Hr = styled.hr`
  width: 580px;
  border: ${(props) =>
    props.id === 4 ? "0px solid #E4E4E4" : "1px solid #E4E4E4"};
`;
const TopEarnerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserName = styled.div`
  width: 178px;
  height: 22px;
  font-style: normal;
  font: normal 600 16px/22px "Roboto";
  align-items: center;
  color: #000000;
`;
const UserEntries = styled.div`
  width: 178px;
  height: 22px;
  font: normal 400 15px/22px "Roboto";
  display: flex;
  align-items: center;
  color: #50555c;
`;
const NoData = styled.div`
  margin-top: 80px;
  font: normal 900 30px/22px "Roboto";
  text-align: center;
`;

const TopEarnerComponent = (props) => {
  console.log(TopEarnerList, "srinivas");
  return (
    <TopEarnerMainComponent>
      <TopEarnerHeadingDiv>
        <TopEarnerHeading>Top Earner</TopEarnerHeading>
        <ViewAll>view all</ViewAll>
      </TopEarnerHeadingDiv>
      <TopEarnersDiv>
        {TopEarnerList.map((item, index) => (
          <>
            <TopUserDiv>
              <TopEarnerInfoDiv>
                <UserProfile src={item.picture} />
                <TopEarnerInfo>
                  <UserName>{item.name}</UserName>
                  <UserEntries>{item.entries}</UserEntries>
                </TopEarnerInfo>
              </TopEarnerInfoDiv>

              <TopEarnerValue>{item.amount} GTR</TopEarnerValue>
            </TopUserDiv>
            {index < 4 ? <Hr /> : ""}
          </>
        ))}
      </TopEarnersDiv>
    </TopEarnerMainComponent>
  );
};

export default TopEarnerComponent;
