import mongoose from "mongoose";
new mongoose.model("us-users", new mongoose.Schema({}))
const reportedSchema = new mongoose.Schema({
    content: { type: mongoose.Types.ObjectId, ref: "cs-contents" },
    addedBy: { type: mongoose.Types.ObjectId, ref: "us-users" },
    addedOn: { type: Number, default: Date.now() },
    reason: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false }

});
reportedSchema.method({
    saveData: async function () {
      return this.save();
    },
  });
  
  reportedSchema.static({
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
    findAndUpdateData: function (findObj, updateObj) {
      return this.updateMany(findObj, updateObj, {
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
      return this.find({...requestData, isDeleted: false}, selectionKeys,)
          .populate({path:"content"})
          .populate({path:"addedBy"})
        .sort(sortingKey)
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .exec();
    },
  });

  export default mongoose.model("cs-report", reportedSchema);
