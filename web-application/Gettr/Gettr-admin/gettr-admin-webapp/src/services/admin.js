import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const adminMicroservice = {
  getAdminUser,
  addAdminUser,
  createActivity,
  getAdminData,
};

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
  };
}
async function getAdminUser(data) {
  let url =
    process.env.REACT_APP_ADMIN_CONFIG_MICROSERVICE_URL +
    httpConstants.API_END_POINT.ADMINS +
    `?searchQuery=${data}`;
  // `?gettrId=${data}&skip=0&limit=4`;
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

async function addAdminUser(data) {
  let url =
    process.env.REACT_APP_ADMIN_CONFIG_MICROSERVICE_URL +
    httpConstants.API_END_POINT.ADMINS;
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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

async function createActivity(data) {
  let url =
    process.env.REACT_APP_ADMIN_CONFIG_MICROSERVICE_URL +
    httpConstants.API_END_POINT.CREATE_ACTIVITY;
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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

export async function getAdminData() {
  let url = `${
    process.env.REACT_APP_ADMIN_CONFIG_MICROSERVICE_URL +
    httpConstants.API_END_POINT.ADMIN_LIST
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

export default adminMicroservice;
