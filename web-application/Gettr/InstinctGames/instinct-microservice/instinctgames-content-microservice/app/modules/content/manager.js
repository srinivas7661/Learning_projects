import { create } from "ipfs-http-client";
import NftSchema from "../../models/contentModel";
import StoreCID from "../../models/cidModel";
import ReportSchema from "../../models/reportModel";
import {
  apiFailureMessage,
  httpConstants,
  apiEndpoints,
  amqpConstants,
  urlConstants,
  apiSuccessMessage,
  events,
  notificationType,
} from "../../common/constants";
import mongoose from "mongoose";
import Utils from "../../utils";
import HTTPService from "../../service/http-service";
import Config from "../../../config";
import fs from "fs";
import AWSServices from "../../service/aws-service";
import ReportedNftManager from "../reportedNft/manager";
import UserManager from "../user/userManager";
import Parser from "../../utils/parser";
import mime from "mime";
import Queue from "../queue";
import pug from "pug";

export default class Manager {
  addContent = async (requestData) => {
    if (
      !requestData ||
      !requestData.cid ||
      !requestData.name ||
      !requestData.contentType ||
      !requestData.categoryId ||
      !requestData.collectionId ||
      !requestData.network ||
      !requestData.description ||
      !requestData.ownedBy ||
      !requestData.ownerAddress
    )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    //cid
    const isContentAlreadyExists = await StoreCID.findOne({
      cid: requestData.cid,
    });
    if (
      isContentAlreadyExists &&
      Object.keys(isContentAlreadyExists).length > 0
    ) {
      throw Utils.error(
        {},
        "No duplicate contents are Allowed",
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let ipfsCID = new StoreCID({ cid: requestData.cid });
    await ipfsCID.save();

    const nftList = await NftSchema.find().sort({ addedOn: -1 }).limit(1);
    let lastCount = nftList[0].documentCount;
    let contentObj = new NftSchema(requestData);
    contentObj.documentCount = lastCount + 1;
    contentObj.addedOn = new Date().getTime();
    contentObj.updatedOn = new Date().getTime();
    return await contentObj.saveData();
  };

  parseRequestAndUploadFile = async (requestData, userId) => {
    // let fileName = requestData.fileName.replace(/\s/g, "");
    let fileName = requestData.fileName;
    // let key = `${userId}/${Config.FOLDER_NAME}/${fileName}`;
    let key = `${Config.FOLDER_NAME}/${fileName}`;

    let content = fs.readFileSync(basedir + `/uploads/${fileName}`);
    let mimeType = mime.getType(basedir + `/uploads/${fileName}`);
    let keyForValidation = `CIDs/${fileName}`;
    let renamedFile = fs.readFileSync(basedir + `/uploads/${fileName}`);
    let newFileHash = await this.processFileOnIPFS(
      renamedFile,
      keyForValidation,
      true
    );
    const contentAddress = newFileHash.toString();
    const isContentAlreadyExists = await StoreCID.findOne({
      cid: contentAddress,
    });
    if (
      isContentAlreadyExists &&
      Object.keys(isContentAlreadyExists).length > 0
    ) {
      fs.unlinkSync(basedir + `/uploads/${fileName}`);
      throw Utils.error(
        {},
        "No duplicate contents are Allowed",
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    let fileUploadToIPFSResponse = await this.processFileOnIPFS(content, key);
    fs.unlinkSync(basedir + `/uploads/${fileName}`);

    // let ipfsCID = new StoreCID({cid: contentAddress});
    // await ipfsCID.save();
    await new AWSServices().uploadFileToS3(
      Config.S3_BUCKET_NAME,
      key,
      content,
      mimeType
    );

    let ipfsUrl =
      Config.IPFS_HOST_URL +
      fileUploadToIPFSResponse.toString() +
      `/` +
      fileName;
    let cdnUrl = Config.CDN_BASE_URL + key;
    return { ipfsUrl, cdnUrl, cid: contentAddress };
  };
  processFileOnIPFS = async (file, path, isForGenerateOnlyHash = false) => {
    try {
      const ipfs = create(new URL(Config.IPFS_URL));
      let response;
      if (isForGenerateOnlyHash)
        response = await ipfs.add({ path, content: file }, { onlyHash: true });
      else response = await ipfs.add({ path, content: file });
      if (!response || !response.cid)
        throw Utils.error(
          {},
          isForGenerateOnlyHash
            ? "Unable to generate file hash"
            : "Unable to upload file to IPFS",
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );

      return response.cid;
    } catch (error) {
      throw Utils.error(
        error,
        "Unable to process file on IPFS",
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
  };

  getNfts = async (request) => {
    let contentRequest = Utils.parseGetContentRequest(request);
    if ((request.minPrice || request.minPrice === 0) && request.maxPrice) {
      contentRequest.requestData = {
        ...contentRequest.requestData,
        "saleData.price": { $gte: request.minPrice, $lte: request.maxPrice },
      };
      delete contentRequest.requestData.minPrice;
      delete contentRequest.requestData.maxPrice;
    }
    if (request.currency) {
      contentRequest.requestData = {
        ...contentRequest.requestData,
        "saleData.currency": request.currency,
      };
      delete contentRequest.requestData.currency;
    }
    // let selectionKeys = "";
    const nftContent = await NftSchema.getFilteredData(
      { ...contentRequest.requestData, isDeleted: false },
      contentRequest.selectionKeys,
      contentRequest.skip,
      contentRequest.limit,
      contentRequest.sortingKey,
      contentRequest.selectionKeys,
      contentRequest.searchValue
    );

    let totalCount = await NftSchema.count({
      ...contentRequest.requestData,
      isDeleted: false,
    });
    return { nftContent, totalCount };
  };

  updateContent = async (request) => {
    if (!request || !request._id)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    //check content exist or not
    let [error, response] = await Utils.parseResponse(
      NftSchema.findOneData({
        _id: request._id,
        isInActive: false,
        isDeleted: false,
      })
    );
    if (error || !response)
      throw Utils.error(
        {},
        apiFailureMessage.RECORD_NOT_FOUND,
        httpConstants.RESPONSE_CODES.NOT_FOUND
      );

    return await NftSchema.findOneAndUpdateData(
      { _id: request._id },
      Parser.getContentUpdateRequest(request)
    );
  };

  OpenForSale = async (request) => {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    const nft = await NftSchema.findOne({ _id: request._id });

    if (nft.isHidden == true) {
      return { status: "error" };
    } else {
      const updateObj = {
        saleData: request.saleData,
      };
      return NftSchema.findOneAndUpdateData({ _id: request._id }, updateObj);
    }
  };

  buyNFT = async (request) => {
    await HTTPService.executeHTTPRequest(
      "POST",
      Config.TRANSACTION_SERVICE_BASEURL,
      apiEndpoints.ADD_TRANSACTION,
      request,
      { "Content-Type": "application/json" }
    );
    return NftSchema.findOneAndUpdateData(
      { _id: request.contentId },
      {
        "saleData.isOpenForSale": false,
        "saleData.isSold": true,
      }
    );
  };

  trendingNft = async (request) => {
    const nftContent = await NftSchema.getFilteredData(
      {
        addedOn: { $gte: Utils.getTrendingTimeNft(50), $lt: Date.now() },
        isDeleted: false,
      },
      "",
      request.skip || 0,
      request.limit || 10,
      { likesCount: -1 }
    );
    return nftContent;
  };

  getOwner = async (request) => {
    if (request.currency === "ALL") {
      return NftSchema.find({ ownerAddress: request.ownerAddress }).populate({
        path: "ownedBy",
        select: ["firstName", "userId", "profileImage", "coverUrl"],
      });
    } else {
      return NftSchema.find({
        ownerAddress: request.ownerAddress,
        "saleData.price": {
          $gte: request.minPrice,
          $lte: request.maxPrice,
        },
        "saleData.currency": request.currency,
      }).populate({
        path: "ownedBy",
        select: ["firstName", "userId", "profileImage", "coverUrl"],
      });
    }
  };
  getNft = async (request) => {
    try {
      return (
        NftSchema.findOne({ _id: request._id })
          //Todo need to add image of createdBy & ownedBy (there is no field of profile pic in User model)
          .populate({
            path: "createdBy",
            select: ["firstName", "userId", "profileImage", "coverUrl"],
          })
          .populate({
            path: "ownedBy",
            select: ["firstName", "userId", "profileImage", "coverUrl"],
          })
          .populate({
            path: "collectionId",
            select: ["imageUrl", "name", "collectionAddress"],
          })
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  //remove nft and block user
  removeNft = async (request) => {
    if (!request || !request._id || !request.reportId) {
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    let [contentData, reports] = await Promise.all([
      NftSchema.findOneData({ _id: request._id, isDeleted: false }),
      ReportSchema.findOneData({ _id: request.reportId }),
    ]);

    if (!contentData)
      throw Utils.error(
        {},
        apiFailureMessage.UNABLE_TO_FIND_CONTENT,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    if (request.isBlockUser) {
      let updateQueryData = {
        isBlocked: true,
        reportedInfo: {
          reportedBy: reports.addedBy,
          contentId: reports.content,
          blockedOn: Date.now(),
          reason: reports.reason,
        },
      };
      let userRequest = {
        findQuery: {
          _id:
            (contentData && contentData.ownedBy && contentData.ownedBy._id) ||
            "",
        },
        updateQuery: updateQueryData,
      };
      let [userError, userData] = await Utils.parseResponse(
        new UserManager().updateUser(userRequest)
      );
      if (userError) {
        throw Utils.error(
          {},
          userError.message || apiFailureMessage.UNABLE_TO_UPDATE_USER,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }
    }

    const updateObj = { isDeleted: true, updatedOn: new Date().getTime() };

    return await NftSchema.findOneAndUpdateData(
      { _id: request._id, isDeleted: false },
      updateObj
    );
  };

  unRemoveNft = async (request) => {
    if (!request || !request._id)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    let [error, contentData] = await Utils.parseResponse(
      NftSchema.findOneData({ _id: request._id, isDeleted: true })
    );

    if (error || !contentData)
      throw Utils.error(
        {},
        error.message || apiFailureMessage.UNABLE_TO_FIND_CONTENT,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    let userRequest = {
      findQuery: {
        _id:
          (contentData && contentData.ownedBy && contentData.ownedBy._id) || "",
      },
      updateQuery: { isBlocked: false },
    };
    let [userError, userData] = await Utils.parseResponse(
      new UserManager().updateUser(userRequest)
    );
    if (userError)
      throw Utils.error(
        {},
        userError.message || apiFailureMessage.UNABLE_TO_UPDATE_USER,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    const updateObj = {
      isDeleted: false,
      updatedOn: new Date().getTime(),
    };
    return await NftSchema.findOneAndUpdateData(
      { _id: request._id, isDeleted: true },
      updateObj
    );
  };

  getCreatedNft = async (request) => {
    if (request.currency === "ALL") {
      return NftSchema.find({ createdBy: request.userId }).populate({
        path: "createdBy",
        select: ["firstName", "profileImage", "coverUrl"],
      });
    } else {
      return NftSchema.find({
        createdBy: request.userId,
        "saleData.price": {
          $gte: request.minPrice,
          $lte: request.maxPrice,
        },
        "saleData.currency": request.currency,
      }).populate({
        path: "createdBy",
        select: ["firstName", "profileImage", "coverUrl"],
      });
    }
  };

  getRemovedNft = async (request) => {
    let contentRequest = Utils.parseGetContentRequest(request);
    const nftContent = await NftSchema.getFilteredData(
      { ...contentRequest.requestData, isDeleted: true },
      contentRequest.selectionKeys,
      contentRequest.skip,
      contentRequest.limit,
      contentRequest.sortingKey
    );
    return nftContent;
  };

  topNftOpenForSale = async (request) => {
    let pastData = Utils.getTrendingTimeNft(30);
    if (request.duration == "oneDay") {
      pastData = Utils.getTrendingTimeNft(1);
    } else if (request.duration == "monthly") {
      pastData = Utils.getTrendingTimeNft(30);
    } else if (request.duration == "yearly") {
      pastData = Utils.getTrendingTimeNft(365);
    }
    const requestData = [
      {
        $match: {
          addedOn: { $gte: pastData },
          "saleData.isOpenForSale": true,
          isDeleted: false,
        },
      },
      {
        $sort: { "saleData.price": -1 },
      },
      {
        $limit: Number(request.limit) || 10,
      },
      {
        $skip: Number(request.skip) || 0,
      },
    ];

    return await NftSchema.aggregate(requestData);
  };
  recentlySoldNft = async (request) => {
    let soldNfts = await HTTPService.executeHTTPRequest(
      "POST",
      Config.TRANSACTION_SERVICE_BASEURL,
      apiEndpoints.GET_TRANSACTION,
      { limit: request.limit },
      { "Content-Type": "application/json" }
    );
    // soldNfts = JSON.parse(soldNfts);
    const recentlySoldContents = soldNfts.responseData.list;
    let ids = [];
    for (let data of recentlySoldContents) {
      const { _id } = data;
      ids.push(_id.contentId);
    }
    return await NftSchema.findData({ _id: { $in: ids } })
      .populate({
        path: "ownedBy",
        select: ["firstName", "userId", "profileImage", "coverUrl"],
      })
      .populate({
        path: "collectionId",
        select: ["imageUrl", "name", "collectionAddress"],
      });
  };

  getOnSale = async (request) => {
    if (request.currency == "ALL") {
      return NftSchema.find({ ownerAddress: request.ownerAddress }).populate({
        path: "ownedBy",
        select: ["name", "profileImage", "coverUrl"],
      });
    } else {
      return NftSchema.find({
        ownerAddress: request.ownerAddress,
        "saleData.isOpenForSale": true,
        "saleData.price": {
          $gte: request.minPrice,
          $lte: request.maxPrice,
        },
        "saleData.currency": request.currency,
      }).populate({
        path: "ownedBy",
        select: ["name", "profileImage", "coverUrl"],
      });
    }
  };
  getNftOfCollection = async (collectionId) => {
    const nfts = await NftSchema.find({
      collectionId: mongoose.Types.ObjectId(collectionId),
    }).populate({
      path: "collectionId",
      select: ["name", "description", "imageUrl", "coverUrl"],
    });
    const nftCount = nfts.length;
    return { nfts, nftCount: nftCount };
  };
  RemoveFromSale = async (request) => {
    if (!request || !request._id)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    return NftSchema.findOneAndUpdateData(
      { _id: request._id },
      { "saleData.isOpenForSale": false }
    );
  };
  addFileIpfs = async (requestData) => {
    return await this.parseRequestAndUploadFile(requestData);
  };
  updateContentLikeCount = async (request) => {
    let [error, response] = await Utils.parseResponse(
      NftSchema.findOneData({
        _id: request.contentId,
        isInActive: false,
        isDeleted: false,
      })
    );
    if (error || !response)
      throw Utils.error(
        {},
        apiFailureMessage.RECORD_NOT_FOUND,
        httpConstants.RESPONSE_CODES.NOT_FOUND
      );

    return await NftSchema.findOneAndUpdateData(
      { _id: request.contentId },
      { likesCount: (response.likesCount || 0) + 1 }
    );
  };
  updateContentViewCount = async (request) => {
    let [error, response] = await Utils.parseResponse(
      NftSchema.findOneData({
        _id: request.contentId,
        isInActive: false,
        isDeleted: false,
      })
    );
    if (error || !response)
      throw Utils.error(
        {},
        apiFailureMessage.RECORD_NOT_FOUND,
        httpConstants.RESPONSE_CODES.NOT_FOUND
      );

    return await NftSchema.findOneAndUpdateData(
      { _id: request.contentId },
      { viewsCount: (response.viewsCount || 0) + 1 }
    );
  };
  topNft = async (request) => {
    let pastData;
    if (request.duration == "oneDay") {
      pastData = Utils.getTrendingTimeNft(1);
    } else if (request.duration == "monthly") {
      pastData = Utils.getTrendingTimeNft(30);
    } else if (request.duration == "yearly") {
      pastData = Utils.getTrendingTimeNft(365);
    }
    const requestObj = [
      {
        $match: {
          addedOn: { $gte: pastData },
          isDeleted: false,
        },
      },
      {
        $sort: { "saleData.price": -1 },
      },
    ];

    const topNftContent = await NftSchema.aggregate(requestObj)
      .limit(request.limit ? Number(request.limit) : 10)
      .skip(request.skip ? Number(request.skip) : 0);
    return topNftContent;
  };
  getNftList = async (request) => {
    const reqObj = [
      {
        $match: {
          name: {
            $regex: request.find || "",
            $options: "i",
          },
        },
      },
      {
        $limit: request.limit ? Number(request.limit) : 40,
      },
      {
        $skip: request.skip ? Number(request.skip) : 0,
      },
      {
        $sort: { addedOn: -1 },
      },
    ];
    return await NftSchema.findDataWithAggregate(reqObj);
  };

  notifyService = async (request) => {
    let msg = {
      to: request.to,
      from: request.from,
      subject: request.subject,
      title: request.title,
      text: request.text,
      tokenId: request.tokenId,
      walletId: request.walletId,
      amount: request.amount,
      currency: request.currency,
      description: pug.renderFile(basedir + "/views/emailTemplate.pug", {
        WALLET: request.walletId,
        AMOUNT: request.amount,
        CURRENCY: request.currency,
        VERIFY_URL: Config.USER_PORTAL_URL + request.tokenId,
      }),
      postedBy: request.postedBy,
      postedTo: request.postedTo,
      sentFromEmail: request.sentFromEmail,
      type: "email",
    };

    if (
      !request.to ||
      !request.from ||
      !request.walletId ||
      !request.amount ||
      !request.currency ||
      !request.postedBy ||
      !request.postedTo ||
      !request.sentFromEmail
    )
      throw Utils.error(
        {},
        apiFailureMessage.INTERNAL_SERVER_ERROR,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    return await new Queue().insertInQueue(
      Config.NOTIFICATION_EXCHANGE,
      Config.NOTIFICATION_QUEUE,
      {},
      {},
      {},
      {},
      {},
      amqpConstants.exchangeType.FANOUT,
      amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE,
      msg
    );
  };

  notifyHelpCenterService = async (request) => {
    let msg = {
      to: request.to,
      from: request.from,
      subject: request.subject,
      title: request.title,
      name: request.name,
      text: request.text,
      email: request.email,
      topic: request.topic,
      comment: request.comment,
      description: pug.renderFile(basedir + "/views/helpCenterTemplate.pug", {
        EMAIL: request.email,
        TOPIC: request.topic,
        COMMENTS: request.comment,
      }),
      postedBy: request.postedBy,
      postedTo: request.postedTo,
      sentFromEmail: request.sentFromEmail,
      type: "email",
    };

    if (!request.email || !request.topic || !request.name || !request.comment)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_REQUEST,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    return await new Queue().insertInQueue(
      Config.NOTIFICATION_EXCHANGE,
      Config.NOTIFICATION_QUEUE,
      {},
      {},
      {},
      {},
      {},
      amqpConstants.exchangeType.FANOUT,
      amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE,
      msg
    );
  };

  notifySuggestionService = async (request) => {
    let msg = {
      to: request.to,
      from: request.from,
      subject: request.subject,
      title: request.title,
      text: request.text,
      email: request.email,
      topic: request.topic,
      details: request.details,
      description: pug.renderFile(basedir + "/views/suggestionTemplate.pug", {
        EMAIL: request.email,
        TOPIC: request.topic,
        DETAILS: request.details,
      }),
      postedBy: request.postedBy,
      postedTo: request.postedTo,
      sentFromEmail: request.sentFromEmail,
      type: "email",
    };
    if (
      !request.to ||
      !request.from ||
      !request.email ||
      !request.topic ||
      !request.details ||
      !request.postedBy ||
      !request.postedTo ||
      !request.sentFromEmail
    )
      throw Utils.error(
        {},
        apiFailureMessage.INTERNAL_SERVER_ERROR,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    return await new Queue().insertInQueue(
      Config.NOTIFICATION_EXCHANGE,
      Config.NOTIFICATION_QUEUE,
      {},
      {},
      {},
      {},
      {},
      amqpConstants.exchangeType.FANOUT,
      amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE,
      msg
    );
  };

  addTokenRequestContent = async (request) => {
    if (!request) {
      throw Utils.error(
        {},
        apiFailureMessage.INTERNAL_SERVER_ERROR,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let restData = await HTTPService.executeHTTPRequest(
      "POST",
      Config.ADMIN_SERVICE_BASEURL,
      apiEndpoints.ADD_TOKEN,
      request,
      { "Content-Type": "application/json" }
    );
    if (restData.responseData !== apiFailureMessage.TOKEN_EXISTS) {
      // event-fire-for-notifications
      eventEmitter.raiseEvent(events.SEND_NOTIFICATION, {
        type: events.TOKEN_REQUEST,
        data: {
          title: notificationType.REQUEST_TOKEN,
          userId: notificationType.USER_ID,
          tokenName: request.tokenName,
        },
      });
      return restData;
    }
    return apiFailureMessage.TOKEN_EXISTS;
  };
  getFavouriteNfts = async (request) => {
    if (request.currency === "ALL") {
      return NftSchema.find({ "likedBy.userId": request.userId }).populate({
        path: "ownedBy",
        select: ["firstName", "profileImage", "coverUrl"],
      });
    } else {
      return NftSchema.find({
        "likedBy.userId": request.userId,
        "saleData.price": {
          $gte: request.minPrice || 0,
          $lte: request.maxPrice || 100,
        },
        "saleData.currency": request.currency || "BNB",
      }).populate({
        path: "ownedBy",
        select: ["firstName", "profileImage", "coverUrl"],
      });
    }
  };
  deleteNft = async (request) => {
    if (!request) {
      throw Utils.error(
        {},
        apiFailureMessage.INTERNAL_SERVER_ERROR,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return await NftSchema.findOneAndUpdateData(
      { _id: request.id },
      { isDeleted: true }
    );
  };
  getFloorPrice = async (request) => {
    if (!request)
      return Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    const reqObj = [
      {
        $match: {
          collectionId: mongoose.Types.ObjectId(request.collectionId),
          "saleData.currency": "BNB",
        },
      },
      {
        $group: {
          _id: null,
          FloorPrice: { $min: "$saleData.price" },
        },
      },
    ];

    const FloorData = await NftSchema.aggregate(reqObj);
    const reqArray = [
      {
        $match: {
          collectionId: mongoose.Types.ObjectId(request.collectionId),
          "saleData.currency": "BNB",
        },
      },

      {
        $group: {
          _id: { ownerAddress: "$ownerAddress" },
          Owners: { $sum: 1 },
        },
      },
    ];

    const totalOwners = await NftSchema.aggregate(reqArray);
    var Owners = totalOwners.length;
    return { FloorData, Owners };
  };
  getCount = async (request) => {
    const minPrice = await NftSchema.aggregate([
      {
        $group: {
          _id: null,
          floorPrice: { $min: "$saleData.price" },
        },
      },
    ]);
    const OwnersCount = await NftSchema.aggregate([
      {
        $group: {
          _id: { ownerAddress: "$ownerAddress" },
          Owners: { $sum: 1 },
        },
      },
    ]);
    var Owners = OwnersCount.length;

    const totalNftCount = await NftSchema.count();
    return { totalNftCount, minPrice, Owners };
  };
  hideNft = async (request) => {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    const updateObj = {
      isHidden: true,
    };
    return NftSchema.findOneAndUpdateData({ _id: request._id }, updateObj);
  };
  getHiddenNft = async (request) => {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    return NftSchema.find({
      ownedBy: request.owner,
      isHidden: true,
    });
  };
}
