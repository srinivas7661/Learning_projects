import mongoose from "mongoose";

const promotedContentSchema = new mongoose.Schema({
  contentId: { type: String, default: "" },
  price: { type: Number, default: 0 },
  contentOwner: { type: mongoose.Schema.Types.ObjectId, ref: "us-user" },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "us-user" },
  endTime: { type: Number, default: Date.now() },
  startTime: { type: Number, default: Date.now() },
  addedOn: { type: Number, default: Date.now() },
  isInactive: { type: Boolean, default: false },
});

promotedContentSchema.method({
  saveData: async function () {
    return this.save();
  },
});
promotedContentSchema.static({
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
});
export default mongoose.model("cs-promotedContent", pomotedContentSchema);
