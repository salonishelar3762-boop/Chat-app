const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = {};
io.on("connection", (socket) => {

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };

    io.to(room).emit("message", `${username} joined`);
  });

  socket.on("chatMessage", (msg) => {
    const user = users[socket.id];

    if (user) {
      io.to(user.room).emit("message", `${user.username}: ${msg}`);
    }
  });

});


server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});