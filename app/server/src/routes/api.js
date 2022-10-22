const express = require("express");
const { getPopulatedChapter } = require("../models/chapters/chapters.model");

const api = express.Router();

const basicRouter = require("./basic/basic.route");

api.use("/basic", basicRouter);

module.exports = {
  api,
};
