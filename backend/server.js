const http = require("http");

require("dotenv").config();
const app = require("./app");
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, (req, res) => {
  console.log(`server is running on http://localhost:${PORT}`);
});
