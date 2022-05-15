const express = require("express");
const cors = require("cors");
const morganBody = require('morgan-body');
const { api } = require("./routes/api");
const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//   })
// );

app.use(express.json());

morganBody(app);

app.use("/", api);

module.exports = app;