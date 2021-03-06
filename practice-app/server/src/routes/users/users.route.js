const express = require("express");
const { validate } = require("./users.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth")
const UserController = require("./users.controller");

const usersRouter = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register 
 *     tags: [User]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *        description: "Creates a user with given data."
 *        required: true
 *        content:
 *          application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   password:
 *                     type: string  
 *     responses:
 *       "201":
 *         description: Created a new user
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                      created_at:
 *                          type: string
 *                  example:
 *                      message: "Created the user with muhammet.sen@boun.edu.tr"
 *                      created_at: "2022-05-17T07:10:08.039Z"
 *       "400":
 *         description: Could not create a new user, something went wrong!
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Could not create a user with the parameters you provided."
 *       "409":
 *         description: Could not create a new user, user already exists.
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "The user already exists."
 * /users/login:
 *   post:
 *     summary: Login 
 *     tags: [User]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *        description: "Provides authorization token for given user."
 *        required: true
 *        content:
 *          application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       "200":
 *         description: Created a new user
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      access_token:
 *                          type: string
 *                  example:
 *                      access_token: "access_token"
 *       "400":
 *         description: Could not login, something went wrong!
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "Failed to acquire access token!"
 *       "403":
 *         description: There is no user with given email!
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                  example:
 *                      message: "The user does not exist."
 * /users/getUsername:
 *   get:
 *     summary: Get username
 *     tags: [User]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *      - in: "query"
 *        name: "email"
 *        description: "Provides username(firstname lastname) from user with given email."
 *        required: true
 *        type : string
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 user_name: "Name surname"
 *       "400":
 *         description: "failed operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "User not found!"
 *      
 */

usersRouter.post(
    "/register",
    validate("register"),
    handleValidation,
    UserController.register
);
usersRouter.post(
    "/login",
    validate("login"),
    handleValidation,
    UserController.login
);
usersRouter.get(
    "/getUsername",
    UserController.getUsername
);


module.exports = usersRouter;
