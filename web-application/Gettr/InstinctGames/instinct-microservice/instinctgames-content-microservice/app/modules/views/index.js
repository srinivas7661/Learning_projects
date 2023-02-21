import Utils from "../../utils";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import BLManager from "./manager";
export default class Views {
  async addView(request, response) {
    if (!request || !request.body.contentId || !request.body.addedBy)
      return Utils.handleError(apiFailureMessage.INVALID_PARAMS);
    const [error, addViewsResponse] = await Utils.parseResponse(
      new BLManager().addView(request.body)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      addViewsResponse,
      apiSuccessMessage.INFO_UPDATED,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
    Utils.handleError(error, request, response);
  }
}
