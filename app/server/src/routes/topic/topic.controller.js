const TopicModel = require("../../models/topic/topic.model");
const SpaceModel = require("../../models/space/space.model");

const TopicController = {
  createTopic: async function (req, res) {
    try {
      const { space_id, name } = req.body;
      const user = req.auth.id;
      const topic = await TopicModel.createTopic(name, space_id, user);
      var space = await SpaceModel.Space.findById(space_id);
      space.topics.push(topic);
      space.save();
      let populated_topic = await TopicModel.getPopulatedTopic(topic);
      return res.status(201).json({ topic: populated_topic });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  getPopulatedTopic: async function (req, res) {
    try {
      const topic_id = req.params.id;
      const topic = await TopicModel.getPopulatedTopic(topic_id);
      return res.status(200).json({ message: topic });
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
