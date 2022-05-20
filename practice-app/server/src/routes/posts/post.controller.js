const Posts = require("../../models/posts/posts.model");
const axios = require("axios");
const { response } = require("../../app");

const goRestToken = process.env.GOREST_TOKEN;
const gorestUrl = `https://gorest.co.in/public/v2`;

const PostController = {
  createPost: async function (req, res, next) {
    try {
      // Get user input
      const { user_id, title, body } = req.body;

      const payload = {
        title: title,
        body: body,
      };
      const headers = {
        headers: {
          Authorization: `Bearer ${goRestToken}`,
        },
      };
      const response = (
        await axios.post(
          `${gorestUrl}/users/${user_id}/posts`,
          payload,
          headers
        )
      ).data;

      if (response) {
        res.status(201).json({
          status: "OK",
          message: "Post created succesfully!",
          response: "reponse",
        });
        next();
      }
    } catch (error) {
      res.status(400).json({
        message: "Could not create post!!",
      });
    }
  },
  getPosts: async function (req, res) {
    try {
      const response = (
        await axios.get(`${gorestUrl}/posts`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + goRestToken,
          },
        })
      ).data;
      res.status(200).json({
        Posts: response,
      });
    } catch (error) {
      console.log(error);
    }
  },
  savePost: async function (req, res) {
    try {
      const { user_id, title, body } = req.body;

      await Posts.findOneAndUpdate(
        {
          user_id: user_id,
          title: title,
          body: body,
        },
        {},
        { upsert: true, setDefaultsOnInsert: true, runValidators: true }
      );

      return res.status(200).json({
        user_id: user_id,
      });
    } catch (error) {
      res.status(400);
    }
  },
};

module.exports = PostController;
