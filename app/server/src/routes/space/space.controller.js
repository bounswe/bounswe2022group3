const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");
const UserModel = require("../../models/user/user.model");
const ActivityModel = require("../../models/activity/activity.model");

const SpaceController = {
  createSpace: async function (req, res) {
    try {
      const user_id = req.auth.id;
      const creator = await UserModel.User.findById(user_id);
      const { name, info, tags, image } = req.body;
      var space = await SpaceModel.createSpace(
        name,
        creator,
        info,
        tags,
        image
      );
      // {user} created a new space called {space.name}, {date.now-space.createdAt} ago.
      let activity_body = `${creator.name} ${creator.surname} created a new space called ${space.name}, {timeDiff}.`;
      let activity_data = {
        body : activity_body,
        space: space._id,
      }
      const activity = await ActivityModel.createActivity(user_id, activity_data);
      return res.status(201).send({ space });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  },

  searchSpaces: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      var spaces;
      if (keyword) {
        spaces = await SpaceModel.Space.find(
          {
            name: { $regex: keyword, $options: "i" },
          },
          "name creator info rating tags image enrolledUsersCount"
        )
          .populate({
            path: "creator",
            select: { _id: 1, name: 1, surname: 1, image: 1 }
          })
          .exec();
      } else {
        spaces = await SpaceModel.Space.find(
          {},
          "name creator info rating tags image enrolledUsersCount"
        )
          .populate({
            path: "creator",
            select: { _id: 1, name: 1, surname: 1, image: 1 }
          })
          .exec();
      }
      return res.status(200).json({ spaces });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  },

  getSpaceDetail: async function (req, res) {
    try {
      var space = req.params.id;
      space = await SpaceModel.getPopulatedSpace(space);
      if (!space) {
        return res.status(404).json({ message: "The space does not exist!" }); // The token exists but email mismatch.
      }
      //let data = { space };
      let enrolled;
      // if user logged-in
      if (req.auth) {
        var user = req.auth.id;
        user = await UserModel.User.findById(user);
        if (!user) {
          return res.status(400).json({ message: "The user does not exist!" });
        }
        const enrollingInfo = await EnrollmentModel.Enrollment.findOne({
          space,
          user,
        });
        if (enrollingInfo) {
          enrolled = true;
        } else {
          enrolled = false;
        }
        if (space.creator._id.toString() == user._id.toString()) {
          enrolled = true;
        }
      } else {
        return res.status(200).json({ space });
      }
      return res.status(200).json({ space, enrolled });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },

  getAllDiscussions: async function (req, res) {
    try {
      var space = req.params.id;
      space = await SpaceModel.Space.findById(space)
        .populate({
          path: "discussions",
          options: { sort: { 'createdAt': -1 } },
          populate: { path: "title _id comments" }
        })
        .populate({
          path: "discussions",
          options: { sort: { 'createdAt': -1 } },
          populate: { 
            path: "user",
            select: { _id: 1, name: 1, surname: 1, image: 1 },
          },

        })
        .exec();
      if (!space) {
        return res.status(404).json({ message: "The space does not exist!" }); // The token exists but email mismatch.
      }
      var discussions = [];

      for (var discussion of space.discussions) {
        discussions.push({
          _id: discussion._id,
          title: discussion.title,
          user: discussion.user,
          createdAt: discussion.createdAt,
          updatedAt: discussion.updatedAt,
          number_of_comments: discussion.comments.length,
          comments: discussion.comments,
        });
      }
      return res.status(200).json({ discussions });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },

  getAllEvents: async function (req, res) {
    try {
      var space = req.params.id;
      space = await SpaceModel.Space.findById(space)
        .populate({
          path: "events",
          options: { sort: { 'start_date': -1 } },
          populate: { path: "creator", select: { 'name': 1, 'surname': 1, 'image': 1} }
        })
        .exec();
      if (!space) {
        return res.status(404).json({ message: "The space does not exist!" }); // The token exists but email mismatch.
      }

      // if we need to specify, we can do that here.
      // var events = [];
      // for (var event of space.events) {
      //   events.push({
      //     title: event.event_title,
      //     description: event.description,
      //     location: event.location,
      //     event_id: event._id,
      //     quota: event.quota,
      //     start_date: start_date,
      //   });
      // }
      return res.status(200).json(space.events);
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = SpaceController;
