const mongoose = require("mongoose");

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
    .populate("creator", "name surname")
    .populate({
      path: "resources",
      populate: {
        path: "discussion",
        populate: { path: "comments" },
      },
    })
    .populate({
      path: "resources",
      populate: {
        path: "creator",
        select: { _id: 1, name: 1, surname: 1, image: 1 }
      },
    })
    .exec();
};

const getTopic = async (id) => {
  return Topic.findById(id);
};

module.exports = { Topic, createTopic, getTopic, getPopulatedTopic };
