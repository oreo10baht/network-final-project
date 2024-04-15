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

// io.on("connection", (socket) => {
//   socket.emit("set-online", data) //when user connects
//   socket.on("join-room", (room) => {
//     socket.join(room);
//     console.log("a user connected:", socket.id, "to", room);
//   });
//   socket.on("send-message", (data) => {
//     socket.to(data.chatId).emit("receive-message", data);
//     console.log(data);
//   });
//   socket.on("disconnect", () => {
//     console.log("Connection Lost", socket.id)});
//     socket.emit("set-offline", data) //when a user disconnects
// });
server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

// const { Server } = require("socket.io");

// let chats = [];

// const io = new Server({ cors: "http://localhost:3000" });

// io.on("connection", (socket) => {
//   console.log("new connection", socket.id);

//   socket.on("addNewChat", (chatId) => {
//     !chats.some((chat) => chat.chatId === chatId) &&
//       chats.push({
//         chatId,
//         socketId: socket.id,
//       });

//     console.log("chats", chats);

//     io.emit("getChats", chats);
//   });

//   socket.on("sendMessage", (message) => {
//     const chat = chats.find((chat) => chat.chatId === message.chatId);

//     if (chat) {
//       io.to(chat.socketId).emit("getMessage", message);
//     }
//   });

//   socket.on("disconnect", () => {
//     chats = chats.filter((chat) => chat.socketId !== socket.id);

//     io.emit("getChats", chats);
//   });
// });

// io.listen(5000);
