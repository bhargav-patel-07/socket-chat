import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", ({ username, roomId }) => {
    socket.join(roomId);
    io.to(roomId).emit("message", { user: "System", text: `${username} joined ${roomId}` });
  });

  socket.on("chatMessage", (msg) => {
    io.to(msg.room).emit("message", msg);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
