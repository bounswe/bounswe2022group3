const DiscussionModel = require("../../models/discussion/discussion.model");
const SpaceModel = require("../../models/space/space.model");

const DiscussionController = {
  createDiscussion: async function (req, res) {
    try {
      const { space_id, title } = req.body;
      const user = req.auth.id;

      const discussion = await DiscussionModel.createDiscussion(
        user,
        space_id,
        title,
      );

      // var space = await SpaceModel.Space.findById(space_id).exec();
      // space.discussions.push(discussion);
      // space.save();

      res.status(201).send({ discussion });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  getDiscussion: async function (req, res) {
    try {
      const discussion = await DiscussionModel.getPopulatedDiscussion(
        req.params.id
      );
      res.status(200).json({ discussion });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  
};

module.exports = DiscussionController;
