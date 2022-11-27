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
    average_rating: {
      type: Number,
    },
    ratings: {
      type: Map,
      of: Number,
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);

const createResource = async (name, body, topic, creator) => {
  var resource = new Resource({
    name,
    body,
    topic,
    creator,
  });
  resource.average_rating = 0;
  resource.ratings = new Map();
  const res = await resource.save();
  return res;
};

const getResource = async (id) => {
  var resource = Resource.findById(id);
  return resource;
};

const getPopulatedResource = async (id) => {
  return Resource.findById(id)
    .populate("discussion")
    .populate("creator", "name surname")
    .exec();
};

module.exports = {
  Resource,
  getResource,
  createResource,
  getPopulatedResource,
};
