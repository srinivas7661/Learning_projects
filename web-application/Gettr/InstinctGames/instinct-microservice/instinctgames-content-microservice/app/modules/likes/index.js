import Utils from "../../utils";
import { apiSuccessMessage, httpConstants } from "../../common/constants";
import BLManager from "./manager";
export default class Likes {
  async addLike(request, response) {
    const [error, addLikesResponse] = await Utils.parseResponse(
      new BLManager().addLike(request.body)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      addLikesResponse,
      apiSuccessMessage.LIKE_ADDED,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  // async getFavouriteNfts(request, response) {
  //   const [error, getFavouriteNftsRes] = await Utils.parseResponse(
  //     new BLManager().getFavouriteNfts(request.query)
  //   );
  //   if (error) return Utils.handleError(error, request, response);
  //   return Utils.response(
  //     response,
  //     getFavouriteNftsRes,
  //     apiSuccessMessage.GET_FAVOURITE_NFT_LIST,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
}
