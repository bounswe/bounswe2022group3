const http = require("http");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.API_PORT;
const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
}

startServer();