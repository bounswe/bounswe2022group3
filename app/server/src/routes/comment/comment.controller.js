const CommentModel = require("../../models/comment/comment.model");
const DiscussionModel = require("../../models/discussion/discussion.model");

const CommentController = {
  createComment: async function (req, res) {
    try {
      const { discussion_id, comment } = req.body;
      const user = req.auth.id;
      const commentCreated = await CommentModel.createComment(user, discussion_id, comment);
      var discussion = await DiscussionModel.Discussion.findById(discussion_id).exec();
      discussion.comments.push(commentCreated);
      discussion.save();
      res.status(201).json({ comment: commentCreated });
    } catch (e) {
      console.log("Error on createComment:", e);
      res.status(400).send({ error: e });
    }
  },
  getComment: async function (req, res) {
    try {
      const comment_id = req.params.id;
      const comment = await CommentModel.Comment.findById(comment_id);
      res.status(200).json({ comment });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
};

module.exports = CommentController;
