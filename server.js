const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));

const PORT = process.env.PORT || 3000;
let onlineUsers = 0;

io.on("connection", (socket) => {

  onlineUsers++;

  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {

    onlineUsers--;

    io.emit("onlineUsers", onlineUsers);

  });

});
server.listen(PORT, () => {
  console.log("PyqKing running at http://localhost:" + PORT);
});