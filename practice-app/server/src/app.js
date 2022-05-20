const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morganBody = require("morgan-body");
const { api } = require("./routes/api");
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

app.use(cors());
app.use(express.json());

if (process.env.LOG === "true") {
    morganBody(app);
}

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Practice app Express API with Swagger",
            version: "0.1.0",
            description: "Documentation of our Express backend with Swagger",
        },
        servers: [
            {
                url: process.env.API_URL,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    scheme: "bearer",
                    name: "Authorization",
                    in: "header",
                    description: "Token is of form: Bearer <access_token>"
                },
            },
        },
    },
    servers: [
        {
            url: process.env.API_URL,
        },
    ],
    apis: [
        "./routes/users/users.route.js",
        "./routes/chess/chess.route.js",
        "./routes/twitterSearch/twitterSearch.route.js",
        "./routes/currency/currency.route.js",
        "./routes/quiz/quiz.route.js",
        "./routes/coin/coin.route.js"
    ],
};
const specs = swaggerJsdoc(swaggerOptions);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.use("/", api);

module.exports = app;
