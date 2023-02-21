import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-flow: column;
  gap: 35px;
  margin-top: 66px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h1 {
    color: #1e1e1e;
    font: 700 20px/24px var(--root-font);
  }
  > button {
    background-color: #fc223b;
    border: none;
    width: 211px;
    height: 48px;
    border-radius: 50px;
    color: #ffffff;
  }
`;

const ActivityTable = styled.table`
  width: 100%;
  margin-top: 10px;
`;

const ActivityTableHeader = styled.thead`
  > tr {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #e7e7e7;
    color: #000000;
    font: 700 14px/22px var(--root-font);
    > th,
    td {
      padding-left: 20px;
      width: 35%;
      &:not(:first-child) {
        padding-left: 2%;
        width: 30%;
      }
    }
  }
`;

const ActivityTableBody = styled(ActivityTableHeader)`
  > tr {
    padding: 22px 0;
    font: 400 14px/22px var(--root-font);
    &:last-child {
      border-bottom: none;
    }
  }
`;
const ViewAll = styled.div`
  color: #298fff;
  font: 400 14px/22px var(--root-font);
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
`;

function PopularActivites({activityList}) {
  return (
    <Container>
      <TitleContainer>
        <h1>Popular Activities</h1>
        <ViewAll>view all</ViewAll>
      </TitleContainer>
      <ActivityTable>
        <ActivityTableHeader>
          <tr>
            <th>Activity Name</th>
            <th>Entries</th>
            <th>Total Rewards</th>
            <th>Cost Per Entry</th>
            <th>Popular Slot</th>
          </tr>
        </ActivityTableHeader>
        <ActivityTableBody>
          {activityList?.map((item, index) => (
            <tr key={index}>
              <td>{item?.activity}</td>
              <td>{item?.entries}</td>
              <td>{item?.rewards} GTR</td>
              <td>{item?.costPerEntry} GTR</td>
              <td>{item?.popularSlot}</td>
            </tr>
          ))}
        </ActivityTableBody>
      </ActivityTable>
    </Container>
  );
}

export default PopularActivites;
