import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const dashboardService = {
  getActiveSlotService,
  getTotalParticipantService,
  getTotalEntriesCount,
};
export default dashboardService;

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
  };
}

async function getActiveSlotService(data) {
  let url = `${
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_ACTIVE_SLOT
  }?active=${data.activeSlot}&date=${data.date}`;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getTotalParticipantService(data) {
  let url = `${
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_TOTAL_PARTICIPANTS
  }?startTime=${data.startTime}&endTime=${data.endTime}`;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function getTotalEntriesCount(data) {
  let url = `${
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TOTAL_ENTRIES_COUNT
  }?startTime=${data.startTime}&endTime=${data.endTime}`;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
