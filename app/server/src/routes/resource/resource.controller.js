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
  deleteResource: async function (req, res) {
    try {
      const { resource_id } = req.body;
      const user = req.auth.id;
      const resource = await ResourceModel.Resource.findById(resource_id);
      if (resource.creator != user) {
        res.status(400).send({ error: "User not creator of resource" });
      } else {
        resource.remove();
      }
      res.status(201).json({ message: "" });
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
        res
          .status(400)
          .send({ error: "User not the creator of the resource!" });
      }
      var filter = { resource: resource_id };
      var update = { name, body };
      resource.update(filter, update);
      res.status(200).json({ message: resource });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
  rateResource: async function (req, res) {
    try {
      const { resource_id, rating } = req.body;
      const user = req.auth.id;
      var resource = await ResourceModel.Resource.findById(resource_id);
      var ratings = resource.ratings;
      var average_rating = resource.average_rating;
      var users_rated = Object.keys(ratings);
      var rate_count = users_rated.length;
      if (users_rated.includes(user)) {
        var old_rating = resource.ratings[user];
        resource.ratings[user] = rating;
        var total_rating = average_rating * rate_count;
        var new_total_rating = total_rating - old_rating + rating;
        resource.average_rating = new_total_rating / rate_count;
      } else {
        resource.ratings[user] = rating;
        var total_rating = average_rating * rate_count + rating;
        resource.average_rating = new_total_rating / (rate_count + 1);
      }
      resource.save();
      res.status(200).json({ message: resource.average_rating });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = ResourceController;
