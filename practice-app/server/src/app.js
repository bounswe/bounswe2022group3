const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morganBody = require('morgan-body');
const { api } = require("./routes/api");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

morganBody(app);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Practice app Express API with Swagger",
      version: "0.1.0",
      description:
        "Documentation of our Express backend with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/users/users.route.js"],
};
const specs = swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


app.use("/", api);

module.exports = app;