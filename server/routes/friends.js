const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

router.put("/add", friendController.addFriend);
router.put("/accept", friendController.acceptFriend);
router.delete("/remove", friendController.removeFriend);

module.exports = router;
