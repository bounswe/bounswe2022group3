const express = require("express");

const api = express.Router();

const basicRouter = require("./basic/basic.route");

api.use("/basic", basicRouter);


module.exports = {
  api,
};
