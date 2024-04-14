const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = 8080;
const connectDB = require("./db");

//Dependencies
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Routes
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const chatRoute = require("./routes/chats");
const messageRoute = require("./routes/messages");

connectDB();
app.use("/api/users", usersRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  socket.on("send", (message) => {
    socket.broadcast.emit("message", message);
    // socket.broadcast.emit("message", socket.id);
    console.log(message);
  });
});
server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
