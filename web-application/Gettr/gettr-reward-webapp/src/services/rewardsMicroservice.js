import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const RewardsService = {
  getSlotAnalytics,
  getRedeemGifts,
  getUserRewards,
  getDailyRewards,
};
export default RewardsService;

async function getDailyRewards(date) {
  let url =
    // process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    "http://localhost:3005" +
    httpConstants.API_END_POINT.GET_DAILY_REWARDS +
    `/gettrId2?date=${date}`;
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

async function getSlotAnalytics(params) {
  const { startTime, endTime, type } = params;
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_SLOT_ANALYTICS +
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
function getUserRewards(gettrId) {
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.USER_REWARDS +
    `/${gettrId}`;
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
function getRedeemGifts(data) {
  const { category } = data;
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.REDEEMABLE;
  url += `?category=${category}`;
  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
      .then((response) => {
        if (!response || response.responseCode !== 200 || !response.success)
          return reject("Oops! Something went wrong!!");
        return resolve(response.responseData);
      })
      .catch((err) => reject(err));
  });
}
