const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  selector: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Target",
    },
  ],
});

const Target = mongoose.model("Target", targetSchema);

const createTarget = async (selector) => {
  var target = new Target({
    selector,
  });
  const res = await target.save();
  return res;
};

const deleteTarget = async (_id) => {
  const res = await Target.findOneAndDelete({ _id });
  return res;
};

module.exports = {
  Target,
  createTarget,
  deleteTarget,
};
