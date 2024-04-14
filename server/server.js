const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const connectDB = require("./db");

//Dependencies
app.use(cors());
app.use(express.json());

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

app.get("/api/home", (req, res) => {
  res.json({ message: `Ok boys we're done.` });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

const { Server } = require("socket.io");

let chats = [];

const io = new Server({ cors: "http://localhost:3000" });

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addNewChat", (chatId) => {
    !chats.some((chat) => chat.chatId === chatId) &&
      chats.push({
        chatId,
        socketId: socket.id,
      });

    console.log("chats", chats);

    io.emit("getChats", chats);
  });

  socket.on("sendMessage", (message) => {
    const chat = chats.find((chat) => chat.chatId === message.chatId);

    if (chat) {
      io.to(chat.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    chats = chats.filter((chat) => chat.socketId !== socket.id);

    io.emit("getChats", chats);
  });
});

io.listen(5000);
