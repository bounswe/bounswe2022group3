const BadgeModel = require("../../models/badge/badge.model");

const BadgeController = {
  createBadge: async function (req, res) {
    try {
      const { title, description } = req.body;
      // may want to add topic_id to creation (linking badge to a topic)
        // would need a topic ref field in badge model
      const badge = await BadgeModel.createBadge(title, description);
      res.status(201).json({ message: badge });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  getBadge: async function (req, res) {
    try {
      const badge = await BadgeModel.getBadge(req.params.id);
      res.status(200).json({ message: badge });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
};

module.exports = BadgeController;
