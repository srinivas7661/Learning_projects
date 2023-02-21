import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  contentId: { type: mongoose.Schema.Types.ObjectId, ref: "cs-contents" },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "us-user" },
  addedOn: { type: Number, default: Date.now() },
});

likesSchema.method({
  saveData: async function () {
    return this.save();
  },
});
likesSchema.static({
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
export default mongoose.model("cs-likes", likesSchema);
