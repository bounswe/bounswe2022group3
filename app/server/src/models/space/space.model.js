const mongoose = require("mongoose");
const UserModel = require("../user/user.model");
const EnrollmentModel = require("../enrollment/enrollment.model");

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    info: {
      type: String,
    },
    rating: {
      type: Number,
    },
    rating_map: {
      type: Map,
      of: Number
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badge",
      },
    ],
    feedbacks: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Feedback",
        type: String,
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    discussions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    polls: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Poll",
        type: String,
      },
    ],
    enrollments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
      },
    ],
    enrolledUsersCount: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
spaceSchema.index({info: 'text', tags: 'text', name: 'text'});

const Space = mongoose.model("Space", spaceSchema);

const createSpace = async (name, creator, info, tags, image) => {
  var space = new Space({
    name,
    creator,
    info,
    tags,
    image,
  });
  space.enrolledUsersCount = 0;

  space.events = [];
  // randomized rating, will change
  // space.rating = Math.floor(Math.random() * 3) + 3;
  space.rating = 0;
  space.rating_map = new Map();

  const user = await UserModel.getUserByID(creator);
  user.created_spaces.push(space._id);
  const enrollment = await EnrollmentModel.createEnrollment(user._id, space._id);
  space.enrollments.push(enrollment._id);
  space.enrolledUsersCount += 1;
  await user.save();
  const res = await space.save();
  return res;
};

const getPopulatedSpace = async (id) => {
  return Space.findById(id)
    .populate("creator", "name surname image")
    .populate({
      path: "topics",
      populate: {
        path: "resources",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "creator",
          select: { _id: 1, name: 1, surname: 1, image: 1 },
        },
      },
    })
    .populate({
      path: "topics",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "creator",
        select: { _id: 1, name: 1, surname: 1, image: 1 },
      },
    })
    .populate({
      path: "discussions",
      options: { sort: { 'createdAt': -1 } },
      select: { _id: 1, title: 1},
    })
    .populate({
      path: "events",
      options: { sort: { 'createdAt': -1 } },
      select: { _id: 1, event_title: 1},
    })
    .exec();
};

const getSpaceByID = async (space_id) => {
  const result = await Space.findById(space_id).exec();
  return result;
};

const deleteSpace = async (space_id) => {
  var space = await Space.findById(space_id);
  space.remove();
};

module.exports = {
  Space,
  createSpace,
  getPopulatedSpace,
  getSpaceByID,
  deleteSpace,
};
