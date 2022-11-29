const userModel = require("../../models/user/user.model");
const personalInfoModel = require("../../models/personalInfo/personalInfo.model");
const mongoose = require("mongoose");

const UserProfileController = {
  updatePersonalInfo: async function (req, res) {
    try {
      const { id, bio, interests, knowledge } = req.body;
      const profile = await userModel.getUserByID(id);
      const personalInfoId = profile.personal_info;
      let data = {
        bio: bio,
        interests: interests,
        knowledge: knowledge,
      };
      personalInfoModel.updateBio(personalInfoId, data);
      res.status(201).send({ message: "Updated bio successfully" });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },

  getProfile: async function (req, res) {
    try {
      const id = req.params.id;
      // Need a new function in user model that returns populated versions of personal info and badges
      const profile = await userModel.getPopulatedPersonalInfo(id);
      res.status(200).json({ profile });
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
};

module.exports = UserProfileController;
