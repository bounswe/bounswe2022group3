const ResourceModel = require("../../models/resource/resource.model");

const ResourceController = {
  createResource: async function (req, res) {
    try {
      const { name, body, topic_id } = req.body;
      const user = req.auth.id;
      const resource = await ResourceModel.createResource(
        name,
        body,
        topic_id,
        user
      );
      res.status(201).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
  getResource: async function (req, res) {
    try {
      const resource = await ResourceModel.getPopulatedResource(req.params.id);
      res.status(200).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
  updateResource: async function (req, res) {
    try {
      const { resource_id, name, body } = req.body;
      const user = req.auth.id;
      var resource = await ResourceModel.Resource.findById(resource_id);
      if (resource.user != user) {
        res.status(400).send({error: "User not the creator of the resource!"})
      }
      var filter = { resource: resource_id };
      var update = { name, body };
      resource.update(filter, update);
      res.status(200).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = ResourceController;
