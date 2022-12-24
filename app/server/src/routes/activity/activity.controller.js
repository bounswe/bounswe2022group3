const ActivityModel = require("../../models/activity/activity.model");
const UserModel = require("../../models/user/user.model");

const ActivityController = {

  getFeed: async function (req, res) {
    try {
      const user = await UserModel.User.findById(req.auth.id);
      let user_list = [user];
      user_list = user_list.concat(user.followed_users);
      let feed_list = ActivityModel.Activity.find({ user: { $in : user_list } });
      feed_list.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
      return res.status(200).json({ feed: feed_list });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = ActivityController;
