const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const PORT = 8000;
const app = express();
const users = [];

app.use(cors({ origin: "*", Credentials: true }));
const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", (socket) => {
  console.log(`New Connection - ${socket.id}`);
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userjoined", {
      user: "Admin",
      msg: `${users[socket.id]} has Joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      msg: `WELCOME to the Chat ${users[socket.id]}`,
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("leaved", {
      user: "Admin",
      msg: `${users[socket.id]} left the chat`,
    });
    console.log(`${users[socket.id]} Left`);
  });
});
server.listen(PORT, () => {
  console.log(`Connected @ PORT ${PORT}`);
});
