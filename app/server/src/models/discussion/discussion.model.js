const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    body: String,
    files: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

const createDiscussion = async (user, space, comments, body, files) => {
  var discussion = new Discussion({
    user,
    space,
    body,
    files,
  });

  // Just to set the creation time...
  const discussionTemp = await discussion.save();
  const res = await discussionTemp.save();
  return res;
};

const getPopulatedDiscussion = async (id) => {
  return Discussion.findById(id).populate("comments").exec();
};

const getDiscussion = async (id) => {
  return Discussion.findById(id);
};

module.exports = {
  Discussion,
  createDiscussion,
  getDiscussion,
  getPopulatedDiscussion,
};
