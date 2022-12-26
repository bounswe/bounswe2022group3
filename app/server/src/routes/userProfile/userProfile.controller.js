const UserModel = require("../../models/user/user.model");
const personalInfoModel = require("../../models/personalInfo/personalInfo.model");
const mongoose = require("mongoose");
var crypto = require('crypto');
const axios = require("axios"); 
const fs = require('fs');
const path = require('path');

const UserProfileController = {
  updateProfile: async function (req, res) {
    try {
      const { bio, interests, knowledge } = req.body;
      const user = await UserModel.getUserByID(req.auth.id);
      const personalInfoId = user.personal_info;
      const body_keys = Object.keys(req.body);
      if (body_keys.includes('is_private')) {
        user.is_private = req.body.is_private;
      }
      if (body_keys.includes('name')) {
        user.name = req.body.name;
      }
      if (body_keys.includes('surname')) {
        user.surname = req.body.surname;
      }
      let data = {
        bio: bio,
        interests: interests,
        knowledge: knowledge,
      };
      await user.save();
      await personalInfoModel.updateBio(personalInfoId, data);
      return res.status(201).send({ message: "Updated profile successfully" });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },

  updatePicture: async function (req, res) {
    try {
      const user = await UserModel.getUserByID(req.auth.id);
      if (!req.files) {
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
      return res.status(200).json({
        message: "Profile Picture updated!",
        link: link,
      });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },

  follow: async function (req, res) {
    try {
      const id = req.body.user_id;
      const user_id = req.auth.id;
      if(id == user_id.toString()){
        return res.status(400).json({ message: "You can't follow yourself!" });
      }
      const user = await UserModel.User.findById(user_id);
      const other_user = await UserModel.User.findById(id);
      if(user.followed_users.includes(id)){// already following
        return res.status(400).json({ message: "You already follow this user!" });
      }
      user.followed_users.push(other_user);
      other_user.follower_users.push(user);
      await user.save();
      await other_user.save();
      return res.status(200).json({ message: `${user.name+" "+user.surname} started following ${other_user.name+" "+ other_user.surname}` });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },

  unfollow: async function (req, res) {
    try {
      const id = req.body.user_id;
      const user_id = req.auth.id;
      if(id == user_id.toString()){
        return res.status(400).json({ message: "You can't unfollow yourself!" });
      }
      const user = await UserModel.User.findById(user_id);
      const other_user = await UserModel.User.findById(id);
      if(!(user.followed_users.includes(id))){// already following
        return res.status(400).json({ message: "You are already not following this user!" });
      }
      let index = user.followed_users.indexOf(id);
      if (index > -1) { // only splice array when item is found
        user.followed_users.splice(index, 1); // 2nd parameter means remove one item only
      }
      index = other_user.follower_users.indexOf(user_id.toString());
      if (index > -1) { // only splice array when item is found
        other_user.follower_users.splice(index, 1); // 2nd parameter means remove one item only
      }
      await user.save();
      await other_user.save();
      return res.status(200).json({ message: `${user.name+" "+user.surname} stopped following ${other_user.name+" "+ other_user.surname}` });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },

  getProfile: async function (req, res) {
    try {
      const id = req.params.id;
      // if user logged-in
      let profile;
      if (req.auth) {
        var user_id = req.auth.id;
        const user = await UserModel.User.findById(user_id);
        if(id == user_id.toString()){// own profile
          profile = await UserModel.getPopulatedPersonalInfo(id);
          return res.status(200).json({ profile });
        }
        if(user.followed_users.includes(id)){// looking at the profile of a user we follow
          profile = await UserModel.getPopulatedPersonalInfo(id);
          return res.status(200).json({ profile });
        }
        // looking at a profile we don't follow
        const other_user = await UserModel.getUserByID(id);
        if(other_user.is_private){
          profile = await UserModel.getPopulatedPersonalInfoPrivate(id);
        }
        else{
          profile = await UserModel.getPopulatedPersonalInfo(id);
        }
        return res.status(200).json({ profile });
      }
      else{
        const user = await UserModel.getUserByID(id);
        if(user.is_private){
          profile = await UserModel.getPopulatedPersonalInfoPrivate(id);
        }
        else{
          profile = await UserModel.getPopulatedPersonalInfo(id);
        }
        return res.status(200).json({ profile });
      }
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  getRelatedTags: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      const url = "https://api.datamuse.com/words?"
      const trg_url = url + "rel_trg=" + keyword+"&max=10";
      const trg_result = await axios.get(trg_url);
      // const topics_url = url + "topics=" + keyword;
      // const ml_url = url + "ml=" + keyword;
      // const topics_result = await axios.get(topics_url);
      // const ml_result = await axios.get(ml_url);
      let result = trg_result.data;
      res.status(200).json({ result });
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  getTags: async function (req, res) {
    try {
      const filePath = path.join(__dirname, '../../tags/tags.txt');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const words = data.split('\n');
        res.status(200).json({ words });
      });
    } catch(e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  disinterest: async function (req, res) {
    try {
      const { space_id } = req.body;
      const user_id = req.auth.id;
      const user = await UserModel.User.findById(user_id);
      var personal_info = await personalInfoModel.PersonalInfo.findById(user.personal_info);
      personal_info.disinterested_spaces.push(space_id);
      await personal_info.save();
      return res.status(200).json({ message: "Disinterested!" });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
};

module.exports = UserProfileController;
