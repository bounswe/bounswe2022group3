const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    body: {
      type: String,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);

const createResource = async (name, body, topic) => {
  var resource = new Resource({
    name,
    body,
    topic,
    creator,
  });
  const res = await resource.save();
  return res;
};

const getResource = async (id) => {
  var resource = Resource.findById(id);
  return resource;
};

const getPopulatedResource = async (id) => {
  return Resource.findById(id).populate("discussion").exec();
};

module.exports = {
  Resource,
  getResource,
  createResource,
  getPopulatedResource,
};
