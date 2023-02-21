import { httpConstants } from "../constants";

import { httpService } from "../utility/httpService";

// export default {
//   // getcategory,
//   // getCollection
// };

export function getcategory() {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_CATEGORY;

  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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
export function getcollection() {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_COLLECTION;

  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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
