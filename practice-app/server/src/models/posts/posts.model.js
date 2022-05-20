const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: String,
  body: String,
});

const Posts = mongoose.model("Posts", PostSchema);

module.exports = Posts;
