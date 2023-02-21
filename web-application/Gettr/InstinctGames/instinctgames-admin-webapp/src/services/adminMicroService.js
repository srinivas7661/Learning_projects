import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { APIGateway } from "aws-sdk";
//import ContentBackspace from "material-ui/svg-icons/content/backspace";

export default {
  approveRejectToken,
  requestedToken,
  getCollections,
  addCollections,
  getCategories,
  getApproveTokens,
  getRejectedTokens,
  updateCollection,
  getToken,
  removeToken,
  getrecentCollections,
  rejectTokens,
  verifyTokens,
  getCollectionById,
};

async function approveRejectToken(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/approve-reject-token";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON, "x-api-key":process.env.REACT_APP_X_API_KEY },
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

async function requestedToken(requestData) {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_REQUESTED_TOKENS +
    `?duration=${requestData.duration}&type=${requestData.type}`;

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
async function getCollections(requestData) {
  let url = `${process.env.REACT_APP_ADMIN_MICROSERVICE}/get-collection?limit=${requestData.limit}&skip=${requestData.skip}&find=${requestData.find}`;

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

async function getrecentCollections(requestData) {
  let url = `${process.env.REACT_APP_ADMIN_MICROSERVICE}/get-collections?limit=${requestData.limit}&skip=${requestData.skip}&collection=${requestData.sortBy}&find=${requestData.find}
  `;
  console.log("requestData123", requestData);
  // let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/get-collection";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
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
async function getCollectionById(id) {
  let url = `${process.env.REACT_APP_ADMIN_MICROSERVICE}/get-collection-id?_id=${id}`;

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
async function addCollections(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/add-collection";
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

export function getCategories(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/get-categories";
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

async function getApproveTokens() {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_APPROVE_TOKEN;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
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
async function getRejectedTokens() {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/get-Rejected-tokens";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
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
async function updateCollection(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/update-collection";
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

export function addCategory(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/add-category";
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
async function getToken(requestData) {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    "/get-token" +
    "?_id=" +
    requestData;
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

async function removeToken(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/remove-token";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    { tokenId: requestData },
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

async function rejectTokens(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/reject-token";
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

async function verifyTokens(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "/verify-token";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY},
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
