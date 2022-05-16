const http = require("http");
const mongoose = require('mongoose');
const jwks = require("./services/jwkeys")
require("dotenv").config();

const app = require("./app");

const DB = process.env.DB;

const connectDB = async () => {
    await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB Connection established");
        })
        .catch((e) => {
            console.log(e);
        });
};

connectDB();

mongoose.connection.useDb("practice");

const PORT = process.env.API_PORT;
const server = http.createServer(app);

jwks.getJwks();


async function startServer() {
    server.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}...`);
    });
}

startServer();
