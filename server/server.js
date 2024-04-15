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
  socket.on("set-offline", async(data)=>{
    // console.log(data)
    socket.broadcast.emit("set-user-offline", data);
    try {
      await User.findOneAndUpdate({username: data}, { status: 0 });
      // console.log(`User ${data} is now offline`);
    } catch (error) {
      console.error("Error updating user status:", error);
    }

  }) //when a user disconnects
  socket.on("set-online", (data)=>{
    socket.to(data).emit("set-user-online", data);
    // console.log(data)

  }) //when user connects
  socket.on("join-room", (room) => {
    socket.join(room);
    // console.log("a user connected:", socket.id, "to", room);
  });
  socket.on("send-message", (data) => {
    socket.to(data.chatId).emit("receive-message", data);
    // console.log(data);
  });
  socket.on("disconnect", () => {
    // console.log("Connection Lost", socket.id)
  });
    
});
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
