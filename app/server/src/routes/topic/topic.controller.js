const TopicModel = require("../../models/topic/topic.model");
const SpaceModel = require("../../models/space/space.model");
const ResourceModel = require("../../models/resource/resource.model");
const ActivityModel = require("../../models/activity/activity.model");
const UserModel = require("../../models/user/user.model");
const DiscussionModel = require("../../models/discussion/discussion.model");
const TopicController = {
  createTopic: async function (req, res) {
    try {
      const { space_id, name } = req.body;
      const user_id = req.auth.id;
      var space = await SpaceModel.Space.findById(space_id);
      if(!space){
        return res.status(400).json({ error: "Space does not exist!" });
      }
      const topic = await TopicModel.createTopic(name, space_id, user_id);
      space.topics.push(topic);
      space.save();
      let populated_topic = await TopicModel.getPopulatedTopic(topic);
      const user = await UserModel.User.findById(user_id);
      // {user} initiated {topic} topic in {space} space, {timeDiff}.
      let activity_body = `${user.name} ${user.surname} initiated "${topic.name}" topic in "${space.name}" space, {timeDiff}.`;
      let activity_data = {
        body : activity_body,
        topic: topic._id,
        space: space._id, 
        type: "topic"
      }
      const activity = await ActivityModel.createActivity(user_id, activity_data);
      return res.status(201).json({ topic: populated_topic });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  deleteTopic: async function (req, res) {
    try {
      const { topic_id } = req.body;
      const user = req.auth.id;
      const topic = await TopicModel.Topic.findById(topic_id);
      if(!topic){
        return res.status(400).json({ error: "Topic does not exist!" });
      }
      if (topic.creator.toString() !== user.toString()) {
        return res.status(400).json({ error: "User not creator of topic" });
      } else {
        var space = await SpaceModel.Space.findById(topic.space);
        const index = space.topics.indexOf(topic_id);
        if (index > -1) { // only splice array when item is found
          space.topics.splice(index, 1); // 2nd parameter means remove one item only
        }
        for (var resource_temp of topic.resources) {
          var discussion = await DiscussionModel.getDiscussion(resource_temp.discussion);
          const index_disc = space.discussions.indexOf(discussion._id);
          if(index_disc > -1){
            space.discussions.splice(index_disc, 1);
          }
        }
        await space.save();
        await TopicModel.deleteTopic(topic_id);
      }
      return res.status(201).json({ message: "Topic deleted successfully!" });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  getPopulatedTopic: async function (req, res) {
    try {
      const topic_id = req.params.id;
      const topic = await TopicModel.getPopulatedTopic(topic_id);
      return res.status(200).json({ topic });
    } catch (e) {
      return res.status(400).send({ error: e });
    }
  },
  getTopicResources: async function (req, res) {
    try {
      const topic_id = req.params.id;
      const topic = await TopicModel.Topic.findById(
        topic_id,
        "resources"
      ).populate({
        path: "resources",
        options: { sort: { createdAt: -1 } },
        select: { _id: 1, name: 1 },
      });
      let resources = topic.resources;
      return res.status(200).json({ resources });
    } catch (e) {
      return res.status(400).send({ error: e });
    }
  },
};

module.exports = TopicController;
