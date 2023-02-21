import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const RewardsService = {
  getSchedules,
  getEntries,
  getActivities,
  getRewardGraph,
  getTotalRewards,
  clearScheduleInterval,
  getSlotAnalytics,
  getPopularActivities,
  getEntriesGraph,
};
export default RewardsService;

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
  };
}

// const reward =
//   "http://internal-gettr-pay-lb-1831109287.us-east-1.elb.amazonaws.com:3003";

async function getSchedules({ startTime, endTime }) {
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.SCHEDULES +
    `?startTime=${startTime}&endTime=${endTime}`;
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

async function getEntries(limit = 5) {
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_ENTRIES;
  url += `?limit=${limit}`;
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

async function getActivities(id) {
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    // 'http://localhost:3005' +
    httpConstants.API_END_POINT.GET_ACTIVITIES +
    `?limit=8&skip=0`;
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

export async function getRewardGraph(startTime, endTime) {
  let url = `${
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.REWARDS_GRAPH_DATA +
    `?startTime=${startTime}&endTime=${endTime}`
  }`;

  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, null, null, url)
      .then((res) => {
        if (!res.success || res.responseCode !== 200 || !res.responseData)
          return reject();
        return resolve(res.responseData);
      })
      .catch(reject);
  });
}

export async function getEntriesGraph(startTime, endTime) {
  let url = `${
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.ENTRIES_GRAPH_DATA +
    `?startTime=${startTime}&endTime=${endTime}`
  }`;

  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, null, null, url)
      .then((res) => {
        if (!res.success || res.responseCode !== 200 || !res.responseData)
          return reject();
        return resolve(res.responseData);
      })
      .catch(reject);
  });
}

function clearScheduleInterval(request) {
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.CLEAR_INTERVAL;
  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.POST, {}, request, url)
      .then((response) => {
        if (!response || response.responseCode !== 200 || !response.success)
          return reject("oops! Something went wrong!!");
        return resolve(response.responseData);
      })
      .catch((err) => reject(err));
  });
}
async function getPopularActivities(data) {
  let url = `${
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_POPULAR_ACTIVITIES
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
async function getTotalRewards({ startTime, endTime }) {
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    // "http://localhost:3005" +
    httpConstants.API_END_POINT.GET_TOTAL_REWARDS +
    `?startTime=${startTime}&endTime=${endTime}`;
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
async function getSlotAnalytics({ startTime, endTime }) {
  let url =
    process.env.REACT_APP_REWARDS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.SLOT_ANALYTICS +
    `?startTime=${startTime}&endTime=${endTime}`;

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
