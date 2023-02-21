import React from "react";
import styled from "styled-components";
import moment from "moment";
import {
    credsConstants,
    genericConstants,
    validationsMessages,
  } from "../../constants";
import { history } from "../../managers/history";

const PopupItems = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 30px;
  width: 100%;
  cursor: pointer;
  color: #535877;
  &:hover {
    background: #f8f8f8;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    cursor: pointer;
  }
`;
const PopupDescription = styled.div`
  display: flex;
  padding: 10px 0 10px 10px;
  justify-content: flex-start;
  width: 100%;
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  opacity: 1;
  white-space: nowrap;
  color: #535877;
`;
const PopupTimestamp = styled.div`
  display: flex;
  padding: 10px 10px;
  justify-content: flex-end;
  width: 100%;
  font: normal normal normal 10px/12px Barlow;
  letter-spacing: 0px;
  color: #535877;
  opacity: 1;
  white-space: nowrap;
`;

function Notifications({props}){
    return(
        <div>
            <h1 className="notifications-title">Notifications</h1>
            <div className="notifications-container">
                <h1>Mark all as read</h1>
                <div className="notifications-scrollbar" id="scrollbar-7">
                    <div className="">
                        {props.state.notifications &&
                          props.state.notifications?.length > 0 &&
                          props.state.notifications.map((item) => {
                            return (
                              <PopupItems key={item?._id}>
                                {(() => {
                                  switch (item.description) {
                                    case credsConstants.NFT_HAS_REPORTED:
                                      return (
                                        <PopupDescription
                                          onClick={() =>
                                            history.push(
                                              genericConstants.ACTIVE_MENU
                                                .REPORTED_NFT
                                            )
                                          }
                                        >
                                          {item?.description}
                                        </PopupDescription>
                                      );
                                    case credsConstants.NEW_TOKEN_REQUEST:
                                      return (
                                        <PopupDescription
                                          onClick={() =>
                                            history.push(
                                              genericConstants.ACTIVE_MENU
                                                .REQUESTED_TOKENS
                                            )
                                          }
                                        >
                                          {item?.description}
                                        </PopupDescription>
                                      );

                                    default:
                                      return;
                                  }
                                })()}

                                <PopupTimestamp>
                                  {item?.description?.length > 0
                                    ? moment(item.addedOn).format("LLL")
                                    : ""}
                                </PopupTimestamp>
                              </PopupItems>
                            );
                          })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications