import LikeModels from "../../models/likesModel";
import mongoose from "mongoose";
import Utils from "../../utils";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
  apiEndpoints,
} from "../../common/constants";
import NftSchema from "../../models/contentModel";
import ContentBlManager from "../content/manager";

export default class Manger {
  addLike = async (request) => {
    if (!request || !request.contentId || !request.addedBy)
      return Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    let isAlreadyLiked = await NftSchema.find({
      _id: request.contentId,
      "likedBy.userId": request.addedBy,
    });
    let response;

    if (isAlreadyLiked.length != 0) {
      response = await NftSchema.findOneAndUpdate(
        { _id: request.contentId },
        {
          $pull: {
            likedBy: { userId: request.addedBy },
          },
        },
        { new: true }
      );
    } else {
      response = await NftSchema.findOneAndUpdate(
        { _id: request.contentId },
        {
          $push: {
            likedBy: [{ userId: request.addedBy }],
          },
        },
        { new: true }
      );
    }
    return await NftSchema.findOneAndUpdateData(
      { _id: request.contentId },
      { likesCount: response.likedBy.length },
      { new: true }
    );

    // return response;
    // if (response)
    //   throw Utils.error(
    //     {},
    //     apiFailureMessage.ALREADY_LIKED,
    //     httpConstants.RESPONSE_CODES.FORBIDDEN
    //   );
    // let likeObj = new LikeModels(request);
    // let [err, result] = await Utils.parseResponse(likeObj.saveData());
    // if (err)
    //   throw Utils.error(
    //     {},
    //     apiFailureMessage.UNABLE_ADD_LIKE,
    //     httpConstants.RESPONSE_CODES.FORBIDDEN
    //   );
    // return await new ContentBlManager().updateContentLikeCount(request);
  };

  // getFavouriteNfts = async (request) => {
  //   const reqObj = [
  //     {
  //       $match: {
  //         addedBy: mongoose.Types.ObjectId(request.addedBy),
  //       },
  //     },
  //     { $group: { _id: "$addedBy", contentId: { $push: "$contentId" } } },
  //   ];

  //   const favouriteContents = await LikeModels.aggregate(reqObj);
  //   const contentIdsList = favouriteContents[0].contentId;
  //   return await NftSchema.find({
  //     _id: {
  //       $in: contentIdsList,
  //     },
  //   })
  //     .skip(request.skip ? Number(request.skip) : 0)
  //     .limit(request.limit ? Number(request.limit) : 0);
  // };
}
