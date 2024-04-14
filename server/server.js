const express = require("express");
const cors = require("cors");
const app = express();
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

app.get("/api/home", (req, res) => {
  res.json({ message: `Ok boys we're done.` });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
