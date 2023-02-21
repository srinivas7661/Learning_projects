import React from "react";
import styled from "styled-components";
import { Slots } from "../../../constants";

const TableHead = styled.thead`
  border-left: none;
  border-right: none;
  border-radius: 1px;
  width: 100%;
`;
const HeaderRow = styled.tr`
  width: 100%;
  height: 89px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  th {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px dashed #e7e7e7;
    border-left: none;
    div {
      font: normal 400 14px/22px var(--root-font);
      color: #000000;
    }
    p {
      font: normal 400 26px/22px var(--root-font);
      margin: 15px;
      color: #000000;
    }
  }
`;
const TableHeadColumn = styled.td`
  width: 100%;
  font: normal 700 14px/22px var(--root-font);
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #e7e7e7;
  border-bottom: 1px dashed #e7e7e7;
  span {
    font-weight: 400;
    padding: 4px;
  }
`;
const TableRowData = styled.td`
  width: 100%;
  font: normal 700 14px/22px var(--root-font);
  color: #000000;
  border-top: none;
  border-bottom: 1px dashed #e7e7e7;
  border-right: 1px dashed #e7e7e7;
  overflow-x: hidden;
`;
const TableRow = styled.tr`
  height: 227px;
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  width: 100%;
`;
const EachEvent = styled.div`
  max-width: 181px;
  height: 35px;
  margin: 8px;
  background: #f3f6ff;
  border-radius: 6px;
  font: normal 400 14px/22px var(--root-font);
  color: #000000;
  padding: 7px 23px 6px 23px;

  position: relative;
  div {
    white-space: nowrap;
    overflow-x: hidden;
  }
`;
const DeleteIcon = styled.img`
  position: absolute;
  top: 0px;
  right: 0px;
  margin-right: -5px;
  margin-top: -5px;
`;

function EventDisplay({ edit, title }) {
  return (
    <EachEvent>
      {edit ? <DeleteIcon src="/images/removeIcon.svg" alt="" /> : <></>}
      <div>{title}</div>
    </EachEvent>
  );
}

function Schedule({ edit, currentWeek, events }) {
  return currentWeek && currentWeek.length === 7 ? (
    <table>
      <TableHead>
        <HeaderRow>
          <th>
            <div>{""}</div>
            <p>{""}</p>
          </th>
          {currentWeek.map((item, index) => {
            return (
              <th key={index}>
                <div>{item.day}</div>
                <p>{item.date}</p>
              </th>
            );
          })}
        </HeaderRow>
      </TableHead>
      <tbody>
        {Slots.map((item, index) => (
          <TableRow key={index}>
            <TableHeadColumn>{item.name}</TableHeadColumn>
            {events && events.data
              ? events.data.map((eventDate, dateIndex) => {
                  return currentWeek.find(
                    (week) => week.timestamp === eventDate.date
                  ) ? (
                    <TableRowData key={dateIndex}>
                      {eventDate.events &&
                        eventDate.events.map((event) => {
                          return item.value === event.slot.toUpperCase()
                            ? event.events.map((item, eventIndex) => (
                                <EventDisplay
                                  key={eventIndex}
                                  edit={edit}
                                  title={item.name}
                                />
                              ))
                            : "";
                        })}
                    </TableRowData>
                  ) : (
                    <TableRowData />
                  );
                })
              : currentWeek.map((sl, ind) => <TableRowData key={ind} />)}
          </TableRow>
        ))}
      </tbody>
    </table>
  ) : (
    ""
  );
}
export default Schedule;
