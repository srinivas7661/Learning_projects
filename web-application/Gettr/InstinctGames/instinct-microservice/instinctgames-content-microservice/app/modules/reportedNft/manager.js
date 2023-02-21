import ReportSchema from "../../models/reportModel";
import BLManager from "../content/manager";
import {
  apiFailureMessage,
  httpConstants,
  apiEndpoints,
  events,
  notificationType,
} from "../../common/constants";
import Utils from "../../utils";
import moment from "moment";
import contentSchema from "../../models/contentModel";
import mongoose from "mongoose";
export default class Manager {
  reportNft = async (request) => {
    if (!request || !request.content || !request.addedBy || !request.reason)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    const [error, contentRes] = await Utils.parseResponse(
      new BLManager().getNft({ _id: request.content })
    );
    if (contentRes) {
      if (contentRes.isDeleted == true)
        throw Utils.error(
          {},
          apiFailureMessage.CONTENT_NOT_AVAILBLE,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
    } else {
      throw Utils.error(
        {},
        apiFailureMessage.CONTENT_NOT_AVAILBLE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    let report = await ReportSchema.findOneData({
      content: request.content,
      addedBy: request.addedBy,
    });

    if (report) {
      if (report.isDeleted == false)
        throw Utils.error(
          {},
          apiFailureMessage.NFT_ALREADY_REPORTED,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
    }

    let contentObj = new ReportSchema(request);
    // event-fire-for-notifications
    eventEmitter.raiseEvent(events.SEND_NOTIFICATION, {
      type: events.REPORT_NFT,
      data: {
        title: notificationType.REPORT_TITLE,
        userId: notificationType.USER_ID,
        content: request.content,
      },
    });
    return contentObj.saveData();
  };

  getReportedNfts = async (request) => {
    try {
      let fromDate =
        request.duration == "oneDay"
          ? moment().subtract(1, "days").toDate()
          : request.duration == "monthly"
          ? moment().subtract(1, "months").toDate()
          : request.duration == "yearly"
          ? moment().subtract(1, "years").toDate()
          : 0;
      let skip = request.skip ? parseInt(request.skip) : 0;
      let limit = request.limit ? parseInt(request.limit) : 10;

      const queries = [
        {
          $match: { isDeleted: false },
        },
        {
          $match: {
            name: {
              $regex: request.searchValue || "",
              $options: "i",
            },
          },
        },
        {
          $lookup: {
            from: "cs-reports",
            localField: "_id",
            foreignField: "content",
            as: "reportedContent",
          },
        },
        {
          $unwind: "$reportedContent",
        },
        {
          $match: {
            "reportedContent.addedOn": { $gte: fromDate.valueOf() },
            "reportedContent.isDeleted": false,
          },
        },
        {
          $lookup: {
            from: "us-users",
            localField: "reportedContent.addedBy",
            foreignField: "_id",
            as: "reportedContent.userOfReportedContent",
          },
        },
        {
          $group: {
            _id: {
              id: "$_id",
              content: { name: "$name", imageUrl: "$cdnUrl" },
            },
            count: { $sum: 1 },
            data: {
              $push: {
                reports: "$reportedContent",
              },
            },
          },
        },
        {
          $group: {
            _id: "$_id.id",
            content: { $first: "$_id.content" },
            reports: { $first: "$data.reports" },
          },
        },
        {
          $sort: { addedOn: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ];

      const GroupQuery = [
        {
          $match: { isDeleted: false },
        },
        {
          $match: {
            name: {
              $regex: request.searchValue || "",
              $options: "i",
            },
          },
        },
        {
          $lookup: {
            from: "cs-reports",
            localField: "_id",
            foreignField: "content",
            as: "reportedContent",
          },
        },
        {
          $unwind: "$reportedContent",
        },
        {
          $match: {
            "reportedContent.addedOn": { $gte: fromDate.valueOf() },
            "reportedContent.isDeleted": false,
          },
        },
        {
          $group: {
            _id: { id: "" },
            count: { $sum: 1 },
          },
        },
      ];

      let [response, totalCount] = await Promise.all([
        contentSchema.aggregate(queries),
        contentSchema.aggregate(GroupQuery),
      ]);

      response = response.map(function (element) {
        element.reportCount = element.reports.length;
        return element;
      });

      totalCount = (totalCount[0] && totalCount[0].count) || 0;

      return { response, totalCount };
    } catch (err) {
      throw new Error(err);
    }
  };

  getReportByNftsId = async (id) => {
    try {
      if (!id) {
        throw Utils.error(
          {},
          apiFailureMessage.INVALID_PARAMS,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }
      const queries = [
        {
          $match: { content: mongoose.Types.ObjectId(id), isDeleted: false },
        },
        {
          $lookup: {
            from: "us-users",
            localField: "addedBy",
            foreignField: "_id",
            as: "userOfReportedContent",
          },
        },
        {
          $unwind: "$userOfReportedContent",
        },
        {
          $project: {
            _id: 1,
            reason: 1,
            isDeleted: 1,
            content: 1,
            addedBy: 1,
            addedOn: 1,
            "userOfReportedContent.firstName": 1,
            "userOfReportedContent.middleName": 1,
            "userOfReportedContent.bio": 1,
            "userOfReportedContent.lastName": 1,
            "userOfReportedContent.email": 1,
            "userOfReportedContent.profileImage": 1,
          },
        },
      ];
      return await ReportSchema.findDataWithAggregate(queries)
        .sort({ addedOn: -1 })
        .limit(20);
    } catch (err) {
      throw new Error(err);
    }
  };

  getDeletedNftList = async (request) => {
    try {
      let fromDate =
        request.duration == "oneDay"
          ? moment().subtract(1, "days").toDate()
          : request.duration == "monthly"
          ? moment().subtract(1, "months").toDate()
          : request.duration == "yearly"
          ? moment().subtract(1, "years").toDate()
          : 0;
      let skip = request.skip ? parseInt(request.skip) : 0;
      let limit = request.limit ? parseInt(request.limit) : 10;
      const queries = [
        {
          $match: { isDeleted: true },
        },
        {
          $lookup: {
            from: "cs-reports",
            localField: "_id",
            foreignField: "content",
            as: "reportedContent",
          },
        },
        {
          $unwind: "$reportedContent",
        },
        {
          $match: { "reportedContent.addedOn": { $gte: fromDate.valueOf() } },
        },
        {
          $lookup: {
            from: "us-users",
            localField: "reportedContent.addedBy",
            foreignField: "_id",
            as: "reportedContent.userOfReportedContent",
          },
        },
        {
          $match: {
            $or: [
              {
                name: {
                  $regex: request.searchValue || "",
                  $options: "i",
                },
              },
              {
                "reportedContent.userOfReportedContent.firstName": {
                  $regex: request.searchValue || "",
                  $options: "i",
                },
              },
              {
                "reportedContent.userOfReportedContent.lastName": {
                  $regex: request.searchValue || "",
                  $options: "i",
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: {
              id: "$_id",
              content: { name: "$name", imageUrl: "$cdnUrl" },
            },
            count: { $sum: 1 },
            data: {
              $push: {
                reports: "$reportedContent",
              },
            },
          },
        },
        {
          $group: {
            _id: "$_id.id",
            content: { $first: "$_id.content" },
            reports: { $first: "$data.reports" },
          },
        },

        {
          $sort: { addedOn: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ];

      const GroupQuery = [
        {
          $match: { isDeleted: false },
        },
        {
          $match: {
            name: {
              $regex: request.searchValue || "",
              $options: "i",
            },
          },
        },
        {
          $lookup: {
            from: "cs-reports",
            localField: "_id",
            foreignField: "content",
            as: "reportedContent",
          },
        },
        {
          $unwind: "$reportedContent",
        },
        {
          $match: {
            "reportedContent.addedOn": { $gte: fromDate.valueOf() },
            "reportedContent.isDeleted": false,
          },
        },
        {
          $group: {
            _id: { id: "" },
            count: { $sum: 1 },
          },
        },
      ];

      let [response, totalCount] = await Promise.all([
        contentSchema.aggregate(queries),
        contentSchema.aggregate(GroupQuery),
      ]);

      response = response.map(function (element) {
        element.reportCount = element.reports.length;
        return element;
      });

      totalCount = (totalCount[0] && totalCount[0].count) || 0;

      return { response, totalCount };
    } catch (err) {
      throw new Error(err);
    }
  };

  getRemoveByNftsId = async (id) => {
    try {
      if (!id) {
        throw Utils.error(
          {},
          apiFailureMessage.INVALID_PARAMS,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }
      const queries = [
        {
          $match: { content: mongoose.Types.ObjectId(id) },
        },

        {
          $lookup: {
            from: "us-users",
            localField: "addedBy",
            foreignField: "_id",
            as: "userOfReportedContent",
          },
        },
        {
          $unwind: "$userOfReportedContent",
        },
        {
          $project: {
            _id: 1,
            reason: 1,
            content: 1,
            addedBy: 1,
            addedOn: 1,
            "userOfReportedContent.firstName": 1,
            "userOfReportedContent.middleName": 1,
            "userOfReportedContent.bio": 1,
            "userOfReportedContent.lastName": 1,
            "userOfReportedContent.email": 1,
            "userOfReportedContent.profileImage": 1,
          },
        },
      ];
      return await ReportSchema.findDataWithAggregate(queries)
        .sort({ addedOn: -1 })
        .limit(20);
    } catch (err) {
      throw new Error(err);
    }
  };

  getBlockedUserList = async (request) => {
    let query = this.getDefaultAggregationQuery(request, true);
    query.push({ $match: { "content.ownedBy.isBlocked": true } });
    if (request.searchValue) {
      query.push({
        $match: {
          $or: [
            {
              "content.ownedBy.firstName": {
                $regex: request.searchValue,
                $options: "i",
              },
            },
            {
              "content.ownedBy.lastName": {
                $regex: request.searchValue,
                $options: "i",
              },
            },
            {
              "addedBy.firstName": {
                $regex: request.searchValue,
                $options: "i",
              },
            },
            {
              "addedBy.lastName": {
                $regex: request.searchValue,
                $options: "i",
              },
            },
          ],
        },
      });
    }
    let totalCount = await ReportSchema.findDataWithAggregate(query);
    query.push({ $skip: request.skip || 0 });
    query.push({ $limit: request.limit || 10 });

    let list = await ReportSchema.findDataWithAggregate(query);
    return { list, totalCount: totalCount.length || 0 };
  };

  getDefaultAggregationQuery = (request, isDeleted = false) => {
    return [
      { $match: { addedOn: request.addedOn, isDeleted } },
      Utils.getLookUpQueryObject("cs-contents", "content", "_id", "content"),
      Utils.getUnwindQueryObject("$content", true),
      Utils.getLookUpQueryObject(
        "us-users",
        "content.ownedBy",
        "_id",
        "content.ownedBy"
      ),
      Utils.getUnwindQueryObject("$content.ownedBy", true),
      Utils.getLookUpQueryObject(
        "us-users",
        "content.createdBy",
        "_id",
        "content.createdBy"
      ),
      Utils.getUnwindQueryObject("$content.createdBy", true),
      Utils.getLookUpQueryObject("us-users", "addedBy", "_id", "addedBy"),
      Utils.getUnwindQueryObject("$addedBy", true),
    ];
  };

  deleteReportedNft = async (request) => {
    try {
      console.log(request.id);
      const updateObj = { isDeleted: true };
      return await ReportSchema.findOneAndUpdateData(
        { _id: request.id },
        updateObj
      );
    } catch (error) {
      throw Utils.error(
        {},
        apiFailureMessage.UNABLE_TO_UPDATE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
  };
  deleteReportedNftByContentId = async (request) => {
    return await ReportSchema.findAndUpdateData(
      { content: request.contentId, isDeleted: false },
      { isDeleted: true }
    );
  };
}
