const http = require("http");
const mongoose = require('mongoose');
require("dotenv").config();

const app = require("./app");

const PORT = process.env.API_PORT;
const server = http.createServer(app);

const DB = process.env.DB;

const connectDB = async () => {
    await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB Connection established");
            var connection = mongoose.connection;
            connection.db.listCollections().toArray(function(err, names) {
              if (err) {
                  console.log(err);
              }
              else {
                  names.forEach(function(e,i,a) {
                      console.log("--->>", e.name);
                  });
              }
            });
        })
        .catch((e) => {
            console.log(e);
        });

};


async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
}

startServer();