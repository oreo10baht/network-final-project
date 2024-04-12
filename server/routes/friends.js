const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

router.put("/add", friendController.addFriend);

module.exports = router;
