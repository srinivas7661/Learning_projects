import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const AdminConfigService = {
  updateAdmin,
};
export default AdminConfigService;

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
  };
}

async function updateAdmin(data, id) {
  let url =
    process.env.REACT_APP_ADMIN_CONFIG_MICROSERVICE_URL +
    httpConstants.API_END_POINT.UPDATE_ADMIN +
    `${id}`;
  return httpService(httpConstants.METHOD_TYPE.PATCH, getHeaders(), data, url)
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
