const ActivityModel = require("../../models/activity/activity.model");
const UserModel = require("../../models/user/user.model");
const { getTimeDifference } = require("../../services/time");

const ActivityController = {

  getFeed: async function (req, res) {
    try {
      const user = await UserModel.User.findById(req.auth.id);
      let user_list = [req.auth.id];
      user_list = user_list.concat(user.followed_users);
      console.log(user_list);
      let feed_list = await  ActivityModel.Activity.find({ user: { $in : user_list } })
      .populate({
        path: "user",
        select: { _id: 1, name: 1, surname: 1, image: 1 }
      })
      .sort({ createdAt: -1 })
      .exec();
      console.log(feed_list);
      for (var activities of feed_list){
        activities.body = activities.body.replace("{timeDiff}", getTimeDifference(activities.createdAt,Date.now(),));
      }
      return res.status(200).json({ feed: feed_list });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  deleteActivity: async function (req, res) {
    try {
      const { activity_id } = req.body;
      const activity = await ActivityModel.Activity.findById(activity_id);
      if (!activity) {
        return res.status(404).send({ error: "Activity not found" });
      }
      console.log(activity.user);
      console.log(req.auth.id);
      if (activity.user.toString() !== req.auth.id.toString()) {
        return res.status(401).send({ error: "Unauthorized" });
      }
      const user = await UserModel.User.findById(req.auth.id).populate("personal_info","activities");
      user.personal_info.activities.pull(activity._id);
      await user.personal_info.save();
      await activity.remove();
      return res.status(200).send({ message: "Activity deleted" });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  }
};

module.exports = ActivityController;
