import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { httpServiceFileUpload } from "../utility/httpServiceFileUpload";
import { httpServiceCoinMarketCap } from "../utility/httpServiceCoinMarketCap";

export default {
  createNftContent,
  addIpfs,
  nftDetails,
  bnbConversionToDollar,
  sacredTailsConversionToDollar,
  instinctConversionToDollar,
  priceGraph,
  getTrendingNfts,
  getNewlyListNfts,
  getRecentlySoldNft,
  helpCenterService,
  makeSuggestionService,
  getCount,
  likeNft,
  onReportNFT,
  updateNftContent,
  addOffer,
  getOffer,
  acceptOffer,
  hideNft,
  hiddenNft,
  unhideNft
};
export async function acceptOffer(data) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "accept-reject-offer";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    data,
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
export async function getOffer(data) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "get-offers-for-user";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    data,
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
export async function likeNft(data) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "like-nft";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    data,
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

async function getCount(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.GET_COUNT;
  // let url =
  //   "http://localhost:3001" +
  //   "/get-count";
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
    .then((response) => {
      if (!response.success || !response.responseData)
        return Promise.reject(response);
      // console.log("get-count", response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getTrendingNfts(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.TRENDING_NFT;
  // let url =
  //   "http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3000" +
  //   "/trending-nft";
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.GET, headers, requestData, url)
    .then((response) => {
      if (!response.success || !response.responseData)
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getNewlyListNfts(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.GET_NFTS;

  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
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

async function getRecentlySoldNft(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.RECENTLY_SOLD_NFT;
  // let url="http://localhost:3001/"+ httpConstants.API_END_POINT.RECENTLY_SOLD_NFT
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
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

export function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    "x-api-key": process.env.REACT_APP_X_API_KEY,
    skip: true,
    "Access-Control-Allow-Origin": "*",
    // 'Authorization': `Bearer ${utility.getAccessToken()}`
  };
}

export function getNfts(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.GET_NFTS;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    requestData,
    url
  )
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

async function helpCenterService(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.HELP_CENTER_SERVICE;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
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

async function makeSuggestionService(requestData) {
  const url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.SUGGESTIONS_SERVICE;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
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
export function createNftContent(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.ADD_CONTENT;

  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
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
async function updateNftContent(requestData) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "save-nft";
  // let url = 'http://localhost:3001/' + "save-nft";
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
    .then((response) => {
      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function nftDetails(contentId) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.GET_NFT +
    "?_id=" +
    contentId;
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.GET, headers, {}, url)
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

export function priceGraph(requestData) {
  let url =
    // let url = `https://js0yxvv538.execute-api.us-east-2.amazonaws.com/prod/sell-and-purchase/price-graph`;
    process.env.REACT_APP_SELL_PURCHASE_MICROSERVICE +
    httpConstants.API_END_POINT.PRICE_GRAPH;
  // "/content-id?contentId=628cd69b0a1b640035c73040&time=Monthly";
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
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

async function bnbConversionToDollar() {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.PRICE_CONVERSION +
    `?id=1839`;
  // let url ="http://localhost:3001/price-conversion?id=1839"
  return httpServiceCoinMarketCap(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },

    {},
    url
  )
    .then((response) => {
      if (!response || !response.responseData) return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function sacredTailsConversionToDollar() {
  // let url =
  //   process.env.REACT_APP_COIN_MARKET_CAP_CONVERSION +
  //   httpConstants.API_END_POINT.PRICE_CONVERSION +
  //   `?amount=1&convert_id=2781&id=17206`;

  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.PRICE_CONVERSION +
    `?id=17206`;

  return httpServiceCoinMarketCap(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    {},
    url
  )
    .then((response) => {
      if (!response || !response.responseData) return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function instinctConversionToDollar() {
  // let url =
  //   process.env.REACT_APP_COIN_MARKET_CAP_CONVERSION +
  //   httpConstants.API_END_POINT.PRICE_CONVERSION +
  //   `?amount=1&convert_id=2781&id=12093`;

  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.PRICE_CONVERSION +
    `?id=12093`;

  return httpServiceCoinMarketCap(
    httpConstants.METHOD_TYPE.GET,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    {},
    url
  )
    .then((response) => {
      if (!response || !response.responseData) return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function addIpfs(requestdata) {
  // let url = "http://localhost:3001/" + "add-file-ipfs";
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "add-file-ipfs";

  return httpServiceFileUpload(
    httpConstants.METHOD_TYPE.POST,
    { "x-api-key": process.env.REACT_APP_X_API_KEY },
    requestdata,
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

function onReportNFT(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.REPORT_NFT;
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.POST, headers, requestData, url)
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function addOffer(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.ADD_OFFER;
  // let url="http:localhost:3000"+"/add-offer"
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    requestData,
    url
  )
    .then((response) => {
      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function hideNft(nftId) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "hide-nft" + "?_id=" +
    nftId + "&hide=true";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
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
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
export async function hiddenNft(ownerAddress) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "get-hidden-nft?ownerAddress=" + ownerAddress;
  // nftId+"&hide=true";
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
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function unhideNft(nftId) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "hide-nft" + "?_id=" +
    nftId + "&hide=false";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
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
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getNftTraits(requestData) {
  let url =
    process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.GET_TRAITS;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
    requestData,
    url
  )
    .then((response) => {
      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function filterNft(requestData) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE +
    httpConstants.API_END_POINT.GET_NFT_FILTER;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    {
      "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
      "x-api-key": process.env.REACT_APP_X_API_KEY,
    },
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
