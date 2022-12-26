const mongoose = require("mongoose");
const SpaceModel = require("../../models/space/space.model");
const CommentModel = require("../../models/comment/comment.model");

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
  const res = await discussion.save();
  return res;
};

const getPopulatedDiscussion = async (id) => {
  return Discussion.findById(id)
  .populate({
    path: "user",
    select: { _id: 1, name: 1, surname: 1, image: 1 }
  })
  .populate({
      path: "comments",
      populate: {
        path: "user",
        select: { _id: 1, name: 1, surname: 1, image: 1 }
      }
    })
  .exec();
}

const deleteDiscussion = async (id) => {
  var discussion = await Discussion.findById(id);
  for (var comment_temp of discussion.comments) {
    await CommentModel.deleteComment(comment_temp);
  }
};

const getDiscussion = async (id) => {
  return Discussion.findById(id);
};

module.exports = {
  Discussion,
  createDiscussion,
  getDiscussion,
  getPopulatedDiscussion,
  deleteDiscussion
};
