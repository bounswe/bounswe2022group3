const express = require("express");
const { validate } = require("./twitterSearch.validate");
const { handleValidation } = require("../../services/validate");
const TwitterSearchController = require("./twitterSearch.controller");

const twitterSearchRouter = express.Router();
/**
 * @swagger
 * /twitterSearch/create_rule:
 *   post:
 *     summary: Create Rule 
 *     tags: [Tweet]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "body"
 *        name: "Body"
 *        description: "Hashtag to listen for"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *              hashtag:
 *                type: string
 *     responses:
 *       "201":
 *         description: Created a new rule
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                      tag:
 *                          type: string
 *                      id:
 *                          type: string
 *                  example:
 *                      message: "Created a rule with tag #turkey"
 *                      tag: "#turkey"
 *                      id: "739579330"
 *       "400":
 *         description: Could not create a new rule
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not create a rule with the parameters you provided."
 */
twitterSearchRouter.post(
    "/create_rule",
    validate("create_rule"),
    handleValidation,
    TwitterSearchController.createRule
);

/**
 * @swagger
 * /twitterSearch/delete_rule:
 *   get:
 *     summary: Delete Rule 
 *     tags: [Tweet]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "query"
 *        name: "ID"
 *        description: "ID of the rule to be deleted"
 *        required: true
 *        type: "string"
 *     responses:
 *       "200":
 *         description: Deleted rule
 */
twitterSearchRouter.get(
    "/delete_rule",
    validate("delete_rule"),
    handleValidation,
    TwitterSearchController.deleteRule
);
/**
 * @swagger
 * /twitterSearch/listen:
 *   get:
 *     summary: Trigger the system to listern for tweets 
 *     tags: [Tweet]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     responses:
 *       "200":
 *         description: Deleted rule
 */
twitterSearchRouter.get(
    "/listen",
    TwitterSearchController.listenStream
)
/**
 * @swagger
 * /twitterSearch/rules:
 *   get:
 *     summary: Get registered rules 
 *     tags: [Tweet]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     responses:
 *       "200":
 *         description: Lists the current rules
 *         content:
 *           application/json:
 *             schema:
 *                  type: "array"
 *                  items:
 *                      type: "string"
 * 
 * 
 */
twitterSearchRouter.get(
    "/rules",
    TwitterSearchController.getRules
)
/**
 * @swagger
 * /twitterSearch/get_tweets:
 *   post:
 *     summary: Get Analysis of Tweets
 *     tags: [Tweet]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "body"
 *        name: "Body"
 *        description: "Tags to analyze for"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            tags:  
 *              type: "array"
 *              items:
 *                type: "string"
 *     responses:
 *       "200":
 *         description: Created a new rule
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      averageLengths:
 *                        type: "array"
 *                        items:
 *                          type: object
 *                          properties:
 *                            name:
 *                              type: string
 *                            $tag1:
 *                              type: string
 *                            $tag2:
 *                              type: string
 *                      averageWordCounts:
  *                        type: "array"
 *                        items:
 *                          type: object
 *                          properties:
 *                            name:
 *                              type: string
 *                            $tag1:
 *                              type: string
 *                            $tag2:
 *                              type: string
 *                      tags:
 *                        type: "array"
 *                        items:
 *                          type: "string"
 *                  example:
 *                      tags: ["#btc","#eth"]
 *                      averageLengths: [{"name":"20:44","#btc":120.3,"#eth":98.4,},{"name":"20:43","#btc":110.2,"#eth":97.9,},]
 *                      averageWordCounts: [{"name":"20:44","#btc":19.3,"#eth":17.8,},{"name":"20:43","#btc":19.9,"#eth":18.2,},]
 */
twitterSearchRouter.post(
    "/get_tweets",
    validate("get_tweets"),
    handleValidation,
    TwitterSearchController.getTweets
)


module.exports = twitterSearchRouter;
