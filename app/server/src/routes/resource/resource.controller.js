const ResourceModel = require("../../models/resource/resource.model");
const TopicModel = require("../../models/topic/topic.model");
const DiscussionModel = require("../../models/discussion/discussion.model");
const AnnotationModel = require("../../models/annotation/annotation.model");

const ResourceController = {
  createResource: async function (req, res) {
    try {
      const { name, body, topic_id } = req.body;
      const user = req.auth.id;
      var topic = await TopicModel.Topic.findById(topic_id);
      if(!topic){
        return res.status(400).json({ error: "Topic does not exist!" });
      }
      const resource = await ResourceModel.createResource(
        name,
        body,
        topic_id,
        user
      );
      topic.resources.push(resource);
      topic.save();
      const resource_populated = await ResourceModel.getPopulatedResource(resource._id);
      return res.status(201).json({ resource: resource_populated });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  deleteResource: async function (req, res) {
    try {
      const { resource_id } = req.body;
      const user = req.auth.id;
      const resource = await ResourceModel.Resource.findById(resource_id);
      if(!resource){
        return res.status(400).json({ error: "Resource does not exist!" });
      }
      if (resource.creator.toString() !== user.toString()) {
        return res.status(400).json({ error: "User not creator of resource" });
      } else {
        let disc = await DiscussionModel.getDiscussion(resource.discussion);
        disc.remove();
        var topic = await TopicModel.Topic.findById(resource.topic);
        const index = topic.resources.indexOf(resource_id);
        if (index > -1) { // only splice array when item is found
          topic.resources.splice(index, 1); // 2nd parameter means remove one item only
        }
        await topic.save();
        resource.remove();
      }
      return res.status(201).json({ message: "Resource deleted successfully!" });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  getResource: async function (req, res) {
    try {
      const resource = await ResourceModel.getPopulatedResource(req.params.id);
      if(!resource){
        return res.status(400).json({ error: "Resource does not exist!" });
      }
      return res.status(200).json({ resource });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  updateResource: async function (req, res) {
    try {
      const { resource_id } = req.body;
      const user = req.auth.id;
      var resource = await ResourceModel.getPopulatedResource(resource_id);
      if(!resource){
        return res.status(400).json({ error: "Resource does not exist!" });
      }
      if (resource.creator._id.toString() !== user.toString()) {
        return res
        .status(400)
        .send({ error: "User not the creator of the resource!" });
      }
      const body_keys = Object.keys(req.body);
      if ((!body_keys.includes('name')) && (!body_keys.includes('body'))) {
        return res
        .status(400)
        .send({ error: "name or body not provided." });
      }
      if (body_keys.includes('name')) {
        resource.name = req.body.name;
      }
      if (body_keys.includes('body')) {
        resource.body = req.body.body;
      }
      await resource.save();
      await AnnotationModel.Annotation.deleteMany({resource});
      return res.status(200).json({ resource });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  rateResource: async function (req, res) {
    try {
      const { resource_id, rating } = req.body;
      const user = req.auth.id;
      var resource = await ResourceModel.Resource.findById(resource_id);
      if(!resource){
        return res.status(400).json({ error: "Resource does not exist!" });
      }
      var ratings = resource.ratings;
      var average_rating = resource.average_rating;
      var users_rated =  Array.from( ratings.keys() );;
      var rate_count = ratings.size;
      if (users_rated.includes(user._id)) {
        var old_rating = resource.ratings.get(user._id);
        resource.ratings.set(user._id, rating);
        let total_rating = average_rating * rate_count;
        var new_total_rating = total_rating - old_rating + rating;
        resource.average_rating = new_total_rating / rate_count;
      } else {
        resource.ratings.set(user._id, rating);
        let new_total_rating = average_rating * rate_count + rating;
        resource.average_rating = new_total_rating / (rate_count + 1);
      }
      await resource.save();
      let avg_rating = resource.average_rating;
      return res.status(200).json({ average_rating: avg_rating });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = ResourceController;
