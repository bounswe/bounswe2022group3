const CommentModel = require("../../models/comment/comment.model");
const DiscussionModel = require("../../models/discussion/discussion.model");

const CommentController = {
  createComment: async function (req, res) {
    try {
      const { body, files } = req.body;
      const user = req.auth.id;
      const comment = await CommentModel.createComment(user, body, files);
      var body_keys = Object.keys(req.body);
      if (body_keys.includes("discussion_id")) {
        const { discussion_id } = req.body;
        var discussion = DiscussionModel.Discussion.findById(discussion_id);
        discussion.comments.push(comment);
        discussion.save();
      }
      res.status(201).json({ message: comment });
    } catch (e) {
      console.log("Error on getCreate:", e);
      res.status(400).send({ error: e });
    }
  },
  getComment: async function (req, res) {
    try {
      const comment_id = req.params.id;
      const comment = await CommentModel.Comment.findById(comment_id);
      res.status(200).json({ message: comment });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
};

module.exports = CommentController;
