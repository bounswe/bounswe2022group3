const http = require("http");
require("dotenv").config();

const mongoose = require('mongoose');

const PORT = process.env.PORT;
const DB = process.env.DB;

const app = require("./app");


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


const server = http.createServer(app);

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}...`);
    });
}

startServer();