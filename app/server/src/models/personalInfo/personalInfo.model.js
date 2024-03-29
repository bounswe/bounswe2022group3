const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
  bio: {
    type: String,
  },
  personal_achievements: [
    {
      type: String,
    },
  ],
  interest_badges_selected: [
    {
      type: String,
    },
  ],
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  knowledge: [
    {
      type: String,
    },
  ],
  personal_rating: {
    type: mongoose.Types.Decimal128,
  },
  interests: [
    {
      type: String,
    },
  ],
  disinterested_spaces: [
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
});

const PersonalInfo = mongoose.model("personal_info", personalInfoSchema);

const createPersonalInfo = async () => {
  var info = new PersonalInfo();
  const res = await info.save();
  return res;
};

const getPersonalInfo = async (id) => {
  const res = await PersonalInfo.findById(id);
  return res;
};

const updateBio = async (id, data) => {
  const profile = await PersonalInfo.findByIdAndUpdate(id, {
    bio: data.bio,
    interests: data.interests,
    knowledge: data.knowledge,
  });
};

module.exports = {
  PersonalInfo,
  createPersonalInfo,
  getPersonalInfo,
  updateBio,
};
