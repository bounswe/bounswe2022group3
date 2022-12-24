const DiscussionModel = require("../../models/discussion/discussion.model");
const SpaceModel = require("../../models/space/space.model");
const ActivityModel = require("../../models/activity/activity.model");
const UserModel = require("../../models/user/user.model");

const DiscussionController = {
  createDiscussion: async function (req, res) {
    try {
      const { space_id, title } = req.body;
      const user_id = req.auth.id;

      const discussion = await DiscussionModel.createDiscussion(
        user_id,
        space_id,
        title,
      );
      const user = await UserModel.User.findById(user_id);
      const space = await SpaceModel.Space.findById(space_id);
      // {user} started a new {discussion} about {discussion.title} in {space} space, {date.now-discussion.createdAt} ago.
      let activity_body = `${user.name} ${user.surname} started a new discussion about "${discussion.title}" in ${space.name} space, {timeDiff}.`;
      let activity_data = {
        body: activity_body,
        space: space._id,
        discussion: discussion._id,
      };
      const activity = await ActivityModel.createActivity(user_id, activity_data);
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
