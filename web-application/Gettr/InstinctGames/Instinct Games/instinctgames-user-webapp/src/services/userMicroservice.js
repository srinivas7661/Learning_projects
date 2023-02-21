import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

export function updateUser(requestData) {
  let url = process.env.REACT_APP_USER_MICROSERVICE + "update-user";
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
        return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
export function getUserData(data) {
  let url =
    process.env.REACT_APP_USER_MICROSERVICE +
    httpConstants.API_END_POINT.GET_USERPROFILE +
    "?userId=" +
    data;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
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
        return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
export function addUser(requestData) {
  let url = process.env.REACT_APP_USER_MICROSERVICE + "add-user";
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
        return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
