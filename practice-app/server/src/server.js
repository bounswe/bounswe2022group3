const http = require("http");
const mongoose = require('mongoose');
//const axios = require("axios");
const jwks = require("./services/jwkeys")
require("dotenv").config();

const app = require("./app");

const PORT = process.env.API_PORT;
const server = http.createServer(app);
const DB = process.env.DB;
const AUTH0_DOMAIN = process.env.auth0_domain
// var KEYS =[];

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

// const getJwks = async () => {
//     const url = `https://${AUTH0_DOMAIN}/.well-known/jwks.json`;
//     const response = (await axios.get(url)).data;
//     //const pem = jwkToPem()
//     //console.log(response);
//     response.keys.forEach(function(e,i,a) {
//         //console.log("--->>", e);
//         const pem = jwkToPem(e)
//         KEYS.push(pem);
//     });
//     KEYS.forEach(function(e,i,a) {
//         //console.log("--->>", e);
//     });
// };

// const getKeys = () => {
//     console.log(KEYS);
//     return KEYS;
// }

//getJwks();
jwks.getJwks();

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
}

startServer();