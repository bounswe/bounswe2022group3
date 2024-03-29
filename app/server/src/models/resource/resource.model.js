const mongoose = require("mongoose");
const DiscussionModel = require("../discussion/discussion.model");
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
    .populate("creator", "name surname image")
    .populate({
      path: "discussion",
      populate: {
        path: "user",
        select: { _id: 1, name: 1, surname: 1, image: 1 }
      },
    })
    .populate({
      path: "discussion",
      populate: {
        path: "comments",
        populate: {
          path: "user",
          select: { _id: 1, name: 1, surname: 1, image: 1 }
        },
        select: { _id: 1, user: 1, comment: 1 }
      },
    })
    .exec();
};

const deleteResource = async (resource_id) => {
  var resource = await Resource.findById(resource_id);
  var discussion = await DiscussionModel.getDiscussion(resource.discussion);
  discussion.remove();
  resource.remove();
};


module.exports = {
  Resource,
  getResource,
  createResource,
  getPopulatedResource,
  deleteResource,
};
