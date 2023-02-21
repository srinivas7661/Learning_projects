import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const ProposalService = {
  getProposals,
  createProposal,
  getProposalWithVotes,
  addVote,
  getAdmins,
  getAdminInfo,
  createAdmin,
  GTRBalance,
};
export default ProposalService;

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    skip: true,
  };
}
async function getProposals(searchQuery, status, type, limit, skip, userRole) {
  let url =
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.PROPOSALS +
    `?role=${userRole}&skip=${skip}&limit=${limit}&status=` +
    status +
    "&type=" +
    type +
    "&searchQuery=" +
    searchQuery;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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
async function getAdmins(searchQuery) {
  let url =
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.ADMINS +
    `?searchQuery=${searchQuery}`;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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
async function createProposal(requestData) {
  let url =
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.PROPOSALS;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    getHeaders(),
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
async function getProposalWithVotes(id, user) {
  let url = `${
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_PROPOSAL_VOTES
  }/${id}?user=${user}`;
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
async function addVote(reqObj) {
  let url = `${
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.GET_PROPOSAL_VOTES
  }`;
  return new Promise((resolve, reject) => {
    httpService(httpConstants.METHOD_TYPE.POST, null, reqObj, url)
      .then((res) => {
        if (!res.success || res.responseCode !== 200 || !res.responseData)
          return reject();
        return resolve(res.responseData);
      })
      .catch(reject);
  });
}

async function getAdminInfo(admin) {
  let url =
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.ADMIN_INFO;
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), admin, url)
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

async function createAdmin(data) {
  let url =
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.ADD_ADMIN;
  return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), data, url)
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
async function GTRBalance() {
  let url =
    process.env.REACT_APP_PROPOSAL_MICROSERVICE_URL +
    httpConstants.API_END_POINT.BALANCE;
  return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), {}, url)
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
