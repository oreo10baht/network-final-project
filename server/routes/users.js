const express = require('express');
const router = express.Router();

router.get("/api/example", (req,res) => {
    res.json({message: "Example 1 Let's go?"});
})

module.exports = router;
