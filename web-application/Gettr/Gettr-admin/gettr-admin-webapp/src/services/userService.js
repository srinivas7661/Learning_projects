import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";

const RewardsService = {
  getUser,
};
export default RewardsService;

async function getUser() {
  let url = `${
    process.env.REACT_APP_WALLET_MICROSERVICE_URL +
    httpConstants.API_END_POINT.USER_LIST
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
