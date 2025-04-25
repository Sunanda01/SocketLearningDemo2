const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const PORT = 8000;
const app = express();
app.use(cors({ origin: "*", Credentials: true }));
const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", (socket) => {
  console.log(`New Connection - ${socket.id}`);
});
server.listen(PORT, () => {
  console.log(`Connected @ PORT ${PORT}`);
});
