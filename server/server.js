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

connectDB();
app.use("/api/users", usersRouter);
app.use("/api/friends", friendsRouter);

app.get("/api/home", (req, res) => {
  res.json({ message: `Ok boys we're done.` });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
