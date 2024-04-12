const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const connectDB = require("./db");

//Routes
const usersRouter = require("./routes/users");

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/users", usersRouter);
app.get("/api/home", (req, res) => {
  res.json({ message: `Ok boys we're done.` });
});
app.use;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
