import ViewModels from "../../models/viewModels";
import Utils from "../../utils";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import LikeModels from "../../models/likesModel";
import ContentBlManager from "../content/manager";

export default class Manger {
  addView = async (request) => {
    if (!request || !request.contentId || !request.addedBy)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
      let [error, response] = await Utils.parseResponse(ViewModels.findOneData({contentId: request.contentId, addedBy: request.addedBy}))
      if(response)
          throw Utils.error(
              {},
              apiFailureMessage.ALREADY_VIEWED,
              httpConstants.RESPONSE_CODES.FORBIDDEN
          );
      let viewObj = new ViewModels(request);
      let [err, result] = await Utils.parseResponse(viewObj.saveData());
      if(err)
          throw Utils.error(
              {},
              apiFailureMessage.UNABLE_ADD_LIKE,
              httpConstants.RESPONSE_CODES.FORBIDDEN
          );
      return await new ContentBlManager().updateContentViewCount(request)
  };
}
