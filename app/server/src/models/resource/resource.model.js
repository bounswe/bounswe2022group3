const mongoose = require("mongoose");
const DiscussionModel = require("../discussion/discussion.model");
const TopicModel = require("../topic/topic.model");
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
  topic_obj = await TopicModel.getTopic(topic);
  space_id = topic_obj.space;
  discussion = await DiscussionModel.createDiscussion(creator,space_id,name);
  resource.discussion = discussion;
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
    .populate("creator", "name surname image")
    .populate({
      path: "topic",
      populate: {
        path: "space",
        select: { _id: 1, name: 1 }
      },
      select: { _id: 1, name: 1 }
    })
    .exec();
};

module.exports = {
  Resource,
  getResource,
  createResource,
  getPopulatedResource,
};
