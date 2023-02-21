import axios from "axios";
import { httpConstants } from "../constants";

const OktaService = {
  getUserDetails,
  getUserId,
  getGroups,
};
export default OktaService;

async function getUserDetails() {
  let url = process.env.REACT_APP_ISSUER + "/v1/userinfo";
  try {
    const response = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return error;
  }
}

async function getUserId(email) {
  let url = `https://${process.env.REACT_APP_OKTA_DOMAIN}/api/v1/users/${email}`;
  try {
    const userResponse = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        Authorization: `SSWS ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
    return Promise.resolve(userResponse.data);
  } catch (error) {
    return error;
  }
}
async function getGroups(userId) {
  let url = `https://${process.env.REACT_APP_OKTA_DOMAIN}/api/v1/users/${userId}/groups`;
  try {
    const groupResponse = await axios(url, {
      method: "GET",
      headers: {
        "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
        Authorization: `SSWS ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
    return groupResponse.data;
  } catch (error) {
    return error;
  }
}
