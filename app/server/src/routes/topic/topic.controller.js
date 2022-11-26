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
      res.status(201).json({ message: topic });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  getPopulatedTopic: async function (req, res) {
    try {
      const topic_id = req.params.id;
      const topic = await TopicModel.getPopulatedTopic(topic_id);
      res.status(200).json({ message: topic });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  getTopicMini: async function (req, res) {
    try {
      const topic_id = req.params.id;
      const topic = await TopicModel.Topic.findById(topic_id, 'resources')
        .populate('resources', 'title');
      res.status(200).json({ message: topic });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
};

module.exports = TopicController;
