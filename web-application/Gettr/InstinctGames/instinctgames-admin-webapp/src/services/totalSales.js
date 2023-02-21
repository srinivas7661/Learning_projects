import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

export default {
  getTotalSales,
  getTotalUser,
  nftSoldGraph,
  topCollectionTable,
  topNftsTable,
};

async function getTotalSales() {
  let url =
    process.env.REACT_APP_SELLPURCHASE_SERVICE +
    httpConstants.API_END_POINT.TOTAL_SALES;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    {},
    url
  )
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
async function getTotalUser() {
  let url =
    process.env.REACT_APP_USER_SERVICE +
    httpConstants.API_END_POINT.TOTAL_USERS;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON, "x-api-key":process.env.REACT_APP_X_API_KEY },
    {},
    url
  )
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

async function nftSoldGraph() {
  let url =
    process.env.REACT_APP_SELLPURCHASE_SERVICE +
    httpConstants.API_END_POINT.NFT_SOLD_GRAPH;

  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON, "x-api-key":process.env.REACT_APP_X_API_KEY },
    {},
    url
  )
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

async function topCollectionTable() {
  let url =
    process.env.REACT_APP_SELLPURCHASE_SERVICE +
    httpConstants.API_END_POINT.TOP_COLLECTION_DATA;

  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON, "x-api-key":process.env.REACT_APP_X_API_KEY },
    {},
    url
  )
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

async function topNftsTable() {
  let url =
    process.env.REACT_APP_SELLPURCHASE_SERVICE +
    httpConstants.API_END_POINT.TOP_NFTS_DATA;

  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON, "x-api-key":process.env.REACT_APP_X_API_KEY },
    {},
    url
  )
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
