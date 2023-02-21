import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

export default {
  getTopBuyers,
  getTopSellers,
  getTopCollection,
  totalVolumeTraded,
  featuredNft,
  getActivity,
  getOwners
};

async function getTopBuyers(requestData) {
  let duration = requestData.duration ? requestData.duration : "";
  let currency = requestData.currency ? requestData.currency : "";
  let url =
    process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.TOP_BUYERS +
    "?duration=" +
    duration +
    "&currency=" +
    currency;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
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
async function getTopSellers(requestData) {
  let duration = requestData.duration ? requestData.duration : "";
  let currency = requestData.currency ? requestData.currency : "";
  let url =
    process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.TOP_SELLERS +
    "?duration=" +
    duration +
    "&currency=" +
    currency;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
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
async function getTopCollection(requestData) {
  let days;
  if (requestData.duration === "weekly") {
    days = "7";
  } else if (requestData.duration === "monthly") {
    days = "30";
  } else {
    days = "365";
  }

  let duration = days ? days : "";
  let currency = requestData.currency ? requestData.currency : "";
  let url =
    process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.TOP_COLLECTIONS +
    "?currency=" +
    currency +
    "&duration=" +
    duration;

  return httpService(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
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
async function totalVolumeTraded(req) {
  let url =
    process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.VOLUME_TRADED;

  // let url ="http://localhost:3002" + "/volume-traded";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    req,
    url
  )
    .then((response) => {
      if (!response.success || !response.responseData)
        return Promise.reject(response);
      // console.log("VOLUME", response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function featuredNft(requestData) {
  let url =
    process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.GET_FEATURED_NFT;
  // let url =
  //   "http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3003" +
  //   "/get-featured-nft";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    {},
    url
  )
    .then((response) => {
      if (!response.success || !response.responseData)
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getActivity(requestData) {
  let url = process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.GET_ACTIVITY;
    // let url =
    // "http://localhost:3002" +
    // "/get-activity";
  return httpService(httpConstants.METHOD_TYPE.POST,   {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "x-api-key": process.env.REACT_APP_X_API_KEY,
  }, requestData, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getOwners(address) {
  let url =
    process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.GET_OWNERS+"?collectionAddress="+address;

//  let url =
//     "http://localhost:3002" +
//     "/get-owners?collectionAddress="+address;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    {},
    url
  )
    .then((response) => {
      if (!response.success || !response.responseData)
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
