const express = require("express");
const PostController = require("./post.controller");

const postRouter = express.Router();

/**
 * @swagger
 * 
 * /posts/CreatePost:
 *    post:
 *     summary: Save and post given posts
 *     tags: [Post]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "body"
 *        name: "Body"
 *        description: "It saves the given input."
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *              user_id:
 *                type: string
 *              title:
 *                type: string
 *              body:
 *                type: string
 *     responses:
 *       "201":
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                       status: "OK"
 *                       message: "Post created succesfully!"
 *                       response: "reponse"
 *       "400":
 *         description: "Input user_id is not provided"
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not create post"

 */

postRouter.post(
  "/createPost",
  PostController.createPost,
  PostController.savePost
);

/**
 * @swagger
 * 
 * /posts:
 *    get:
 *     summary: Lists all posts that are already saved
 *     tags: [Post]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 
 *     responses:
 *       "200":
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "ok"
 *       "400":
 *         description: "Could not get posts"
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not getPost"
 *     
 */
postRouter.route("/getPosts").get(PostController.getPosts);

module.exports = postRouter;
