import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "../../common/components/components";
import ActivityModal from "../../common/popups/activityModal";
import Utils from "../../utility";
import { RewardsService } from "../../services";

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
    padding: 20px 0;
    font: 400 14px/22px var(--root-font);
    &:last-child {
      border-bottom: none;
    }
  }
`;

function RewardActivities() {
  const [viewModal, setViewModal] = useState(false);
  const [activitiesList, setActivitiesList] = useState([]);

  async function getActivities() {
    let [error, data] = await Utils.parseResponse(
      RewardsService.getActivities()
    );
    if (error || !data) {
      setActivitiesList([]);
      return;
    }
    setActivitiesList(data);
  }
  useEffect(() => {
    getActivities();
  }, []);
  return (
    <Container>
      <TitleContainer>
        <h1>Reward Activities</h1>
        <button
          onClick={() => {
            setViewModal(true);
          }}
        >
          Create
        </button>
      </TitleContainer>
      <ActivityTable>
        <ActivityTableHeader>
          <tr>
            <th>Activity Name</th>
            <th>Type</th>
            <th>Count</th>
            <th>Entries</th>
            <th>Status</th>
          </tr>
        </ActivityTableHeader>
        <ActivityTableBody>
          {activitiesList && activitiesList.length
            ? activitiesList.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>{item.entries}</td>
                  <td>{item.status || "-"}</td>
                </tr>
              ))
            : ""}
        </ActivityTableBody>
      </ActivityTable>
      <ActivityModal setViewModal={setViewModal} viewModal={viewModal} />
    </Container>
  );
}

export default RewardActivities;
