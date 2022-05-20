const express = require("express");
const EmailController = require("./verify.controller");
const { validate } = require("./verify.validate");
const { handleValidation } = require("../../services/validate");

const verifyRouter = express.Router();

/**
 * @swagger
 * /verify/verifyEmail:
 *   post:
 *     summary: Verifies Email
 *     tags: [Verify]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "body"
 *        name: "Body"
 *        description: "It checks whether given input is a valid email."
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *              email:
 *                type: string
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
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not verified the email with the parameters provided"
 *verify/saveEmail:
 *    post:
 *     summary: Saves given email
 *     tags: [Verify]
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
 *              email:
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
 *                      message: "ok"
 *       "400":
 *         description: "Input email is not provided"
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Please provide an email."
 *       "409":
 *         description: The email that is provided could not be saved. It already exists.
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Email already exists."
 *verify/getEmails:
 *    get:
 *     summary: Lists emails that are already saved
 *     tags: [Verify]
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
 *       "500":
 *         description: "Could not retrieve emails"
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not retrieve emails"
 *     
 */


verifyRouter.post(
    "/verifyEmail",
    validate("verify"),
    handleValidation,
    EmailController.verifyEmail
);

verifyRouter.post(
    "/saveEmail",
    validate("verify"),
    handleValidation,
    EmailController.saveEmail
);

verifyRouter.get(
    "/getEmails",
    handleValidation,
    EmailController.getEmails
);


module.exports = verifyRouter;
