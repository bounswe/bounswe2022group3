const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    discussion_id: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion" },
    comment: String,
    rating: Number,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

const createComment = async (user, discussion_id, comment) => {
  var comment = new Comment({
    user,
    discussion_id,
    comment,
    rating: 0,
  });

  const res = await comment.save();
  return res;
};

const getComment = async (id) => {
  return Comment.findById(id);
};

const deleteComment = async (id) => {
  return Comment.findByIdAndDelete(id);
};

module.exports = { Comment, createComment, getComment, deleteComment };
