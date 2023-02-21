import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const TransactionService = {
  getTopPerformers,
  getHighestRewardWinner,
  getWinnerStatsBoard,
};
export default TransactionService;

async function getTopPerformers(params) {
  const { startTime, endTime, type } = params;
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_TOP_PERFORMERS +
    `?startTime=${startTime}&endTime=${endTime}${type ? "&type=" + type : ""}`;
  return httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
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

async function getHighestRewardWinner(params) {
  const { startTime, endTime, type } = params;
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_HIGHEST_REWARD_WINNER +
    `?startTime=${startTime}&endTime=${endTime}${type ? "&type=" + type : ""}`;
  return httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
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

function getWinnerStatsBoard(data) {
  const { userId, startTime, endTime, type } = data;
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.WINNERS;
  url += `/${userId}?startTime=${startTime}&endTime=${endTime}${
    type ? "&type=" + type : ""
  }`;
  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
      .then((response) => {
        if (!response || !response.success || response.responseCode !== 200)
          return reject("oops! Something went Wrong!!");
        return resolve(response.responseData);
      })
      .catch((error) => reject(error));
  });
}
