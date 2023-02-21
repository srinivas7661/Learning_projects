import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";

export default {
  notificationList,
};

async function notificationList(requestData) {
  let url = process.env.REACT_APP_NOTIFICATION_SERVICE + "notification-list"

  return httpService(
    httpConstants.METHOD_TYPE.POST,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,"x-api-key":process.env.REACT_APP_X_API_KEY },
    requestData,
    url
  )
    .then((response) => {
      if (!response.responseData || response.responseData?.length === 0)
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
