const mongoose = require("mongoose");
const SpaceModel = require("../space/space.model");
const ResourceModel = require("../resource/resource.model");


const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
    },
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);

const createTopic = async (name, space, creator) => {
  var topic = new Topic({
    name,
    space,
    creator,
  });
  const res = await topic.save();
  return res;
};

const getPopulatedTopic = async (id) => {
  return Topic.findById(id)
    .populate("name badge resources")
    .populate("creator", "name surname image")
    .populate({
      path: "resources",
      populate: {
        path: "discussion",
        populate: { path: "comments" },
      },
    })
    .populate({
      path: "resources",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "creator",
        select: { _id: 1, name: 1, surname: 1, image: 1 }
      },
    })
    .exec();
};

const deleteTopic = async (id) => {
  var topic = await Topic.findById(id);
  for (var resource_temp of topic.resources) {
    await ResourceModel.deleteResource(resource_temp);
  }
  var space = await SpaceModel.Space.findById(topic.space);
  const index = space.topics.indexOf(topic_id);
  if (index > -1) { // only splice array when item is found
    space.topics.splice(index, 1); // 2nd parameter means remove one item only
  }
  await space.save();
  topic.remove();
};

const getTopic = async (id) => {
  return Topic.findById(id);
};

module.exports = { Topic, createTopic, getTopic, getPopulatedTopic, deleteTopic };
