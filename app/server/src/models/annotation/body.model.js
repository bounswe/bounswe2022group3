const mongoose = require("mongoose");

const bodySchema = new mongoose.Schema(
  {
    purpose: {
      type: String,
    },
    type: {
      type: String,
    },
    value: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    created: {
      type: String,
    },
  }
);

const Body = mongoose.model("Body", bodySchema);

const createBody = async (purpose, type, value, creator, created) => {
  var body = new Body({
    purpose,
    type,
    value,
    creator,
    created,
  });
  const res = await body.save();
  return res;
};

const deleteBody = async (_id) => {
  const res = await Body.findOneAndDelete({ _id });
  return res;
};

module.exports = {
  Body,
  createBody,
  deleteBody,
};
