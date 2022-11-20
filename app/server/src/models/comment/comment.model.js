const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  body: String,
  date: Date,
  files: [String],
});

commentSchema.set("timestamps", true);
const Comment = mongoose.model("Comment", commentSchema);

const createComment = async (user, body, files) => {
  var comment = new Comment({
    user,
    body,
    files,
  });

  const commentTemp = await comment.save();
  commentTemp.comment_date = commentTemp.createdAt;
  const res = await commentTemp.save();
  return res;
};

const getComment = async (id) => {
  return Comment.findById(id);
};

module.exports = { Comment, createComment, getComment };
