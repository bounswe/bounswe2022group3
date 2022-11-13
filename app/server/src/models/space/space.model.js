const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  info: {
    type: String,
  },
  rating: {
    type: Number,
  },
  topics: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Topic",
  },
  tags: {
    type: [String],
  },
  badges: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Badge",
  },
  feedback: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "Feedback",
    type: String,
  },
  event_list: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "Event",
    type: String,
  },
  discussion_list: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Discussion",
  },
  poll_list: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "Poll",
    type: String,
  },
  enrollments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Enrollment",
  },
  image: {
    type: String,
  },
});

const Space = mongoose.model("Space", spaceSchema);

const createSpace = async (name, creator, info, tags, image) => {
  var space = new Space({
    name,
    creator,
    info,
    tags,
    image,
  });
  const res = await space.save();
  return res;
};

const deleteSpace = async (_id) => {
  const res = await Space.findOneAndDelete({ _id });
  return res;
};

module.exports = { Space, createSpace, deleteSpace };
