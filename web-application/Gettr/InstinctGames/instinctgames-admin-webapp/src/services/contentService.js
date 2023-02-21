import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { httpServiceCoinMarketCap } from "../utility/httpServiceCoinMarketCap";
export default {
  unRemoveNft,
  getBlockedUserList,
  getRemovedNftList,
  getReportedNftList,
  removeNft,
  deleteReportedNft,
  transactionDetailsService,
  getNftDetails,
  reportedNftDetailsList,
  removedNftDetailsList,
  deleteNft,
  bnbConversionToDollar,
  sacredTailsConversionToDollar,
  instinctConversionToDollar,
};
async function unRemoveNft(requestData) {
  let url = process.env.REACT_APP_CONTENT_SERVICE + httpConstants.API_END_POINT.UN_REMOVE_NFT;
  // let url = "http://localhost:3001" + "/nft";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    requestData,
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
async function getRemovedNftList(requestData) {
  let url = process.env.REACT_APP_CONTENT_SERVICE + httpConstants.API_END_POINT.GET_REMOVED_NFT_LIST+ `?duration=${requestData.duration}&limit=${requestData.limit}&skip=${requestData.skip}`;
  // let url = 'http://localhost:3001' + "/removed-nft-list";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    requestData,
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
async function getBlockedUserList(requestData) {
  let url = process.env.REACT_APP_USER_SERVICE + httpConstants.API_END_POINT.GET_BLOCKED_USER_LIST+`?limit=${requestData.limit}&skip=${requestData.skip}&duration=${requestData.duration}&searchByName=${requestData.searchByName}`
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
async function getReportedNftList(requestData) {
  let url = `${process.env.REACT_APP_CONTENT_SERVICE}reported-nft-list?limit=${requestData.limit}&skip=${requestData.skip}&duration=${requestData.duration}&searchValue=${requestData.searchValue}`;
  // &searchValue=${requestData.searchValue}
  // let url = 'http://localhost:3001' + "/reported-nft-list";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    requestData,
    url
  )
    .then((response) => {
      console.log("response123",response)
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
async function getNftDetails(contentId) {
  let url =
    process.env.REACT_APP_CONTENT_SERVICE +
    httpConstants.API_END_POINT.GET_NFT_DETAILS +
    "?_id=" +
    contentId;
  // let url = "http://localhost:3001" + "/get-nft" + "?_id=" + contentId;
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
async function reportedNftDetailsList(contentId) {
  let url =
    process.env.REACT_APP_CONTENT_SERVICE +
    httpConstants.API_END_POINT.REPORTED_NFT_DETAILS_LIST +
    "?id=" +
    contentId;
  // let url = "http://localhost:3001" + "/get-nft" + "?_id=" + contentId;
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
async function removedNftDetailsList(id) {
  let url =
    process.env.REACT_APP_CONTENT_SERVICE +
    httpConstants.API_END_POINT.REMOVED_NFT_DETAILS_LIST +
    "?id=" +
    id;
  // let url = "http://localhost:3001" + "/get-nft" + "?_id=" + contentId;
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
async function deleteReportedNft(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_SERVICE +
    httpConstants.API_END_POINT.DELETE_REPORTED_NFT +
    requestData._id;
  // let url = "http://localhost:3001" + "/delete-report-nft/" + requestData._id;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    requestData,
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
async function removeNft(requestData) {
  let url = process.env.REACT_APP_CONTENT_SERVICE + httpConstants.API_END_POINT.REMOVE_NFT;
  // let url = "http://localhost:3001" + "/nft";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    requestData,
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
async function deleteNft(data) {
  let url = process.env.REACT_APP_CONTENT_SERVICE + httpConstants.API_END_POINT.DELETE_NFT + "?id=" +
  data?._id;
  // let url = "http://localhost:3001" + "/nft";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY},
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
async function transactionDetailsService(requestData) {
    let url = 
      process.env.REACT_APP_CONTENT_SERVICE +
      httpConstants.API_END_POINT.TRANSACTION_DETAILS;
    return httpService(
      httpConstants.METHOD_TYPE.POST,
      { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
      requestData,
      url
    )
      .then((response) => {
        if (
          !response.success ||
          response.responseCode !== 200 ||
          !response.responseData ||
          response.responseData.length === 0
        )
          return Promise.reject(response);
        return Promise.resolve(response.responseData);
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  }
  async function bnbConversionToDollar() {
    let url =
      process.env.REACT_APP_COIN_MARKET_CAP_CONVERSION +
      httpConstants.API_END_POINT.PRICE_CONVERSION +
      `?amount=1&convert_id=2781&id=1839`;
    return httpServiceCoinMarketCap(
      httpConstants.METHOD_TYPE.GET,
      {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      },
      {},
      url
    )
      .then((response) => {
        if (!response || response.data?.length === 0) return Promise.reject();
        return Promise.resolve(response.data);
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  }
  async function sacredTailsConversionToDollar() {
    let url =
      process.env.REACT_APP_COIN_MARKET_CAP_CONVERSION +
      httpConstants.API_END_POINT.PRICE_CONVERSION +
      `?amount=1&convert_id=2781&id=17206`;
    return httpServiceCoinMarketCap(
      httpConstants.METHOD_TYPE.GET,
      {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      },
      {},
      url
    )
      .then((response) => {
        if (!response || response.data?.length === 0) return Promise.reject();
        return Promise.resolve(response.data);
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  }
  async function instinctConversionToDollar() {
    let url =
      process.env.REACT_APP_COIN_MARKET_CAP_CONVERSION +
      httpConstants.API_END_POINT.PRICE_CONVERSION +
      `?amount=1&convert_id=2781&id=12093`;
    return httpServiceCoinMarketCap(
      httpConstants.METHOD_TYPE.GET,
      {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      },
      {},
      url
    )
      .then((response) => {
        if (!response || response.data?.length === 0) return Promise.reject();
        return Promise.resolve(response.data);
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  }