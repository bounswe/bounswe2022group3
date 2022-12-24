const express = require("express");

const api = express.Router();

const annotationRouter = require("./annotation/annotation.route");

api.use("/annotation", annotationRouter);

module.exports = {
  api,
};
