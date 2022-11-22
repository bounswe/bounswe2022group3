const ResourceModel = require("../../models/resource/resource.model");

const ResourceController = {
  createResource: async function (req, res) {
    try {
      const { name, body, topic_id } = req.body;
      const resource = await ResourceModel.createResource(name, body, topic_id);
      res.status(201).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  getResource: async function (req, res) {
    try {
      const resource = await ResourceModel.getPopulatedResource(req.params.id);
      res.status(200).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
};

module.exports = ResourceController;
