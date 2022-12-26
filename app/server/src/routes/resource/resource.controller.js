const ResourceModel = require("../../models/resource/resource.model");
const TopicModel = require("../../models/topic/topic.model");
const DiscussionModel = require("../../models/discussion/discussion.model");
const AnnotationModel = require("../../models/annotation/annotation.model");
const ActivityModel = require("../../models/activity/activity.model");
const UserModel = require("../../models/user/user.model");
const SpaceModel = require("../../models/space/space.model");
const NoteModel = require("../../models/note/note.model");
const ResourceController = {
  createResource: async function (req, res) {
    try {
      const { name, body, topic_id } = req.body;
      const user_id = req.auth.id;
      var topic = await TopicModel.Topic.findById(topic_id).populate("space", "name").exec();
      var space = await SpaceModel.Space.findById(topic.space._id);
      if(!topic){
        return res.status(400).json({ error: "Topic does not exist!" });
      }
      const resource = await ResourceModel.createResource(
        name,
        body,
        topic_id,
        user_id
      );
      topic.resources.push(resource);
      await topic.save();
      const user = await UserModel.User.findById(user_id);
      discussion = await DiscussionModel.createDiscussion(user, topic.space._id, name);
      resource.discussion = discussion;
      space.discussions.push(discussion);
      await space.save();
      await resource.save();
      const resource_populated = await ResourceModel.getPopulatedResource(resource._id);
      // {user.name} {user.surname} published "{resource.name}", {timeDiff}.
      let activity_body = `${user.name} ${user.surname} published "${resource.name}" in "${topic.space.name}" space, {timeDiff}.`;
      let activity_data = {
        body : activity_body,
        resource: resource._id,
        space: topic.space._id, 
      }
      const activity = await ActivityModel.createActivity(user_id, activity_data);
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
        var topic = await TopicModel.Topic.findById(resource.topic);
        var space = await SpaceModel.Space.findById(topic.space);
        const index_resource = topic.resources.indexOf(resource_id);
        if (index_resource > -1) { // only splice array when item is found
          topic.resources.splice(index_resource, 1); // 2nd parameter means remove one item only
        }
        var discussion = await DiscussionModel.getDiscussion(resource.discussion);
        const index_disc = space.discussions.indexOf(discussion._id);
        if(index_disc > -1){
          space.discussions.splice(index_disc, 1);
        }
        await topic.save();
        await space.save();
        await NoteModel.Note.deleteMany({discussion: discussion._id});
        await ResourceModel.deleteResource(resource_id);
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
      var topic = await TopicModel.Topic.findById(resource.topic);
      Object.keys(resource).map(
        function(object){
          resource[object]["resource_name"] = topic.name
      });
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
      if (users_rated.includes(user._id.toString())) {
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
