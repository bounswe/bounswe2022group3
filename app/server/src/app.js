const express = require("express");
const passport = require("passport");
const cors = require("cors");
// const path = require("path");
const morganBody = require("morgan-body");
const { api } = require("./routes/api");
const app = express();

app.use(cors());
app.use(express.json());

morganBody(app);

app.use(passport.initialize());
app.use("/", api);

module.exports = app;
