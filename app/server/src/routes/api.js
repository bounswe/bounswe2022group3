const express = require("express");

const api = express.Router();

const basicRouter = require("./basic/basic.route");
const courseRouter = require("./course/course.route");

api.use("/basic", basicRouter);
api.use("/course", courseRouter);

module.exports = {
  api,
};
