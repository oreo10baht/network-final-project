const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const User = require("./models/user.model.js");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = 8080;
const connectDB = require("./db");

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Routes
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const chatRoute = require("./routes/chats");
const messageRoute = require("./routes/messages");

connectDB();

// Mount routes
app.use("/api/users", usersRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

io.on("connection", (socket) => {
  socket.on("set-offline", async (data) => {
    socket.broadcast.emit("set-user-offline", data);
    try {
      await User.findOneAndUpdate({ username: data }, { status: 0 });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  }); //when a user disconnects
  socket.on("set-online", (data) => {
    socket.to(data).emit("set-user-online", data);
  }); //when user connects
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("send-message", (data) => {
    socket.to(data.chatId).emit("receive-message", data);
  });
  socket.on("disconnect", () => {});
});

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

module.exports = server;
