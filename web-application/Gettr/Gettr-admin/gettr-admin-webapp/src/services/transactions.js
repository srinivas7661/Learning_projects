import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const TransactionService = {
  getTransactionById,
  transactionsByUser,
  getTransactions,
  getTotalTransaction,
  getRewardAnalytics,
};
export default TransactionService;

async function getTransactionById(id) {
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TRANSACTIONS +
    `/${id}`;
  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
      .then((response) => {
        if (
          !response.success ||
          response.responseCode !== 200 ||
          !response.responseData ||
          response.responseData.length === 0
        )
          return reject();
        return resolve(response.responseData);
      })
      .catch(function (err) {
        return reject(err);
      });
  });
}

function transactionsByUser(userId) {
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TRANSACTIONS;
  url += `?userId=${userId}&limit=${6}`;

  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
      .then((response) => {
        if (!response || response.responseCode !== 200 || !response.success)
          return reject("oops! Something went Wrong!!");
        return resolve(response.responseData);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

async function getTransactions(limit, skip, { event, userId }) {
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TRANSACTIONS +
    `?limit=${limit}&skip=${skip}&token=GTR`;
  if (event) {
    url = `${url}&event=${event}`;
  }
  if (userId) {
    url = `${url}&userId=${userId}`;
  }
  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
      .then((response) => {
        if (!response || !response.success || response.responseCode !== 200)
          return reject("oops! Something went Wrong!!");
        return resolve(response.responseData);
      })
      .catch(function (err) {
        return reject(err);
      });
  });
}

async function getTotalTransaction(startTime, endTime) {
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TOTAL_TRANSACTIONS +
    `?startTime=${startTime}&endTime=${endTime}`;

  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
      .then((response) => {
        if (!response || !response.success || response.responseCode !== 200)
          return reject("oops! Something went Wrong!!");
        return resolve(response.responseData);
      })
      .catch(function (err) {
        return reject(err);
      });
  });
}

async function getRewardAnalytics(params) {
  const { startTime, endTime, type } = params;
  let url =
    process.env.REACT_APP_TRANSACTIONS_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_REWARD_ANALYTICS +
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
