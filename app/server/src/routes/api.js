const express = require("express");

const api = express.Router();

const basicRouter = require("./basic/basic.route");
const userProfileRouter = require("./userProfile/userProfile.route")

api.use("/basic", basicRouter);
api.use("/userProfile", userProfileRouter)


module.exports = {
  api,
};
