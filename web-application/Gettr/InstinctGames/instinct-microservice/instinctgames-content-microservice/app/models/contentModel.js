import mongoose from "mongoose";

new mongoose.model("acm-collections", new mongoose.Schema({}));
const Populate = (field, project = {}) =>
  function (next) {
    this.populate(field, project);
    next();
  };
const contentSchema = new mongoose.Schema({
  tokenId: { type: Number, default: 0 }, //nft token id
  transactionHash: { type: String, default: "" },
  ipfsUrl: { type: String, default: "" },
  cdnUrl: { type: String, default: "" },
  contentType: { type: String, default: "" }, //like image/video
  externalUrl: { type: String, default: "" },
  name: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  coverUrl: { type: String, default: "" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "acm-categories" },
  externalLink: { type: String, default: "" },
  nftType: { type: String, default: "" }, //character
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "acm-collections",
  },
  network: {
    chainId: { type: Number, default: 0 },
    name: { type: String, default: "" },
  },
  description: { type: String, default: "" },
  ownedBy: { type: mongoose.Schema.Types.ObjectId, ref: "us-users" },
  ownerProfile: { type: String, default: "" },
  ownerAddress: { type: String, default: "" },
  viewsCount: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 },
  likedBy: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "us-users" },
      addedOn: { type: Number, default: Date.now() },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "us-users" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "us-users" },
  saleData: {
    isOpenForSale: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    currency: { type: String, default: "" },
  },
  tags: { type: Array, default: [] },
  properties: [
    {
      name: { type: String, default: "" },
      value: { type: String, default: "" },
      color: { type: String, default: "" },
    },
  ],
  addedOn: { type: Number, default: Date.now() },
  updatedOn: { type: Number, default: Date.now() },
  isInActive: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  documentCount: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
});
// contentSchema.pre("findOne", Populate("ownedBy", {}));
// contentSchema.pre("findOne", Populate("createdBy", {}));
// contentSchema.pre("findOne", Populate("collectionId", {}));

contentSchema.method({
  saveData: async function () {
    return this.save();
  },
});
contentSchema.static({
  findData: function (findObj) {
    return this.find(findObj);
  },
  findOneData: function (findObj) {
    return this.findOne(findObj);
  },
  findOneAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  },
  findDataWithAggregate: function (findObj) {
    return this.aggregate(findObj);
  },
  getFilteredData: function (
    requestData,
    selectionKeys,
    offset,
    limit,
    sortingKey
  ) {
    return this.find(requestData, selectionKeys)
      .sort(sortingKey)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .populate({
        path: "createdBy",
        select: ["profileImage"],
      })
      .populate({
        path: "collectionId",
        select: ["name"],
      });
  },
});

export default mongoose.model("cs-content", contentSchema);
