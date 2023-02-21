import Utils from "../../utils";
import { apiSuccessMessage, httpConstants } from "../../common/constants";
import BLManager from "./manager";

export default class Content {
  async reportNft(request, response) {
    const [error, addReportedNftContent] = await Utils.parseResponse(
      new BLManager().reportNft(request.body)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      addReportedNftContent,
      apiSuccessMessage.ADD_REPORTED_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async getReportedNfts(request, response) {
    const [error, getReportedNftContent] = await Utils.parseResponse(
      new BLManager().getReportedNfts(request.query)
    );
    if (error) return Utils.handleError(error, request, response);

    return Utils.response(
      response,
      getReportedNftContent,
      apiSuccessMessage.FETCH_REPORTED_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async getReportByNftsId(request, response) {
    const [error, getReportNftRes] = await Utils.parseResponse(
      new BLManager().getReportByNftsId(request.query.id)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getReportNftRes,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getDeletedNftList(request, response) {
    const [error, getRemovedNftList] = await Utils.parseResponse(
      new BLManager().getDeletedNftList(request.query)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      getRemovedNftList,
      apiSuccessMessage.FETCH_REMOVED_NFT_LIST,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async getRemoveByNftsId(request, response) {
    const [error, getRemoveNftRes] = await Utils.parseResponse(
      new BLManager().getRemoveByNftsId(request.query.id)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRemoveNftRes,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getBlockedUserList(request, response) {
    const [error, getRemovedNftList] = await Utils.parseResponse(
      new BLManager().getBlockedUserList(request.body)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      getRemovedNftList,
      apiSuccessMessage.FETCH_BLOCKED_USER_LIST,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async deleteReportedNft(request, response) {
    const [error, deleteReportedNftContent] = await Utils.parseResponse(
      new BLManager().deleteReportedNft(request.params)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      deleteReportedNftContent,
      apiSuccessMessage.DELETE_REPORTED_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
