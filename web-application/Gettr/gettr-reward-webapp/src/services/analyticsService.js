import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const analyticsService = {
  getTotalEntry,
  getTotalParticipants,
};
export default analyticsService;

function getTotalEntry(data) {
  const { startTime, endTime, type } = data;
  const url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TOTAL_ENTRIES +
    `?startTime=${startTime}&endTime=${endTime}${type ? "&type=" + type : ""}`;
  // &entityId=${enId}&date=${date}&timeslot=${timeSlot}&reward=${reward}
  console.log(url, "v");
  return httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      // console.log("response==", response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

function getTotalParticipants(data) {
  const { startTime, endTime, type } = data;
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TOTAL_PARTICIPANTS +
    `?startTime=${startTime}&endTime=${endTime}${type ? "&type=" + type : ""}`;
  // &entityId=${enId}&date=${date}&timeslot=${timeSlot}&reward=${reward}
  return httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      // console.log("response==", response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
