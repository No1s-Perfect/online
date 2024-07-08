const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = 0;

app.use(cors()); // Allow CORS from React app origin
app.use(express.json());

io.on("connection", (socket) => {
  onlineUsers++;
  // Broadcast the number of online users
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    // Broadcast the number of online users
    io.emit("onlineUsers", onlineUsers);
  });
});

http.listen(process.env.PORT || 3000, () => console.log("listening"));
