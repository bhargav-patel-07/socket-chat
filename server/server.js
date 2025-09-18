import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateText, generateImageCaption } from "./ai.js"; // import AI functions


const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
 
  socket.on("joinRoom", ({ username, roomId }) => {
    socket.join(roomId);
    io.to(roomId).emit("message", { user: "System", text: `${username} joined ${roomId}` });
  });

  socket.on("chatMessage", async (msg) => {
    // Broadcast the user's message
    io.to(msg.room).emit("message", msg);
  
    if (msg.aiEnabled) {
      try {
        const aiResponse = await generateText(msg.text);
  
        // ✅ Clean AI response: remove markdown, bullets, and code fences
      
  
        io.to(msg.room).emit("message", {
          user: "AI",
          text: aiResponse,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        io.to(msg.room).emit("message", {
          user: "AI",
          text: "⚠️ Sorry, I couldn't generate a response.",
          timestamp: new Date().toISOString(),
        });
      }
    }
  });
});
  


server.listen(5000, () => console.log("Server running on port 5000"));
