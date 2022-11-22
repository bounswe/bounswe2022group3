const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Space",
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
});

const Topic = mongoose.model("Topic", topicSchema);

const createTopic = async (space, name) => {
  var topic = new Topic({
    space,
    name,
  });
  const res = await topic.save();
  return res;
};

const getPopulatedTopic = async (id) => {
  return Topic.findById(id)
    .populate("name badge resources")
    .populate({
      path: "resources",
      populate: {
        path: "discussion",
        populate: { path: "comments" },
      },
    })
    .exec();
};

const getTopic = async (id) => {
  return Topic.findById(id);
};

module.exports = { Topic, createTopic, getTopic, getPopulatedTopic };
