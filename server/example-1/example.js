const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

app.get("/api/example", (req,res) => {
    res.json({message: "Example 1 Let's go?"});
})

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`)
})