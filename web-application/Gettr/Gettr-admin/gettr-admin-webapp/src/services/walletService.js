// import { APIGateway } from "aws-sdk";
import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";

const WalletService = {
  totalWallets,
};
export default WalletService;
async function totalWallets(params) {
  const { startTime, endTime } = params;
  let url =
    process.env.REACT_APP_WALLET_MICROSERVICE_URL +
    httpConstants.API_END_POINT.TOTAL_WALLET_CREATED;
  url += `?startTime=${startTime}&endTime=${endTime}`;
  return httpService(httpConstants.METHOD_TYPE.GET, {}, {}, url)
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
