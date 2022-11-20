const CommentModel = require("../../models/comment/comment.model");

const CommentController = {
  createComment: async function (req, res) {
    try {
      const { user, body, files } = req.body;

      const comment = await CommentModel.createComment(user, body, files);
      res.status(201).json({ message: comment });
    } catch (e) {
      console.log("Error on getCreate:", e);
      res.status(400).send({ error: e });
    }
  },
  getComment: async function (req, res) {
    try {
      const resource = await CommentModel.getComment(req.params.id);
      res.status(200).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
};

module.exports = CommentController;
