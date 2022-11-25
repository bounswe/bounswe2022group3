const DiscussionModel = require("../../models/discussion/discussion.model");

const DiscussionController = {
  createDiscussion: async function (req, res) {
    try {
      const { user, space, body, files } = req.body;

      const discussion = await DiscussionModel.createDiscussion(
        user,
        space,
        body,
        files
      );
      res.status(201).send({ message: discussion });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  getDiscussion: async function (req, res) {
    try {
      const resource = await DiscussionModel.getPopulatedDiscussion(
        req.params.id
      );
      res.status(200).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
};

module.exports = DiscussionController;
