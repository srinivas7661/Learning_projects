import Utils from "../../utils";
import HTTPService from "../../service/http-service";
import {apiFailureMessage, httpConstants} from "../../common/constants";
import Config from "../../../config";

export default class Manager {
    updateUser = async (data) => {
        let [error, response] = await Utils.parseResponse(HTTPService.executeHTTPRequest(httpConstants.METHOD_TYPE.POST, Config.USER_SERVICE_BASEURL, '/update-user', data, {"Content-Type": httpConstants.HEADER_TYPE.APPLICATION_JSON}));
        if (error || !response.success)
            throw Utils.error({}, apiFailureMessage.UNABLE_TO_UPDATE_USER, httpConstants.RESPONSE_CODES.FORBIDDEN);
        return response.responseData
    }
}