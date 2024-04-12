const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

router.put("/add", friendController.addFriend);
router.delete("/remove", friendController.removeFriend);

module.exports = router;
