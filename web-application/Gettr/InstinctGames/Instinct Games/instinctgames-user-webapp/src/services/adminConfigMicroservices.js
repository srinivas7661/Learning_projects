// import { APIGateway } from "aws-sdk";
import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

export default {
  addToken,
  getcategory,
  getCategoryById,
  getTrendingCollection,
  getcollection,
  getApproveToken,
  updateTransactionDetails,
  getCollectionById,
  getFilteredCollection,
  getCollectionByCategoryId
};

export function getcategory(skip, limit) {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_CATEGORY +
    `?limit=${limit}`;

  return httpService(
    httpConstants.METHOD_TYPE.POST,
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

export function getCategoryById(categoryId) {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_CATEGORY_ID +
    `?categoryId=${categoryId}`;
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
      // console.log("response==", response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getTrendingCollection() {
  // let url =
  //     process.env.REACT_APP_ADMIN_MICROSERVICE +
  //     httpConstants.API_END_POINT.GET_TRENDING_COLLECTION;
  let url =
    // `http://ig-lb-prod-1641661053.us-east-2.elb.amazonaws.com:3001/` +
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_TRENDING_COLLECTION;
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
      if (!response.success || !response.responseData) {
        return Promise.reject();
      }

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getcollection(categoryId, type, limit, find) {
  // uncomment for working it back and comment the other URL
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_COLLECTIONS +
    `?`;
  // let url = `http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3001/get-collection?`;
  if (categoryId) {
    url = url + `&categoryId=${categoryId}`;
  }
  if (find) {
    url = url + `&find=${find}`;
  }
  if (limit) {
    url = url + `&limit=${limit}`;
  }
  if (type) {
    url = url + `&collection=type&type=${type}`;
  }

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
        !response.responseData
      )
        return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getFilteredCollection(requestData) {
  let url =  process.env.REACT_APP_ADMIN_MICROSERVICE + 'filtered-collections';
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
        response.success !== 200 ||
        !response.responseData
      )
        return Promise.reject();   

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function addToken(requestData) {
  let url = process.env.REACT_APP_CONTENT_MICROSERVICE + "add-token-request";

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

      return Promise.resolve(response);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getApproveToken(requestData) {
  let url = process.env.REACT_APP_ADMIN_MICROSERVICE + "get-approved-token";
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
      // console.log("approve-token", response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function updateTransactionDetails(requestData) {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE + "add-transaction-details";
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
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

export function getCollectionById(collectionId) {
  // uncomment for working it back and comment the other URL
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_COLLECTION_BY_ID +
    `?collectionId=${collectionId}`;

  // let url = `http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3001/get-collection-id?collectionId=${collectionId}`;

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
        !response.responseData
      )
        return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getCategories(requestData) {
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_CATEGORY +
    "?limit=3";

  return httpService(
    httpConstants.METHOD_TYPE.POST,
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
export function getCollectionByCategoryId(categoryId) {
  // uncomment for working it back and comment the other URL
  let url =
    process.env.REACT_APP_ADMIN_MICROSERVICE +
    httpConstants.API_END_POINT.GET_COLLECTION+
    `?`;
  // let url = `http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3001/get-collection?`;
  if (categoryId) {
    url = url + `&categoryId=${categoryId}`;
  }
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
        !response.responseData
      )
        return Promise.reject();

      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

