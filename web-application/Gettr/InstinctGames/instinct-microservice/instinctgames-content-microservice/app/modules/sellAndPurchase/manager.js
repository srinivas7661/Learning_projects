import Utils from "../../utils";
import HTTPService from "../../service/http-service";
import { apiFailureMessage, httpConstants } from "../../common/constants";
import Config from "../../../config";

export default class Manager {
  static addTransaction = async (request, type) => {
    if (!request || !type || Object.keys(request).length < 1)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    let [error, response] = await Utils.parseResponse(
      HTTPService.executeHTTPRequest(
        httpConstants.METHOD_TYPE.POST,
        Config.TRANSACTION_SERVICE_BASEURL,
        "/add-transaction",
        getRequestData(request, type),
        { "Content-Type": httpConstants.HEADER_TYPE.APPLICATION_JSON }
      )
    );
    console.log("error===", error);
    console.log("response===", response);
    if (error || !response || !response.responseData || !response.success) {
      throw Utils.error(
        {},
        apiFailureMessage.UNABLE_ADD_CONTENT_HISTORY,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return response.responseData;
  };
}
const getRequestData = (request, type) => {
  return {
    contentId: (request && request._id) || "",
    seller: (request && request.seller) || "",
    buyer: (request && request.buyer) || "",
    price: (request && request.price) || 0,
    currency: (request && request.currency) || "",
    type: type || "",
    transactionHash: (request && request.transaction) || "",
    addedBy: (request && request.buyer) || "",
    collectionId: (request && request.collectionId) || "",
  };
};
