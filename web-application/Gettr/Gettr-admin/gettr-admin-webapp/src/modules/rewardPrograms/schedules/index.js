import React, { useEffect, useState } from "react";
import Scheduler from "./schedule";
import styled from "styled-components";
import { Container } from "../../../common/components/components";
import moment from "moment";
import utility, { useDebounce } from "../../../utility";
import { RewardsService } from "../../../services";

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DateDisplay = styled.div`
  width: 228px;
  height: 48px;
  background: #f4f4f7;
  border-radius: 24px;
  margin-left: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  div {
    width: 65%;
    font: normal 700 16px/22px var(--root-font);
    color: #000000;
    span {
      font-weight: normal;
    }
  }
  img {
    cursor: pointer;
  }
`;
const Tittle = styled.div`
  font: normal 700 20px/22px var(--root-font);
  color: #1e1e1e;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 450px;
`;

const EditButton = styled.button`
  font: normal 600 16px/22px var(--root-font);
  color: #000000;
  border: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const CreateButton = styled.button`
  width: 211px;
  height: 48px;
  background: #fc223b;
  border-radius: 50px;
  border: none;
  font: normal 600 15px/22px var(--font-roboto);
  color: #ffffff;
`;

const ModifiedButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  gap: 30px;
  width: calc(380px - 150px);
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  span {
    font: normal 600 16px/22px var(--root-font);
  }
  img {
    width: 16px;
    margin-right: 16px;
    height: 16px;
  }
  margin-right: 50px;
`;

function RewardScheduler() {
  const [edit, setEdit] = useState(false);
  const [clicked, setClicked] = useState(0);
  const date = moment().startOf("day");
  const [presentDate, setPresentDate] = useState({
    currentDate: date.valueOf(),
    monthNow: date.format("MMMM"),
    yearNow: date.format("YYYY"),
  });
  const [events, setEvents] = useState([]);

  const getDates = (date) => {
    let dates = [];
    for (let index = 0; index < 7; index++) {
      dates.push({
        day: moment(date).add(index, "days").format("ddd").toUpperCase(),
        date: moment(date).add(index, "days").format("DD"),
        timestamp: moment(date).add(index, "days").valueOf(),
      });
    }
    return dates;
  };
  const [currentWeek, setCurrentWeek] = useState(getDates());

  const handleWeekChange = (direction) => {
    const currentDate =
      direction === "backward"
        ? moment(presentDate.currentDate).subtract(7, "days").valueOf()
        : moment(presentDate.currentDate).add(7, "days").valueOf();

    setPresentDate(() => ({
      monthNow: moment(currentDate).format("MMMM"),
      yearNow: moment(currentDate).format("YYYY"),
      currentDate,
    }));
    setClicked(clicked + 1);
  };
  const deboucedValue = useDebounce(clicked, 500);
  useEffect(() => {
    const dates = getDates(presentDate.currentDate);
    setCurrentWeek(dates);
    getSchedules(dates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deboucedValue]);

  const getSchedules = async (dates) => {
    const [error, data] = await utility.parseResponse(
      RewardsService.getSchedules({
        startTime: dates[0].timestamp,
        endTime: dates[dates.length - 1].timestamp,
      })
    );
    if (error || !data || !data.data) {
      manageEventView({ data: [] });
      return;
    }
    manageEventView(data);
  };

  const manageEventView = (data) => {
    let events = JSON.parse(JSON.stringify(data));
    const length = events.data.length;

    if (events && events.data && length !== 7) {
      for (let index = 0; index < 7 - length; index++) {
        events.data.push({
          date: "",
          events: [],
        });
      }
    }
    setEvents(events);
  };

  async function clearResetScheduleInterval() {
    const objectData = {
      startTime: presentDate.currentDate,
      endTime: moment(presentDate.currentDate).add(6, "d").valueOf(),
    };
    const [error, response] = await utility.parseResponse(
      RewardsService.clearScheduleInterval(objectData)
    );
    if (error || !response) {
      return;
    }
  }

  return (
    <Container>
      <HeaderBar>
        <Tittle>Schedule</Tittle>
        <DateDisplay>
          <div>
            {presentDate.monthNow}, <span>{presentDate.yearNow}</span>
          </div>
          <img
            height={13}
            width={6}
            onClick={() => handleWeekChange("backward")}
            src="/images/arrowLeftSide.svg"
            alt="left"
          />
          <img
            height={13}
            width={6}
            onClick={() => handleWeekChange("forward")}
            src="/images/arrowRightSide.svg"
            alt="right"
          />
        </DateDisplay>
        <ButtonsContainer>
          {edit ? (
            <ModifiedButton>
              <div onClick={clearResetScheduleInterval}>
                <img src="/images/clearReset.svg" alt="reset" />
                <span>Clear</span>
              </div>
              <div onClick={() => setEdit(false)}>
                <img src="/images/done.svg" alt="done" />
                <span>Done</span>
              </div>
            </ModifiedButton>
          ) : (
            <EditButton onClick={() => setEdit(true)}>
              <img src="/images/editIcon.svg" alt="edit" />
              <div>Edit</div>
            </EditButton>
          )}
          <CreateButton>Create</CreateButton>
        </ButtonsContainer>
      </HeaderBar>
      <Scheduler
        date={presentDate.currentDate}
        edit={edit}
        currentWeek={currentWeek}
        events={events}
      />
    </Container>
  );
}

export default RewardScheduler;
