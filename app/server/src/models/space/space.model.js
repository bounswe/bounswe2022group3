const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
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
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badge",
      },
    ],
    feedbacks: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Feedback",
        type: String,
      },
    ],
    events: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Event",
        type: String,
      },
    ],
    discussions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    polls: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Poll",
        type: String,
      },
    ],
    enrollments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
      },
    ],
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

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

const getSpaceByID = async (space_id) => {
  const result = await Space.findById(space_id).exec();
  return result;
};

const deleteSpace = async (_id) => {
  const res = await Space.findOneAndDelete({ _id });
  return res;
};

module.exports = { Space, createSpace, getSpaceByID, deleteSpace };
