const express = require("express");

const api = express.Router();

const basicRouter = require("./basic/basic.route");
const userRouter = require("./user/user.route");

api.use("/basic", basicRouter);
api.use("/user", userRouter);


module.exports = {
  api,
};
