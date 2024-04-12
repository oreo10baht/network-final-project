const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const connectDB = require("./db");

const User = require("./models/user.model.js");

app.use(cors());
app.use(express.json());

connectDB();
const exampleRouter = require("./routes/users");
app.use("/", exampleRouter);
app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error creating user.");
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/home", (req, res) => {
  res.json({ message: `Ok boys we're done.` });
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
