import mongoose from "mongoose";

const ViewSchema = new mongoose.Schema({
  contentId: { type: String, default: "" },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "us-user" },
  addedOn: { type: Number, default: Date.now() },
});

ViewSchema.method({
  saveData: async function () {
    return this.save();
  },
});
ViewSchema.static({
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
export default mongoose.model("cs-view", ViewSchema);
