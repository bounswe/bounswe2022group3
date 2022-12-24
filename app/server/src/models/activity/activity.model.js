const mongoose = require("mongoose");
const PersonalInfoModel = require("../../models/personalInfo/personalInfo.model");
const UserModel = require("../../models/user/user.model");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

const createActivity = async (user, activity_data) => {
  var activity = new Activity({
    user,
    body: activity_data.body,
  });
  var user = await UserModel.User.findById(user);
  var personal_info = await PersonalInfoModel.getPersonalInfo(user.personal_info);
  personal_info.activities.push(activity);
  await personal_info.save();
  if (activity_data.resource) {
    activity.resource = activity_data.resource;
  } 
  if (activity_data.topic) {
    activity.topic = activity_data.topic;
  }
  if (activity_data.space) {
    activity.space = activity_data.space;
  } 
  if (activity_data.discussion) {
    activity.discussion = activity_data.discussion;
  }
  const res = await activity.save();
  return res;
};

// {user} published "{resource.name}" on {space} space under the {topic} topic, {date.now-resource.createdAt} ago.
// {user.name} {user.surname} published "{resource.name}", {timeDiff}.
// Ahmet published "How to use React" on Bounswe under the React topic, 2 days ago.
// {user} initiated {topic} topic in {space} space, {date.now-topic.createdAt} ago.
// Ahmet initiated React topic in Bounswe space, 2 days ago.
// {user} created a new space called {space.name}, {date.now-space.createdAt} ago.
// Ahmet created a new space called Bounswe, 2 days ago.
// {user} started a new {discussion} about {discussion.title} in {space} space, {date.now-discussion.createdAt} ago.
// Ahmet started a new discussion about How to use React in Bounswe space, 2 days ago.
// {user} launched a new event called {event.name} in {space} space, {date.now-event.createdAt} ago.
// Ahmet launched a new event called React meetup in Bounswe space, 2 days ago.
// {user} enrolled to {space} space, {date.now-enrollment.createdAt} ago.
// Ahmet enrolled to Bounswe space, 2 days ago. 

const getActivity = async (id) => {
  return Activity.findById(id);
};

module.exports = { Activity, createActivity, getActivity };
