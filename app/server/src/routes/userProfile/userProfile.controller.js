const UserModel = require("../../models/user/user.model");
const personalInfoModel = require("../../models/personalInfo/personalInfo.model");
const mongoose = require("mongoose");
var crypto = require('crypto');


const UserProfileController = {
  updatePersonalInfo: async function (req, res) {
    try {
      const { bio, interests, knowledge } = req.body;
      const user = await UserModel.getUserByID(req.auth.id);
      const personalInfoId = user.personal_info;
      let data = {
        bio: bio,
        interests: interests,
        knowledge: knowledge,
      };
      await personalInfoModel.updateBio(personalInfoId, data);
      res.status(201).send({ message: "Updated bio successfully" });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },

  updatePicture: async function (req, res) {
    try {
      const user = await UserModel.getUserByID(req.auth.id);
      if(!req.files){
        return res.status(400).json({ error: "Picture missing!" });
      }
      let picture = req.files.picture;
      console.log(picture)
      //move photo to uploads directory
      var email_hash = crypto.createHash('md5').update(user.email).digest('hex');
      let picture_name = email_hash + "_" + picture.name;
      picture.mv('./uploads/' + picture_name);
      user.image = picture_name
      await user.save();
      let link = process.env.API_URL + "/user/" + picture_name;
      res.status(200).json({ 
        message: "Profile Picture updated!",
        link: link,
      });
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },

  getProfile: async function (req, res) {
    try {
      const id = req.params.id;
      // Need a new function in user model that returns populated versions of personal info and badges
      const profile = await UserModel.getPopulatedPersonalInfo(id);
      res.status(200).json({ profile });
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
};

module.exports = UserProfileController;
