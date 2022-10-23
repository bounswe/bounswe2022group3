const express = require("express");

const api = express.Router();

const basicRouter = require("./basic/basic.route");
const userProfileRouter = require("./userProfile/userProfile.route")
const userRouter = require("./user/user.route");


api.use("/basic", basicRouter);
api.use("/userProfile", userProfileRouter)
api.use("/user", userRouter);


module.exports = {
  api,
};
