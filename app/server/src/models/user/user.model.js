const mongoose = require("mongoose");
const PersonalInfoModel = require("../../models/personalInfo/personalInfo.model");

const userSchema = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    personal_info: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "personal_info",
    },
    enrollments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
      },
    ],
    created_spaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
      },
    ],
    followed_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    follower_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blocked_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    is_banned: {
      type: Boolean,
    },
    // TODO: Integrate this such that failed logins would require user to recreate their password.
    failed_login_count: {
      type: Number,
    },
    is_private: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

const createUser = async ({ email, name, surname }) => {
  var user = new User({
    email,
    name,
    surname,
  });
  // After profile branch merged, add here

  const personalInfo = await PersonalInfoModel.createPersonalInfo();
  user.personal_info = personalInfo._id;
  const res = await user.save();
  return res;
};

const getUserByEmail = async (email) => {
  const result = await User.findOne({ email: `${email}` }).exec();
  return result;
};
const getUserByID = async (user_id) => {
  const result = await User.findById(user_id).exec();
  return result;
};

const deleteUser = async (email) => {
  const res = await User.findOneAndDelete({ email: email });
  return res;
};

// const getPopulatedTokens = async (user_id) => {
//     return User.findById(user_id)
//         .populate("tokens").exec()
// }
const getPopulatedPersonalInfo = async (user_id) => {
  return User.findById(user_id)
    .populate({
      path: "personal_info",
      populate: {
        path: "badges",
      },
    })
    .exec();
};

module.exports = {
  User,
  createUser,
  deleteUser,
  getUserByEmail,
  getUserByID,
  getPopulatedPersonalInfo,
};
