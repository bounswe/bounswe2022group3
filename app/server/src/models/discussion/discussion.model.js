const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    space_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

const createDiscussion = async (user, space_id, title) => {
  var discussion = new Discussion({
    user,
    space_id,
    title,
  });

  // Just to set the creation time...
  const discussionTemp = await discussion.save();
  const res = await discussionTemp.save();
  return res;
};

const getPopulatedDiscussion = async (id) => {
  return Discussion.findById(id).populate("comments").populate(
    {
      path: "comments",
      populate: {
        path: "user",
        select: { _id: 1, name: 1, surname: 1, image: 1 }
      }
    }).exec();
}


const getDiscussion = async (id) => {
  return Discussion.findById(id);
};

module.exports = {
  Discussion,
  createDiscussion,
  getDiscussion,
  getPopulatedDiscussion,
};
