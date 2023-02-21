import mongoose from "mongoose";

const cidSchema = new mongoose.Schema({
  cid: { type: String, default: "" },
  addedOn: { type: Number, default: Date.now() },
});

cidSchema.method({
  saveData: async function () {
    return this.save();
  },
});
cidSchema.static({
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
export default mongoose.model("cid-storage", cidSchema);
